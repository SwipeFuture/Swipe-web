"use client";

import { useState } from "react";
import CurrencySelect from "@/components/finance/shared/CurrencySelect";
import { DEFAULT_CURRENCY, type Currency } from "@/components/finance/shared/currency";
import { formatCurrency, formatCompactCurrency } from "@/components/finance/shared/formatters";
import type { RelatedLink } from "../kit";

export { formatCurrency, formatCompactCurrency };
export type { Currency };

export function useCurrency() {
  return useState<Currency>(DEFAULT_CURRENCY);
}

export function CurrencyRow({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="sm:w-64">
      <CurrencySelect value={value} onChange={onChange} />
    </div>
  );
}

// The symbol to show inside an input, or nothing for the "None" currency.
export const symbolOf = (c: Currency) => (c.position === "none" ? undefined : c.symbol);

export const FINANCE_TOOLS: RelatedLink[] = [
  { href: "/finance/budget-calculator", label: "Budget Calculator (50/30/20)" },
  { href: "/finance/savings-goal-calculator", label: "Savings Goal Calculator" },
  { href: "/finance/debt-payoff-calculator", label: "Debt Payoff Calculator" },
  { href: "/finance/emergency-fund-calculator", label: "Emergency Fund Calculator" },
  { href: "/finance/inflation-calculator", label: "Inflation Calculator" },
  { href: "/finance/fire-calculator", label: "FIRE Calculator" },
  { href: "/finance/etf-calculator", label: "ETF Calculator" },
  { href: "/finance/compound-interest-calculator", label: "Compound Interest Calculator" },
];

export const relatedExcept = (href: string) => FINANCE_TOOLS.filter((l) => l.href !== href);

// Future value of `start` plus a monthly deposit after `months`, compounding monthly.
export function futureValue(start: number, monthly: number, annualPct: number, months: number) {
  const r = annualPct / 100 / 12;
  let v = start;
  for (let m = 0; m < months; m++) v = v * (1 + r) + monthly;
  return v;
}
