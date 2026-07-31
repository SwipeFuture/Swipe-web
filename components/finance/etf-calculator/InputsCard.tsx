"use client";

import type { CalculatorInputs } from "./calculations";
import type { Currency } from "../shared/currency";
import CurrencySelect from "../shared/CurrencySelect";
import ToggleSwitch from "../shared/ToggleSwitch";

const RETURN_CHIPS = [3, 5, 7, 8, 10, 12, 15];
const DURATION_CHIPS = [10, 20, 30, 40, 50, 100];

function clamp(n: number, min: number, max?: number): number {
  let v = n;
  if (v < min) v = min;
  if (max !== undefined && v > max) v = max;
  return v;
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  prefix,
  step = 1,
  disabled = false,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max?: number;
  suffix?: string;
  prefix?: string;
  step?: number;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      {label && <span className="text-xs sm:text-sm font-semibold text-stone-600">{label}</span>}
      <div className={`relative ${label ? "mt-2" : ""}`}>
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-amber-600">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange(min);
              return;
            }
            const n = Number(raw);
            if (!Number.isFinite(n)) return;
            onChange(clamp(n, min, max));
          }}
          className={`w-full rounded-2xl border border-amber-200/70 bg-white/70 backdrop-blur-sm py-3 text-base font-semibold text-stone-800 shadow-sm outline-none transition-all duration-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-40 disabled:cursor-not-allowed ${
            prefix ? "pl-11" : "pl-4"
          } ${suffix ? "pr-14" : "pr-4"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-400">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
        active
          ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
          : "border border-amber-200 bg-white/60 text-amber-700 hover:bg-amber-50"
      }`}
    >
      {label}
    </button>
  );
}

function currencyAdornment(currency: Currency): { prefix?: string; suffix?: string } {
  if (currency.position === "prefix") return { prefix: currency.symbol };
  if (currency.position === "suffix") return { suffix: currency.symbol };
  return {};
}

export default function InputsCard({
  inputs,
  onChange,
  currency,
  onCurrencyChange,
  inflationEnabled,
  onInflationEnabledChange,
  contributionGrowthEnabled,
  onContributionGrowthEnabledChange,
}: {
  inputs: CalculatorInputs;
  onChange: (patch: Partial<CalculatorInputs>) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  inflationEnabled: boolean;
  onInflationEnabledChange: (v: boolean) => void;
  contributionGrowthEnabled: boolean;
  onContributionGrowthEnabledChange: (v: boolean) => void;
}) {
  const moneyAdornment = currencyAdornment(currency);

  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-amber-500/0 via-amber-500/40 to-orange-400/0 blur-md opacity-60 -z-10" />

      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl p-6 sm:p-9 lg:p-10 shadow-xl">

        <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

        <div className="relative grid sm:grid-cols-2 gap-6 sm:gap-7">

          <div className="sm:col-span-2">
            <CurrencySelect value={currency} onChange={onCurrencyChange} />
          </div>

          <NumberField
            label="Initial Investment"
            value={inputs.initialInvestment}
            onChange={(v) => onChange({ initialInvestment: v })}
            min={0}
            {...moneyAdornment}
          />

          <NumberField
            label="Monthly Contribution"
            value={inputs.monthlyContribution}
            onChange={(v) => onChange({ monthlyContribution: v })}
            min={0}
            {...moneyAdornment}
          />

          <div className="sm:col-span-2">
            <span className="text-xs sm:text-sm font-semibold text-stone-600">Expected Annual Return (%)</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {RETURN_CHIPS.map((pct) => (
                <Chip
                  key={pct}
                  label={`${pct}%`}
                  active={inputs.annualReturnPct === pct}
                  onClick={() => onChange({ annualReturnPct: pct })}
                />
              ))}
            </div>
            <div className="mt-3">
              <NumberField
                label=""
                value={inputs.annualReturnPct}
                onChange={(v) => onChange({ annualReturnPct: v })}
                min={0}
                max={100}
                suffix="%"
                step={0.1}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <span className="text-xs sm:text-sm font-semibold text-stone-600">Investment Duration (Years)</span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DURATION_CHIPS.map((yrs) => (
                <Chip
                  key={yrs}
                  label={`${yrs} Years`}
                  active={inputs.durationYears === yrs}
                  onClick={() => onChange({ durationYears: yrs })}
                />
              ))}
            </div>
            <div className="mt-3">
              <NumberField
                label=""
                value={inputs.durationYears}
                onChange={(v) => onChange({ durationYears: Math.round(v) })}
                min={1}
                max={150}
                suffix="yrs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-stone-600">Inflation Rate (%)</span>
              <ToggleSwitch
                checked={inflationEnabled}
                onChange={onInflationEnabledChange}
                label="Toggle inflation rate"
              />
            </div>
            <div className="mt-2">
              <NumberField
                label=""
                value={inputs.inflationPct}
                onChange={(v) => onChange({ inflationPct: v })}
                min={0}
                max={20}
                suffix="%"
                step={0.1}
                disabled={!inflationEnabled}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-stone-600">Annual Contribution Increase (%)</span>
              <ToggleSwitch
                checked={contributionGrowthEnabled}
                onChange={onContributionGrowthEnabledChange}
                label="Toggle annual contribution increase"
              />
            </div>
            <div className="mt-2">
              <NumberField
                label=""
                value={inputs.contributionGrowthPct}
                onChange={(v) => onChange({ contributionGrowthPct: v })}
                min={0}
                max={20}
                suffix="%"
                step={0.1}
                disabled={!contributionGrowthEnabled}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
