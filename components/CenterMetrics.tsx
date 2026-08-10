import {
  importanceLabel,
  type UnfoldingCenter,
} from "@/lib/centers";

type CenterMetricsProps = {
  center: UnfoldingCenter;
  maxFreq: number;
};

export function CenterMetrics({ center, maxFreq }: CenterMetricsProps) {
  const freqPercent = Math.round((center.frequency / maxFreq) * 100);
  const impPercent = Math.round((center.importance / 5) * 100);

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-white/6 px-5 py-3 sm:px-6">
      <div className="flex min-w-[120px] flex-1 flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-500">
          <span>Частота в тексте</span>
          <span className="font-mono text-zinc-400">{center.frequency}×</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-violet-500/70 transition-all"
            style={{ width: `${freqPercent}%` }}
          />
        </div>
      </div>

      <div className="flex min-w-[120px] flex-1 flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-500">
          <span>Важность</span>
          <span className="text-amber-400/80">
            {importanceLabel(center.importance)}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-amber-500/70 transition-all"
            style={{ width: `${impPercent}%` }}
          />
        </div>
      </div>

      {center.visualModel && (
        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
          {center.visualModel.href ? (
            <a
              href={center.visualModel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400/80 transition hover:text-sky-300"
            >
              ◈ {center.visualModel.label} ↗
            </a>
          ) : (
            <span className="text-zinc-600">◈ {center.visualModel.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
