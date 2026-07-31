"use client";

import { useEffect, useRef, useState } from "react";

export default function WhatIsSwipe() {
  const sectionRef = useRef<HTMLElement | null>(null);
const imageRef = useRef<HTMLDivElement | null>(null);
const textRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position
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
        setScrollY(window.scrollY);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Each circle gets its own frequency/phase so they fade in and out at different
  // moments while scrolling, rather than all together
  const circlePulse = (freq: number, phase: number) =>
    0.5 + 0.5 * Math.sin(scrollY * freq + phase);

  // Reveal animation, re-triggers whether scrolling down into view or back up into view
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      ([entry]) => setImageVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    const textObserver = new IntersectionObserver(
      ([entry]) => setTextVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    if (imageRef.current) imageObserver.observe(imageRef.current);
    if (textRef.current) textObserver.observe(textRef.current);

    return () => {
      imageObserver.disconnect();
      textObserver.disconnect();
    };
  }, []);

  return (
    <section id="swipe" ref={sectionRef} className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-40 scroll-mt-24">

      {/* ================= Background ================= */}

      {/* Mesh Gradient — plain white at the very top and bottom, the beige/amber tint only lives in the middle band. Vertical (not diagonal) so both edges stay a flat, uniform color across the full width and match the hero's white edges exactly. */}
      <div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #fbf8f3 18%, #fffbeb 45%, #fbf8f3 72%, #ffffff 100%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 -z-40 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow layer — parallax + gentle scroll-tied breathing scale */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px) scale(${1 + Math.min(Math.abs(parallax), 40) * 0.0025})` }}
      >

        <div className="hidden sm:block absolute top-16 right-0 w-[300px] h-[300px] lg:top-32 lg:w-[650px] lg:h-[650px] rounded-full bg-amber-200 blur-[120px] lg:blur-[190px] opacity-10 animate-[pulse_7s_ease-in-out_infinite]" />

        <div className="absolute bottom-0 left-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[550px] lg:h-[550px] rounded-full bg-amber-200 blur-[110px] lg:blur-[170px] opacity-[0.12] animate-[pulse_9s_ease-in-out_infinite]" />

        <div className="hidden md:block absolute top-1/3 left-0 w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-stone-300 blur-[140px] lg:blur-[190px] opacity-[0.08] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-24 right-10 w-[400px] h-[400px] rounded-full bg-orange-100 blur-[160px] opacity-10 -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

        <div className="absolute -top-20 left-0 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] rounded-full bg-amber-100 blur-[110px] sm:blur-[150px] lg:blur-[210px] opacity-[0.12] -z-30 animate-[pulse_6s_ease-in-out_infinite]" />

        <div className="hidden sm:block absolute top-1/2 right-1/4 w-[260px] h-[260px] lg:w-[450px] lg:h-[450px] rounded-full bg-stone-200 blur-[120px] lg:blur-[170px] opacity-10 -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden md:block absolute bottom-1/4 left-1/3 w-[220px] h-[220px] lg:w-[380px] lg:h-[380px] rounded-full bg-amber-200 blur-[110px] lg:blur-[150px] opacity-[0.08] -z-30 animate-[pulse_7s_ease-in-out_infinite]" />

        <div className="absolute top-1/4 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px] rounded-full bg-stone-200 blur-[100px] sm:blur-[140px] lg:blur-[170px] opacity-10 -z-30 animate-[pulse_9s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-orange-100 blur-[210px] opacity-10 -z-30 animate-[pulse_11s_ease-in-out_infinite]" />

      </div>

      {/* Decorative Circles — opposite parallax + rotation, each fades in/out on its own rhythm as you scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px) rotate(${parallax * 0.06}deg)` }}
      >

        <div
          className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-stone-300/40 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0016, 0) }}
        />

        <div
          className="hidden md:block absolute -right-32 top-40 w-[380px] h-[380px] lg:-right-56 lg:w-[650px] lg:h-[650px] rounded-full border border-stone-300/30 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0021, 1.4) }}
        />

        <div
          className="hidden md:block absolute right-0 top-56 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full border border-stone-300/30 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0013, 2.8) }}
        />

        <div
          className="hidden lg:block absolute left-10 top-40 w-[400px] h-[400px] rounded-full border border-amber-200/40 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0019, 4.2) }}
        />

        <div
          className="hidden lg:block absolute left-32 bottom-10 w-[280px] h-[280px] rounded-full border border-amber-200/50 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0024, 5.6) }}
        />

      </div>

      {/* Floating Dots — same set as Hero, plus extras, drift sideways with scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.25}px)` }}
      >

        <div className="hidden sm:block absolute top-24 left-8 lg:top-32 lg:left-40 w-3 h-3 rounded-full bg-amber-400 shadow-xl animate-bounce" />

        <div className="hidden sm:block absolute top-60 right-16 lg:top-80 lg:right-80 w-2 h-2 rounded-full bg-stone-500/40" />

        <div className="hidden sm:block absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-amber-300" />

        <div className="hidden sm:block absolute top-40 right-10 lg:top-52 lg:right-32 w-4 h-4 rounded-full bg-white border border-stone-200 shadow-lg" />

        <div className="hidden lg:block absolute top-1/2 left-16 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />

        <div className="hidden lg:block absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-amber-200 animate-ping" />

        <div className="hidden sm:block absolute top-16 left-1/4 w-2 h-2 rounded-full bg-amber-300/80" />

        <div className="hidden lg:block absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-amber-400 animate-pulse" />

        <div className="hidden md:block absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-stone-500/30 animate-bounce" />

      </div>

      {/* Floating Glass Squares / Rectangles — rotate steadily with total scroll distance, either direction */}
      <div className="absolute inset-0">

        <div className="hidden lg:block absolute top-24 left-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />

        <div className="hidden lg:block absolute bottom-40 left-16 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />

        <div className="hidden md:block absolute top-1/2 right-16 w-20 h-28 rounded-[24px] bg-white/50 backdrop-blur-xl border border-white rotate-[18deg] shadow-xl" />

        <div className="hidden lg:block absolute bottom-16 right-1/4 w-14 h-14 rounded-2xl bg-amber-100/60 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />

        <div className="hidden md:block absolute top-16 right-1/3 w-12 h-20 rounded-[18px] bg-white/40 backdrop-blur-xl border border-white rotate-[-15deg] shadow-lg" />

      </div>

      {/* Noise Effect for extra texture, like Hero */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Connection Lines, like Hero */}
      <div
        className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent rotate-12 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.3}px) rotate(12deg)` }}
      />

      <div
        className="hidden lg:block absolute bottom-36 right-1/4 w-36 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent -rotate-12 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${-parallax * 0.3}px) rotate(-12deg)` }}
      />

      {/* Top Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}
      <div
        className="absolute top-0 left-0 w-full h-10 sm:h-14 lg:h-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      {/* Bottom Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}
      <div
        className="absolute bottom-0 left-0 w-full h-10 sm:h-14 lg:h-20"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid lg:grid-cols-2 items-center gap-12 sm:gap-16 lg:gap-24">

          {/* LEFT - IMAGE */}

          <div
            ref={imageRef}
            className={`relative flex justify-center order-1 transition-all duration-1000 ease-out ${
              imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >

            {/* Glow — warm beige, multi-layered, subtle */}
            <div
              className="absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[700px] lg:h-[700px] rounded-full bg-amber-100 blur-[100px] sm:blur-[150px] lg:blur-[190px] opacity-20 transition-transform duration-100 ease-out"
              style={{ transform: `translateY(${parallax * 0.15}px)` }}
            />

            <div className="hidden sm:block absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] rounded-full bg-stone-200 blur-[100px] lg:blur-[140px] opacity-[0.18]" />

            <div className="absolute w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[320px] lg:h-[320px] rounded-full bg-amber-50 blur-[70px] sm:blur-[100px] lg:blur-[130px] opacity-40" />

            {/* Subtle accent ring, same idea as the Hero polish */}
            <div className="hidden sm:block absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[620px] lg:h-[620px] rounded-full border border-dashed border-amber-300/25 animate-[spin_30s_linear_infinite]" />

            <img
              src="/liquid-glass.png"
              alt="Liquid Glass"
              className="
relative
w-[260px]
sm:w-[380px]
md:w-[440px]
lg:w-[560px]
rounded-[24px]
sm:rounded-[32px]
lg:rounded-[40px]
shadow-[0_35px_80px_rgba(120,90,50,0.12)]
hover:scale-105
hover:-translate-y-2
transition-all
duration-700
object-cover
"
            />

          </div>

          {/* RIGHT - TEXT */}

          <div
            ref={textRef}
            className={`order-2 text-center lg:text-left transition-all duration-1000 ease-out delay-150 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >

            <span className="group relative inline-flex items-center rounded-full border border-amber-200/70 bg-amber-50/60 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-amber-800/90 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-100/80 to-transparent" />
              <span className="relative">About Swipe</span>
            </span>

            <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-stone-800">
              What is{" "}
              <span className="bg-gradient-to-r from-stone-800 via-amber-700 to-amber-500 bg-clip-text text-transparent">
                Swipe?
              </span>
            </h2>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 lg:leading-10 text-stone-500 max-w-xl mx-auto lg:mx-0">
              Swipe helps people build a strong foundation of knowledge in coding,
              artificial intelligence, finance and personal growth. Instead of
              promising quick success or overnight wealth, our goal is to provide
              practical skills that create opportunities for the future.
            </p>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 lg:leading-10 text-stone-500 max-w-xl mx-auto lg:mx-0">
              We believe that real success comes from understanding, consistency and
              continuous learning. Swipe gives you the tools, guidance and structure
              to learn with confidence and build skills that last a lifetime.
            </p>

            <button className="group mt-8 sm:mt-10 lg:mt-12 rounded-full bg-stone-900 px-7 py-3.5 sm:px-8 sm:py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_50px_-15px_rgba(180,140,80,0.35)]">

              <span className="flex items-center gap-2">

                More

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </span>

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}