import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectDetailView } from "@/components/ObjectDetailView";
import { getAllObjectIds, getObjectById } from "@/lib/objectRegistry";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllObjectIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const object = getObjectById(id);
  if (!object) return { title: "Объект не найден" };
  return {
    title: `${object.title} · Объекты и проекции`,
    description: object.summary,
  };
}

export default async function ObjectPage({ params }: PageProps) {
  const { id } = await params;
  const object = getObjectById(id);
  if (!object) notFound();

  return <ObjectDetailView object={object} />;
}
