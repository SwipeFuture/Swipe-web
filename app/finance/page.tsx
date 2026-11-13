import type { Metadata } from "next";
import AdviceNote from "@/components/learn/AdviceNote";
import { AreaTools } from "@/components/tools/ToolGrid";
import Finance from "@/components/finance/Finance";

export const metadata: Metadata = {
  alternates: { canonical: "/finance" },
  title: "Learn Personal Finance & Investing | SwipeFuture",
  description:
    "Twelve chapters on money: budgeting, saving, debt, credit, ETFs, compound interest and long-term investing — plain-English lessons and free calculators.",
};

export default function FinancePage() {
  return (
    <>
      <Finance />
      <AreaTools area="finance" />
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <AdviceNote area="finance" />
      </div>
    </>
  );
}
