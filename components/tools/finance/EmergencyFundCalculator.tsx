"use client";

import { useState } from "react";
import { Card, Chips, HeroResult, NumberInput, StatGrid, ToolShell, type FaqItem } from "../kit";
import { CurrencyRow, formatCurrency, relatedExcept, symbolOf, useCurrency } from "./shared";

export const EMERGENCY_FAQ: FaqItem[] = [
  { q: "How big should an emergency fund be?", a: "A common rule is 3 to 6 months of essential expenses. Choose more (6–12 months) if your income is irregular, you're self-employed, or other people depend on you." },
  { q: "What counts as essential expenses?", a: "Only what you truly need to live: rent or mortgage, utilities, groceries, insurance, transport and minimum debt payments. Leave out wants like eating out or subscriptions." },
  { q: "Where should I keep my emergency fund?", a: "Somewhere safe and quickly accessible, like a separate high-interest savings account — not in stocks, where the value could be down exactly when you need it." },
];

const MONTHS = [3, 6, 9, 12];

export default function EmergencyFundCalculator() {
  const [currency, setCurrency] = useCurrency();
  const [expenses, setExpenses] = useState(1800);
  const [months, setMonths] = useState(6);
  const [current, setCurrent] = useState(1500);
  const [monthly, setMonthly] = useState(250);
  const f = (v: number) => formatCurrency(v, currency);

  const target = expenses * months;
  const gap = Math.max(0, target - current);
  const toGo = monthly > 0 ? Math.ceil(gap / monthly) : Infinity;
  const pct = Math.min(100, target > 0 ? (current / target) * 100 : 0);

  return (
    <ToolShell
      theme="finance"
      backHref="/finance"
      backLabel="Back to Finance"
      eyebrow="Finance Tool"
      title="Emergency Fund"
      highlight="Calculator"
      intro="How much money should you keep for emergencies — and how long until your safety net is complete? Your financial peace of mind, in numbers."
      faq={EMERGENCY_FAQ}
      related={relatedExcept("/finance/emergency-fund-calculator")}
    >
      <Card>
        <div className="space-y-6">
          <CurrencyRow value={currency} onChange={setCurrency} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumberInput theme="finance" label="Essential expenses per month" value={expenses} onChange={setExpenses} step={50} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Already saved for emergencies" value={current} onChange={setCurrent} step={100} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="You can save per month" value={monthly} onChange={setMonthly} step={25} prefix={symbolOf(currency)} />
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">Months of expenses to cover</span>
            <div className="mt-2">
              <Chips theme="finance" options={MONTHS} value={months} onChange={setMonths} format={(m) => `${m} months`} />
            </div>
          </div>
        </div>
      </Card>

      <HeroResult
        theme="finance"
        label="Your emergency fund target"
        value={f(target)}
        note={gap === 0 ? "You're fully covered — nice work. Anything extra can go towards investing." : `${f(gap)} to go — ${Number.isFinite(toGo) ? `about ${toGo} ${toGo === 1 ? "month" : "months"} at ${f(monthly)} a month` : "set a monthly amount to see when you'll get there"}.`}
      />

      <Card>
        <div className="flex items-center justify-between text-sm font-semibold text-stone-700">
          <span>Progress</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
        <div className="mt-3 h-4 overflow-hidden rounded-full bg-amber-100">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MONTHS.map((m) => (
            <div key={m} className={`rounded-2xl border p-4 text-center ${current >= expenses * m ? "border-amber-300 bg-amber-50" : "border-stone-200 bg-white/70"}`}>
              <div className="text-xs font-semibold text-stone-500">{m} months</div>
              <div className="mt-1 text-base font-bold text-stone-800">{f(expenses * m)}</div>
              <div className="mt-1 text-xs">{current >= expenses * m ? "✅ covered" : "not yet"}</div>
            </div>
          ))}
        </div>
      </Card>

      <StatGrid
        items={[
          { label: "Target", value: f(target) },
          { label: "Still missing", value: f(gap) },
          { label: "Months to go", value: Number.isFinite(toGo) ? String(toGo) : "—" },
          { label: "You'd survive now", value: `${expenses > 0 ? (current / expenses).toFixed(1) : "0"} months` },
        ]}
      />
    </ToolShell>
  );
}
