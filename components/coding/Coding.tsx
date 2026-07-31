"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ================= Content =================
//
// Version 1 of the Coding page — an overview, not a full course. Five large cards
// introduce the main areas of programming and point toward the upcoming Swipe Coding
// platform, whose own card carries the waitlist CTA.

type LearningArea = {
  icon: string;
  title: string;
  text: string;
  href?: string;
};

const AREAS: LearningArea[] = [
  {
    icon: "📖",
    title: "Introduction",
    text: "Learn the fundamentals of programming, how computers work, how the internet works and the mindset required to become a developer.",
    href: "/coding/introduction",
  },
  {
    icon: "💻",
    title: "Programming Languages",
    text: "Discover the world's most popular programming languages, what they are used for and which language is best for your goals.",
    href: "/coding/programming-languages",
  },
  {
    icon: "🧠",
    title: "Core Programming Concepts",
    text: "Understand variables, data types, loops, conditionals and functions — the fundamental building blocks every programming language shares.",
    href: "/coding/core-programming-concepts",
  },
  {
    icon: "🌐",
    title: "Web Development",
    text: "Explore HTML, CSS, JavaScript, React, Next.js and the technologies used to build modern websites and web applications.",
    href: "/coding/web-development",
  },
  {
    icon: "🛠️",
    title: "Developer Tools",
    text: "Get familiar with Git, code editors, the command line and the everyday tools developers rely on to build and ship software.",
    href: "/coding/developer-tools",
  },
];

const SWIPE_CODING_FEATURES = [
  "Interactive lessons",
  "Step-by-step learning paths",
  "Coding challenges",
  "Real-world projects",
  "Progress tracking",
  "AI-powered learning",
  "Certificates",
  "Community",
];

function AreaCard({ area, revealClass }: { area: LearningArea; revealClass: string }) {
  const cardInner = (
    <>
      <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

      <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-[24px] bg-gradient-to-br from-green-100 to-emerald-50 border border-white shadow-md text-3xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">
        <div className="absolute inset-0 rounded-[24px] bg-green-600 blur-lg opacity-30 -z-10" />
        <span>{area.icon}</span>
      </div>

      <h3 className="relative mt-6 text-xl sm:text-2xl font-bold tracking-tight text-black">
        {area.title}
      </h3>

      <p className="relative mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 flex-1">
        {area.text}
      </p>

      <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-green-900">
        Explore
        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-green-300 text-green-800 transition-transform duration-500 group-hover:translate-x-1 group-hover:bg-green-800 group-hover:text-white group-hover:border-green-800">
          →
        </span>
      </div>
    </>
  );

  const cardClassName =
    "relative h-full flex flex-col cursor-pointer overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl p-7 sm:p-9 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_40px_100px_-20px_rgba(20,83,45,0.3)]";

  return (
    <div className={`group relative h-full transition-all duration-700 ease-out ${revealClass}`}>

      <div className="absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-green-800/0 via-green-800/50 to-emerald-600/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

      {area.href ? (
        <Link href={area.href} className={cardClassName}>
          {cardInner}
        </Link>
      ) : (
        <div className={cardClassName}>{cardInner}</div>
      )}

    </div>
  );
}

export default function Coding() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const introRef = useRef<HTMLDivElement | null>(null);
  const [introVisible, setIntroVisible] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridVisible, setGridVisible] = useState(false);

  const waitlistRef = useRef<HTMLDivElement | null>(null);
  const [waitlistVisible, setWaitlistVisible] = useState(false);

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
    const introObserver = make(setIntroVisible, 0.2);
    const gridObserver = make(setGridVisible, 0.1);
    const waitlistObserver = make(setWaitlistVisible, 0.2);
    const ctaObserver = make(setCtaVisible, 0.3);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (introRef.current) introObserver.observe(introRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);
    if (waitlistRef.current) waitlistObserver.observe(waitlistRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      heroObserver.disconnect();
      introObserver.disconnect();
      gridObserver.disconnect();
      waitlistObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="coding"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — same premium language as AI/Finance/Personal Growth, in dark green ================= */}

      {/* A fuller 5-stop gradient (rather than the simple 3-stop `from/via/to` used elsewhere)
          so the page genuinely eases back to white at the very bottom instead of ending on a
          colored stop and leaning entirely on the short fade overlay to fake it — the richer
          green in the middle band also reads as "more green" without needing louder accents. */}
      <div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #ecfdf5 16%, #bbf7d0 42%, #d1fae5 66%, #f0fdf4 85%, #ffffff 100%)",
        }}
      />

      <div
        className="absolute inset-0 -z-40 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#14532d 1px,transparent 1px),
            linear-gradient(to bottom,#14532d 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-green-300/40 to-transparent blur-[1px]" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-green-900 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.32] animate-pulse" />
        <div className="hidden sm:block absolute top-1/4 right-0 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full bg-emerald-600 blur-[120px] lg:blur-[180px] opacity-[0.32] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-green-700 blur-[160px] opacity-[0.3] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-green-800 to-emerald-800 blur-[200px] opacity-[0.26] -z-30 animate-[pulse_11s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500 blur-[180px] opacity-[0.2] -z-30 animate-[pulse_9s_ease-in-out_infinite]" />
        <div className="hidden md:block absolute top-[58%] right-[8%] w-[260px] h-[260px] lg:w-[420px] lg:h-[420px] rounded-full bg-green-600 blur-[130px] lg:blur-[170px] opacity-[0.2] -z-30 animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="hidden md:block absolute top-[38%] left-[6%] w-[220px] h-[220px] lg:w-[360px] lg:h-[360px] rounded-full bg-emerald-700 blur-[120px] lg:blur-[150px] opacity-[0.18] -z-30 animate-[pulse_13s_ease-in-out_infinite]" />
      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        <div className="hidden md:block absolute -right-40 top-40 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-green-400/50" />
        <div className="hidden lg:block absolute left-16 bottom-32 w-[380px] h-[380px] rounded-full border border-green-400/60" />
        <div className="hidden lg:block absolute right-1/4 top-16 w-[240px] h-[240px] rounded-full border border-emerald-300/70" />
      </div>

      {/* Floating Glass Squares */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />
        <div className="hidden lg:block absolute bottom-32 left-1/5 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />
        <div className="hidden md:block absolute top-1/2 left-10 w-14 h-14 rounded-2xl bg-green-100/70 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />
      </div>

      {/* Floating Dots */}
      <div className="hidden sm:block absolute top-32 left-10 w-3 h-3 rounded-full bg-green-800 shadow-xl animate-bounce" />
      <div className="hidden sm:block absolute top-2/3 right-16 w-2 h-2 rounded-full bg-black/40" />
      <div className="hidden lg:block absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-green-800 animate-pulse" />
      <div className="hidden lg:block absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-emerald-600 animate-ping" />

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
      {/* Bottom fade is taller and eases in earlier than the site-wide default — with how
          saturated the dark green gets near the Swipe Coding card, the short version left too
          hard an edge right before the (unchanged) white footer. */}
      <div
        className="absolute bottom-0 left-0 z-10 w-full h-24 sm:h-32 lg:h-44 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.12) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="text-center lg:text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-green-900 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />
              <span className="relative">Coding</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Learn to{" "}
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                Code
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              Learn how software is built, explore modern programming and
              discover the technologies behind today&apos;s digital world.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">

              <a
                href="#learning-areas"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-7 py-4 sm:px-9 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(20,83,45,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-emerald-600 opacity-0 group-hover:opacity-20 transition-all" />
                <span className="relative">Start</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

            </div>

          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">

            <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full bg-green-800 blur-[100px] sm:blur-[150px] opacity-50 animate-pulse" />

            <img
              src="/liquid-glass-zwölf.png"
              alt="Swipe Coding preview"
              className="relative w-[240px] sm:w-[340px] lg:w-[420px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(20,83,45,0.2)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:rotate-2 hover:scale-[1.03] rotate-[-2deg]"
            />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Introduction ============ */}

        <div
          ref={introRef}
          className={`mt-16 sm:mt-24 lg:mt-28 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="relative flex justify-center order-1">

            <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full bg-green-600 blur-[100px] sm:blur-[130px] opacity-40" />

            <img
              src="/liquid-glass-dreizehn.png"
              alt="Why coding matters"
              className="relative w-[220px] sm:w-[300px] lg:w-[360px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(20,83,45,0.18)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:-rotate-2 hover:scale-[1.03] rotate-2"
            />

          </div>

          <div className="text-center lg:text-left order-2">

            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-green-900">
              Why Coding
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              The skill behind{" "}
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                everything digital
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              Coding is the process of giving instructions to a computer —
              turning ideas into software that runs on the devices we use
              every day. It&apos;s one of the most valuable skills you can
              learn today, opening doors across nearly every industry.
            </p>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              Every website, app, and AI system you interact with is powered
              by code. This page is your starting point — a quick overview
              of the main areas of programming before diving deeper into
              Swipe Coding.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🌍", label: "Powers the digital world" },
                { icon: "🧩", label: "Five core areas to explore" },
                { icon: "🚀", label: "Swipe Coding coming soon" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50/50 px-4 py-3 text-left"
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Learning Areas ============ */}

        <div id="learning-areas" className="relative mt-16 sm:mt-20 lg:mt-24 scroll-mt-24">

          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-green-900">
              Learning Areas
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Where to{" "}
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                Start
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Five areas that make up the world of programming.
            </p>
          </div>

          <div
            ref={gridRef}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7"
          >
            {AREAS.map((area) => (
              <AreaCard
                key={area.title}
                area={area}
                revealClass={gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              />
            ))}
          </div>

          {/* ============ Swipe Coding — Coming Soon (featured) ============ */}

          <div
            ref={waitlistRef}
            className={`group relative mt-6 sm:mt-7 transition-all duration-1000 ease-out ${
              waitlistVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >

            <div className="absolute -inset-px rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-green-500/0 via-green-500/50 to-emerald-400/0 opacity-60 blur-lg -z-10" />

            <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-white/10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 p-8 sm:p-12 lg:p-16 shadow-2xl text-center">

              <div className="pointer-events-none absolute inset-0 rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />

              <div className="hidden sm:block absolute -right-20 -top-20 w-80 h-80 rounded-full bg-green-500 blur-[130px] opacity-30 -z-10" />
              <div className="hidden lg:block absolute -left-16 -bottom-20 w-72 h-72 rounded-full bg-emerald-400 blur-[120px] opacity-20 -z-10" />

              {/* Explicit flex-column so the stacking order is unambiguous — badge first,
                  logos second, regardless of how the inline/block boxes would otherwise flow */}
              <div className="relative flex flex-col items-center">

                <span className="relative order-1 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 backdrop-blur-sm px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide text-green-300">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Coming Soon
                </span>

                {/* Both Swipe Coding marks, layered — each PNG already carries its own solid
                    tile background (black-on-black, black-on-white), so no extra frame is
                    needed here — just the images themselves, big and soft-cornered */}
                <div className="relative order-2 mt-10 sm:mt-12 flex items-center justify-center w-56 h-36 sm:w-72 sm:h-44">

                  <div className="absolute inset-0 rounded-[40px] bg-green-400 blur-3xl opacity-20 -z-10" />

                  <img
                    src="/logo-coding-black.png"
                    alt="Swipe Coding"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-[28px] object-cover shadow-2xl -rotate-6 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:-translate-x-2"
                  />

                  <img
                    src="/logo-coding-white.png"
                    alt="Swipe Coding"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-[28px] object-cover shadow-2xl rotate-6 transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:translate-x-2"
                  />

                </div>

              </div>

              <h3 className="relative mt-8 sm:mt-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Swipe{" "}
                <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-200 bg-clip-text text-transparent">
                  Coding
                </span>
              </h3>

              <p className="relative mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-green-100/70 max-w-2xl mx-auto">
                Swipe Coding will become Swipe&apos;s interactive programming
                platform — built to take you from your first line of code to
                real, job-ready skills.
              </p>

              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
                {SWIPE_CODING_FEATURES.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3.5 py-2 text-xs sm:text-sm font-medium text-green-100/90"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-400" />
                    {feature}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* ============ CTA ============ */}

        <div
          ref={ctaRef}
          className={`relative mt-16 sm:mt-24 lg:mt-28 transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="absolute -inset-px rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-green-500/0 via-green-500/50 to-emerald-400/0 opacity-60 blur-lg -z-10" />

          <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-white/70 bg-white/60 backdrop-blur-xl p-10 sm:p-16 lg:p-20 shadow-2xl text-center">

            <div className="pointer-events-none absolute inset-0 rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

            <div className="hidden sm:block absolute -right-16 -top-16 w-72 h-72 rounded-full bg-green-300 blur-[110px] opacity-40 -z-10" />
            <div className="hidden lg:block absolute -left-10 -bottom-16 w-64 h-64 rounded-full bg-emerald-200 blur-[100px] opacity-40 -z-10" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Your coding journey{" "}
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                starts today
              </span>
            </h2>

            <p className="relative mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl mx-auto">
              Every confident developer started exactly where you are now.
              Keep building your understanding with Swipe and turn what you
              learn into skills you actually use.
            </p>

            <div className="relative mt-8 sm:mt-10 flex justify-center">
              <Link
                href="/#learning-paths"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-8 py-4 sm:px-10 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(20,83,45,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-emerald-600 opacity-0 group-hover:opacity-20 transition-all" />
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
