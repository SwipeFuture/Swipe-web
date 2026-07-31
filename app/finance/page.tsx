import type { Metadata } from "next";
import Finance from "@/components/finance/Finance";

export const metadata: Metadata = {
  title: "Swipe Finance | Learn Personal Finance & Investing",
  description: "Master finance, build wealth and understand money — twelve chapters from budgeting basics to long-term investing.",
};

export default function FinancePage() {
  return <Finance />;
}
