import Link from "next/link";
import { getAccentStyle, type CenterWithWeight } from "@/lib/centerRegistry";

type GravityCenterCardProps = {
  center: CenterWithWeight;
};

export function GravityCenterCard({ center }: GravityCenterCardProps) {
  const accent = getAccentStyle(center.accent);
  const outgoing = center.translates.length;
  const incoming = center.incoming.length;

  return (
    <Link
      href={`/centers/${center.id}`}
      className="group block rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition hover:border-violet-500/30 hover:bg-white/[0.04]"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-xl font-medium ${accent}`}
        >
          {center.symbol}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-white">{center.title}</h3>
            <div className="text-right shrink-0">
              <p className="font-mono text-lg font-semibold text-amber-300">
                {center.totalWeight}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                вес
              </p>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {center.summary}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-white/6 pt-4 text-[11px] text-zinc-500">
        <span>собств. {center.ownPower}</span>
        <span>→ {outgoing}</span>
        <span>← {incoming}</span>
        <span className="ml-auto text-zinc-600">{center.createdAt}</span>
      </div>

      <span className="mt-3 inline-block text-xs text-zinc-600 transition group-hover:text-violet-300">
        открыть →
      </span>
    </Link>
  );
}
