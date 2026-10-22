"use client";

import { useMemo, useState } from "react";
import { BarChart, Card, Chips, HeroResult, NumberInput, StatGrid, ToolShell, type FaqItem } from "../kit";
import { CurrencyRow, formatCompactCurrency, formatCurrency, relatedExcept, symbolOf, useCurrency } from "./shared";

export const SAVINGS_FAQ: FaqItem[] = [
  { q: "How do I calculate how long it takes to reach a savings goal?", a: "Add your monthly saving to your balance every month, let the balance earn interest, and count the months until it reaches your goal. This calculator does exactly that, month by month." },
  { q: "What interest rate should I use?", a: "For a savings account, use its current interest rate. For long-term investing in a broad stock ETF, many people plan with 5–7% a year — but returns are never guaranteed." },
  { q: "How can I reach my goal faster?", a: "The two biggest levers are saving more each month and starting earlier. Even a small automatic transfer on payday adds up faster than saving whatever is left at the end of the month." },
];

const MODES = ["How long will it take?", "How much per month?"] as const;
type Mode = (typeof MODES)[number];

function monthsToGoal(start: number, monthly: number, pct: number, goal: number) {
  const r = pct / 100 / 12;
  let v = start;
  for (let m = 0; m <= 1200; m++) {
    if (v >= goal) return m;
    v = v * (1 + r) + monthly;
  }
  return Infinity;
}

function monthlyNeeded(start: number, pct: number, goal: number, months: number) {
  const r = pct / 100 / 12;
  const grownStart = start * Math.pow(1 + r, months);
  if (grownStart >= goal) return 0;
  if (r === 0) return (goal - start) / months;
  return ((goal - grownStart) * r) / (Math.pow(1 + r, months) - 1);
}

export default function SavingsGoalCalculator() {
  const [currency, setCurrency] = useCurrency();
  const [mode, setMode] = useState<Mode>(MODES[0]);
  const [goal, setGoal] = useState(20000);
  const [start, setStart] = useState(2000);
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(4);
  const f = (v: number) => formatCurrency(v, currency);

  const months = mode === MODES[0] ? monthsToGoal(start, monthly, rate, goal) : years * 12;
  const perMonth = mode === MODES[0] ? monthly : monthlyNeeded(start, rate, goal, years * 12);
  const reachable = Number.isFinite(months);

  const bars = useMemo(() => {
    if (!reachable) return [];
    const r = rate / 100 / 12;
    const out: { label: string; value: number; soft: number }[] = [];
    let v = start;
    let paid = start;
    const total = Math.max(12, Math.ceil(months / 12) * 12);
    for (let m = 1; m <= total; m++) {
      v = v * (1 + r) + perMonth;
      paid += perMonth;
      if (m % 12 === 0) out.push({ label: `Y${m / 12}`, value: v, soft: paid });
    }
    return out;
  }, [reachable, rate, start, months, perMonth]);

  const totalPaid = start + perMonth * (reachable ? months : 0);
  const finalValue = bars.length ? bars[bars.length - 1].value : 0;

  return (
    <ToolShell
      theme="finance"
      backHref="/finance"
      backLabel="Back to Finance"
      eyebrow="Finance Tool"
      title="Savings Goal"
      highlight="Calculator"
      intro="A new phone, a car, a trip or your first investment — see how long your goal takes, or exactly how much you need to save each month to get there on time."
      faq={SAVINGS_FAQ}
      related={relatedExcept("/finance/savings-goal-calculator")}
    >
      <Card>
        <div className="space-y-6">
          <Chips theme="finance" options={[...MODES]} value={mode} onChange={setMode} />
          <CurrencyRow value={currency} onChange={setCurrency} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumberInput theme="finance" label="Savings goal" value={goal} onChange={setGoal} step={500} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Already saved" value={start} onChange={setStart} step={100} prefix={symbolOf(currency)} />
            {mode === MODES[0] ? (
              <NumberInput theme="finance" label="Monthly saving" value={monthly} onChange={setMonthly} step={25} prefix={symbolOf(currency)} />
            ) : (
              <NumberInput theme="finance" label="Reach it within" value={years} onChange={setYears} min={1} max={50} suffix="years" />
            )}
            <NumberInput theme="finance" label="Interest / return per year" value={rate} onChange={setRate} step={0.5} max={30} suffix="%" />
          </div>
        </div>
      </Card>

      {mode === MODES[0] ? (
        <HeroResult
          theme="finance"
          label="Time to your goal"
          value={reachable ? (months < 12 ? `${months} months` : `${(months / 12).toFixed(1)} years`) : "Never"}
          note={reachable ? `That's ${months} monthly deposits of ${f(monthly)}.` : "With this monthly saving and return, the goal is out of reach — save a bit more each month."}
        />
      ) : (
        <HeroResult theme="finance" label="Save every month" value={f(perMonth)} note={`To reach ${f(goal)} in ${years} ${years === 1 ? "year" : "years"} at ${rate}% a year.`} />
      )}

      {reachable && (
        <>
          <StatGrid
            items={[
              { label: "Goal", value: f(goal) },
              { label: "You pay in", value: f(totalPaid) },
              { label: "Interest earned", value: f(Math.max(0, finalValue - totalPaid)) },
              { label: "Monthly saving", value: f(perMonth) },
            ]}
          />
          {bars.length > 0 && <BarChart theme="finance" title="Balance by year (light = what you paid in)" bars={bars} format={(v) => formatCompactCurrency(v, currency)} />}
        </>
      )}
    </ToolShell>
  );
}
