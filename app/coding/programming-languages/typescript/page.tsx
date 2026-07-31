import type { Metadata } from "next";
import TypeScript from "@/components/coding/programming-languages/typescript/TypeScript";

export const metadata: Metadata = {
  title: "TypeScript | Swipe Coding",
  description: "JavaScript, with guardrails.",
};

export default function TypeScriptPage() {
  return <TypeScript />;
}
