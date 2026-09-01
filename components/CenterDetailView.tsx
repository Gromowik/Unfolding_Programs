import Link from "next/link";
import {
  centerRecords,
  getAccentStyle,
  type CenterWithWeight,
} from "@/lib/centerRegistry";

type CenterDetailViewProps = {
  center: CenterWithWeight;
};

export function CenterDetailView({ center }: CenterDetailViewProps) {
  const accent = getAccentStyle(center.accent);
  const incomingPower = center.incoming.reduce((s, t) => s + t.power, 0);
  const outgoingPower = center.translates.reduce((s, t) => s + t.power, 0);

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 h-[480px] w-[600px] rounded-full bg-amber-600/10 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/centers"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-300"
        >
          ← все центры
        </Link>

        <header className="mt-8 mb-10">
          <div className="flex items-start gap-5">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border text-3xl ${accent}`}
            >
              {center.symbol}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Центр притяжения
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-white">
                {center.title}
              </h1>
              <p className="mt-2 text-sm text-zinc-400">{center.summary}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 text-center">
              <p className="font-mono text-2xl font-semibold text-amber-300">
                {center.totalWeight}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                общий вес
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-center">
              <p className="font-mono text-2xl font-semibold text-zinc-200">
                {center.ownPower}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                собств. мощность
              </p>
            </div>
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.04] p-4 text-center">
              <p className="font-mono text-2xl font-semibold text-violet-300">
                {incomingPower}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                из трансляций
              </p>
            </div>
          </div>
        </header>

        <section className="mb-8 space-y-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/80">
              ◎ Сохраняется
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-200">
              {center.invariant}
            </p>
          </div>
          <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.03] p-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/80">
              ↻ Проекция
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-300">
              {center.projection}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Транслирует →
          </h2>
          {center.translates.length === 0 ? (
            <p className="text-sm text-zinc-600">Пока без исходящих связей.</p>
          ) : (
            <div className="space-y-3">
              {center.translates.map((link) => {
                const target = centerRecords.find((c) => c.id === link.toCenterId);
                return (
                  <Link
                    key={link.toCenterId}
                    href={`/centers/${link.toCenterId}`}
                    className="block rounded-xl border border-white/8 bg-white/[0.02] p-4 transition hover:border-violet-500/30"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-white">
                        {target?.title ?? link.toCenterId}
                      </span>
                      <span className="font-mono text-sm text-amber-300">
                        +{link.power}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {link.comment}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
          <p className="mt-3 text-xs text-zinc-600">
            Исходящая сумма: {outgoingPower}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            ← Транслируется в
          </h2>
          {center.incoming.length === 0 ? (
            <p className="text-sm text-zinc-600">
              Другие центры пока не транслируют этот.
            </p>
          ) : (
            <div className="space-y-3">
              {center.incoming.map((link) => (
                <Link
                  key={`${link.fromCenterId}-${link.toCenterId}`}
                  href={`/centers/${link.fromCenterId}`}
                  className="block rounded-xl border border-white/8 bg-white/[0.02] p-4 transition hover:border-violet-500/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-white">
                      из «{link.fromTitle}»
                    </span>
                    <span className="font-mono text-sm text-violet-300">
                      +{link.power}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {link.comment}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {center.sourceCloud && (
          <footer className="rounded-2xl border border-dashed border-white/10 px-6 py-6 text-center">
            <Link
              href={`/clouds/${center.sourceCloud}`}
              className="text-sm text-violet-400 transition hover:text-violet-300"
            >
              Исходное облако: {center.sourceCloud} →
            </Link>
            {center.visualModel?.href && (
              <>
                <span className="mx-2 text-zinc-700">·</span>
                <a
                  href={center.visualModel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sky-400/80 transition hover:text-sky-300"
                >
                  {center.visualModel.label} ↗
                </a>
              </>
            )}
          </footer>
        )}
      </main>
    </div>
  );
}
