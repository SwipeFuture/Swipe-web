import type { Metadata } from "next";
import Python from "@/components/coding/programming-languages/python/Python";

export const metadata: Metadata = {
  title: "Python | Swipe Coding",
  description: "Simple to read, powerful to use.",
};

export default function PythonPage() {
  return <Python />;
}
