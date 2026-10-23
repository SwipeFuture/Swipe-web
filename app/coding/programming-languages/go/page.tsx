import type { Metadata } from "next";
import Go from "@/components/coding/programming-languages/go/Go";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/go" },
  title: "Go (Golang) — What It Is & How to Learn It | Swipe Coding",
  description:
    "Learn Go: Google's simple, fast language for cloud services, APIs and tools like Docker and Kubernetes — what it's used for, code examples and how to start.",
};

export default function GoPage() {
  return <Go />;
}
