"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DevelopmentDocument } from "@/lib/content";
import { CloudCard } from "./CloudCard";

type CloudLibraryProps = {
  documents: DevelopmentDocument[];
};

export function CloudLibrary({ documents }: CloudLibraryProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;

    return documents.filter(
      (doc) =>
        doc.slug.toLowerCase().includes(q) ||
        doc.title.toLowerCase().includes(q) ||
        doc.preview.toLowerCase().includes(q),
    );
  }, [documents, query]);

  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Unfolding Clouds
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          {documents.length} бесед · открыть и читать в удобном режиме
        </p>
      </div>

      <div className="mb-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по названию или содержанию…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition focus:border-violet-500/40 focus:bg-white/[0.05]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center">
          <p className="text-sm text-zinc-500">Ничего не найдено</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((doc) => (
            <CloudCard
              key={doc.slug}
              title={doc.title}
              subtitle={doc.preview}
              meta={`~${doc.readingMinutes} мин · ${doc.sizeKb} KB`}
              badge={doc.status === "origin" ? "старт" : "cloud"}
              badgeTone={doc.status === "origin" ? "origin" : "developing"}
              href={`/clouds/${doc.slug}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
