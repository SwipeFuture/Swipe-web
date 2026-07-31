"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "SwipeFuture@icloud.com";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7 L12 13 L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

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
    const observer = new IntersectionObserver(
      ([entry]) => setContentVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
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

        <div className="absolute -top-10 -right-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-green-300 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.16] animate-pulse" />

        <div className="hidden sm:block absolute top-1/3 left-0 w-[280px] h-[280px] lg:w-[500px] lg:h-[500px] rounded-full bg-emerald-200 blur-[110px] lg:blur-[170px] opacity-[0.16] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gray-200 blur-[160px] opacity-20 -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

      </div>

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -left-40 top-24 w-[500px] h-[500px] lg:-left-72 lg:w-[900px] lg:h-[900px] rounded-full border border-gray-200/50" />

        <div className="hidden lg:block absolute right-10 bottom-20 w-[380px] h-[380px] rounded-full border border-green-200/50" />

      </div>

      <div className="hidden sm:block absolute top-24 right-8 lg:top-32 lg:right-40 w-3 h-3 rounded-full bg-green-500 shadow-xl animate-bounce" />

      <div className="hidden sm:block absolute bottom-40 left-16 w-2 h-2 rounded-full bg-black/40" />

      <div className="hidden lg:block absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-green-400 animate-pulse" />

      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

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

      <div
        ref={contentRef}
        className={`relative z-20 max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 text-center transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >

        <div className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />

          <div className="relative w-2 h-2 rounded-full bg-green-500 animate-pulse" />

          <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-gray-600">
            Get in Touch
          </span>

        </div>

        <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-black">
          Contact{" "}
          <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
            Us
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl mx-auto">
          Questions about Swipe, feedback, or just want to say hi? Send us an
          email and we&apos;ll get back to you as soon as we can.
        </p>

        {/* Email Card */}

        <div className="relative mt-12 sm:mt-14">

          <div className="absolute -inset-px rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-green-400/0 via-green-400/40 to-emerald-400/0 opacity-0 hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

          <div className="relative rounded-[32px] sm:rounded-[40px] border border-white/70 bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-2xl">

            <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[24px] bg-gradient-to-br from-green-100 to-emerald-50 border border-white shadow-lg text-green-700">
              <div className="absolute inset-0 rounded-[24px] bg-green-300 blur-xl opacity-30 -z-10" />
              <MailIcon className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h2 className="relative mt-6 text-lg sm:text-xl font-bold tracking-tight text-black">
              Email Us
            </h2>

            <a
              href={`mailto:${EMAIL}`}
              className="group/btn relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-7 py-4 sm:px-9 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover/btn:opacity-20 transition-all" />
              <span className="relative">{EMAIL}</span>
              <span className="relative transition-transform duration-300 group-hover/btn:translate-x-1">
                →
              </span>
            </a>

            
          </div>

        </div>

      </div>

    </section>
  );
}
