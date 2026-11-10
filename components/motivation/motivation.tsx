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
      className="relative overflow-hidden bg-black py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background ================= */}

      {/* Mesh Gradient — white at the very top and bottom, deep charcoal-to-black in the middle band */}
      

      {/* Faint Grid */}
      

      {/* Vignette — soft dark falloff toward the edges for a cinematic feel */}
      

      {/* Emerald Glow layer — parallax, moves slower than scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        

        

        

        

      </div>

      {/* Decorative Circles — opposite parallax direction for depth */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -left-40 top-16 w-[450px] h-[450px] lg:-left-64 lg:w-[750px] lg:h-[750px] rounded-full border border-white/10" />

        <div className="hidden md:block absolute -right-32 bottom-10 w-[380px] h-[380px] lg:-right-56 lg:w-[650px] lg:h-[650px] rounded-full border border-white/10" />

        

      </div>

      {/* Thin Glowing Lines */}
      <div
        className="hidden lg:block absolute top-1/3 left-0 w-1/3 h-px bg-white transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.3}px)` }}
      />

      <div
        className="hidden lg:block absolute bottom-1/3 right-0 w-1/3 h-px bg-white transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${-parallax * 0.3}px)` }}
      />

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-white " />

      {/* Floating Glass Cards — luxury motifs (yacht, private jet) as thin line-art, not stock photos */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >

        <div className="hidden lg:flex absolute top-1/4 right-[12%] w-44 h-28 items-center justify-center rounded-[28px] bg-white/[0.04] border border-white/10 rotate-6 text-emerald-300/70">
          
          <JetIcon className="w-32 h-auto" />
        </div>

        <div className="hidden lg:flex absolute bottom-1/4 left-[10%] w-44 h-28 items-center justify-center rounded-[28px] bg-white/[0.04] border border-white/10 -rotate-6 text-emerald-300/70">
          
          <YachtIcon className="w-32 h-auto" />
        </div>

        

      </div>

      {/* Floating Particles */}
      

      

      

      <div className="hidden sm:block absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-white" />

      

      {/* Noise Effect */}
      

      {/* Top / Bottom Fade — a longer, softer ease into white, with extra stops for a gentler S-curve than the rest of the page */}
      

      

      {/* ================= Content ================= */}

      <div
        ref={contentRef}
        className={`relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
        }`}
      >

        <div className="group relative inline-flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

          

          <div className="relative w-2 h-2 rounded-full bg-emerald-400" />

          <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-zinc-300">
            Ready for More?
          </span>

        </div>

        <h2 className="mt-6 sm:mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-[-0.03em] lg:tracking-[-0.04em] text-white">
          Your future starts with{" "}
          <span className="" style={{ color: "#127D4D" }}>
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
          className="group/btn relative mt-10 sm:mt-12 lg:mt-16 inline-flex overflow-hidden rounded-full bg-black/60 border border-white/10 text-white px-9 py-5 sm:px-12 sm:py-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-emerald-400/40"
        >

          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-100 transition-all duration-500" />

          

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
