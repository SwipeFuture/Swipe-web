"use client";

import Link from "next/link";
import AreaArt from "@/components/home/AreaArt";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LessonKey, Lesson } from "./lessons/types";
import { introductionToFinance } from "./lessons/01-introduction-to-finance";
import { budgetingAndSaving } from "./lessons/02-budgeting-and-saving";
import { bankingAndMoney } from "./lessons/03-banking-and-money";
import { investingBasics } from "./lessons/04-investing-basics";
import { etfs } from "./lessons/05-etfs";
import { stocks } from "./lessons/06-stocks";
import { compoundInterest } from "./lessons/07-compound-interest";
import { riskAndDiversification } from "./lessons/08-risk-and-diversification";
import { personalFinance } from "./lessons/09-personal-finance";
import { financialMistakes } from "./lessons/10-financial-mistakes";
import { buildingLongTermWealth } from "./lessons/11-building-long-term-wealth";
import { futureOfFinance } from "./lessons/12-future-of-finance";

// ================= Content =================
//
// Each chapter's lesson content lives in its own file under ./lessons — see
// components/swipe-ai/lessons/01-introduction-to-ai.ts for the format this
// mirrors. Adding or editing a lesson only ever means touching that one
// small file; this component never grows.

type Chapter = {
  number: string;
  icon: string;
  title: string;
  summary: string;
  lesson?: Lesson;
};

const CHAPTERS: Chapter[] = [
  { number: "01", icon: "💰", title: "Introduction to Finance", summary: "Learn what finance is, why money works the way it does and why financial knowledge is one of the most valuable life skills.", lesson: introductionToFinance },
  { number: "02", icon: "🧮", title: "Budgeting & Saving", summary: "Understand how budgeting creates financial stability and why consistent saving builds long-term security.", lesson: budgetingAndSaving },
  { number: "03", icon: "🏦", title: "Banking & Money", summary: "Explore how banks work, different account types, interest, payments and the modern financial system.", lesson: bankingAndMoney },
  { number: "04", icon: "📈", title: "Investing Basics", summary: "Learn the core principles of investing, risk, return and how investments grow over time.", lesson: investingBasics },
  { number: "05", icon: "📊", title: "ETFs", summary: "Discover why Exchange Traded Funds are one of the most popular long-term investment options and how diversification reduces risk.", lesson: etfs },
  { number: "06", icon: "🏢", title: "Stocks", summary: "Understand what stocks represent, how companies raise capital and how investors participate in business growth.", lesson: stocks },
  { number: "07", icon: "⏳", title: "Compound Interest", summary: "Learn why compound interest is often called the most powerful force in investing and how time dramatically increases wealth.", lesson: compoundInterest },
  { number: "08", icon: "⚖️", title: "Risk & Diversification", summary: "Understand investment risk, portfolio diversification and how balancing assets helps reduce volatility.", lesson: riskAndDiversification },
  { number: "09", icon: "💳", title: "Personal Finance", summary: "Learn how to manage income, expenses, debt and financial goals to build a healthy financial future.", lesson: personalFinance },
  { number: "10", icon: "⚠️", title: "Financial Mistakes", summary: "Identify common money mistakes and learn strategies to avoid costly financial decisions.", lesson: financialMistakes },
  { number: "11", icon: "🏆", title: "Building Long-Term Wealth", summary: "Explore how consistency, patience and disciplined investing create wealth over decades rather than overnight.", lesson: buildingLongTermWealth },
  { number: "12", icon: "🚀", title: "The Future of Finance", summary: "Learn how technology, AI, digital banking and innovation are transforming the future of personal finance.", lesson: futureOfFinance },
];

// The eight lesson sections shown inside every expanded chapter, in order.
const LESSON_SECTIONS: { key: LessonKey; label: string }[] = [
  { key: "introduction", label: "Introduction" },
  { key: "whyItMatters", label: "Why It Matters" },
  { key: "keyPrinciples", label: "Key Principles" },
  { key: "examples", label: "Examples" },
  { key: "commonMistakes", label: "Common Mistakes" },
  { key: "exercises", label: "Exercises" },
  { key: "summary", label: "Summary" },
  { key: "resources", label: "Resources" },
];

// Turns **bold** and *italic* spans inside a line of lesson text into styled inline elements.
function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*.+?\*\*|\*.+?\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.length > 1 && part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-gray-600">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
}

// A tiny lesson-text parser: blank line = new paragraph, "* " = bullet, "## "/"### " =
// sub-heading, "---" = divider. Keeps pasted lesson copy free of any JSX/markup.
function renderLessonText(raw: string): ReactNode[] {
  const lines = raw.trim().split("\n").map((line) => line.trim());
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(
      <p key={blocks.length} className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
        {renderInline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul
        key={blocks.length}
        className="list-disc pl-5 space-y-1.5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500"
      >
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (line === "---") {
      flushParagraph();
      flushList();
      blocks.push(
        <div
          key={blocks.length}
          className="h-px w-full bg-white "
        />
      );
      continue;
    }

    const heading = line.match(/^#{2,3}\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(
        <h5 key={blocks.length} className="text-sm sm:text-base font-bold tracking-tight text-black">
          {renderInline(heading[1])}
        </h5>
      );
      continue;
    }

    const bullet = line.match(/^[*-]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function ChapterCard({
  chapter,
  isOpen,
  onToggle,
  revealClass,
}: {
  chapter: Chapter;
  isOpen: boolean;
  onToggle: () => void;
  revealClass: string;
}) {
  return (
    <div
      className={`group relative h-full transition-all duration-700 ease-out ${revealClass} ${
        isOpen ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >

      {/* Glowing border halo */}
      

      <div
        className={`relative h-full flex flex-col overflow-hidden rounded-[32px] sm:rounded-[36px] border border-[#ececea] bg-white transition-all duration-500 ease-out ${
          isOpen ? "" : "hover:-translate-y-1.5"
        }`}
      >

        

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative w-full text-left p-6 sm:p-8 flex-1 flex flex-col"
        >

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-4">

              <div>
                <span className="text-[13px] font-bold text-[#B45309]">
                  Chapter {chapter.number}
                </span>
                <h3 className="mt-0.5 text-lg sm:text-xl font-bold tracking-tight text-black">
                  {chapter.title}
                </h3>
              </div>

            </div>

            <span
              className={`mt-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-amber-200 text-amber-600 transition-transform duration-500 ${
                isOpen ? "rotate-90 bg-amber-600 text-white border-amber-600" : "group-hover:translate-x-0.5"
              }`}
            >
              →
            </span>

          </div>

          <p className="relative mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 line-clamp-3">
            {chapter.summary}
          </p>

        </button>

        {/* Accordion body — animates via grid-template-rows, no JS height measuring needed */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="relative px-6 sm:px-8 pb-8 pt-2">

              <div className="h-px w-full bg-white mb-6" />

              {chapter.lesson && Object.values(chapter.lesson).some(Boolean) ? (
                // Real lesson copy — read as a stacked document, one section after another.
                <div className="max-w-3xl mx-auto divide-y divide-amber-100">
                  {LESSON_SECTIONS.map(({ key, label }) => (
                    <div key={key} className="py-6 first:pt-0 last:pb-0">
                      <h4 className="text-base sm:text-lg font-bold tracking-tight text-amber-700">
                        {label}
                      </h4>
                      <div className="mt-3 space-y-3">
                        {chapter.lesson?.[key] ? (
                          renderLessonText(chapter.lesson[key]!)
                        ) : (
                          <p className="text-sm italic text-gray-400">[ Lesson content goes here ]</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // No lesson written yet — light placeholder grid.
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {LESSON_SECTIONS.map(({ key, label }) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 sm:p-5"
                    >
                      <h4 className="text-sm font-bold tracking-tight text-amber-700">
                        {label}
                      </h4>
                      <p className="mt-1.5 text-sm italic text-gray-400">
                        [ Lesson content goes here ]
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {chapter.number === "05" && (
                <div className="max-w-3xl mx-auto mt-8 rounded-[28px] border border-amber-200/70 bg-white p-6 sm:p-8 text-center">
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-black">
                    Practice What You&apos;ve Learned
                  </h4>
                  <p className="mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 max-w-xl mx-auto">
                    Use the Swipe ETF Calculator to experiment with
                    different monthly investments, expected returns and
                    investment durations. Instantly see how long-term
                    investing and compound growth can affect your
                    portfolio over time.
                  </p>
                  <Link
                    href="/finance/etf-calculator"
                    className="group/btn relative mt-5 inline-flex items-center gap-2 rounded-xl bg-[#121212] text-white px-6 py-3 text-[15px] font-bold transition-colors hover:bg-[#2a2a2a]"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-all" />
                    <span className="relative">Open ETF Calculator</span>
                    <span className="relative transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </Link>
                </div>
              )}

              {chapter.number === "07" && (
                <div className="max-w-3xl mx-auto mt-8 rounded-[28px] border border-amber-200/70 bg-white p-6 sm:p-8 text-center">
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-black">
                    Try the Compound Interest Calculator
                  </h4>
                  <p className="mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-600 max-w-xl mx-auto">
                    Experiment with different interest rates, contribution
                    amounts and compounding frequencies to see how compound
                    interest can dramatically increase your wealth over
                    time.
                  </p>
                  <Link
                    href="/finance/compound-interest-calculator"
                    className="group/btn relative mt-5 inline-flex items-center gap-2 rounded-xl bg-[#121212] text-white px-6 py-3 text-[15px] font-bold transition-colors hover:bg-[#2a2a2a]"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-all" />
                    <span className="relative">Open Compound Interest Calculator</span>
                    <span className="relative transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

function ToolCard({
  icon,
  title,
  description,
  revealClass,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  revealClass: string;
  href?: string;
}) {
  return (
    <div className={`group relative transition-all duration-700 ease-out ${revealClass}`}>

      

      <div className="relative h-full flex flex-col overflow-hidden rounded-[32px] sm:rounded-[36px] border border-[#ececea] bg-white p-7 sm:p-9 transition-all duration-500 ease-out hover:-translate-y-1.5">

        

        <h3 className="relative mt-6 text-xl sm:text-2xl font-bold tracking-tight text-black">
          {title}
        </h3>

        <p className="relative mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 flex-1">
          {description}
        </p>

        {href ? (
          <Link
            href={href}
            className="group/btn relative mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#121212] text-white px-5 py-2.5 text-[15px] font-bold transition-colors hover:bg-[#2a2a2a]"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-all" />
            <span className="relative">Open Calculator</span>
            <span className="relative transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-700 cursor-not-allowed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Coming Soon
          </button>
        )}

      </div>

    </div>
  );
}

export default function Finance() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridVisible, setGridVisible] = useState(false);

  const toolsRef = useRef<HTMLDivElement | null>(null);
  const [toolsVisible, setToolsVisible] = useState(false);

  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

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
    const make = (setter: (v: boolean) => void, threshold: number) =>
      new IntersectionObserver(([entry]) => setter(entry.isIntersecting), { threshold });

    const heroObserver = make(setHeroVisible, 0.2);
    const aboutObserver = make(setAboutVisible, 0.2);
    const gridObserver = make(setGridVisible, 0.05);
    const toolsObserver = make(setToolsVisible, 0.2);
    const ctaObserver = make(setCtaVisible, 0.3);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (aboutRef.current) aboutObserver.observe(aboutRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);
    if (toolsRef.current) toolsObserver.observe(toolsRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      heroObserver.disconnect();
      aboutObserver.disconnect();
      gridObserver.disconnect();
      toolsObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="finance"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — same premium language as AI/Personal Growth, in amber/gold ================= */}

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

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-amber-700 overflow-hidden">
              
              <span className="relative">Finance Learning</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Money, explained
              <br />
              <span className="" style={{ color: "#B45309" }}>
                without the jargon.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl">
              Learn the fundamentals of personal finance, investing, saving
              and long-term wealth building. Swipe Finance teaches practical
              financial knowledge that helps people make smarter money
              decisions throughout life.
            </p>

            <div className="mt-10 flex justify-start">

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <Link href="/learn#finance" className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">
                <span className="relative">Start a free lesson</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
                <a href="#chapters" className="inline-flex items-center justify-center rounded-xl border-2 border-[#ececea] bg-white px-7 py-4 text-[17px] font-bold text-[#121212] transition-colors hover:border-[#121212]">Explore topics ↓</a>
              </div>

            </div>

          </div>

          <div className="max-lg:hidden relative order-1 lg:order-2 flex justify-center">

            

            <AreaArt area="finance" className="w-[240px] sm:w-[340px] lg:w-[420px]" />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ About ============ */}

        <div
          ref={aboutRef}
          className={`mt-16 sm:mt-24 lg:mt-28 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            aboutVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="max-lg:hidden relative flex justify-center order-1">

            

            <AreaArt area="finance" className="w-[220px] sm:w-[300px] lg:w-[360px]" />

          </div>

          <div className="text-left order-2">

            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#FEF5DA", color: "#B45309" }}>
              Why Swipe Finance
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Money skills{" "}
              <span>
                nobody taught you
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl">
              Most schools teach algebra and history, but rarely explain how
              interest, investing, credit or taxes actually work. Swipe
              Finance closes that gap — turning money from a source of
              confusion and stress into something you understand and
              control.
            </p>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl">
              Financial literacy is one of the highest-leverage skills you
              can build. It&apos;s not about getting rich overnight —
              it&apos;s about making informed, confident decisions with the
              money you earn, at every stage of life.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "📚", label: "12 practical chapters" },
                { icon: "🧮", label: "Real calculators, real numbers" },
                { icon: "🎯", label: "No jargon, just clarity" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 px-4 py-3 text-left"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-50" aria-hidden />
                  <span className="text-xs sm:text-sm font-semibold text-stone-700">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ Chapters ============ */}

        <div id="chapters" className="relative mt-16 sm:mt-20 lg:mt-24 scroll-mt-24">

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#FEF5DA", color: "#B45309" }}>
              Learning Chapters
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Twelve{" "}
              <span>
                Chapters
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Tap a chapter to preview what you&apos;ll learn inside.
            </p>
          </div>

          <div
            ref={gridRef}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            {CHAPTERS.map((chapter, i) => (
              <ChapterCard
                key={chapter.number}
                chapter={chapter}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                revealClass={gridVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
              />
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ Finance Tools ============ */}

        <div className="relative mt-16 sm:mt-24 lg:mt-28">

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#FEF5DA", color: "#B45309" }}>
              Practical Tools
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Finance{" "}
              <span>
                Tools
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Practical calculators that help you apply what you learn.
            </p>
          </div>

          <div
            ref={toolsRef}
            className="mt-10 sm:mt-14 grid sm:grid-cols-2 gap-6 sm:gap-7"
          >
            <ToolCard
              icon="📊"
              title="ETF Calculator"
              description="Estimate how your ETF investments could grow over time. Enter your starting investment, monthly contribution, expected annual return and investment duration to visualize the potential growth of a diversified investment portfolio."
              revealClass={toolsVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
              href="/finance/etf-calculator"
            />
            <ToolCard
              icon="⏳"
              title="Compound Interest Calculator"
              description="Discover how compound interest accelerates long-term wealth. Experiment with different investment amounts, interest rates and time periods to understand why starting early can make a significant difference."
              revealClass={toolsVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
              href="/finance/compound-interest-calculator"
            />
          </div>

        </div>

        {/* ============ CTA ============ */}

        <div
          ref={ctaRef}
          className={`relative mt-16 sm:mt-24 lg:mt-28 transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          

          <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-[#ececea] bg-white p-8 sm:p-12 lg:p-16 text-left">

            

            
            

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Start with your{" "}
              <span>
                first budget.
              </span>
            </h2>

            <p className="relative mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl">
              Budgeting, saving, credit and investing in short lessons with
              real numbers. Free, and no account needed.
            </p>

            <div className="relative mt-8 sm:mt-10 flex justify-start">
              <Link
                href="/#learning-paths"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]"
              >
                <span className="relative">Explore More Paths</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
