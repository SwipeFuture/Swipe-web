import type { Metadata } from "next";
import ProgrammingLanguages from "@/components/coding/programming-languages/ProgrammingLanguages";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages" },
  title: "Which Programming Language to Learn First? | Swipe Coding",
  description:
    "Python, JavaScript, TypeScript, Java, C#, C++, Go and Rust compared: what each language is used for, how hard it is, and how to choose your first one.",
};

export default function ProgrammingLanguagesPage() {
  return <ProgrammingLanguages />;
}
