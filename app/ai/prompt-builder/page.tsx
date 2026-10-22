import type { Metadata } from "next";
import PromptBuilder from "@/components/tools/ai/PromptBuilder";

export const metadata: Metadata = {
  alternates: { canonical: "/ai/prompt-builder" },
  title: "AI Prompt Builder — Write Better ChatGPT & Claude Prompts | Swipe AI",
  description:
    "Free AI prompt generator: combine role, task, context, format and tone into a clear prompt for ChatGPT, Claude or Gemini — copy and paste.",
};

export default function Page() {
  return <PromptBuilder />;
}
