// Pure growth-simulation math for the ETF calculator — no React, no formatting, so it's
// trivial to unit-test or reuse (e.g. for the compound interest calculator later).

export type CalculatorInputs = {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturnPct: number;
  durationYears: number;
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

export const DEFAULT_INPUTS: CalculatorInputs = {
  initialInvestment: 10000,
  monthlyContribution: 500,
  annualReturnPct: 8,
  durationYears: 30,
  inflationPct: 2,
  contributionGrowthPct: 2,
};

// Simulated month-by-month so compounding and the annual contribution step-up are both
// accurate, but only year-end snapshots are kept — that's all the chart/table need.
export function calculateGrowth(inputs: CalculatorInputs): CalculatorResult {
  const { initialInvestment, monthlyContribution, annualReturnPct, durationYears, inflationPct, contributionGrowthPct } = inputs;

  const monthlyRate = Math.pow(1 + annualReturnPct / 100, 1 / 12) - 1;

  let balance = initialInvestment;
  let totalInvested = initialInvestment;
  let currentContribution = monthlyContribution;

  const years: YearPoint[] = [
    { year: 0, startingBalance: 0, totalInvested: initialInvestment, interestEarned: 0, endingBalance: initialInvestment },
  ];

  for (let year = 1; year <= durationYears; year++) {
    const startingBalance = balance;
    let interestEarned = 0;

    if (year > 1) {
      currentContribution *= 1 + contributionGrowthPct / 100;
    }

    for (let month = 0; month < 12; month++) {
      const interest = balance * monthlyRate;
      interestEarned += interest;
      balance += interest + currentContribution;
      totalInvested += currentContribution;
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
