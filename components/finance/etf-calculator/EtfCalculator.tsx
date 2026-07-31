"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_INPUTS, calculateGrowth, type CalculatorInputs } from "./calculations";
import { DEFAULT_CURRENCY, type Currency } from "../shared/currency";
import InputsCard from "./InputsCard";
import ResultsDashboard from "./ResultsDashboard";
import GrowthChart from "./GrowthChart";
import YearlyTable from "./YearlyTable";

export default function EtfCalculator() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [inflationEnabled, setInflationEnabled] = useState(true);
  const [contributionGrowthEnabled, setContributionGrowthEnabled] = useState(true);

  const patchInputs = (patch: Partial<CalculatorInputs>) =>
    setInputs((prev) => ({ ...prev, ...patch }));

  // The raw input values stay intact while a toggle is off — so flipping it back on
  // restores whatever the user had configured instead of resetting to 0. These two are
  // pulled out to plain variables (rather than a ternary inline) so the useMemo deps
  // array below stays a flat list the linter can statically check.
  const effectiveInflationPct = inflationEnabled ? inputs.inflationPct : 0;
  const effectiveContributionGrowthPct = contributionGrowthEnabled ? inputs.contributionGrowthPct : 0;

  const result = useMemo(
    () =>
      calculateGrowth({
        initialInvestment: inputs.initialInvestment,
        monthlyContribution: inputs.monthlyContribution,
        annualReturnPct: inputs.annualReturnPct,
        durationYears: inputs.durationYears,
        inflationPct: effectiveInflationPct,
        contributionGrowthPct: effectiveContributionGrowthPct,
      }),
    [
      inputs.initialInvestment,
      inputs.monthlyContribution,
      inputs.annualReturnPct,
      inputs.durationYears,
      effectiveInflationPct,
      effectiveContributionGrowthPct,
    ]
  );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - sectionCenter;
          setParallax(distance * 0.05);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — identical language to the Finance page ================= */}

      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-amber-50 to-orange-100" />

      <div
        className="absolute inset-0 -z-40 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#d97706 1px,transparent 1px),
            linear-gradient(to bottom,#d97706 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-amber-300/40 to-transparent blur-[1px]" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-amber-500 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.28] animate-pulse" />
        <div className="hidden sm:block absolute top-1/4 right-0 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full bg-orange-400 blur-[120px] lg:blur-[180px] opacity-[0.28] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-amber-400 blur-[160px] opacity-[0.28] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-amber-500 to-orange-500 blur-[200px] opacity-[0.26] -z-30 animate-[pulse_11s_ease-in-out_infinite]" />
      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        <div className="hidden md:block absolute -right-40 top-40 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-amber-300/40" />
        <div className="hidden lg:block absolute left-16 bottom-32 w-[380px] h-[380px] rounded-full border border-amber-300/50" />
      </div>

      {/* Floating Glass Squares */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />
        <div className="hidden md:block absolute top-1/2 left-10 w-14 h-14 rounded-2xl bg-amber-100/70 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />
      </div>

      {/* Floating Dots */}
      <div className="hidden sm:block absolute top-32 left-10 w-3 h-3 rounded-full bg-amber-500 shadow-xl animate-bounce" />
      <div className="hidden lg:block absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
      <div className="hidden lg:block absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-orange-400 animate-ping" />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Top / Bottom Fade */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">

        <Link
          href="/finance"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/60 backdrop-blur-xl px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-lg transition-all duration-300 hover:-translate-x-0.5 hover:shadow-xl"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Finance
        </Link>

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`mt-10 sm:mt-14 text-center transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-amber-700">
            Finance Tool
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black">
            ETF{" "}
            <span className="bg-gradient-to-r from-black via-amber-600 to-orange-500 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl mx-auto">
            Estimate how your ETF portfolio could grow over time using
            realistic investment assumptions. Adjust your investment,
            monthly savings, expected return and investment duration to
            instantly visualize your financial future.
          </p>

        </div>

        {/* ============ Calculator ============ */}

        <div className="mt-14 sm:mt-20 space-y-8 sm:space-y-10">

          <InputsCard
            inputs={inputs}
            onChange={patchInputs}
            currency={currency}
            onCurrencyChange={setCurrency}
            inflationEnabled={inflationEnabled}
            onInflationEnabledChange={setInflationEnabled}
            contributionGrowthEnabled={contributionGrowthEnabled}
            onContributionGrowthEnabledChange={setContributionGrowthEnabled}
          />

          <ResultsDashboard inputs={inputs} result={result} currency={currency} inflationEnabled={inflationEnabled} />

          <GrowthChart years={result.years} currency={currency} />

          <YearlyTable years={result.years} currency={currency} />

        </div>

      </div>

    </section>
  );
}
