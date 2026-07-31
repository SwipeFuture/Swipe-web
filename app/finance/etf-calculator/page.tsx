import type { Metadata } from "next";
import EtfCalculator from "@/components/finance/etf-calculator/EtfCalculator";

export const metadata: Metadata = {
  title: "ETF Calculator | Swipe Finance",
  description: "Estimate how your ETF portfolio could grow over time — live, interactive compound growth projections.",
};

export default function EtfCalculatorPage() {
  return <EtfCalculator />;
}
