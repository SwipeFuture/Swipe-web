"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_INPUTS, calculateCompoundGrowth, type CompoundInputs } from "./calculations";
import { DEFAULT_CURRENCY, type Currency } from "../shared/currency";
import InputsCard from "./InputsCard";
import AdviceNote from "@/components/learn/AdviceNote";
import ResultsDashboard from "./ResultsDashboard";
import GrowthChart from "./GrowthChart";
import YearlyTable from "./YearlyTable";

export default function CompoundInterestCalculator() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const [inputs, setInputs] = useState<CompoundInputs>(DEFAULT_INPUTS);
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [inflationEnabled, setInflationEnabled] = useState(true);
  const [contributionGrowthEnabled, setContributionGrowthEnabled] = useState(true);

  const patchInputs = (patch: Partial<CompoundInputs>) =>
    setInputs((prev) => ({ ...prev, ...patch }));

  // The raw input values stay intact while a toggle is off — so flipping it back on
  // restores whatever the user had configured instead of resetting to 0. These two are
  // pulled out to plain variables (rather than a ternary inline) so the useMemo deps
  // array below stays a flat list the linter can statically check.
  const effectiveInflationPct = inflationEnabled ? inputs.inflationPct : 0;
  const effectiveContributionGrowthPct = contributionGrowthEnabled ? inputs.contributionGrowthPct : 0;

  const result = useMemo(
    () =>
      calculateCompoundGrowth({
        initialInvestment: inputs.initialInvestment,
        contributionAmount: inputs.contributionAmount,
        contributionFrequency: inputs.contributionFrequency,
        annualRatePct: inputs.annualRatePct,
        durationYears: inputs.durationYears,
        compoundingFrequency: inputs.compoundingFrequency,
        inflationPct: effectiveInflationPct,
        contributionGrowthPct: effectiveContributionGrowthPct,
      }),
    [
      inputs.initialInvestment,
      inputs.contributionAmount,
      inputs.contributionFrequency,
      inputs.annualRatePct,
      inputs.durationYears,
      inputs.compoundingFrequency,
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

      {/* ================= Background — identical language to the Finance / ETF Calculator pages ================= */}

      <div className="absolute inset-0 -z-50 bg-white " />

      

      

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        
        
        
        
      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        
        
      </div>

      {/* Floating Glass Squares */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        
        
      </div>

      {/* Floating Dots */}
      
      
      

      {/* Noise */}
      

      {/* Top / Bottom Fade */}
      
      

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">

        <Link
          href="/finance"
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-[#3a3a38] hover:text-[#121212]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Finance
        </Link>

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`mt-10 sm:mt-14 text-center transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#FEF5DA", color: "#B45309" }}>
            Finance Tool
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black">
            Compound Interest{" "}
            <span className="" style={{ color: "#B45309" }}>
              Calculator
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl">
            Discover how compound interest can grow your wealth over time.
            Experiment with different investment amounts, contribution
            schedules, interest rates and compounding frequencies to
            instantly see the power of long-term investing.
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

          <AdviceNote area="finance" />

        </div>

      </div>

    </section>
  );
}
