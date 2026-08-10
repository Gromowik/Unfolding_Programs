import type { Metadata } from "next";
import { RulesPage } from "@/components/RulesPage";

export const metadata: Metadata = {
  title: "Правила и проекции · Unfolding Programs",
  description:
    "Неизменные правила программирования и личные проекции через модели D · E · A · C.",
};

export default function Rules() {
  return <RulesPage />;
}
