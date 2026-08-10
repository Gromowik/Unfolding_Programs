import { HomePage } from "@/components/HomePage";
import { getDevelopmentDocuments } from "@/lib/content";

export default function Home() {
  const documents = getDevelopmentDocuments();

  return <HomePage documents={documents} />;
}
