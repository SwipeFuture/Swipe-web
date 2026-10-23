import type { Metadata } from "next";
import { AreaTools } from "@/components/tools/ToolGrid";
import SwipeAI from "@/components/swipe-ai/SwipeAI";

export const metadata: Metadata = {
  alternates: { canonical: "/ai" },
  title: "Swipe AI — Learn Artificial Intelligence from Zero",
  description:
    "Understand AI without the hype: how machine learning and ChatGPT-style models work, how to prompt well and use AI tools every day.",
};

export default function SwipeAIPage() {
  return (
    <>
      <SwipeAI />
      <AreaTools area="ai" />
    </>
  );
}
