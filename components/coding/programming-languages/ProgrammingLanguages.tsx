"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES, type Language } from "./languages";

// ================= Content =================
//
// Unlike the other Coding sub-pages, this section isn't a chapter accordion —
// it's an overview of the languages themselves, so each entry is a flat data
// object (shared with the per-language detail pages via ./languages) rendered
// straight into a staggered, alternating layout below.

function LanguageSection({
  language,
  index,
}: {
  language: Language;
  index: number;
}) {
  const alignRight = index % 2 === 1;

  return (
    <div
      id={language.slug}
      className="relative scroll-mt-36 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12"
    >

      {/* Large index numeral — decorative, typography-only accent */}
      <span
        className={`hidden lg:block absolute top-0 select-none text-[10rem] xl:text-[13rem] font-black leading-none text-green-900/20 -z-10 ${
          alignRight ? "-right-6 xl:-right-10" : "-left-6 xl:-left-10"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Logo slot — fills the whole empty side of the section. Shows the
          real logo once one exists for this language, otherwise a
          placeholder; no border, just soft rounded corners. */}
      <div
        className={`w-full lg:w-[42%] xl:w-[44%] flex ${
          alignRight ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="relative w-full aspect-square rounded-[32px] overflow-hidden shadow-xl">
          <div className="absolute inset-0 rounded-[32px] bg-green-600 blur-2xl opacity-20 -z-10" />
          {language.logo ? (
            <img
              src={language.logo}
              alt={`${language.name} logo`}
              className="relative w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full bg-green-50/60 flex flex-col items-center justify-center gap-2 text-green-800/50">
              <span className="text-4xl">🧩</span>
              <span className="text-sm font-semibold text-center px-6">Logo coming soon</span>
            </div>
          )}
        </div>
      </div>

      <div className={`w-full lg:w-[58%] xl:w-[54%] text-left ${alignRight ? "lg:order-2" : "lg:order-1"}`}>

        <span className="text-xs font-semibold tracking-wide text-green-700">
          {String(index + 1).padStart(2, "0")} / {String(LANGUAGES.length).padStart(2, "0")}
        </span>

        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
          {language.name}
        </h2>

        <p className="mt-2 text-base sm:text-lg font-medium text-green-800">
          {language.tagline}
        </p>

        <p className="mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
          {language.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Best For
            </div>
            <div className="mt-1.5 text-sm sm:text-base text-gray-700 max-w-xs">
              {language.bestFor}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Difficulty
            </div>
            <div className="mt-1.5 text-sm sm:text-base text-gray-700">
              {language.difficulty}
            </div>
          </div>

        </div>

        <Link
          href={`/coding/programming-languages/${language.slug}`}
          className="group relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full border border-green-200 bg-green-50 px-6 py-3 text-sm font-semibold text-green-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-green-300"
        >
          <span className="relative">Learn More</span>
          <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>

      </div>

    </div>
  );
}

export default function ProgrammingLanguages() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [listVisible, setListVisible] = useState(false);

  const promoRef = useRef<HTMLDivElement | null>(null);
  const [promoVisible, setPromoVisible] = useState(false);

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
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const listObserver = new IntersectionObserver(
      ([entry]) => setListVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    const promoObserver = new IntersectionObserver(
      ([entry]) => setPromoVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (listRef.current) listObserver.observe(listRef.current);
    if (promoRef.current) promoObserver.observe(promoRef.current);

    return () => {
      heroObserver.disconnect();
      listObserver.disconnect();
      promoObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — identical language to the Coding page ================= */}

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
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-green-900 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.3] animate-pulse" />
        <div className="hidden sm:block absolute top-1/4 right-0 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full bg-emerald-600 blur-[120px] lg:blur-[180px] opacity-[0.3] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-green-700 blur-[160px] opacity-[0.28] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-green-800 to-emerald-800 blur-[200px] opacity-[0.24] -z-30 animate-[pulse_11s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500 blur-[180px] opacity-[0.18] -z-30 animate-[pulse_9s_ease-in-out_infinite]" />
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
        className="absolute top-0 left-0 z-10 w-full h-24 sm:h-32 lg:h-44 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.12) 85%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 z-10 w-full h-24 sm:h-32 lg:h-44 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.12) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        <Link
          href="/coding"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/60 backdrop-blur-xl px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-lg transition-all duration-300 hover:-translate-x-0.5 hover:shadow-xl"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Coding
        </Link>

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`mt-10 sm:mt-14 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="text-center lg:text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-green-900 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />
              <span className="relative">Coding · Learning Area</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Programming{" "}
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                Languages
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              This section introduces the world&apos;s most popular
              programming languages — what they&apos;re used for, who
              they&apos;re best suited for and how to choose the right one
              before diving into detailed lessons.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">

              <a
                href="#languages"
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
              src="/liquid-glass-computer-green.png"
              alt="Programming Languages preview"
              className="relative w-[240px] sm:w-[340px] lg:w-[420px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(20,83,45,0.2)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:rotate-2 hover:scale-[1.03] rotate-[-2deg]"
            />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Table of Contents ============ */}

        <div className="sticky top-20 sm:top-24 z-30 mt-10 sm:mt-14 flex justify-center">
          <nav className="w-full max-w-4xl overflow-x-auto rounded-full border border-white/70 bg-white/70 backdrop-blur-xl shadow-lg px-2 py-2">
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-max mx-auto">
              {LANGUAGES.map((language) => (
                <a
                  key={language.slug}
                  href={`#${language.slug}`}
                  className="whitespace-nowrap rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-600 transition-all duration-300 hover:bg-green-50 hover:text-green-900"
                >
                  {language.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* ============ Language Sections ============ */}

        <div
          id="languages"
          ref={listRef}
          className={`relative mt-20 sm:mt-24 lg:mt-28 scroll-mt-36 flex flex-col transition-all duration-1000 ease-out ${
            listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {LANGUAGES.map((language, i) => (
            <div key={language.slug}>
              {i > 0 && (
                <div className="mt-20 sm:mt-24 lg:mt-28 mb-20 sm:mb-24 lg:mb-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              )}
              <LanguageSection language={language} index={i} />
            </div>
          ))}
        </div>

        {/* ============ Swipe Coding — promo banner (no waitlist here) ============ */}

        <div
          ref={promoRef}
          className={`group relative mt-24 sm:mt-28 lg:mt-32 transition-all duration-1000 ease-out ${
            promoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="absolute -inset-px rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-green-500/0 via-green-500/50 to-emerald-400/0 opacity-60 blur-lg -z-10" />

          <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-white/10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 p-8 sm:p-12 lg:p-16 shadow-2xl text-center">

            <div className="pointer-events-none absolute inset-0 rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />

            <div className="hidden sm:block absolute -right-20 -top-20 w-80 h-80 rounded-full bg-green-500 blur-[130px] opacity-30 -z-10" />
            <div className="hidden lg:block absolute -left-16 -bottom-20 w-72 h-72 rounded-full bg-emerald-400 blur-[120px] opacity-20 -z-10" />

            <div className="relative flex flex-col items-center">

              <span className="relative order-1 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 backdrop-blur-sm px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide text-green-300">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Coming Soon
              </span>

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
              Want to learn to code?{" "}
              <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-green-200 bg-clip-text text-transparent">
                Do it with Swipe.
              </span>
            </h3>

            <p className="relative mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-green-100/70 max-w-2xl mx-auto">
              Swipe Coding is our upcoming interactive programming platform —
              built to take you from your first line of code to real,
              job-ready skills.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
