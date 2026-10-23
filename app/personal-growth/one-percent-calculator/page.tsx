import type { Metadata } from "next";
import OnePercentCalculator from "@/components/tools/growth/OnePercentCalculator";

export const metadata: Metadata = {
  alternates: { canonical: "/personal-growth/one-percent-calculator" },
  title: "1% Better Every Day Calculator — Tiny Habits | Swipe",
  description:
    "See what getting 1% better (or worse) every day adds up to: 1.01^365 = 37.8×. An interactive calculator for the compound effect of small habits.",
};

export default function Page() {
  return <OnePercentCalculator />;
}
