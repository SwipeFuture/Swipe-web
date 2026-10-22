import type { Metadata } from "next";
import Quiz from "@/components/tools/quiz/Quiz";
import { HABIT_TYPE_QUIZ } from "@/components/tools/quiz/quizzes";

export const metadata: Metadata = {
  alternates: { canonical: "/quiz/habit-type" },
  title: "Habit Type Quiz — Why Your Habits Don't Stick | Swipe",
  description:
    "Sprinter, planner, team player, steady one or starter? Take the free habit quiz and get the one strategy that makes habits stick for your type.",
};

export default function Page() {
  return <Quiz data={HABIT_TYPE_QUIZ} />;
}
