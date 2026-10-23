import type { Metadata } from "next";
import Quiz from "@/components/tools/quiz/Quiz";
import { MONEY_TYPE_QUIZ } from "@/components/tools/quiz/quizzes";

export const metadata: Metadata = {
  alternates: { canonical: "/quiz/money-type" },
  title: "Money Personality Quiz — What's Your Money Type? | Swipe",
  description:
    "Saver, spender, investor, planner or avoider? A free 7-question money personality quiz with personal next steps and free calculators.",
};

export default function Page() {
  return <Quiz data={MONEY_TYPE_QUIZ} />;
}
