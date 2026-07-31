import type { Metadata } from "next";
import Java from "@/components/coding/programming-languages/java/Java";

export const metadata: Metadata = {
  title: "Java | Swipe Coding",
  description: "Write once, run anywhere.",
};

export default function JavaPage() {
  return <Java />;
}
