import Link from "next/link";
import { ProjectionCard } from "@/components/ObjectCard";
import { getProgram, type SituationWithMeta } from "@/lib/objectRegistry";

const accentStyles = {
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  violet: "border-violet-500/25 bg-violet-500/10 text-violet-300",
  sky: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  rose: "border-rose-500/25 bg-rose-500/10 text-rose-300",
};

type ObjectDetailViewProps = {
  object: SituationWithMeta;
};

export function ObjectDetailView({ object }: ObjectDetailViewProps) {
  const accent = accentStyles[object.accent];

  const byProgram = object.projections.reduce<
    Record<string, typeof object.projections>
  >((acc, proj) => {
    if (!acc[proj.programId]) acc[proj.programId] = [];
    acc[proj.programId].push(proj);
    return acc;
  }, {});

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/3 h-[480px] w-[600px] rounded-full bg-emerald-600/10 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/objects"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-300"
        >
          ← все объекты
        </Link>

        <header className="mt-8 mb-10">
          <div className="flex items-start gap-5">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border text-3xl ${accent}`}
            >
              {object.symbol}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Объект · ситуация
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-white">
                {object.title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {object.summary}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-500">
            <span>{object.projectionCount} проекций</span>
            <span>{object.programCount} программ</span>
            {object.relatedCenterIds?.map((id) => (
              <Link
                key={id}
                href={`/centers/${id}`}
                className="text-violet-400/70 transition hover:text-violet-300"
              >
                центр: {id}
              </Link>
            ))}
          </div>
        </header>

        <section className="mb-10 space-y-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Проекции в программах
          </h2>

          {Object.entries(byProgram).map(([programId, projections]) => {
            const program = getProgram(programId);
            return (
              <div key={programId}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-medium text-white">
                    {program?.title ?? programId}
                  </h3>
                  {program?.href && (
                    <a
                      href={program.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400/80 transition hover:text-emerald-300"
                    >
                      открыть программу ↗
                    </a>
                  )}
                </div>
                <div className="space-y-3">
                  {projections.map((proj) => (
                    <ProjectionCard
                      key={proj.id}
                      projection={proj}
                      showProgram={false}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mb-8 rounded-2xl border border-dashed border-white/10 px-6 py-6">
          <p className="text-sm leading-relaxed text-zinc-500">
            Если проекция стала интересной — её можно оформить как новую
            сторону карточки и связать с рабочей моделью в программе. Когда
            программа обрабатывает объект сама, трансляция из других центров
            переходит в собственное отражение.
          </p>
        </section>

        <footer className="flex flex-col gap-2 text-center sm:flex-row sm:justify-center sm:gap-4">
          {object.sourceCloud && (
            <Link
              href={`/clouds/${object.sourceCloud}`}
              className="text-sm text-violet-400 transition hover:text-violet-300"
            >
              Исходное облако: {object.sourceCloud} →
            </Link>
          )}
          <Link
            href="/centers"
            className="text-sm text-zinc-500 transition hover:text-violet-300"
          >
            Карта центров →
          </Link>
        </footer>
      </main>
    </div>
  );
}
