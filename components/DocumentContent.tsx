import type { ParsedDocument } from "@/lib/parseDocument";
import { FormattedText } from "./FormattedText";

type DocumentContentProps = {
  parsed: ParsedDocument;
};

const headingStyles = {
  1: "mt-10 mb-4 text-2xl font-semibold text-white first:mt-0",
  2: "mt-8 mb-3 text-xl font-semibold text-white",
  3: "mt-6 mb-2 text-lg font-medium text-zinc-100",
};

export function DocumentContent({ parsed }: DocumentContentProps) {
  return (
    <div className="space-y-5">
      {parsed.blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                id={block.id}
                className={headingStyles[block.level]}
              >
                {block.content}
              </h2>
            );

          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-white/8 bg-black/40 p-4"
              >
                {block.language && (
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    {block.language}
                  </p>
                )}
                <code className="font-mono text-[13px] leading-relaxed text-zinc-300">
                  {block.content}
                </code>
              </pre>
            );

          case "date":
            return (
              <div key={i} className="flex items-center gap-4 py-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {block.content}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
            );

          case "paragraph":
            return (
              <div
                key={i}
                className="rounded-xl border border-white/6 bg-white/[0.02] px-4 py-4 sm:px-5"
              >
                <FormattedText text={block.content} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
