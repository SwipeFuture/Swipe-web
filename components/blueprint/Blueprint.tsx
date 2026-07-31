"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ================= Content =================
// Kept as plain data so every line of copy stays easy to find and edit.

type Pillar = {
  id: string;
  number: string;
  icon: string;
  title: string;
  tagline: string;
  label: string;
  paragraphs: string[];
  roadmap: string[];
};

const PILLARS: Pillar[] = [
  {
    id: "blueprint-coding",
    number: "01",
    icon: "💻",
    title: "Coding",
    tagline: "Learn to Build",
    label: "The Digital Skill",
    paragraphs: [
      "Programming has become one of the most valuable skills in the modern world.",
      "Companies no longer evaluate candidates only by degrees or certificates. Many employers also look at practical experience.",
      "A strong GitHub profile.",
      "Real-world projects.",
      "Problem solving.",
      "Consistency.",
      "A portfolio often says more than a résumé.",
      "Whether you dream of working at a startup, building your own business or joining a global technology company, learning to code opens countless opportunities.",
      "Every project makes you better.",
      "Every mistake teaches you something.",
      "Every line of code builds confidence.",
    ],
    roadmap: [
      "Learn",
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Git",
      "GitHub",
      "APIs",
      "Projects",
      "Portfolio",
      "Open Source",
      "Job Ready",
    ],
  },
  {
    id: "blueprint-ai",
    number: "02",
    icon: "🤖",
    title: "Artificial Intelligence",
    tagline: "Learn the Future",
    label: "The Next Generation Skill",
    paragraphs: [
      "Artificial Intelligence is changing the way people work, create and solve problems.",
      "Understanding AI is becoming just as valuable as learning to use computers once was.",
      "The goal is not to replace human creativity.",
      "The goal is to multiply it.",
      "Learn how language models work. Understand prompt engineering. Build AI applications.",
      "Automate repetitive work. Create tools that save hours every week.",
      "The people who understand AI today will have a significant advantage tomorrow.",
    ],
    roadmap: [
      "AI Basics",
      "Prompt Engineering",
      "Machine Learning",
      "LLMs",
      "Automation",
      "AI Projects",
      "Deploy Apps",
      "Future Ready",
    ],
  },
  {
    id: "blueprint-finance",
    number: "03",
    icon: "💰",
    title: "Finance",
    tagline: "Build Financial Freedom",
    label: "The Long Game",
    paragraphs: [
      "Money is a tool.",
      "Understanding how money works is one of the most valuable life skills you can learn.",
      "Swipe focuses on long-term thinking rather than chasing unrealistic promises.",
      "Learn budgeting. Understand investing. Discover ETFs.",
      "See how compound interest works. Use an ETF calculator to visualize how small monthly investments can grow over many years.",
      "Financial freedom isn't built overnight.",
      "It is built through patience, smart decisions and consistency.",
    ],
    roadmap: [
      "Budgeting",
      "Saving",
      "Emergency Fund",
      "ETFs",
      "Compound Interest",
      "ETF Calculator",
      "Long-Term Investing",
      "Financial Confidence",
    ],
  },
  {
    id: "blueprint-growth",
    number: "04",
    icon: "🌱",
    title: "Personal Growth",
    tagline: "Become Better Every Day",
    label: "The Foundation",
    paragraphs: [
      "Knowledge alone is never enough.",
      "Discipline creates action.",
      "Consistency creates progress.",
      "Focus creates results.",
      "Personal growth is the foundation that connects everything else.",
      "Learning becomes easier when you develop better habits. Challenges become smaller when your mindset becomes stronger.",
      "Success is rarely about talent.",
      "It is usually about showing up every day.",
    ],
    roadmap: [
      "Mindset",
      "Discipline",
      "Habits",
      "Focus",
      "Deep Work",
      "Productivity",
      "Confidence",
      "Consistency",
      "Growth",
    ],
  },
];

const REALITY_PARAGRAPHS = [
  "Many people search for shortcuts.",
  "Fast money.",
  "Instant success.",
  "The perfect opportunity.",
  "The truth is different.",
  "Every successful developer once wrote their first line of code.",
  "Every investor started with their first investment.",
  "Every entrepreneur started with an idea.",
  "Success is rarely one big moment.",
  "It is thousands of small moments that compound over time.",
  "Don't compare your beginning to someone else's finish.",
  "Build your own path.",
];

const COMPOUND_PARAGRAPHS = [
  "One hour doesn't seem important today.",
  "One year does.",
  "Five years can completely change your life.",
  "Learning compounds.",
  "Knowledge compounds.",
  "Experience compounds.",
  "Your future compounds.",
];

const FINAL_PARAGRAPHS = [
  "Nobody can promise success.",
  "Nobody can guarantee results.",
  "But everyone can decide to keep learning.",
  "Every skill you develop increases the number of opportunities available to you.",
  "Swipe exists to make that journey easier.",
];

// A line under ~5 words reads as a punchy standalone statement, so it gets bolder
// treatment automatically instead of every line needing to be tagged by hand.
function ParagraphStack({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {lines.map((line, i) => {
        const short = line.split(" ").length <= 5;
        return (
          <p
            key={i}
            className={
              short
                ? "text-base sm:text-lg font-semibold tracking-tight text-black"
                : "text-sm sm:text-base leading-6 sm:leading-7 text-gray-500"
            }
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

function RoadmapCard({ steps }: { steps: string[] }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-blue-500/0 via-blue-500/40 to-blue-400/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl">

        <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

        <div className="relative flex flex-col items-center">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-700 hover:shadow-md hover:scale-105">
                {step}
              </span>
              {i < steps.length - 1 && (
                <span className="my-1 text-blue-500/70 text-base leading-none select-none">↓</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function BigNumber({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none select-none absolute -top-6 sm:-top-10 -left-2 sm:-left-6 text-[6rem] sm:text-[8rem] lg:text-[9rem] font-black leading-none text-blue-100 -z-10"
    >
      {children}
    </span>
  );
}

export default function Blueprint() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  // One IntersectionObserver drives every fade-in in this section — hero, each pillar,
  // reality, the compound-effect block, and the final CTA — indexed by array position.
  const revealTargets = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>(() => Array(8).fill(false));

  const reveal = (index: number, delay = "") =>
    `transition-all duration-1000 ease-out ${delay} ${
      visible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    }`;

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
      (entries) => {
        entries.forEach((entry) => {
          const index = revealTargets.current.findIndex((el) => el === entry.target);
          if (index === -1) return;
          setVisible((prev) => {
            if (prev[index] === entry.isIntersecting) return prev;
            const next = [...prev];
            next[index] = entry.isIntersecting;
            return next;
          });
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blueprint"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — same premium language as the Hero, pushed into electric blue ================= */}

      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-blue-50 to-sky-100" />

      <div
        className="absolute inset-0 -z-40 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#0033ff 1px,transparent 1px),
            linear-gradient(to bottom,#0033ff 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vertical electric glow line running down the middle, like the Hero */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent blur-[1px]" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-blue-500 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.3] animate-pulse" />

        <div className="hidden sm:block absolute top-1/4 right-0 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full bg-cyan-300 blur-[120px] lg:blur-[180px] opacity-[0.3] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-sky-400 blur-[160px] opacity-[0.3] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 blur-[200px] opacity-[0.28] -z-30 animate-[pulse_11s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-blue-600 blur-[180px] opacity-[0.15] -z-30 animate-[pulse_9s_ease-in-out_infinite]" />

      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        <div className="hidden md:block absolute -right-40 top-40 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-blue-300/40" />
        <div className="hidden lg:block absolute left-16 bottom-32 w-[380px] h-[380px] rounded-full border border-blue-300/50" />
        <div className="hidden lg:block absolute right-1/4 top-16 w-[240px] h-[240px] rounded-full border border-cyan-300/50" />
        <div className="hidden md:block absolute left-1/4 top-2/3 w-[300px] h-[300px] rounded-full border border-blue-200/40" />
      </div>

      {/* Floating Glass Squares — same language as the Hero */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />
        <div className="hidden lg:block absolute bottom-32 left-1/5 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />
        <div className="hidden md:block absolute top-1/2 left-10 w-14 h-14 rounded-2xl bg-blue-100/70 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />
        <div className="hidden md:block absolute bottom-1/4 right-10 w-12 h-16 rounded-2xl bg-cyan-100/60 backdrop-blur-xl border border-white/70 rotate-[15deg] shadow-lg" />
      </div>

      {/* Floating Dots */}
      <div className="hidden sm:block absolute top-32 left-10 w-3 h-3 rounded-full bg-blue-500 shadow-xl animate-bounce" />
      <div className="hidden sm:block absolute top-2/3 right-16 w-2 h-2 rounded-full bg-black/40" />
      <div className="hidden lg:block absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <div className="hidden lg:block absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-sky-400 animate-ping" />
      <div className="hidden sm:block absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      <div className="hidden lg:block absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-white border border-blue-200 shadow-lg" />

      {/* Connection Lines */}
      <div className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent rotate-12" />
      <div className="hidden lg:block absolute bottom-36 right-1/4 w-36 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent -rotate-12" />

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

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* ============ Hero ============ */}

        <div
          ref={(el) => {
            revealTargets.current[0] = el;
          }}
          className={`grid lg:grid-cols-2 items-center gap-12 lg:gap-20 ${reveal(0)}`}
        >

          <div className="text-center lg:text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-blue-700 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
              <span className="relative">Your Roadmap</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              The{" "}
              <span className="bg-gradient-to-r from-black via-blue-700 to-blue-500 bg-clip-text text-transparent">
                Blueprint
              </span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-gray-600 font-medium">
              Build the skills that create opportunities.
            </p>

            <div className="mt-6 space-y-4 max-w-xl mx-auto lg:mx-0">
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
                Success rarely happens overnight.
              </p>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
                It is built through knowledge, consistency, curiosity and
                thousands of small decisions made over time.
              </p>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
                Every project you complete, every book you finish, every
                concept you finally understand and every habit you improve
                moves you one step closer to the future you want.
              </p>
              <p className="text-base sm:text-lg font-semibold text-black">
                Swipe is designed to help you build that future.
              </p>
            </div>

            <Link
              href="#blueprint-coding"
              className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-7 py-4 sm:px-9 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-20 transition-all" />
              <span className="relative">Start Building</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

          </div>

          {/* Hero image — liquid-glass-vier.png */}
          <div className="relative order-1 lg:order-2 flex justify-center">

            <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full bg-blue-500 blur-[100px] sm:blur-[150px] opacity-50 animate-pulse" />

            <img
              src="/liquid-glass-vier.png"
              alt="Blueprint preview"
              className="relative w-[240px] sm:w-[340px] lg:w-[420px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(0,0,50,0.2)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:rotate-2 hover:scale-[1.03] rotate-[-2deg]"
            />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Pillars ============ */}

        <div className="relative mt-16 sm:mt-24 lg:mt-28 space-y-24 sm:space-y-32 lg:space-y-40">

          {/* Timeline spine running behind all four pillars on large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-200 to-transparent -z-10" />

          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.id}
              id={pillar.id}
              ref={(el) => {
                revealTargets.current[i + 1] = el;
              }}
              className={`relative scroll-mt-24 ${reveal(i + 1)}`}
            >

              <div
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                }`}
              >

                {/* Text */}
                <div className="relative text-center lg:text-left">

                  <BigNumber>{pillar.number}</BigNumber>

                  <span className="relative inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700">
                    {pillar.label}
                  </span>

                  <h2 className="relative mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
                    <span className="text-3xl sm:text-4xl mr-2 align-middle">{pillar.icon}</span>
                    {pillar.title}
                    <span className="block mt-1 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                      {pillar.tagline}
                    </span>
                  </h2>

                  <ParagraphStack lines={pillar.paragraphs} className="relative mt-6 max-w-xl mx-auto lg:mx-0" />

                </div>

                {/* Roadmap */}
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <RoadmapCard steps={pillar.roadmap} />
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ 05 Reality ============ */}

        <div
          ref={(el) => {
            revealTargets.current[5] = el;
          }}
          className={`relative mt-16 sm:mt-24 lg:mt-28 ${reveal(5)}`}
        >

          <div
            data-nav-theme="dark"
            className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-blue-500/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 sm:p-12 lg:p-16 shadow-2xl"
          >

            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500 blur-[130px] opacity-40 -z-0 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-cyan-400 blur-[130px] opacity-30 -z-0" />

            <BigNumber>05</BigNumber>

            <div className="relative text-center max-w-2xl mx-auto">

              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gray-300">
                Reality
              </span>

              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                There Is No{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Shortcut
                </span>
              </h2>

              <div className="mt-8 space-y-3 text-left sm:text-center">
                {REALITY_PARAGRAPHS.map((line, i) => {
                  const short = line.split(" ").length <= 5;
                  return (
                    <p
                      key={i}
                      className={
                        short
                          ? "text-base sm:text-lg font-semibold text-white"
                          : "text-sm sm:text-base leading-6 sm:leading-7 text-gray-400"
                      }
                    >
                      {line}
                    </p>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

        {/* ============ 06 The Compound Effect ============ */}

        <div
          ref={(el) => {
            revealTargets.current[6] = el;
          }}
          className={`relative mt-16 sm:mt-24 lg:mt-28 text-center ${reveal(6)}`}
        >

          <BigNumber>06</BigNumber>

          <span className="relative inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700">
            The Long Game
          </span>

          <h2 className="relative mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
            The{" "}
            <span className="bg-gradient-to-r from-black via-blue-700 to-blue-500 bg-clip-text text-transparent">
              Compound Effect
            </span>
          </h2>

          <div className="relative mt-10 sm:mt-12 flex flex-col items-center gap-3">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800">1 hour every day</span>
            <span className="text-blue-500 text-2xl">↓</span>
            <span className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-black via-blue-700 to-blue-500 bg-clip-text text-transparent">
              365 hours every year
            </span>
          </div>

          <p className="relative mt-8 text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Thousands of new ideas. Hundreds of finished projects. Skills that
            can change your future.
          </p>

          <ParagraphStack lines={COMPOUND_PARAGRAPHS} className="relative mt-10 max-w-xl mx-auto items-center text-center" />

        </div>

        {/* ============ Final CTA ============ */}

        <div
          ref={(el) => {
            revealTargets.current[7] = el;
          }}
          className={`relative mt-16 sm:mt-24 lg:mt-28 text-center ${reveal(7)}`}
        >

          {/* Second image — liquid-glass-fuenf.png — floating beside this closing text */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[2%] xl:right-[6%] group/img2">
            <div className="absolute -inset-6 rounded-[40px] bg-cyan-400 blur-[70px] opacity-50 -z-10 transition-opacity duration-500 group-hover/img2:opacity-70" />
            <img
              src="/liquid-glass-fuenf.png"
              alt="Blueprint detail"
              className="relative w-[190px] xl:w-[230px] rounded-[28px] border border-white/70 shadow-[0_35px_80px_rgba(0,0,50,0.2)] backdrop-blur-xl bg-white/40 transition-transform duration-700 rotate-6 hover:rotate-0 hover:scale-105"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-tight text-black">
            Build skills.
            <br />
            Build confidence.
            <br />
            <span className="bg-gradient-to-r from-black via-blue-700 to-blue-500 bg-clip-text text-transparent">
              Build your future.
            </span>
          </h2>

          <ParagraphStack lines={FINAL_PARAGRAPHS} className="mt-8 max-w-xl mx-auto text-center" />

          <Link
            href="/#learning-paths"
            className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-8 py-4 sm:px-10 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-20 transition-all" />
            <span className="relative">Start Learning</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}
