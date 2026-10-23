import type { Metadata } from "next";
import FireCalculator from "@/components/tools/finance/FireCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/finance/fire-calculator" },
  title: "FIRE Calculator — When Can You Retire Early? | Swipe",
  description:
    "Free FIRE calculator: find your FIRE number with the 4% rule and how many years of saving and investing it takes to reach financial independence.",
};

export default function Page() {
  return <FireCalculator />;
}
