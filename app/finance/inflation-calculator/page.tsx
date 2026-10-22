import type { Metadata } from "next";
import InflationCalculator from "@/components/tools/finance/InflationCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/inflation-calculator" },
  title: "Inflation Calculator — What Will Your Money Be Worth? | Swipe Finance",
  description:
    "Free inflation calculator: see how inflation erodes purchasing power and what today's prices will cost in 10, 20 or 30 years.",
};

export default function Page() {
  return <InflationCalculator />;
}
