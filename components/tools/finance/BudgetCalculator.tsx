"use client";

import { useState } from "react";
import { Card, Chips, HeroResult, NumberInput, StatGrid, ToolShell, useAnimated, type FaqItem } from "../kit";
import { CurrencyRow, formatCurrency, futureValue, relatedExcept, symbolOf, useCurrency } from "./shared";

const SPLITS = ["50/30/20", "60/20/20", "70/20/10", "40/30/30"] as const;
type Split = (typeof SPLITS)[number];

export const BUDGET_FAQ: FaqItem[] = [
  { q: "What is the 50/30/20 rule?", a: "It splits your take-home pay into three buckets: 50% for needs (rent, food, bills, transport), 30% for wants (eating out, hobbies, subscriptions) and 20% for savings and paying off debt." },
  { q: "Should I use my gross or net income?", a: "Use your net income — what actually lands in your account after taxes and deductions. That's the money you can budget." },
  { q: "What if my needs are more than 50%?", a: "That's common in expensive cities. Try 60/20/20 or 70/20/10 for now, protect the savings part first, and look for the one or two biggest fixed costs you could lower over time." },
  { q: "Where should the 20% savings go?", a: "Usually in this order: a starter emergency fund, paying off expensive debt, a full emergency fund of 3–6 months of expenses, then long-term investing such as a broad ETF." },
];

export default function BudgetCalculator() {
  const [currency, setCurrency] = useCurrency();
  const [income, setIncome] = useState(3000);
  const [split, setSplit] = useState<Split>("50/30/20");
  const [needsPct, wantsPct, savePct] = split.split("/").map(Number);
  const needs = (income * needsPct) / 100;
  const wants = (income * wantsPct) / 100;
  const save = (income * savePct) / 100;
  const in10 = futureValue(0, save, 7, 120);
  const animatedSave = useAnimated(save);
  const f = (v: number) => formatCurrency(v, currency);

  const parts = [
    { label: "Needs", pct: needsPct, value: needs, color: "bg-stone-800", text: "Rent, groceries, bills, transport, insurance" },
    { label: "Wants", pct: wantsPct, value: wants, color: "bg-orange-400", text: "Eating out, hobbies, shopping, subscriptions" },
    { label: "Savings & debt", pct: savePct, value: save, color: "bg-amber-500", text: "Emergency fund, extra debt payments, investing" },
  ];

  return (
    <ToolShell
      theme="finance"
      backHref="/finance"
      backLabel="Back to Finance"
      eyebrow="Finance Tool"
      title="Budget"
      highlight="Calculator"
      intro="Split your monthly take-home pay with the 50/30/20 rule — or a split that fits your life — and see what your savings could grow into."
      faq={BUDGET_FAQ}
      related={relatedExcept("/finance/budget-calculator")}
    >
      <Card>
        <div className="space-y-6">
          <CurrencyRow value={currency} onChange={setCurrency} />
          <NumberInput theme="finance" label="Monthly take-home pay" value={income} onChange={setIncome} step={100} prefix={symbolOf(currency)} />
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">Split (needs / wants / savings)</span>
            <div className="mt-2">
              <Chips theme="finance" options={[...SPLITS]} value={split} onChange={setSplit} />
            </div>
          </div>
        </div>
      </Card>

      <HeroResult theme="finance" label="Save every month" value={f(animatedSave)} note={`Saved and invested at ~7% a year, that's about ${f(in10)} after 10 years.`} />

      <Card>
        <div className="flex h-5 overflow-hidden rounded-full">
          {parts.map((p) => (
            <div key={p.label} className={`${p.color} transition-all duration-700`} style={{ width: `${p.pct}%` }} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {parts.map((p) => (
            <div key={p.label} className="rounded-[22px] border border-white/70 bg-white/70 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-800">
                <span className={`h-3 w-3 rounded-full ${p.color}`} />
                {p.label} · {p.pct}%
              </div>
              <div className="mt-2 text-2xl font-black tracking-tight text-stone-900">{f(p.value)}</div>
              <div className="mt-1 text-xs text-stone-500">{f(p.value * 12)} a year</div>
              <p className="mt-3 text-xs leading-5 text-stone-500">{p.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <StatGrid
        items={[
          { label: "Yearly income", value: f(income * 12) },
          { label: "Saved per year", value: f(save * 12) },
          { label: "Saved in 5 years", value: f(save * 60) },
          { label: "Invested 10 yrs @7%", value: f(in10) },
        ]}
      />
    </ToolShell>
  );
}
