import type { Metadata } from "next";
import Rust from "@/components/coding/programming-languages/rust/Rust";

export const metadata: Metadata = {
  title: "Rust | Swipe Coding",
  description: "Speed without sacrificing safety.",
};

export default function RustPage() {
  return <Rust />;
}
