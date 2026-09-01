"use client";

import Link from "next/link";
import { ObjectCard } from "@/components/ObjectCard";
import { objectsMethod, type SituationWithMeta } from "@/lib/objectRegistry";

type ObjectsHubProps = {
  objects: SituationWithMeta[];
};

export function ObjectsHub({ objects }: ObjectsHubProps) {
  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[480px] w-[600px] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-300"
        >
          ← Unfolding Programs
        </Link>

        <header className="mt-8 mb-10 border-b border-white/8 pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-emerald-400/80">
            Модели и программы
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {objectsMethod.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
            Объект или ситуация может выглядеть по-разному в разных программах.
            Каждая проекция — новая сторона карточки, дополняющая понимание.
          </p>
        </header>

        <section className="mb-10 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6">
          <p className="text-sm font-medium text-emerald-200/90">
            {objectsMethod.principle}
          </p>
          <ol className="mt-4 space-y-2">
            {objectsMethod.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-zinc-400">
                <span className="font-mono text-xs text-emerald-500/70">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">{objects.length} объектов</p>
          <Link
            href="/centers"
            className="text-xs text-zinc-500 transition hover:text-violet-300"
          >
            ← карта центров
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {objects.map((obj) => (
            <ObjectCard key={obj.id} object={obj} />
          ))}
        </div>
      </main>
    </div>
  );
}
