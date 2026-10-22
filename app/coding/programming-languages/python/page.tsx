import type { Metadata } from "next";
import Python from "@/components/coding/programming-languages/python/Python";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/python" },
  title: "Python — What It Is, What It's Used For & How to Learn It | Swipe Coding",
  description:
    "Learn Python: why it's the most popular first language, what it's used for (AI, data, automation, web), real code examples and how to start learning it today.",
};

export default function PythonPage() {
  return <Python />;
}
