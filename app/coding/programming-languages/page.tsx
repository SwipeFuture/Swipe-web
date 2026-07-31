import type { Metadata } from "next";
import ProgrammingLanguages from "@/components/coding/programming-languages/ProgrammingLanguages";

export const metadata: Metadata = {
  title: "Programming Languages | Swipe Coding",
  description: "Explore the world's most popular programming languages — what they're used for, who they're best suited for and how to choose the right one.",
};

export default function ProgrammingLanguagesPage() {
  return <ProgrammingLanguages />;
}
