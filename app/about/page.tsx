import type { Metadata } from "next";
import About from "@/components/about/About";

export const metadata: Metadata = {
  title: "About | Swipe",
  description: "Why Swipe exists and what we're building.",
};

export default function AboutPage() {
  return <About />;
}
