import type { Metadata } from "next";
import Quiz from "@/components/tools/quiz/Quiz";
import { PROGRAMMING_LANGUAGE_QUIZ } from "@/components/tools/quiz/quizzes";

export const metadata: Metadata = {
  alternates: { canonical: "/quiz/programming-language" },
  title: "Which Programming Language Should I Learn? Quiz | Swipe",
  description:
    "Take the 7-question quiz to find your first programming language — Python, JavaScript, HTML, TypeScript, C#, Java, Rust or C++ — with free lessons to start.",
};

export default function Page() {
  return <Quiz data={PROGRAMMING_LANGUAGE_QUIZ} />;
}
