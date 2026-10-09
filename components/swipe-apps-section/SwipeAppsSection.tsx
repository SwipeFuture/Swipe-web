"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Homepage section: the four Swipe apps at a glance, with a button to the
// full /apps page (details, screenshots, privacy policy).

const APPS = [
  { slug: "coding", name: "Swipe Coding", tagline: "Learn to code", glow: "bg-green-400" },
  { slug: "finance", name: "Swipe Finance", tagline: "Master your money", glow: "bg-amber-400" },
  { slug: "growth", name: "Swipe Personal Growth", tagline: "Build better habits", glow: "bg-orange-400" },
  { slug: "ai", name: "Swipe AI", tagline: "Understand AI", glow: "bg-violet-400" },
];

export default function SwipeAppsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="apps" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-40 scroll-mt-24">
      <div className="hidden sm:block absolute -left-32 top-24 w-96 h-96 rounded-full bg-amber-100 blur-[140px] opacity-60" />
      <div className="hidden sm:block absolute -right-32 bottom-10 w-96 h-96 rounded-full bg-violet-100 blur-[140px] opacity-60" />

      <div
        ref={ref}
        className={`relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-600">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Swipe Apps · Coming October 21, 2026
        </span>

        <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] lg:tracking-[-0.05em] text-stone-800">
          Four apps.{" "}
          <span className="bg-gradient-to-r from-stone-800 via-amber-700 to-amber-500 bg-clip-text text-transparent">
            One account.
          </span>
        </h2>

        <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 text-stone-500">
          Learn coding, money, personal growth and AI in short, swipeable lessons, a few minutes a day.
          One Swipe account and one plan work across all four apps on your iPhone.
        </p>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {APPS.map((app) => (
            <Link
              key={app.slug}
              href={`/apps#${app.slug}`}
              className="group relative flex flex-col items-center rounded-[28px] sm:rounded-[32px] border border-stone-200/80 bg-white/70 backdrop-blur-xl px-4 py-6 sm:py-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-[24px] ${app.glow} blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-60`} />
                <img
                  src={`/logo-${app.slug}-black.png`}
                  alt={`${app.name} app icon`}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] sm:rounded-[26px] object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 sm:mt-5 text-sm sm:text-base font-bold text-stone-800">{app.name}</div>
              <div className="mt-1 text-xs sm:text-sm text-stone-500">{app.tagline}</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/apps"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-8 py-4 sm:px-10 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative">Discover the Swipe Apps</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
