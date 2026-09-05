import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CloudReader } from "@/components/CloudReader";
import { getDocumentBySlug } from "@/lib/content";
import { DIRECTIONS_SLUG, directionsMeta } from "@/lib/readingContent";

export const metadata: Metadata = {
  title: `${directionsMeta.title} · Unfolding Programs`,
  description: directionsMeta.description,
};

export default function ReadPage() {
  const doc = getDocumentBySlug(DIRECTIONS_SLUG);
  if (!doc) notFound();

  return (
    <>
      <div className="relative mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10">
        <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/[0.06] to-transparent px-6 py-5 sm:px-8">
          <p className="text-sm leading-relaxed text-zinc-300">
            {directionsMeta.description} Текст уточняется по мере работы — как
            карта, по которой можно сверяться при развитии программы.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link
              href="/centers"
              className="text-violet-400 transition hover:text-violet-300"
            >
              Карта центров →
            </Link>
            <Link
              href="/objects"
              className="text-emerald-400 transition hover:text-emerald-300"
            >
              Объекты и проекции →
            </Link>
            <Link
              href="/rules"
              className="text-amber-400 transition hover:text-amber-300"
            >
              Правила и проекции →
            </Link>
          </div>
        </div>
      </div>

      <CloudReader
        document={doc.meta}
        parsed={doc.parsed}
        backHref="/"
        backLabel="← на главную"
        badge={directionsMeta.badge}
        displayTitle={directionsMeta.title}
      />
    </>
  );
}
