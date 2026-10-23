import type { Metadata } from "next";
import EtfCalculator from "@/components/finance/etf-calculator/EtfCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/etf-calculator" },
  title: "ETF Savings Plan Calculator | Swipe Finance",
  description:
    "Free ETF calculator: see how a monthly ETF savings plan could grow over time, with your own return, costs and duration — live, interactive projections.",
};

export default function EtfCalculatorPage() {
  return <EtfCalculator />;
}
