"use client";

import { useMemo, useState } from "react";
import { BarChart, Card, HeroResult, NumberInput, StatGrid, ToolShell, type FaqItem } from "../kit";
import { CurrencyRow, formatCompactCurrency, formatCurrency, relatedExcept, symbolOf, useCurrency } from "./shared";

export const DEBT_FAQ: FaqItem[] = [
  { q: "How is the payoff time calculated?", a: "Every month, interest is added to your balance (APR ÷ 12) and then your payment is subtracted. The calculator repeats this until the balance reaches zero and adds up all the interest you paid along the way." },
  { q: "Why does an extra payment save so much?", a: "Every extra amount goes straight to the principal, so less interest builds up in every following month. On high-interest debt like credit cards, a small extra payment can cut years off the payoff time." },
  { q: "Avalanche or snowball — which method is better?", a: "Avalanche (paying the highest interest rate first) saves the most money. Snowball (paying the smallest balance first) gives quick wins that keep you motivated. The best method is the one you actually stick with." },
  { q: "What if my payment doesn't cover the interest?", a: "Then the debt grows instead of shrinking. Increase the payment, ask the lender for a lower rate, or look into moving the balance to a cheaper loan." },
];

function simulate(balance: number, apr: number, payment: number) {
  const r = apr / 100 / 12;
  let b = balance;
  let interest = 0;
  const yearly: number[] = [];
  for (let m = 1; m <= 600; m++) {
    const i = b * r;
    interest += i;
    b = b + i - payment;
    if (b <= 0) {
      yearly.push(0);
      return { months: m, interest: interest + b * 0, yearly };
    }
    if (m % 12 === 0) yearly.push(b);
    if (m === 2 && b >= balance) return { months: Infinity, interest: Infinity, yearly: [] };
  }
  return { months: Infinity, interest: Infinity, yearly: [] };
}

export default function DebtPayoffCalculator() {
  const [currency, setCurrency] = useCurrency();
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(19.9);
  const [payment, setPayment] = useState(150);
  const [extra, setExtra] = useState(50);
  const f = (v: number) => formatCurrency(v, currency);

  const base = useMemo(() => simulate(balance, apr, payment), [balance, apr, payment]);
  const boosted = useMemo(() => simulate(balance, apr, payment + extra), [balance, apr, payment, extra]);
  const ok = Number.isFinite(boosted.months);
  const fmtTime = (m: number) => (!Number.isFinite(m) ? "Never" : m < 12 ? `${m} months` : `${Math.floor(m / 12)} yrs ${m % 12} mo`);

  return (
    <ToolShell
      theme="finance"
      backHref="/finance"
      backLabel="Back to Finance"
      eyebrow="Finance Tool"
      title="Debt Payoff"
      highlight="Calculator"
      intro="Credit card, car loan or student loan: see when you'll be debt-free, how much interest it costs — and how much faster a small extra payment gets you there."
      faq={DEBT_FAQ}
      related={relatedExcept("/finance/debt-payoff-calculator")}
    >
      <Card>
        <div className="space-y-6">
          <CurrencyRow value={currency} onChange={setCurrency} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumberInput theme="finance" label="Debt balance" value={balance} onChange={setBalance} step={100} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Interest rate (APR)" value={apr} onChange={setApr} step={0.5} max={100} suffix="%" />
            <NumberInput theme="finance" label="Monthly payment" value={payment} onChange={setPayment} step={10} prefix={symbolOf(currency)} />
            <NumberInput theme="finance" label="Extra payment per month" value={extra} onChange={setExtra} step={10} prefix={symbolOf(currency)} />
          </div>
        </div>
      </Card>

      <HeroResult
        theme="finance"
        label="Debt-free in"
        value={fmtTime(boosted.months)}
        note={
          ok
            ? Number.isFinite(base.months)
              ? `${fmtTime(base.months - boosted.months)} sooner and ${f(base.interest - boosted.interest)} less interest than paying only ${f(payment)} a month.`
              : `Without the extra ${f(extra)}, your payment wouldn't even cover the interest.`
            : "Your payment doesn't cover the monthly interest — the debt keeps growing. Try a higher payment."
        }
      />

      {ok && (
        <>
          <StatGrid
            items={[
              { label: "Total interest", value: f(boosted.interest) },
              { label: "Total paid", value: f(balance + boosted.interest) },
              { label: "Without extra", value: fmtTime(base.months) },
              { label: "Interest saved", value: Number.isFinite(base.interest) ? f(base.interest - boosted.interest) : "—" },
            ]}
          />
          <BarChart
            theme="finance"
            title="Remaining balance at the end of each year"
            bars={boosted.yearly.map((v, i) => ({ label: `Y${i + 1}`, value: Math.max(0, v) }))}
            format={(v) => formatCompactCurrency(v, currency)}
          />
        </>
      )}
    </ToolShell>
  );
}
