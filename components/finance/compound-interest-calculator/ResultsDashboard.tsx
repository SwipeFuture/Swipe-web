"use client";

import type { CompoundInputs, CalculatorResult } from "./calculations";
import { COMPOUNDING_FREQUENCIES } from "./calculations";
import type { Currency } from "../shared/currency";
import { formatCurrency, formatPercent } from "../shared/formatters";
import { useAnimatedNumber } from "../shared/useAnimatedNumber";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative rounded-[24px] border border-[#ececea] bg-white p-5 sm:p-6 shadow-lg transition-all duration-500 ease-out hover:-translate-y-1">
      
      <span className="relative block text-xs sm:text-sm font-medium text-stone-500">{label}</span>
      <span className="relative mt-2 block text-xl sm:text-2xl font-bold tracking-tight text-stone-800">
        {value}
      </span>
    </div>
  );
}

export default function ResultsDashboard({
  inputs,
  result,
  currency,
  inflationEnabled,
}: {
  inputs: CompoundInputs;
  result: CalculatorResult;
  currency: Currency;
  inflationEnabled: boolean;
}) {
  const animatedFinal = useAnimatedNumber(result.finalBalance);
  const animatedReal = useAnimatedNumber(result.realFinalBalance);
  const frequencyLabel = COMPOUNDING_FREQUENCIES.find((f) => f.value === inputs.compoundingFrequency)?.label ?? "Monthly";

  return (
    <div className="relative">

      {/* Hero figure */}
      <div className="group relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-[#ececea] bg-white p-8 sm:p-12 text-center">

        
        
        

        <span className="relative inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#FEF5DA", color: "#B45309" }}>
          Final Balance
        </span>

        <div className="relative mt-4 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight " style={{ color: "#B45309" }}>
          {formatCurrency(animatedFinal, currency)}
        </div>

        {inflationEnabled && (
          <p className="relative mt-4 text-xs sm:text-sm text-stone-500">
            ≈ {formatCurrency(animatedReal, currency)} in today&apos;s purchasing power, adjusted for {formatPercent(inputs.inflationPct)} inflation
          </p>
        )}

      </div>

      {/* Stat grid */}
      <div className="mt-6 sm:mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatTile label="Total contributions" value={formatCurrency(result.totalInvested, currency)} />
        <StatTile label="Total interest earned" value={formatCurrency(result.totalProfit, currency)} />
        <StatTile label="Total growth" value={`${result.growthMultiple.toFixed(2)}×`} />
        <StatTile label="Annual interest rate" value={formatPercent(inputs.annualRatePct)} />
        <StatTile label="Compounding frequency" value={frequencyLabel} />
        <StatTile label="Investment duration" value={`${inputs.durationYears} yrs`} />
        <StatTile label="Return on investment" value={formatPercent(result.roiPct)} />
      </div>

    </div>
  );
}
