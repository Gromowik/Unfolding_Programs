import Link from "next/link";

type CloudCardProps = {
  title: string;
  subtitle: string;
  badge: string;
  badgeTone?: "origin" | "developing" | "ready";
  meta?: string;
  href?: string;
  onOpen?: () => void;
  disabled?: boolean;
};

const badgeStyles = {
  origin: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  developing: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  ready: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

const cardClassName = (badgeTone: CloudCardProps["badgeTone"]) =>
  `group relative block w-full rounded-2xl border p-5 text-left transition disabled:cursor-default disabled:opacity-60 ${
    badgeTone === "origin"
      ? "border-amber-500/25 bg-amber-500/[0.04] hover:border-amber-500/40 hover:bg-amber-500/[0.07]"
      : "border-white/8 bg-white/[0.03] hover:border-violet-500/30 hover:bg-white/[0.05]"
  }`;

function CardInner({
  title,
  subtitle,
  badge,
  badgeTone = "developing",
  meta,
  href,
}: Omit<CloudCardProps, "onOpen" | "disabled">) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[badgeTone]}`}
        >
          {badge}
        </span>
        {(href || meta) && (
          <span className="text-xs text-zinc-500 transition group-hover:text-violet-300">
            {meta ?? "читать →"}
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 text-base font-medium text-white">{title}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
        {subtitle}
      </p>
    </>
  );
}

export function CloudCard({
  title,
  subtitle,
  badge,
  badgeTone = "developing",
  meta,
  href,
  onOpen,
  disabled,
}: CloudCardProps) {
  if (href && !disabled) {
    return (
      <Link href={href} className={cardClassName(badgeTone)}>
        <CardInner
          title={title}
          subtitle={subtitle}
          badge={badge}
          badgeTone={badgeTone}
          meta={meta}
          href={href}
        />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={disabled || !onOpen}
      className={cardClassName(badgeTone)}
    >
      <CardInner
        title={title}
        subtitle={subtitle}
        badge={badge}
        badgeTone={badgeTone}
        meta={meta}
      />
    </button>
  );
}
