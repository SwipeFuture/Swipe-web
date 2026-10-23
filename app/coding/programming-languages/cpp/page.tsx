import type { Metadata } from "next";
import Cpp from "@/components/coding/programming-languages/cpp/Cpp";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/cpp" },
  title: "C++ — What It Is & How to Learn It | Swipe Coding",
  description:
    "Learn C++: the high-performance language behind game engines, browsers and operating systems — what it's used for, code examples and how to start.",
};

export default function CppPage() {
  return <Cpp />;
}
