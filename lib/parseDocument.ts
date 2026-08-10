export type DocumentBlock =
  | { type: "heading"; level: 1 | 2 | 3; content: string; id: string }
  | { type: "code"; language?: string; content: string }
  | { type: "date"; content: string }
  | { type: "turn"; role: "user" | "assistant"; content: string }
  | { type: "paragraph"; content: string };

export type ParsedDocument = {
  blocks: DocumentBlock[];
  headings: { id: string; level: number; content: string }[];
};

function slugify(text: string, index: number): string {
  const base = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 48);
  return base ? `${base}-${index}` : `section-${index}`;
}

function isMetaLine(block: string): boolean {
  return /^(Heute|Unterhaltung mit Gemini|Conversation with Gemini)$/i.test(
    block.trim(),
  );
}

function isAssistantBlock(block: string): boolean {
  return (
    /^[\p{Extended_Pictographic}]/u.test(block) ||
    /^(Ты сейчас|Громовик,|Да, я потом|Копилот,|Привет!|Согласен на все|Sag mir|Насчёт|Хочешь, я могу помочь)/u.test(
      block,
    ) ||
    block.includes("Короткий вывод") ||
    block.includes("Я предлагаю внести") ||
    block.includes("🚀") ||
    block.includes("💡")
  );
}

function isHeadingLine(line: string): 1 | 2 | 3 | null {
  const match = line.match(/^(#{1,3})\s+(.+)$/);
  if (!match) return null;
  return match[1].length as 1 | 2 | 3;
}

export function parseDocument(raw: string): ParsedDocument {
  const blocks: DocumentBlock[] = [];
  const headings: ParsedDocument["headings"] = [];
  let headingIndex = 0;

  const segments = raw.split(/(```[\s\S]*?```)/g);

  for (const segment of segments) {
    if (!segment.trim()) continue;

    if (segment.startsWith("```")) {
      const fence = segment.match(/^```(\w*)\n?([\s\S]*?)```$/);
      if (fence) {
        blocks.push({
          type: "code",
          language: fence[1] || undefined,
          content: fence[2].replace(/\n$/, ""),
        });
      }
      continue;
    }

    const paragraphs = segment.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

    for (const paragraph of paragraphs) {
      const lines = paragraph.split("\n");
      const firstLine = lines[0];

      if (lines.length === 1 && isMetaLine(firstLine)) {
        blocks.push({ type: "date", content: firstLine });
        continue;
      }

      const headingLevel = isHeadingLine(firstLine);
      if (headingLevel && lines.length === 1) {
        const id = slugify(firstLine.replace(/^#+\s+/, ""), headingIndex++);
        headings.push({ id, level: headingLevel, content: firstLine.replace(/^#+\s+/, "") });
        blocks.push({
          type: "heading",
          level: headingLevel,
          content: firstLine.replace(/^#+\s+/, ""),
          id,
        });
        continue;
      }

      if (
        lines.length === 1 &&
        (firstLine.startsWith("🧪") ||
          firstLine.startsWith("📁") ||
          firstLine.startsWith("📄"))
      ) {
        blocks.push({
          type: "heading",
          level: 2,
          content: firstLine,
          id: slugify(firstLine, headingIndex++),
        });
        headings.push({
          id: slugify(firstLine, headingIndex - 1),
          level: 2,
          content: firstLine,
        });
        continue;
      }

      blocks.push({
        type: "turn",
        role: isAssistantBlock(paragraph) ? "assistant" : "user",
        content: paragraph,
      });
    }
  }

  return { blocks, headings };
}

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
