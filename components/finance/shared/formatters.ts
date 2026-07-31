import type { Currency } from "./currency";

function withSymbol(sign: string, num: string, currency: Currency): string {
  if (currency.position === "prefix") return `${sign}${currency.symbol}${num}`;
  if (currency.position === "suffix") return `${sign}${num} ${currency.symbol}`;
  return `${sign}${num}`;
}

export function formatCurrency(value: number, currency: Currency, maximumFractionDigits = 0): string {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const num = abs.toLocaleString("en-US", { maximumFractionDigits, minimumFractionDigits: 0 });
  return withSymbol(sign, num, currency);
}

export function formatCompactCurrency(value: number, currency: Currency): string {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);

  if (abs < 1_000) return formatCurrency(value, currency);

  const compact =
    abs >= 1_000_000
      ? `${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`
      : `${(abs / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}K`;

  return withSymbol(sign, compact, currency);
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`;
}
