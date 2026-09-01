import type { Metadata } from "next";
import { ObjectsHub } from "@/components/ObjectsHub";
import { getAllObjects } from "@/lib/objectRegistry";

export const metadata: Metadata = {
  title: "Объекты и проекции · Unfolding Programs",
  description:
    "Объекты и ситуации, отражаемые в разных программах — стороны проекции, дополняющие понимание.",
};

export default function ObjectsPage() {
  return <ObjectsHub objects={getAllObjects()} />;
}
