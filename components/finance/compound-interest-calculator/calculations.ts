// Pure growth-simulation math for the Compound Interest calculator. Structurally mirrors
// components/finance/etf-calculator/calculations.ts, but simulates at whatever cadence the
// chosen compounding frequency implies, while contributions have their own independent
// amount + frequency (e.g. "€500 every quarter" while interest compounds daily).

export type CompoundingFrequency = "daily" | "monthly" | "quarterly" | "semiannually" | "annually";

export const COMPOUNDING_FREQUENCIES: { value: CompoundingFrequency; label: string; periodsPerYear: number }[] = [
  { value: "daily", label: "Daily", periodsPerYear: 365 },
  { value: "monthly", label: "Monthly", periodsPerYear: 12 },
  { value: "quarterly", label: "Quarterly", periodsPerYear: 4 },
  { value: "semiannually", label: "Semi-Annually", periodsPerYear: 2 },
  { value: "annually", label: "Annually", periodsPerYear: 1 },
];

function periodsPerYearFor(frequency: CompoundingFrequency): number {
  return COMPOUNDING_FREQUENCIES.find((f) => f.value === frequency)?.periodsPerYear ?? 12;
}

export type CompoundInputs = {
  initialInvestment: number;
  contributionAmount: number;
  contributionFrequency: CompoundingFrequency;
  annualRatePct: number;
  durationYears: number;
  compoundingFrequency: CompoundingFrequency;
  inflationPct: number;
  contributionGrowthPct: number;
};

export type YearPoint = {
  year: number;
  startingBalance: number;
  totalInvested: number;
  interestEarned: number;
  endingBalance: number;
};

export type CalculatorResult = {
  years: YearPoint[];
  finalBalance: number;
  totalInvested: number;
  totalProfit: number;
  roiPct: number;
  growthMultiple: number;
  realFinalBalance: number;
};

export const DEFAULT_INPUTS: CompoundInputs = {
  initialInvestment: 10000,
  contributionAmount: 500,
  contributionFrequency: "monthly",
  annualRatePct: 5,
  durationYears: 30,
  compoundingFrequency: "monthly",
  inflationPct: 2,
  contributionGrowthPct: 2,
};

export function calculateCompoundGrowth(inputs: CompoundInputs): CalculatorResult {
  const {
    initialInvestment,
    contributionAmount,
    contributionFrequency,
    annualRatePct,
    durationYears,
    compoundingFrequency,
    inflationPct,
    contributionGrowthPct,
  } = inputs;

  const compoundingPeriodsPerYear = periodsPerYearFor(compoundingFrequency);
  const contributionPeriodsPerYear = periodsPerYearFor(contributionFrequency);
  const ratePerPeriod = annualRatePct / 100 / compoundingPeriodsPerYear;

  let balance = initialInvestment;
  let totalInvested = initialInvestment;
  let currentContributionAmount = contributionAmount;

  const years: YearPoint[] = [
    { year: 0, startingBalance: 0, totalInvested: initialInvestment, interestEarned: 0, endingBalance: initialInvestment },
  ];

  for (let year = 1; year <= durationYears; year++) {
    const startingBalance = balance;
    let interestEarned = 0;

    if (year > 1) {
      currentContributionAmount *= 1 + contributionGrowthPct / 100;
    }

    // Convert "amount per contribution event" into a yearly total, then spread it evenly
    // across this year's compounding periods — e.g. quarterly contributions still land
    // correctly even when interest compounds daily, without needing to merge two separate
    // event timelines tick-by-tick (a precision refinement that wouldn't move the needle
    // over a multi-year horizon).
    const annualContributionTotal = currentContributionAmount * contributionPeriodsPerYear;
    const periodContribution = annualContributionTotal / compoundingPeriodsPerYear;

    for (let p = 0; p < compoundingPeriodsPerYear; p++) {
      const interest = balance * ratePerPeriod;
      interestEarned += interest;
      balance += interest + periodContribution;
      totalInvested += periodContribution;
    }

    years.push({ year, startingBalance, totalInvested, interestEarned, endingBalance: balance });
  }

  const finalBalance = balance;
  const totalProfit = finalBalance - totalInvested;
  const roiPct = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const growthMultiple = totalInvested > 0 ? finalBalance / totalInvested : 0;
  const realFinalBalance = finalBalance / Math.pow(1 + inflationPct / 100, durationYears);

  return { years, finalBalance, totalInvested, totalProfit, roiPct, growthMultiple, realFinalBalance };
}
