import type { Metadata } from "next";
import TypingTest from "@/components/tools/coding/TypingTest";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/typing-speed-test" },
  title: "Code Typing Speed Test — Python, JS & HTML | Swipe Coding",
  description:
    "Test how fast you type real code: Python, JavaScript and HTML snippets with brackets and symbols. Get your WPM and accuracy instantly — free.",
};

export default function Page() {
  return <TypingTest />;
}
