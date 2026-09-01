import type { Metadata } from "next";
import { CentersHub } from "@/components/CentersHub";
import { getAllCenters } from "@/lib/centerRegistry";

export const metadata: Metadata = {
  title: "Карта центров · Unfolding Programs",
  description:
    "Центры притяжения с мощностью, весом и связями трансляции между собой.",
};

export default function CentersPage() {
  const centers = getAllCenters("weight");
  return <CentersHub centers={centers} />;
}
