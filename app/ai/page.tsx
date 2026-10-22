import type { Metadata } from "next";
import { AreaTools } from "@/components/tools/ToolGrid";
import SwipeAI from "@/components/swipe-ai/SwipeAI";

export const metadata: Metadata = {
  alternates: { canonical: "/ai" },
  title: "Swipe AI — Learn Artificial Intelligence from the Ground Up | Swipe",
  description:
    "Understand AI without the hype: how machine learning, neural networks and ChatGPT-style models work, how to prompt well and how to use AI tools in everyday life.",
};

export default function SwipeAIPage() {
  return (
    <>
      <SwipeAI />
      <AreaTools area="ai" />
    </>
  );
}
