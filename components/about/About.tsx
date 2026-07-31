"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Block =
  | { type: "p"; text: string }
  | { type: "emphasis"; lines: string[] }
  | { type: "quotes"; lines: string[] };

const p = (text: string): Block => ({ type: "p", text });
const emphasis = (...lines: string[]): Block => ({ type: "emphasis", lines });
const quotes = (...lines: string[]): Block => ({ type: "quotes", lines });

const SECTIONS: { title: string; blocks: Block[] }[] = [
  {
    title: "Why Swipe Exists",
    blocks: [
      p("Every day, millions of people spend hours consuming content that promises instant success."),
      quotes("“Get rich fast.”", "“Become an expert overnight.”", "“One simple trick.”"),
      p("Real life doesn't work like that."),
      p("Real progress is built through curiosity, consistency and continuous learning."),
      p("Instead of chasing shortcuts, Swipe focuses on building the skills that stay valuable for years."),
      emphasis("Knowledge compounds.", "Skills compound.", "Experience compounds."),
      p("The earlier you start building them, the greater the opportunities become."),
    ],
  },
  {
    title: "Our Philosophy",
    blocks: [
      emphasis("We believe success isn't something you find.", "It's something you build."),
      emphasis(
        "Every project you finish.",
        "Every page you read.",
        "Every concept you finally understand.",
        "Every hour you invest in becoming a little better than yesterday."
      ),
      p("Small improvements may seem invisible today, but over months and years they become extraordinary."),
      p("Swipe is designed around that idea."),
    ],
  },
];

const PILLARS = [
  {
    icon: "💻",
    title: "Coding",
    text: "Programming is becoming one of the world's most valuable skills. Learning to code isn't just about writing software — it's about solving problems, thinking logically and building products that can impact millions of people.",
  },
  {
    icon: "🤖",
    title: "Artificial Intelligence",
    text: "AI is transforming nearly every industry. Understanding how it works and how to use it effectively will become one of the most important skills of the next decade. Swipe helps make AI approachable, practical and useful.",
  },
  {
    icon: "💰",
    title: "Finance",
    text: "Financial knowledge creates freedom. Understanding investing, saving, budgeting and long-term thinking helps people make smarter decisions throughout their lives. Money is a tool — knowing how it works matters.",
  },
  {
    icon: "🌱",
    title: "Personal Growth",
    text: "Knowledge alone isn't enough. Discipline, consistency, focus and resilience are the qualities that turn ideas into action. Personal growth connects everything else together.",
  },
];

const CLOSING_SECTIONS: { title: string; blocks: Block[] }[] = [
  {
    title: "Our Vision",
    blocks: [
      p("Swipe is more than a website."),
      p("It's the beginning of an ecosystem designed to help people continuously improve themselves."),
      p(
        "As Swipe grows, new experiences, tools and learning paths will make it easier to explore new topics, develop valuable skills and stay motivated throughout the journey."
      ),
      p("Every feature we build shares the same purpose:"),
      emphasis("Helping people become more capable than they were yesterday."),
    ],
  },
  {
    title: "The Future",
    blocks: [
      emphasis("The future belongs to people who never stop learning."),
      emphasis("Technology will continue to evolve.", "New careers will emerge.", "Entire industries will change."),
      p("The ability to adapt will become one of the most valuable skills anyone can have."),
      p("Swipe is being built with that future in mind."),
      p("Our goal isn't simply to teach information."),
      emphasis(
        "Our goal is to help people develop the confidence, curiosity and skills needed to succeed in a constantly changing world."
      ),
    ],
  },
];

function BlockRenderer({ block }: { block: Block }) {
  if (block.type === "p") {
    return (
      <p className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
        {block.text}
      </p>
    );
  }

  if (block.type === "emphasis") {
    return (
      <div className="space-y-1">
        {block.lines.map((line) => (
          <p key={line} className="text-base sm:text-lg font-semibold tracking-tight text-black">
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {block.lines.map((line) => (
        <p key={line} className="text-sm sm:text-base italic text-gray-400">
          {line}
        </p>
      ))}
    </div>
  );
}

function SectionCard({ sections }: { sections: { title: string; blocks: Block[] }[] }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/70 bg-white/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl">

      <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

      <div className="relative divide-y divide-gray-200/70">
        {sections.map((section, i) => (
          <div key={section.title} className={i === 0 ? "pb-8 sm:pb-10" : "py-8 sm:py-10"}>

            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
              {section.title}
            </h2>

            <div className="mt-4 space-y-4">
              {section.blocks.map((block, j) => (
                <BlockRenderer key={j} block={block} />
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  const [card1Visible, setCard1Visible] = useState(false);
  const [pillarsVisible, setPillarsVisible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as the rest of the site
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
          setParallax(distance * 0.06);
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

    const observers = [
      [headerRef, make(setHeaderVisible, 0.2)] as const,
      [missionRef, make(setMissionVisible, 0.3)] as const,
      [card1Ref, make(setCard1Visible, 0.05)] as const,
      [pillarsRef, make(setPillarsVisible, 0.1)] as const,
      [card2Ref, make(setCard2Visible, 0.05)] as const,
      [closingRef, make(setClosingVisible, 0.2)] as const,
    ];

    observers.forEach(([ref, observer]) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observers.forEach(([, observer]) => observer.disconnect());
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-44 scroll-mt-24"
    >

      {/* ================= Background — same premium green language as the Hero ================= */}

      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-gray-50 to-green-50" />

      <div
        className="absolute inset-0 -z-40 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="absolute -top-10 -left-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-green-300 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.16] animate-pulse" />

        <div className="hidden sm:block absolute top-1/3 right-0 w-[280px] h-[280px] lg:w-[500px] lg:h-[500px] rounded-full bg-emerald-200 blur-[110px] lg:blur-[170px] opacity-[0.16] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gray-200 blur-[160px] opacity-20 -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

      </div>

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-gray-200/50" />

        <div className="hidden lg:block absolute left-10 bottom-20 w-[380px] h-[380px] rounded-full border border-green-200/50" />

      </div>

      <div className="hidden sm:block absolute top-24 left-8 lg:top-32 lg:left-40 w-3 h-3 rounded-full bg-green-500 shadow-xl animate-bounce" />

      <div className="hidden sm:block absolute bottom-40 right-16 w-2 h-2 rounded-full bg-black/40" />

      <div className="hidden lg:block absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-green-400 animate-pulse" />

      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-12" />

      {/* Top / Bottom Fade — thin white sliver at each edge, matching the Navbar above and Footer below */}
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

      <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}

        <div
          ref={headerRef}
          className={`text-center transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />

            <div className="relative w-2 h-2 rounded-full bg-green-500 animate-pulse" />

            <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-gray-600">
              About
            </span>

          </div>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-black">
            About{" "}
            <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
              Swipe
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-500">
            Learn today. Build tomorrow.
          </p>

        </div>

        {/* Mission */}

        <div
          ref={missionRef}
          className={`relative mt-14 sm:mt-16 text-center transition-all duration-1000 ease-out ${
            missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          <p className="text-sm sm:text-base font-semibold tracking-wide text-gray-500">
            Swipe exists for one reason:
          </p>

          <p className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug text-black max-w-2xl mx-auto">
            To help people build the{" "}
            <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              knowledge that creates real opportunities.
            </span>
          </p>

          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />

          <p className="mt-8 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-2xl mx-auto">
            We believe that education should be practical, inspiring and
            accessible to everyone. Whether you&apos;re writing your first line
            of code, exploring artificial intelligence, learning how money
            works or developing better habits, every skill you build today
            shapes the future you create tomorrow.
          </p>

          <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-2xl mx-auto">
            The world changes quickly. Technology evolves. Industries
            transform. New opportunities appear every day.
          </p>

          <p className="mt-6 text-lg sm:text-xl font-semibold tracking-tight text-black">
            The people who continue learning are the people who continue
            growing.
          </p>

          <p className="mt-2 text-base sm:text-lg text-gray-500">
            That is what Swipe is built for.
          </p>

        </div>

        {/* Card 1 — Why Swipe Exists / Our Philosophy */}

        <div
          ref={card1Ref}
          className={`relative mt-14 sm:mt-16 lg:mt-20 transition-all duration-1000 ease-out ${
            card1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionCard sections={SECTIONS} />
        </div>

        {/* Four Pillars */}

        <div
          ref={pillarsRef}
          className={`relative mt-14 sm:mt-16 lg:mt-20 transition-all duration-1000 ease-out ${
            pillarsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
              Four{" "}
              <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
                Pillars
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Swipe is built around four areas that shape the future.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="relative rounded-[28px] border border-white/70 bg-white/60 backdrop-blur-xl p-6 sm:p-7 shadow-lg"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 border border-white shadow-md text-2xl">
                  <div className="absolute inset-0 rounded-2xl bg-green-300 blur-lg opacity-30 -z-10" />
                  <span>{pillar.icon}</span>
                </div>

                <h3 className="relative mt-4 text-base sm:text-lg font-bold tracking-tight text-black">
                  {pillar.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-gray-500">
                  {pillar.text}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Card 2 — Our Vision / The Future */}

        <div
          ref={card2Ref}
          className={`relative mt-14 sm:mt-16 lg:mt-20 transition-all duration-1000 ease-out ${
            card2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <SectionCard sections={CLOSING_SECTIONS} />
        </div>

        {/* Join the Journey — closing statement */}

        <div
          ref={closingRef}
          className={`relative mt-14 sm:mt-16 lg:mt-20 text-center transition-all duration-1000 ease-out ${
            closingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          <p className="text-sm sm:text-base font-semibold tracking-wide text-gray-500">
            Join the Journey
          </p>

          <div className="mt-4 space-y-1">
            <p className="text-base sm:text-lg text-gray-500">Every expert was once a beginner.</p>
            <p className="text-base sm:text-lg text-gray-500">Every successful company started with a single idea.</p>
            <p className="text-base sm:text-lg text-gray-500">Every meaningful achievement begins with the decision to learn.</p>
          </div>

          <p className="mt-6 text-base sm:text-lg leading-7 text-gray-500 max-w-xl mx-auto">
            No matter where you are today, your next skill could change your
            future.
          </p>

          <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
              Swipe.
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg font-semibold text-gray-600">
            Build skills. Create opportunities. Keep growing.
          </p>

          <Link
            href="/#learning-paths"
            className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-7 py-4 sm:px-9 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-20 transition-all" />
            <span className="relative">Explore Learning Paths</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}
