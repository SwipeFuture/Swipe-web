"use client";

import { useState } from "react";
import { BarChart, Card, HeroResult, NumberInput, StatGrid, ToolShell, type FaqItem } from "../kit";
import { CurrencyRow, formatCompactCurrency, formatCurrency, relatedExcept, symbolOf, useCurrency } from "./shared";

export const INFLATION_FAQ: FaqItem[] = [
  { q: "What is inflation?", a: "Inflation is the general rise in prices over time. When prices go up, the same amount of money buys less — its purchasing power falls." },
  { q: "How does this inflation calculator work?", a: "It compounds the yearly inflation rate: a price grows by (1 + rate) every year. Purchasing power is the opposite — today's money divided by that same factor." },
  { q: "What inflation rate should I use?", a: "Central banks in many countries aim for about 2% a year. Over long periods, 2–3% is a common planning assumption, but real inflation can be much higher in some years." },
  { q: "How do I protect my money from inflation?", a: "Cash in a 0% account loses value every year. Many people keep only their emergency fund in cash and invest long-term money in assets that have historically grown faster than inflation, like broad stock ETFs." },
];

export default function InflationCalculator() {
  const [currency, setCurrency] = useCurrency();
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(3);
  const [years, setYears] = useState(20);
  const f = (v: number) => formatCurrency(v, currency);

  const factor = Math.pow(1 + rate / 100, years);
  const futurePrice = amount * factor;
  const power = amount / factor;
  const lost = 100 - 100 / factor;
  const step = Math.max(1, Math.round(years / 20));
  const bars = Array.from({ length: Math.floor(years / step) + 1 }, (_, i) => {
    const y = i * step;
    return { label: `${y}y`, value: amount / Math.pow(1 + rate / 100, y) };
  });

  return (
    <ToolShell
      theme="finance"
      backHref="/finance"
      backLabel="Back to Finance"
      eyebrow="Finance Tool"
      title="Inflation"
      highlight="Calculator"
      intro="See what your money will really be worth in the future — and what today's prices will cost in 10, 20 or 30 years."
      faq={INFLATION_FAQ}
      related={relatedExcept("/finance/inflation-calculator")}
    >
      <Card>
        <div className="space-y-6">
          <CurrencyRow value={currency} onChange={setCurrency} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <NumberInput theme="finance" label="Amount today" value={amount} onChange={setAmount} step={100} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Inflation per year" value={rate} onChange={setRate} step={0.5} max={50} suffix="%" />
            <NumberInput theme="finance" label="Years" value={years} onChange={setYears} min={1} max={100} suffix="years" />
          </div>
        </div>
      </Card>

      <HeroResult theme="finance" label={`Worth in ${years} years`} value={f(power)} note={`${f(amount)} kept as cash loses ${lost.toFixed(0)}% of its purchasing power. Something that costs ${f(amount)} today will cost about ${f(futurePrice)}.`} />

      <StatGrid
        items={[
          { label: "Future price", value: f(futurePrice) },
          { label: "Purchasing power", value: f(power) },
          { label: "Value lost", value: `${lost.toFixed(1)}%` },
          { label: "Prices rise ×", value: `${factor.toFixed(2)}×` },
        ]}
      />
      <BarChart theme="finance" title="What your money is worth over time" bars={bars} format={(v) => formatCompactCurrency(v, currency)} />
    </ToolShell>
  );
}
