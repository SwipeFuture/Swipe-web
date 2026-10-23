import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/finance/compound-interest-calculator/CompoundInterestCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/compound-interest-calculator" },
  title: "Compound Interest Calculator — Free | Swipe Finance",
  description:
    "Free compound interest calculator: enter your start amount, monthly savings, rate and years and watch your money grow on a live chart.",
};

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculator />;
}
