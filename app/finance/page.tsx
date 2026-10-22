import type { Metadata } from "next";
import { AreaTools } from "@/components/tools/ToolGrid";
import Finance from "@/components/finance/Finance";

export const metadata: Metadata = {
  alternates: { canonical: "/finance" },
  title: "Swipe Finance — Learn Personal Finance & Investing | Swipe",
  description:
    "Master money in twelve chapters: budgeting, saving, debt, credit, ETFs, compound interest and long-term investing — plain-English lessons and free calculators.",
};

export default function FinancePage() {
  return (
    <>
      <Finance />
      <AreaTools area="finance" />
    </>
  );
}
