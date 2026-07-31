import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/finance/compound-interest-calculator/CompoundInterestCalculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Swipe Finance",
  description: "See the power of compound interest — live, interactive growth projections across any compounding frequency.",
};

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculator />;
}
