"use client";

import Link from "next/link";
import type { ParsedDocument } from "@/lib/parseDocument";
import type { DevelopmentDocument } from "@/lib/content";
import { DocumentContent } from "./DocumentContent";
import { ReadingProgress } from "./ReadingProgress";

type CloudReaderProps = {
  document: DevelopmentDocument;
  parsed: ParsedDocument;
  backHref?: string;
  backLabel?: string;
  badge?: string;
  displayTitle?: string;
};

export function CloudReader({
  document,
  parsed,
  backHref = "/",
  backLabel = "← все облака",
  badge,
  displayTitle,
}: CloudReaderProps) {
  return (
    <>
      <ReadingProgress />

      <div className="relative min-h-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl gap-10 px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
          {parsed.headings.length > 4 && (
            <aside className="hidden w-56 shrink-0 lg:block">
              <nav className="sticky top-24 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Содержание
                </p>
                <ul className="max-h-[70vh] space-y-2 overflow-y-auto text-sm">
                  {parsed.headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="block text-zinc-400 transition hover:text-violet-300"
                        style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                      >
                        {heading.content.length > 48
                          ? `${heading.content.slice(0, 45)}…`
                          : heading.content}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <article className="min-w-0 flex-1">
            <header className="mb-10 border-b border-white/8 pb-8">
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-300"
              >
                {backLabel}
              </Link>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-violet-400/80">
                {badge ??
                  (document.status === "origin"
                    ? "Стартовое облако"
                    : "Unfolding Cloud")}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {displayTitle ?? document.title}
              </h1>
              <p className="mt-3 text-sm text-zinc-500">
                {document.filename} · ~{document.readingMinutes} мин чтения ·{" "}
                {document.sizeKb} KB
              </p>
            </header>

            <DocumentContent parsed={parsed} />
          </article>
        </div>
      </div>
    </>
  );
}
