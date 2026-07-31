"use client";

import { useEffect, useRef, useState } from "react";

const STORY_BLOCKS = [
  {
    icon: "🚀",
    title: "Built for the Future",
    text: "Technology is changing rapidly. Swipe helps people stay ahead by learning the skills that matter most.",
    delay: "",
  },
  {
    icon: "🎯",
    title: "Real Knowledge Over Hype",
    text: "Instead of chasing trends or unrealistic promises, Swipe focuses on practical knowledge that creates long-term value.",
    delay: "delay-150",
  },
  {
    icon: "🧠",
    title: "Learn With Purpose",
    text: "Every lesson should help users understand concepts deeply and apply them in real life.",
    delay: "",
  },
  {
    icon: "🌐",
    title: "One Ecosystem",
    text: "Coding, AI, Finance and Personal Growth all work together to help people build a better future.",
    delay: "delay-150",
  },
];

export default function WhySwipe() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const topBlocksRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const bottomBlocksRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [topBlocksVisible, setTopBlocksVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [bottomBlocksVisible, setBottomBlocksVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as the Hero
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
          setParallax(distance * 0.08);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal animations, re-trigger whether scrolling down into view or back up into view
  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const topBlocksObserver = new IntersectionObserver(
      ([entry]) => setTopBlocksVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const quoteObserver = new IntersectionObserver(
      ([entry]) => setQuoteVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    const bottomBlocksObserver = new IntersectionObserver(
      ([entry]) => setBottomBlocksVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (topBlocksRef.current) topBlocksObserver.observe(topBlocksRef.current);
    if (quoteRef.current) quoteObserver.observe(quoteRef.current);
    if (bottomBlocksRef.current) bottomBlocksObserver.observe(bottomBlocksRef.current);

    return () => {
      headerObserver.disconnect();
      topBlocksObserver.disconnect();
      quoteObserver.disconnect();
      bottomBlocksObserver.disconnect();
    };
  }, []);

  const [topBlocks, bottomBlocks] = [STORY_BLOCKS.slice(0, 2), STORY_BLOCKS.slice(2)];

  return (
    <section id="why-us" ref={sectionRef} className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24">

      {/* ================= Divider ================= */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* ================= Background — identical language to the Hero ================= */}

      {/* Mesh Gradient — white at both the very top and bottom, the gray/green tint only lives in the middle band, so the edges match the white sliver of the fade layers below instead of fighting them */}
      <div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #f9fafb 22%, #f0fdf4 50%, #f9fafb 78%, #ffffff 100%)",
        }}
      />

      {/* Grid */}
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

      {/* Glow layer — parallax, moves slower than scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="absolute top-24 -left-20 w-[350px] h-[350px] sm:top-32 sm:w-[500px] sm:h-[500px] lg:top-48 lg:-left-40 lg:w-[700px] lg:h-[700px] rounded-full bg-green-300 blur-[100px] sm:blur-[140px] lg:blur-[170px] opacity-20 animate-pulse" />

        <div className="hidden sm:block absolute top-16 right-0 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:top-32 lg:w-[600px] lg:h-[600px] rounded-full bg-emerald-200 blur-[100px] sm:blur-[140px] lg:blur-[180px] opacity-25 -z-30" />

        <div className="absolute bottom-0 left-1/2 w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-gray-200 blur-[90px] sm:blur-[120px] lg:blur-[160px] opacity-40 -z-30" />

        <div className="hidden lg:block absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-green-200 to-emerald-400 blur-[210px] opacity-20 -z-30" />

      </div>

      {/* Decorative Circles — opposite parallax direction for depth */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-gray-200/50" />

        <div className="hidden md:block absolute -right-32 top-40 w-[380px] h-[380px] lg:-right-56 lg:w-[650px] lg:h-[650px] rounded-full border border-gray-200/40" />

        <div className="hidden lg:block absolute left-20 bottom-32 w-[550px] h-[550px] rounded-full border border-gray-200/40" />

        <div className="hidden lg:block absolute left-40 bottom-10 w-[350px] h-[350px] rounded-full border border-green-200/50" />

      </div>

      {/* Floating Dots */}
      <div className="hidden sm:block absolute top-24 left-8 lg:top-32 lg:left-40 w-3 h-3 rounded-full bg-green-500 shadow-xl animate-bounce" />

      <div className="hidden sm:block absolute top-60 right-16 lg:top-80 lg:right-80 w-2 h-2 rounded-full bg-black/40" />

      <div className="hidden sm:block absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-green-400" />

      <div className="hidden sm:block absolute top-40 right-10 lg:top-52 lg:right-32 w-4 h-4 rounded-full bg-white shadow-lg border border-gray-200" />

      <div className="hidden lg:block absolute bottom-24 right-1/3 w-3 h-3 rounded-full bg-green-300 animate-ping" />

      {/* Floating Glass Squares — parallax */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >

        <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />

        <div className="hidden lg:block absolute bottom-32 left-1/4 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />

        <div className="hidden md:block absolute top-1/2 left-10 w-14 h-14 rounded-2xl bg-green-100/60 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />

      </div>

      {/* Noise Effect */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Connection Lines */}
      <div className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-12" />

      <div className="hidden lg:block absolute bottom-36 right-1/4 w-36 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent -rotate-12" />

      {/* Top / Bottom Fade — only a thin sliver right at each edge is pure white, softly eased. z-10 so it always sits above every glow/circle/dot layer, regardless of DOM order. */}
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

      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}

        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />

            <div className="relative w-2 h-2 rounded-full bg-green-500 animate-pulse" />

            <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-gray-600">
              Why Swipe
            </span>

          </div>

          <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] lg:tracking-[-0.05em] text-black">
            Why{" "}
            <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
              Swipe?
            </span>
          </h2>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 text-gray-500">
            We&apos;re not building another platform that promises shortcuts.
            We&apos;re building a place where knowledge creates opportunities.
          </p>

        </div>

        {/* Top Story Blocks */}

        <div
          ref={topBlocksRef}
          className="mt-16 sm:mt-24 lg:mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-12 sm:gap-y-14"
        >

          {topBlocks.map((block) => (
            <div
              key={block.title}
              className={`group relative pt-8 border-t border-gray-200/70 transition-all duration-1000 ease-out ${block.delay} ${
                topBlocksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >

              <div className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 border border-white shadow-md text-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">

                <div className="absolute inset-0 rounded-2xl bg-green-300 blur-lg opacity-30 -z-10" />

                <span>{block.icon}</span>

              </div>

              <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold tracking-tight text-black">
                {block.title}
              </h3>

              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 max-w-md">
                {block.text}
              </p>

              <div className="mt-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

            </div>
          ))}

        </div>

        {/* Quote */}

        <div
          ref={quoteRef}
          className={`relative mt-20 sm:mt-28 lg:mt-32 text-center transition-all duration-1000 ease-out ${
            quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          <span className="block text-6xl sm:text-7xl text-green-200 leading-none select-none">
            &ldquo;
          </span>

          <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug text-black max-w-3xl mx-auto">
            Success isn&apos;t built overnight.{" "}
            <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              It&apos;s built one skill at a time.
            </span>
          </p>

          <div className="mx-auto mt-6 sm:mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />

        </div>

        {/* Bottom Story Blocks */}

        <div
          ref={bottomBlocksRef}
          className="mt-20 sm:mt-28 lg:mt-32 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-12 sm:gap-y-14"
        >

          {bottomBlocks.map((block) => (
            <div
              key={block.title}
              className={`group relative pt-8 border-t border-gray-200/70 transition-all duration-1000 ease-out ${block.delay} ${
                bottomBlocksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >

              <div className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 border border-white shadow-md text-2xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">

                <div className="absolute inset-0 rounded-2xl bg-green-300 blur-lg opacity-30 -z-10" />

                <span>{block.icon}</span>

              </div>

              <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold tracking-tight text-black">
                {block.title}
              </h3>

              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 max-w-md">
                {block.text}
              </p>

              <div className="mt-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
