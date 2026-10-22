import type { Metadata } from "next";
import SavingsGoalCalculator from "@/components/tools/finance/SavingsGoalCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/savings-goal-calculator" },
  title: "Savings Goal Calculator — How Long Until You Reach It? | Swipe Finance",
  description:
    "Free savings goal calculator: find out how long it takes to reach your goal, or how much you need to save each month — with interest and a yearly chart.",
};

export default function Page() {
  return <SavingsGoalCalculator />;
}
