const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

/** URL-safe slug for routes (ASCII only — works reliably on Vercel). */
export function toUrlSlug(filename: string): string {
  const base = filename.replace(/\.md$/i, "");

  if (/^[a-zA-Z0-9_-]+$/.test(base)) {
    return base;
  }

  const transliterated = [...base.toLowerCase()]
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return transliterated || "cloud";
}

export function ensureUniqueSlugs(
  entries: { filename: string; slug: string }[],
): Map<string, string> {
  const map = new Map<string, string>();
  const used = new Set<string>();

  for (const { filename, slug } of entries) {
    let unique = slug;
    let n = 2;
    while (used.has(unique)) {
      unique = `${slug}_${n}`;
      n += 1;
    }
    used.add(unique);
    map.set(filename, unique);
  }

  return map;
}
