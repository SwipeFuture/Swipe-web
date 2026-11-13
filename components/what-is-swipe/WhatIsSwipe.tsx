"use client";

import { useEffect, useRef, useState } from "react";
import AreaArt from "@/components/home/AreaArt";

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
    <section id="swipe" ref={sectionRef} className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-28 scroll-mt-24">

      {/* ================= Background ================= */}

      {/* Mesh Gradient — plain white at the very top and bottom, the beige/amber tint only lives in the middle band. Vertical (not diagonal) so both edges stay a flat, uniform color across the full width and match the hero's white edges exactly. */}
      

      {/* Grid */}
      

      {/* Glow layer — parallax + gentle scroll-tied breathing scale */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px) scale(${1 + Math.min(Math.abs(parallax), 40) * 0.0025})` }}
      >

        

        

        

        

        

        

        

        

        

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

        

        <div className="hidden sm:block absolute top-60 right-16 lg:top-80 lg:right-80 w-2 h-2 rounded-full bg-stone-500/40" />

        <div className="hidden sm:block absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-amber-300" />

        <div className="hidden sm:block absolute top-40 right-10 lg:top-52 lg:right-32 w-4 h-4 rounded-full bg-white border border-stone-200 shadow-lg" />

        

        

        <div className="hidden sm:block absolute top-16 left-1/4 w-2 h-2 rounded-full bg-amber-300/80" />

        

        

      </div>

      {/* Floating Glass Squares / Rectangles — rotate steadily with total scroll distance, either direction */}
      <div className="absolute inset-0">

        

        

        <div className="hidden md:block absolute top-1/2 right-16 w-20 h-28 rounded-[24px] bg-white border border-white rotate-[18deg]" />

        

        <div className="hidden md:block absolute top-16 right-1/3 w-12 h-20 rounded-[18px] bg-white border border-white rotate-[-15deg] shadow-lg" />

      </div>

      {/* Noise Effect for extra texture, like Hero */}
      

      {/* Connection Lines, like Hero */}
      <div
        className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-white rotate-12 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.3}px) rotate(12deg)` }}
      />

      <div
        className="hidden lg:block absolute bottom-36 right-1/4 w-36 h-px bg-white -rotate-12 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${-parallax * 0.3}px) rotate(-12deg)` }}
      />

      {/* Top Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}
      

      {/* Bottom Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}
      

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid lg:grid-cols-2 items-center gap-12 sm:gap-16 lg:gap-24">

          {/* LEFT - IMAGE */}

          <div
            ref={imageRef}
            className={`max-lg:hidden relative flex justify-center order-1 transition-all duration-1000 ease-out ${
              imageVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
            }`}
          >

            {/* Glow — warm beige, multi-layered, subtle */}
            <div
              className="absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[700px] lg:h-[700px] rounded-full bg-amber-100 blur-[100px] sm:blur-[150px] lg:blur-[190px] opacity-20 transition-transform duration-100 ease-out"
              style={{ transform: `translateY(${parallax * 0.15}px)` }}
            />

            

            

            {/* Subtle accent ring, same idea as the Hero polish */}
            

            <AreaArt area="all" className="w-[260px] sm:w-[380px] md:w-[440px] lg:w-[560px]" />

          </div>

          {/* RIGHT - TEXT */}

          <div
            ref={textRef}
            className={`order-2 text-center lg:text-left transition-all duration-1000 ease-out delay-150 ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
            }`}
          >

            <span className="group relative inline-flex items-center rounded-full border border-amber-200/70 bg-amber-50/60 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-amber-800/90 overflow-hidden">
              
              <span className="relative">About SwipeFuture</span>
            </span>

            <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-stone-800">
              What is{" "}
              <span className="" style={{ color: "#B45309" }}>
                SwipeFuture?
              </span>
            </h2>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 lg:leading-10 text-stone-500 max-w-xl mx-auto lg:mx-0">
              SwipeFuture helps people build a strong foundation of knowledge in coding,
              artificial intelligence, finance and personal growth. Instead of
              promising quick success or overnight wealth, our goal is to provide
              practical skills that create opportunities for the future.
            </p>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 lg:leading-10 text-stone-500 max-w-xl mx-auto lg:mx-0">
              We believe that real success comes from understanding, consistency and
              continuous learning. SwipeFuture gives you the tools, guidance and structure
              to learn with confidence and build skills that last a lifetime.
            </p>

            <button className="group mt-8 sm:mt-10 lg:mt-12 rounded-full bg-stone-900 px-7 py-3.5 sm:px-8 sm:py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105">

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