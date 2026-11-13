"use client";

import Link from "next/link";
import AreaArt from "@/components/home/AreaArt";
import { useEffect, useRef, useState } from "react";

// ================= Content =================
//
// Version 1 of the Coding page — an overview, not a full course. Five large cards
// introduce the main areas of programming and point toward the upcoming SwipeFuture Coding
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

function AreaCard({ area, revealClass }: { area: LearningArea; revealClass: string }) {
  const cardInner = (
    <>
      

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
    "relative h-full flex flex-col cursor-pointer overflow-hidden rounded-[32px] sm:rounded-[36px] border border-[#ececea] bg-white p-7 sm:p-9 transition-all duration-500 ease-out hover:-translate-y-1.5";

  return (
    <div className={`group relative h-full transition-all duration-700 ease-out ${revealClass}`}>

      

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
    const ctaObserver = make(setCtaVisible, 0.3);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (introRef.current) introObserver.observe(introRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      heroObserver.disconnect();
      introObserver.disconnect();
      gridObserver.disconnect();
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
      
      {/* Bottom fade is taller and eases in earlier than the site-wide default — with how
          saturated the dark green gets near the SwipeFuture Coding card, the short version left too
          hard an edge right before the (unchanged) white footer. */}
      

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

            <span className="relative inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#E7FAF0", color: "#127D4D" }}>
              
              <span className="relative">Coding</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Learn to{" "}
              <span className="" style={{ color: "#127D4D" }}>
                Code
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl">
              Learn how software is built, explore modern programming and
              discover the technologies behind today&apos;s digital world.
            </p>

            <div className="mt-10 flex justify-start">

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <Link href="/learn#coding" className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">
                <span className="relative">Start a free lesson</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
                <a href="#learning-areas" className="inline-flex items-center justify-center rounded-xl border-2 border-[#ececea] bg-white px-7 py-4 text-[17px] font-bold text-[#121212] transition-colors hover:border-[#121212]">Explore topics ↓</a>
              </div>

            </div>

          </div>

          <div className="max-lg:hidden relative order-1 lg:order-2 flex justify-center">

            

            <AreaArt area="coding" className="w-[240px] sm:w-[340px] lg:w-[420px]" />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ Introduction ============ */}

        <div
          ref={introRef}
          className={`mt-16 sm:mt-24 lg:mt-28 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            introVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="max-lg:hidden relative flex justify-center order-1">

            

            <AreaArt area="coding" className="w-[220px] sm:w-[300px] lg:w-[360px]" />

          </div>

          <div className="text-left order-2">

            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#E7FAF0", color: "#127D4D" }}>
              Why Coding
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              The skill behind{" "}
              <span>
                everything digital
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl">
              Coding is the process of giving instructions to a computer —
              turning ideas into software that runs on the devices we use
              every day. It&apos;s one of the most valuable skills you can
              learn today, opening doors across nearly every industry.
            </p>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl">
              Every website, app, and AI system you interact with is powered
              by code. This page is your starting point — a quick overview
              of the main areas of programming before diving deeper with
              SwipeFuture.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "🌍", label: "Powers the digital world" },
                { icon: "🧩", label: "Five core areas to explore" },
                { icon: "🚀", label: "The SwipeFuture app is coming" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50/50 px-4 py-3 text-left"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-50" aria-hidden />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ Learning Areas ============ */}

        <div id="learning-areas" className="relative mt-16 sm:mt-20 lg:mt-24 scroll-mt-24">

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#E7FAF0", color: "#127D4D" }}>
              Learning Areas
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Where to{" "}
              <span>
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
                revealClass={gridVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
              />
            ))}
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
              Start with lesson one of{" "}
              <span>
                any language.
              </span>
            </h2>

            <p className="relative mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl">
              Every track begins with what the language is and why people
              use it. Five minutes a lesson, no account needed.
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
