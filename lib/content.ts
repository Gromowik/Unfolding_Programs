import fs from "fs";
import path from "path";
import {
  estimateReadingMinutes,
  parseDocument,
  type ParsedDocument,
} from "./parseDocument";
import { ensureUniqueSlugs, toUrlSlug } from "./slug";

export type DevelopmentDocument = {
  slug: string;
  filename: string;
  title: string;
  preview: string;
  sourcePath: string;
  status: "origin" | "developing";
  readingMinutes: number;
  modifiedAt: string;
  sizeKb: number;
};

const CLOUDS_DIR = path.join(process.cwd(), "public", "development", "is_in.md");
const CLOUDS_PUBLIC_PREFIX = "development/is_in.md";
const ORIGIN_SLUGS = ["start", "start_2"] as const;

function getDocumentStatus(slug: string): DevelopmentDocument["status"] {
  return ORIGIN_SLUGS.includes(slug as (typeof ORIGIN_SLUGS)[number])
    ? "origin"
    : "developing";
}

function originSortIndex(slug: string): number {
  const index = ORIGIN_SLUGS.indexOf(slug as (typeof ORIGIN_SLUGS)[number]);
  return index === -1 ? ORIGIN_SLUGS.length : index;
}

function humanizeFilename(name: string): string {
  return name
    .replace(/\.md$/i, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ");
}

function extractTitle(raw: string, filename: string): string {
  const firstBlock = raw.split(/\n{2,}/).map((b) => b.trim()).find(Boolean);
  if (!firstBlock) return humanizeFilename(filename);

  const singleLine = firstBlock.split("\n")[0].replace(/^#+\s+/, "").trim();
  if (singleLine.length <= 100) return singleLine;
  return `${singleLine.slice(0, 97)}…`;
}

function extractPreview(raw: string): string {
  const blocks = raw.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const previewBlock = blocks.find(
    (b) =>
      b.length > 40 &&
      !/^(Heute|Unterhaltung mit Gemini)$/i.test(b) &&
      !b.startsWith("```"),
  );
  if (!previewBlock) return "Беседа без описания";
  const line = previewBlock.split("\n")[0];
  return line.length > 140 ? `${line.slice(0, 137)}…` : line;
}

function buildSlugMap(filenames: string[]): Map<string, string> {
  const entries = filenames.map((filename) => ({
    filename,
    slug: toUrlSlug(filename),
  }));
  return ensureUniqueSlugs(entries);
}

function buildDocumentMeta(
  filename: string,
  urlSlug: string,
  raw: string,
  stats: fs.Stats,
): DevelopmentDocument {
  return {
    slug: urlSlug,
    filename,
    title: extractTitle(raw, filename),
    preview: extractPreview(raw),
    sourcePath: `${CLOUDS_PUBLIC_PREFIX}/${filename}`,
    status: getDocumentStatus(urlSlug),
    readingMinutes: estimateReadingMinutes(raw),
    modifiedAt: stats.mtime.toISOString(),
    sizeKb: Math.round(stats.size / 1024),
  };
}

export function getDevelopmentDocuments(): DevelopmentDocument[] {
  if (!fs.existsSync(CLOUDS_DIR)) return [];

  const filenames = fs
    .readdirSync(CLOUDS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);

  const slugMap = buildSlugMap(filenames);

  const files = filenames.map((filename) => {
    const filePath = path.join(CLOUDS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const stats = fs.statSync(filePath);
    return buildDocumentMeta(filename, slugMap.get(filename)!, raw, stats);
  });

  return files.sort((a, b) => {
    const originDiff = originSortIndex(a.slug) - originSortIndex(b.slug);
    if (originDiff !== 0) return originDiff;
    return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime();
  });
}

function findDocument(slug: string): DevelopmentDocument | null {
  const decoded = decodeURIComponent(slug);
  const documents = getDevelopmentDocuments();

  return (
    documents.find(
      (doc) =>
        doc.slug === decoded ||
        doc.filename === `${decoded}.md` ||
        toUrlSlug(`${decoded}.md`) === doc.slug,
    ) ?? null
  );
}

export function getDocumentBySlug(slug: string): {
  meta: DevelopmentDocument;
  parsed: ParsedDocument;
} | null {
  const meta = findDocument(slug);
  if (!meta) return null;

  const filePath = path.join(CLOUDS_DIR, meta.filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const stats = fs.statSync(filePath);

  return {
    meta: buildDocumentMeta(meta.filename, meta.slug, raw, stats),
    parsed: parseDocument(raw),
  };
}

export function getAllDocumentSlugs(): string[] {
  return getDevelopmentDocuments().map((doc) => doc.slug);
}
