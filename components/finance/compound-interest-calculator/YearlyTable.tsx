"use client";

import { useEffect, useRef, useState } from "react";
import type { YearPoint } from "./calculations";
import type { Currency } from "../shared/currency";
import { formatCurrency } from "../shared/formatters";

export default function YearlyTable({ years, currency }: { years: YearPoint[]; currency: Currency }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const firstRun = useRef(true);

  // A brief opacity dip whenever the underlying data changes — a light "refreshed" cue
  // instead of animating all ~150 rows individually, which wouldn't read as premium so
  // much as busy.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setIsUpdating(true);
    const t = setTimeout(() => setIsUpdating(false), 220);
    return () => clearTimeout(t);
  }, [years]);

  return (
    <div className="relative">

      <div className="absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-amber-500/0 via-amber-500/40 to-orange-400/0 blur-md opacity-60 -z-10" />

      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl p-6 sm:p-9 lg:p-10 shadow-xl">

        <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

        <h3 className="relative text-lg sm:text-xl font-bold tracking-tight text-stone-800">Yearly Breakdown</h3>

        <div
          className={`relative mt-5 sm:mt-7 max-h-[480px] overflow-auto rounded-2xl border border-amber-100 transition-opacity duration-200 ${
            isUpdating ? "opacity-60" : "opacity-100"
          }`}
        >
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-amber-50/95 backdrop-blur-sm">
              <tr>
                {["Year", "Starting Balance", "Contributions", "Interest Earned", "Ending Balance"].map((label, i) => (
                  <th
                    key={label}
                    className={`px-4 py-3 text-xs sm:text-sm font-semibold tracking-wide text-amber-800 ${
                      i === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((y, i) => (
                <tr
                  key={y.year}
                  className={`transition-colors duration-200 hover:bg-amber-100/50 ${
                    i % 2 === 0 ? "bg-white/40" : "bg-amber-50/30"
                  }`}
                >
                  <td className="px-4 py-2.5 text-left font-semibold text-stone-700 [font-variant-numeric:tabular-nums]">
                    {y.year}
                  </td>
                  <td className="px-4 py-2.5 text-right text-stone-600 [font-variant-numeric:tabular-nums]">
                    {formatCurrency(y.startingBalance, currency)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-stone-600 [font-variant-numeric:tabular-nums]">
                    {formatCurrency(y.totalInvested, currency)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-stone-600 [font-variant-numeric:tabular-nums]">
                    {formatCurrency(y.interestEarned, currency)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-amber-700 [font-variant-numeric:tabular-nums]">
                    {formatCurrency(y.endingBalance, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
