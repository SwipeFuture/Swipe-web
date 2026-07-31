"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Minimal line-art silhouettes — luxury motifs for the floating glass cards, drawn to match
// the section's thin, premium stroke language instead of using stock photography.

function YachtIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 90" fill="none" className={className}>
      <path
        d="M10 58 C 42 78, 118 78, 150 58 L 133 58 C 108 68, 52 68, 27 58 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="68" y="40" width="34" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="85" y1="40" x2="85" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M85 10 L118 38 L85 38 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="4" y1="66" x2="156" y2="66" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.4" />
    </svg>
  );
}

function JetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 90" fill="none" className={className}>
      <path
        d="M14 48 Q18 38 34 38 L118 38 Q140 38 150 46 Q140 54 118 54 L34 54 Q18 54 14 48 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M58 51 L34 76 L53 76 L82 55" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M116 39 L133 16 L122 39" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="34" cy="46" r="2" fill="currentColor" />
      <circle cx="46" cy="46" r="2" fill="currentColor" />
      <circle cx="58" cy="46" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Motivation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as the rest of the page
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

  // Reveal animation, re-triggers whether scrolling down into view or back up into view
  useEffect(() => {
    const contentObserver = new IntersectionObserver(
      ([entry]) => setContentVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (contentRef.current) contentObserver.observe(contentRef.current);

    return () => contentObserver.disconnect();
  }, []);

  return (
    <section
      id="motivation"
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-black py-32 sm:py-40 lg:py-56 scroll-mt-24"
    >

      {/* ================= Background ================= */}

      {/* Mesh Gradient — white at the very top and bottom, deep charcoal-to-black in the middle band */}
      <div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #18181b 16%, #09090b 50%, #18181b 84%, #ffffff 100%)",
        }}
      />

      {/* Faint Grid */}
      <div
        className="absolute inset-0 -z-40 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#fff 1px,transparent 1px),
            linear-gradient(to bottom,#fff 1px,transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Vignette — soft dark falloff toward the edges for a cinematic feel */}
      <div
        className="absolute inset-0 -z-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Emerald Glow layer — parallax, moves slower than scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="absolute top-20 left-1/4 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] rounded-full bg-emerald-500 blur-[110px] sm:blur-[150px] lg:blur-[200px] opacity-[0.14] animate-pulse" />

        <div className="hidden sm:block absolute bottom-10 right-10 w-[260px] h-[260px] lg:w-[500px] lg:h-[500px] rounded-full bg-green-500 blur-[110px] lg:blur-[180px] opacity-[0.12] animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-400 blur-[160px] opacity-[0.1] animate-[pulse_10s_ease-in-out_infinite]" />

        <div className="hidden md:block absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-emerald-600 blur-[140px] opacity-[0.1] -z-10 animate-[pulse_9s_ease-in-out_infinite]" />

      </div>

      {/* Decorative Circles — opposite parallax direction for depth */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -left-40 top-16 w-[450px] h-[450px] lg:-left-64 lg:w-[750px] lg:h-[750px] rounded-full border border-white/10" />

        <div className="hidden md:block absolute -right-32 bottom-10 w-[380px] h-[380px] lg:-right-56 lg:w-[650px] lg:h-[650px] rounded-full border border-white/10" />

        <div className="hidden lg:block absolute right-1/3 top-10 w-[260px] h-[260px] rounded-full border border-emerald-400/20" />

      </div>

      {/* Thin Glowing Lines */}
      <div
        className="hidden lg:block absolute top-1/3 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.3}px)` }}
      />

      <div
        className="hidden lg:block absolute bottom-1/3 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${-parallax * 0.3}px)` }}
      />

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent" />

      {/* Floating Glass Cards — luxury motifs (yacht, private jet) as thin line-art, not stock photos */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >

        <div className="hidden lg:flex absolute top-1/4 right-[12%] w-44 h-28 items-center justify-center rounded-[28px] bg-white/[0.04] backdrop-blur-xl border border-white/10 rotate-6 shadow-[0_25px_70px_rgba(0,0,0,0.45)] text-emerald-300/70">
          <div className="absolute inset-0 rounded-[28px] bg-emerald-400/10 blur-2xl -z-10" />
          <JetIcon className="w-32 h-auto" />
        </div>

        <div className="hidden lg:flex absolute bottom-1/4 left-[10%] w-44 h-28 items-center justify-center rounded-[28px] bg-white/[0.04] backdrop-blur-xl border border-white/10 -rotate-6 shadow-[0_25px_70px_rgba(0,0,0,0.45)] text-emerald-300/70">
          <div className="absolute inset-0 rounded-[28px] bg-emerald-400/10 blur-2xl -z-10" />
          <YachtIcon className="w-32 h-auto" />
        </div>

        <div className="hidden md:block absolute top-1/2 left-12 w-12 h-16 rounded-2xl bg-emerald-500/[0.06] backdrop-blur-xl border border-white/10 rotate-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]" />

      </div>

      {/* Floating Particles */}
      <div className="hidden sm:block absolute top-24 left-16 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" />

      <div className="hidden sm:block absolute bottom-32 right-1/4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)] animate-bounce" />

      <div className="hidden lg:block absolute top-1/3 right-16 w-1 h-1 rounded-full bg-emerald-300 animate-ping" />

      <div className="hidden sm:block absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-white/40" />

      <div className="hidden lg:block absolute top-16 left-1/2 w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />

      {/* Noise Effect */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Top / Bottom Fade — a longer, softer ease into white, with extra stops for a gentler S-curve than the rest of the page */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-24 sm:h-36 lg:h-48 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.75) 30%, rgba(255,255,255,0.5) 48%, rgba(255,255,255,0.28) 65%, rgba(255,255,255,0.1) 82%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 z-10 w-full h-24 sm:h-36 lg:h-48 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.75) 30%, rgba(255,255,255,0.5) 48%, rgba(255,255,255,0.28) 65%, rgba(255,255,255,0.1) 82%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div
        ref={contentRef}
        className={`relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >

        <div className="group relative inline-flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2 sm:px-5 backdrop-blur-xl shadow-lg overflow-hidden">

          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />

          <div className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />

          <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-zinc-300">
            Ready for More?
          </span>

        </div>

        <h2 className="mt-6 sm:mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-[-0.03em] lg:tracking-[-0.04em] text-white">
          Your future starts with{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-300 bg-clip-text text-transparent">
            one decision.
          </span>
        </h2>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-2xl leading-7 sm:leading-9 lg:leading-10 text-zinc-400 max-w-2xl mx-auto">
          Every great achievement begins with a single step. Stop waiting for
          the perfect moment and start building the skills that will shape
          your future.
        </p>

        <Link
          href="/motivation-experience"
          className="group/btn relative mt-10 sm:mt-12 lg:mt-16 inline-flex overflow-hidden rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-white px-9 py-5 sm:px-12 sm:py-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_25px_70px_-10px_rgba(16,185,129,0.45)]"
        >

          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/20 to-emerald-500/0 opacity-0 group-hover/btn:opacity-100 transition-all duration-500" />

          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <span className="relative flex items-center gap-2 text-base sm:text-lg font-semibold tracking-wide">
            Get Your Motivation
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </span>

        </Link>

      </div>

    </section>
  );
}
