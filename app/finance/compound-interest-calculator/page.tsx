import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/finance/compound-interest-calculator/CompoundInterestCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/compound-interest-calculator" },
  title: "Compound Interest Calculator — Free & Interactive | Swipe Finance",
  description:
    "Free compound interest calculator: enter your starting amount, monthly savings, interest rate and years to see how your money grows — with a live chart and any compounding frequency.",
};

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculator />;
}
