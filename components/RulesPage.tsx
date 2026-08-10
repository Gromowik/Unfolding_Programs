"use client";

import Link from "next/link";
import { CenterMetrics } from "@/components/CenterMetrics";
import { SpiralFlow } from "@/components/SpiralFlow";
import { maxFrequency } from "@/lib/centers";
import {
  deacVisualModel,
  programmingCenters,
  projectionNote,
  rulesIntro,
} from "@/lib/rulesContent";

export function RulesPage() {
  const maxFreq = maxFrequency(programmingCenters);

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 h-[480px] w-[600px] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-300"
        >
          ← Unfolding Programs
        </Link>

        <header className="mt-8 mb-12 border-b border-white/8 pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-amber-400/80">
            Центры понимания · пример
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Правила и проекции
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
            Шаблон для всех центров: инвариант, проекция, важность, частота в
            тексте — и отдельная визуальная модель, когда нужно показать.
          </p>
        </header>

        <SpiralFlow />

        <section className="mb-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/80">
              Слой · сохраняется
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200">
              {rulesIntro.layers}
            </p>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300/80">
              Слой · может меняться
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-200">
              {projectionNote}
            </p>
            <a
              href={deacVisualModel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-sky-400/80 transition hover:text-sky-300"
            >
              ◈ {deacVisualModel.label} ↗
            </a>
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Размышление
          </h2>
          <p className="mt-4 text-sm italic leading-relaxed text-zinc-400">
            {rulesIntro.orientation}
          </p>
          <div className="mt-6 space-y-4">
            {rulesIntro.reflection.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-xs text-zinc-600">
            Из{" "}
            <Link
              href={`/clouds/${rulesIntro.source.slug}`}
              className="text-violet-400/70 transition hover:text-violet-300"
            >
              {rulesIntro.source.label}
            </Link>
            · частота посчитана по вхождениям в тексте
          </p>
        </section>

        <section className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Семь центров
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Отсортированы по частоте в облаке start_2
            </p>
          </div>
          <div className="hidden gap-4 text-[10px] uppercase tracking-wider sm:flex">
            <span className="text-amber-400/70">◎ сохраняется</span>
            <span className="text-sky-400/70">↻ проекция</span>
          </div>
        </section>

        <div className="space-y-6">
          {[...programmingCenters]
            .sort((a, b) => b.frequency - a.frequency)
            .map((center, i) => (
              <article
                key={center.id}
                className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]"
              >
                <div className="flex items-center justify-between border-b border-white/6 px-5 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-zinc-300">
                      {center.title}
                    </span>
                  </div>
                </div>

                <CenterMetrics center={center} maxFreq={maxFreq} />

                <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-white/6">
                  <div className="border-b border-white/6 p-5 sm:p-6 lg:border-b-0">
                    <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/80">
                      <span className="text-amber-400">◎</span>
                      Сохраняется
                    </p>
                    <p className="text-[15px] leading-relaxed text-zinc-100">
                      {center.invariant}
                    </p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/80">
                      <span className="text-sky-400">↻</span>
                      Моя проекция
                    </p>
                    <p className="text-[15px] leading-relaxed text-zinc-400">
                      {center.projection}
                    </p>
                  </div>
                </div>
              </article>
            ))}
        </div>

        <footer className="mt-12 rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center">
          <p className="text-sm text-zinc-500">
            Каждое облако можно развернуть так же: пройти спиралью, найти
            центры, проставить метрики — и где нужно, добавить визуальную
            модель перед программой.
          </p>
          <Link
            href={`/clouds/${rulesIntro.source.slug}`}
            className="mt-4 inline-block text-sm text-violet-400 transition hover:text-violet-300"
          >
            Читать полное облако start_2 →
          </Link>
        </footer>
      </main>
    </div>
  );
}
