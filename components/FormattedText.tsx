import type { ReactNode } from "react";

type FormattedTextProps = {
  text: string;
};

export function FormattedText({ text }: FormattedTextProps) {
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        if (/^[-*•]\s/.test(trimmed)) {
          return (
            <p key={i} className="pl-4 text-[15px] leading-relaxed text-zinc-200">
              <span className="mr-2 text-violet-400/60">•</span>
              {renderInline(trimmed.replace(/^[-*•]\s/, ""))}
            </p>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          const [, num, rest] = trimmed.match(/^(\d+)\.\s(.*)$/) ?? [];
          return (
            <p key={i} className="pl-4 text-[15px] leading-relaxed text-zinc-200">
              <span className="mr-2 font-mono text-xs text-violet-400/70">
                {num}.
              </span>
              {renderInline(rest ?? trimmed)}
            </p>
          );
        }

        return (
          <p key={i} className="text-[15px] leading-relaxed text-zinc-200">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13px] text-sky-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
