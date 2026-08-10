import { spiralMethod } from "@/lib/centers";

export function SpiralFlow() {
  return (
    <section className="mb-14 rounded-2xl border border-violet-500/15 bg-violet-500/[0.03] p-6 sm:p-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400/80">
        {spiralMethod.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {spiralMethod.description}
      </p>

      <div className="mt-8 flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-2">
        {spiralMethod.steps.map((step, i) => (
          <div key={step.n} className="relative flex flex-1 flex-col">
            {i < spiralMethod.steps.length - 1 && (
              <span
                className="absolute left-6 top-8 hidden h-px w-[calc(100%-1rem)] bg-gradient-to-r from-violet-500/40 to-transparent sm:block"
                aria-hidden
              />
            )}
            <div className="flex gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 font-mono text-sm text-violet-300">
                {step.n}
              </div>
              <div className="pb-6 sm:pb-0">
                <p className="text-sm font-medium text-white">{step.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
            </div>
            {i < spiralMethod.steps.length - 1 && (
              <div className="ml-6 h-6 w-px bg-violet-500/20 sm:hidden" />
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-zinc-600">
        Эта страница — первый пример: семь центров из{" "}
        <span className="text-zinc-500">start_2</span> с проставленной частотой
        и важностью. Так же можно развернуть любое облако.
      </p>
    </section>
  );
}
