import type { Metadata } from "next";
import SleepCalculator from "@/components/tools/growth/SleepCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/personal-growth/sleep-calculator" },
  title: "Sleep Calculator — Best Time to Go to Bed & Wake Up | Swipe",
  description:
    "Free sleep cycle calculator: find the best bedtime for your wake-up time, or when to set your alarm, based on 90-minute sleep cycles.",
};

export default function Page() {
  return <SleepCalculator />;
}
