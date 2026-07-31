import type { Metadata } from "next";
import Introduction from "@/components/coding/introduction/Introduction";

export const metadata: Metadata = {
  title: "Introduction to Programming | Swipe Coding",
  description: "Learn what programming is, how computers and the internet work, how to think like a developer and how to choose your first language.",
};

export default function IntroductionPage() {
  return <Introduction />;
}
