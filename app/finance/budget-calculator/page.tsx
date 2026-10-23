import type { Metadata } from "next";
import BudgetCalculator from "@/components/tools/finance/BudgetCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/budget-calculator" },
  title: "Budget Calculator (50/30/20 Rule) | Swipe Finance",
  description:
    "Free 50/30/20 budget calculator: split your take-home pay into needs, wants and savings, try other splits and see what your savings could grow into.",
};

export default function Page() {
  return <BudgetCalculator />;
}
