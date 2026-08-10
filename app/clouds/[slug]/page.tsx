import { notFound } from "next/navigation";
import { CloudReader } from "@/components/CloudReader";
import { getAllDocumentSlugs, getDocumentBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllDocumentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return { title: "Облако не найдено" };

  return {
    title: `${doc.meta.title} · Unfolding Programs`,
    description: doc.meta.preview,
  };
}

export default async function CloudPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) notFound();

  return <CloudReader document={doc.meta} parsed={doc.parsed} />;
}
