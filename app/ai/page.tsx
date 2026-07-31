import type { Metadata } from "next";
import SwipeAI from "@/components/swipe-ai/SwipeAI";

export const metadata: Metadata = {
  title: "Swipe AI | Learn Artificial Intelligence",
  description: "Learn AI from the ground up — twelve chapters from the fundamentals to practical, everyday applications.",
};

export default function SwipeAIPage() {
  return <SwipeAI />;
}
