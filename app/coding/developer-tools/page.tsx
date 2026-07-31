import type { Metadata } from "next";
import DeveloperTools from "@/components/coding/developer-tools/DeveloperTools";

export const metadata: Metadata = {
  title: "Developer Tools | Swipe Coding",
  description: "Learn the tools professional developers use every day — code editors, the terminal, Git, GitHub, package managers and deployment workflows.",
};

export default function DeveloperToolsPage() {
  return <DeveloperTools />;
}
