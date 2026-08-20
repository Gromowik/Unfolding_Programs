"use client";

import Link from "next/link";
import type { DevelopmentDocument } from "@/lib/content";
import { spiralMethod } from "@/lib/centers";
import { CloudLibrary } from "./CloudLibrary";

type HomePageProps = {
  documents: DevelopmentDocument[];
};

const flowSteps = spiralMethod.steps.map((step) => ({
  label: String(step.n),
  title: step.label,
  desc: step.desc,
}));

export function HomePage({ documents }: HomePageProps) {
  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-sky-600/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto max-w-4xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <header className="mb-16 text-center sm:mb-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-violet-400/90">
            Semantic unfolding
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Unfolding Programs
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Программы не пишутся — они{" "}
            <span className="text-zinc-200">разворачиваются</span> из общения с
            ИИ. Каркас беседы становится осмыслением, а итерации вокруг важного
            — моделью.
          </p>
        </header>

        <section className="mb-16 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            О проекте
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-300">
            <p>
              Это личная инкубаторная страница: здесь фиксируются потоки общения с
              ИИ, постепенно формируются облака пояснений и модели. Пока они
              созревают здесь — потом, когда станут самостоятельными, получат
              свои страницы.
            </p>
            <p>
              Центр системы —{" "}
              <strong className="font-medium text-white">
                центры притяжения
              </strong>
              : то, к чему возвращаешься чаще всего. Частота возвращений —
              метрика важности. Вокруг этих узлов идут итерации, уточнения,
              колебания — и так растёт структура.
            </p>
          </div>

          <blockquote className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/5 px-5 py-4">
            <p className="text-sm font-medium uppercase tracking-wider text-violet-300/80">
              Принцип колебаний
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">
              ИИ не завершает мысль, а создаёт уточняющие колебания, которые
              формируют центры притяжения и растят модель.
            </p>
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {spiralMethod.title}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {flowSteps.map((step, i) => (
              <div
                key={step.label}
                className="relative rounded-xl border border-white/6 bg-white/[0.02] p-4"
              >
                {i < flowSteps.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-white/10 lg:block" />
                )}
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400/70">
                  {step.label}
                </p>
                <h3 className="mt-2 text-sm font-medium text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Link
            href="/rules"
            className="group block rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-transparent p-6 transition hover:border-amber-500/35 sm:p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/80">
              Центры понимания
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Правила и проекции
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
              Пример развёртки: семь центров с важностью, частотой в тексте и
              проекциями — шаблон для всех облаков.
            </p>
            <span className="mt-4 inline-block text-sm text-amber-300/80 transition group-hover:text-amber-200">
              открыть →
            </span>
          </Link>
        </section>

        <CloudLibrary documents={documents} />

        <section>
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Unfolding Models
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Модели, которые созревают здесь, пока не готовы стать отдельной
              программой
            </p>
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] to-transparent p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10">
                  <span className="text-lg">◎</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Метод центров притяжения
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Зародыш · из облаков is_in
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Центры → итерации → метрики важности → модель. Пока в стадии
                наблюдения и практики — будет развиваться вместе с новыми
                облаками.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-white/10 px-6 py-8 text-center">
              <p className="text-sm text-zinc-500">
                Новые модели появятся здесь, когда из потоков и облаков
                сложится достаточная структура
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-20 border-t border-white/8 pt-10 text-center sm:text-left">
          <p className="text-sm text-zinc-300">
            Автор:{" "}
            <span className="font-medium text-white">Serge Gromowik</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Кто желает участвовать в проекте, может обращаться на почту{" "}
            <a
              href="mailto:serge.gromowik@gmail.com"
              className="text-violet-400/80 transition hover:text-violet-300"
            >
              serge.gromowik@gmail.com
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="https://math-engine-olive.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              Math Engine ↗
            </a>
            <a
              href="https://plus-minus-neuron.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              Plus / Minus Neiron ↗
            </a>
            <a
              href="https://b-neuron.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              BNeuron ↗
            </a>
            <a
              href="https://next-project-vert-one.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              Phenomenal Quiz ↗
            </a>
            <a
              href="https://models-pi-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              Models ↗
            </a>
            <a
              href="https://technology-and-repair.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              Технологии и ремонт ↗
            </a>
            <a
              href="https://calendar-woad-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 transition hover:text-violet-300"
            >
              Kalender Hub ↗
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
