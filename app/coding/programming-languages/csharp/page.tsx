import type { Metadata } from "next";
import CSharp from "@/components/coding/programming-languages/csharp/CSharp";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/csharp" },
  title: "C# — What It Is & How to Learn It | Swipe Coding",
  description:
    "Learn C#: Microsoft's language for games (Unity), Windows apps and web backends with .NET — what it's used for, code examples and how to start.",
};

export default function CSharpPage() {
  return <CSharp />;
}
