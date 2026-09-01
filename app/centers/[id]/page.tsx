import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CenterDetailView } from "@/components/CenterDetailView";
import { getAllCenterIds, getCenterById } from "@/lib/centerRegistry";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllCenterIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const center = getCenterById(id);
  if (!center) return { title: "Центр не найден" };
  return {
    title: `${center.title} · Карта центров`,
    description: center.summary,
  };
}

export default async function CenterPage({ params }: PageProps) {
  const { id } = await params;
  const center = getCenterById(id);
  if (!center) notFound();

  return <CenterDetailView center={center} />;
}
