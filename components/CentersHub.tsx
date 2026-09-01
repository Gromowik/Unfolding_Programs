"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CenterWithWeight } from "@/lib/centerRegistry";
import { GravityCenterCard } from "./GravityCenterCard";

type CentersHubProps = {
  centers: CenterWithWeight[];
};

type SortMode = "weight" | "created";

export function CentersHub({ centers }: CentersHubProps) {
  const [sort, setSort] = useState<SortMode>("weight");

  const sorted = useMemo(() => {
    const copy = [...centers];
    if (sort === "created") {
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return copy.sort((a, b) => b.totalWeight - a.totalWeight);
  }, [centers, sort]);

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-1/4 h-[480px] w-[600px] rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[500px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-violet-300"
        >
          ← Unfolding Programs
        </Link>

        <header className="mt-8 mb-10 border-b border-white/8 pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-amber-400/80">
            Главный профиль · центры
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Карта центров
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
            Каждый центр — карточка с собственной мощностью и связями
            трансляции. Вес = собственная мощность + сумма трансляций из
            других центров, которыми он пользуется.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-zinc-400">
            При чтении облака можно отмечать, что транслирует другой центр —
            с мощностью и комментарием. Связь появляется в обеих карточках.
            Здесь — первый набор из{" "}
            <Link href="/clouds/start_2" className="text-violet-400/80 hover:text-violet-300">
              start_2
            </Link>
            .
          </p>
        </section>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">{sorted.length} центров</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSort("weight")}
              className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                sort === "weight"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
                  : "border-white/10 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              по весу
            </button>
            <button
              type="button"
              onClick={() => setSort("created")}
              className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                sort === "created"
                  ? "border-violet-500/40 bg-violet-500/10 text-violet-200"
                  : "border-white/10 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              по времени
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((center) => (
            <GravityCenterCard key={center.id} center={center} />
          ))}
        </div>

        <footer className="mt-12 text-center">
          <Link
            href="/rules"
            className="text-sm text-zinc-500 transition hover:text-violet-300"
          >
            Правила и проекции (развёртка start_2) →
          </Link>
        </footer>
      </main>
    </div>
  );
}
