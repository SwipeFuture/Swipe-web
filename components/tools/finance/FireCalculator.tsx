"use client";

import { useMemo, useState } from "react";
import { BarChart, Card, Chips, HeroResult, NumberInput, StatGrid, ToolShell, type FaqItem } from "../kit";
import { CurrencyRow, formatCompactCurrency, formatCurrency, relatedExcept, symbolOf, useCurrency } from "./shared";

export const FIRE_FAQ: FaqItem[] = [
  { q: "What does FIRE mean?", a: "FIRE stands for Financial Independence, Retire Early: saving and investing so much that your investments can cover your living costs, so working becomes optional." },
  { q: "How is the FIRE number calculated?", a: "Your FIRE number is your yearly expenses divided by a safe withdrawal rate. With the popular 4% rule, that's 25× your yearly expenses." },
  { q: "What is the 4% rule?", a: "It comes from historical studies suggesting that withdrawing about 4% of a diversified portfolio in the first year (then adjusting for inflation) has lasted for at least 30 years in most past scenarios. It's a rule of thumb, not a guarantee." },
  { q: "Should I use a nominal or real return?", a: "Use a real return (after inflation), for example 4–5% for a stock-heavy portfolio, so the FIRE number stays in today's money." },
];

const RATES = [3, 3.5, 4, 4.5];

export default function FireCalculator() {
  const [currency, setCurrency] = useCurrency();
  const [expenses, setExpenses] = useState(30000);
  const [portfolio, setPortfolio] = useState(10000);
  const [monthly, setMonthly] = useState(800);
  const [ret, setRet] = useState(5);
  const [swr, setSwr] = useState(4);
  const f = (v: number) => formatCurrency(v, currency);

  const fireNumber = expenses / (swr / 100);
  const { years, bars } = useMemo(() => {
    const r = ret / 100 / 12;
    let v = portfolio;
    const out: { label: string; value: number }[] = [];
    for (let m = 1; m <= 12 * 70; m++) {
      v = v * (1 + r) + monthly;
      if (m % 12 === 0) out.push({ label: `Y${m / 12}`, value: v });
      if (v >= fireNumber) return { years: m / 12, bars: out.length ? out : [{ label: "Y1", value: v }] };
    }
    return { years: Infinity, bars: out.slice(0, 40) };
  }, [portfolio, monthly, ret, fireNumber]);

  return (
    <ToolShell
      theme="finance"
      backHref="/finance"
      backLabel="Back to Finance"
      eyebrow="Finance Tool"
      title="FIRE"
      highlight="Calculator"
      intro="Financial Independence, Retire Early: find your FIRE number and how many years of saving and investing it takes until work becomes optional."
      faq={FIRE_FAQ}
      related={relatedExcept("/finance/fire-calculator")}
    >
      <Card>
        <div className="space-y-6">
          <CurrencyRow value={currency} onChange={setCurrency} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumberInput theme="finance" label="Yearly expenses" value={expenses} onChange={setExpenses} step={1000} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Invested today" value={portfolio} onChange={setPortfolio} step={1000} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Invested per month" value={monthly} onChange={setMonthly} step={50} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Real return per year (after inflation)" value={ret} onChange={setRet} step={0.5} max={20} suffix="%" />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">Safe withdrawal rate</span>
            <div className="mt-2">
              <Chips theme="finance" options={RATES} value={swr} onChange={setSwr} format={(v) => `${v}%`} />
            </div>
          </div>
        </div>
      </Card>

      <HeroResult
        theme="finance"
        label="Financially independent in"
        value={Number.isFinite(years) ? `${Math.ceil(years)} years` : "70+ years"}
        note={`Your FIRE number is ${f(fireNumber)} — ${(100 / swr).toFixed(1)}× your yearly expenses.`}
      />
      <StatGrid
        items={[
          { label: "FIRE number", value: f(fireNumber) },
          { label: "Monthly income from it", value: f(expenses / 12) },
          { label: "You pay in", value: Number.isFinite(years) ? f(portfolio + monthly * Math.ceil(years * 12)) : "—" },
          { label: "Savings per year", value: f(monthly * 12) },
        ]}
      />
      <BarChart theme="finance" title="Portfolio by year until your FIRE number" bars={bars} format={(v) => formatCompactCurrency(v, currency)} />
    </ToolShell>
  );
}
