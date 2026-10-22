import type { Metadata } from "next";
import EmergencyFundCalculator from "@/components/tools/finance/EmergencyFundCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/emergency-fund-calculator" },
  title: "Emergency Fund Calculator — How Much Should You Save? | Swipe Finance",
  description:
    "Free emergency fund calculator: find your target for 3, 6, 9 or 12 months of essential expenses and how long it takes to build your safety net.",
};

export default function Page() {
  return <EmergencyFundCalculator />;
}
