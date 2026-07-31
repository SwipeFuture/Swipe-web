import type { Metadata } from "next";
import Cpp from "@/components/coding/programming-languages/cpp/Cpp";

export const metadata: Metadata = {
  title: "C++ | Swipe Coding",
  description: "Maximum control, maximum performance.",
};

export default function CppPage() {
  return <Cpp />;
}
