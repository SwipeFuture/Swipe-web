import type { Metadata } from "next";
import CSharp from "@/components/coding/programming-languages/csharp/CSharp";

export const metadata: Metadata = {
  title: "C# | Swipe Coding",
  description: "Microsoft's powerhouse language.",
};

export default function CSharpPage() {
  return <CSharp />;
}
