import type { Metadata } from "next";
import DebtPayoffCalculator from "@/components/tools/finance/DebtPayoffCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/debt-payoff-calculator" },
  title: "Debt Payoff Calculator — When Will You Be Debt-Free? | Swipe",
  description:
    "Free debt payoff calculator for credit cards and loans: see your payoff date, total interest, and how much time and money an extra payment saves.",
};

export default function Page() {
  return <DebtPayoffCalculator />;
}
