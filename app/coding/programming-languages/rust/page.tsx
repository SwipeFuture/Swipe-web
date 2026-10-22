import type { Metadata } from "next";
import Rust from "@/components/coding/programming-languages/rust/Rust";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/rust" },
  title: "Rust — What It Is, What It's Used For & How to Learn It | Swipe Coding",
  description:
    "Learn Rust: the memory-safe systems language developers love — speed without crashes, what it's used for, code examples and how to start.",
};

export default function RustPage() {
  return <Rust />;
}
