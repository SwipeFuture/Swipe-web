import type { Metadata } from "next";
import Go from "@/components/coding/programming-languages/go/Go";

export const metadata: Metadata = {
  title: "Go | Swipe Coding",
  description: "Simplicity built for scale.",
};

export default function GoPage() {
  return <Go />;
}
