import type { Metadata } from "next";
import TypeScript from "@/components/coding/programming-languages/typescript/TypeScript";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/typescript" },
  title: "TypeScript — What It Is & Why Developers Use It | Swipe Coding",
  description:
    "TypeScript explained: JavaScript with types, why big teams use it, how it catches bugs before they ship, code examples and when to learn it.",
};

export default function TypeScriptPage() {
  return <TypeScript />;
}
