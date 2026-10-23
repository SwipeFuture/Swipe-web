import type { Metadata } from "next";
import Java from "@/components/coding/programming-languages/java/Java";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/java" },
  title: "Java — What It Is & How to Learn It | Swipe Coding",
  description:
    "Learn Java: the language behind Android apps, banking systems and enterprise software — what it's used for, code examples and how to start.",
};

export default function JavaPage() {
  return <Java />;
}
