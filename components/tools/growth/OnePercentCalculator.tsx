"use client";

import { useState } from "react";
import { BarChart, Card, Chips, HeroResult, StatGrid, ToolShell, useAnimated, type FaqItem } from "../kit";

export const ONE_PERCENT_FAQ: FaqItem[] = [
  { q: "What does 1% better every day mean?", a: "It's the idea that tiny daily improvements compound. Getting 1% better each day for a year multiplies to about 37.8× (1.01^365), while getting 1% worse each day shrinks you to about 0.03× (0.99^365)." },
  { q: "Is the 1% rule mathematically real?", a: "The math is real compounding; real life is messier — skills don't grow perfectly evenly. The point is the direction: small habits repeated daily beat rare big efforts." },
  { q: "How do I actually get 1% better every day?", a: "Make the habit tiny and specific (five minutes of learning, ten push-ups, one page), attach it to something you already do, and track your streak so you don't break the chain." },
];

const PCTS = [0.1, 0.5, 1, 2];
const DAYS = [30, 90, 180, 365, 730];

export default function OnePercentCalculator() {
  const [pct, setPct] = useState(1);
  const [days, setDays] = useState(365);
  const better = Math.pow(1 + pct / 100, days);
  const worse = Math.pow(1 - pct / 100, days);
  const animated = useAnimated(better);
  const step = Math.max(1, Math.round(days / 24));
  const bars = Array.from({ length: Math.floor(days / step) + 1 }, (_, i) => {
    const d = i * step;
    return { label: `${d}d`, value: Math.pow(1 + pct / 100, d), soft: Math.pow(1 - pct / 100, d) };
  });

  return (
    <ToolShell
      theme="growth"
      backHref="/personal-growth"
      backLabel="Back to Personal Growth"
      eyebrow="Growth Tool"
      title="1% Better"
      highlight="Every Day"
      intro="Tiny habits compound like interest. See what getting a little better — or a little worse — every day turns into over months and years."
      faq={ONE_PERCENT_FAQ}
      related={[
        { href: "/personal-growth/sleep-calculator", label: "Sleep Calculator" },
        { href: "/quiz/habit-type", label: "Habit Type Quiz" },
        { href: "/advisor", label: "Find your learning path" },
      ]}
    >
      <Card>
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">Improvement per day</span>
            <div className="mt-2">
              <Chips theme="growth" options={PCTS} value={pct} onChange={setPct} format={(v) => `${v}%`} />
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">For how long</span>
            <div className="mt-2">
              <Chips theme="growth" options={DAYS} value={days} onChange={setDays} format={(v) => (v === 365 ? "1 year" : v === 730 ? "2 years" : `${v} days`)} />
            </div>
          </div>
        </div>
      </Card>

      <HeroResult theme="growth" label={`${pct}% better for ${days} days`} value={`${animated.toFixed(animated < 10 ? 2 : 1)}×`} note={`${pct}% worse every day instead: ${worse.toFixed(worse < 0.1 ? 3 : 2)}× — almost nothing left.`} />

      <StatGrid
        items={[
          { label: "Better every day", value: `${better.toFixed(2)}×` },
          { label: "Worse every day", value: `${worse.toFixed(3)}×` },
          { label: "Difference", value: `${(better / Math.max(worse, 1e-9)).toFixed(0)}×` },
          { label: "Days", value: String(days) },
        ]}
      />
      <BarChart theme="growth" title="Getting better (dark) vs. getting worse (light)" bars={bars} format={(v) => `${v.toFixed(2)}×`} />
    </ToolShell>
  );
}
