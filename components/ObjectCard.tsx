import Link from "next/link";
import { getProgram, type SituationWithMeta } from "@/lib/objectRegistry";

const accentStyles = {
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  violet: "border-violet-500/25 bg-violet-500/10 text-violet-300",
  sky: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  rose: "border-rose-500/25 bg-rose-500/10 text-rose-300",
};

type ObjectCardProps = {
  object: SituationWithMeta;
};

export function ObjectCard({ object }: ObjectCardProps) {
  const accent = accentStyles[object.accent];

  return (
    <Link
      href={`/objects/${object.id}`}
      className="group block rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-emerald-500/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-lg font-medium ${accent}`}
        >
          {object.symbol}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white">{object.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {object.summary}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-4 border-t border-white/6 pt-4 text-[11px] text-zinc-500">
        <span>{object.projectionCount} проекций</span>
        <span>{object.programCount} программ</span>
        <span className="ml-auto text-zinc-600 transition group-hover:text-emerald-300/80">
          открыть →
        </span>
      </div>
    </Link>
  );
}

type ProjectionCardProps = {
  projection: SituationWithMeta["projections"][0];
  showProgram?: boolean;
};

export function ProjectionCard({
  projection,
  showProgram = true,
}: ProjectionCardProps) {
  const program = getProgram(projection.programId);

  return (
    <article className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
      {showProgram && program && (
        <a
          href={program.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400/80 transition hover:text-emerald-300"
        >
          {program.title} ↗
        </a>
      )}
      <h3 className="text-base font-medium text-white">{projection.sideTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {projection.description}
      </p>
      {projection.modelNote && (
        <p className="mt-3 text-xs text-zinc-600">
          Модель: {projection.modelNote}
        </p>
      )}
      {projection.relatedCenterId && (
        <Link
          href={`/centers/${projection.relatedCenterId}`}
          className="mt-3 inline-block text-xs text-violet-400/70 transition hover:text-violet-300"
        >
          центр: {projection.relatedCenterId} →
        </Link>
      )}
    </article>
  );
}
