import type { Metadata } from "next";
import Coding from "@/components/coding/Coding";

export const metadata: Metadata = {
  title: "Swipe Coding | Learn Programming",
  description: "Learn how software is built, explore modern programming and discover the technologies behind today's digital world.",
};

export default function CodingPage() {
  return <Coding />;
}
