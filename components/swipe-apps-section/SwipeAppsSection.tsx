"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import KeynoteFilm from "@/components/swipe-apps/KeynoteFilm";

// Homepage section: the four Swipe apps next to the keynote film, plus a compact
// "free on the web" row (lessons, tools, advisor) — one section instead of three,
// so the homepage stays short.

const APPS = [
  { slug: "coding", name: "Swipe Coding", tagline: "Learn to code", glow: "bg-green-400" },
  { slug: "finance", name: "Swipe Finance", tagline: "Master your money", glow: "bg-amber-400" },
  { slug: "growth", name: "Swipe Personal Growth", tagline: "Build better habits", glow: "bg-orange-400" },
  { slug: "ai", name: "Swipe AI", tagline: "Understand AI", glow: "bg-violet-400" },
];

const FREE = [
  { href: "/learn", emoji: "📚", title: "384 free lessons", text: "Python, investing, habits, AI and more — no account needed." },
  { href: "/tools", emoji: "🧮", title: "16 free tools", text: "Budget, debt & FIRE calculators, quizzes, typing test, prompt builder." },
  { href: "/advisor", emoji: "🧭", title: "Learning advisor", text: "Four questions, then your personal learning path." },
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="apps" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32 scroll-mt-24">
      <div className="hidden sm:block absolute -left-32 top-24 w-96 h-96 rounded-full bg-amber-100 blur-[140px] opacity-60" />
      <div className="hidden sm:block absolute -right-32 bottom-10 w-96 h-96 rounded-full bg-violet-100 blur-[140px] opacity-60" />

      <div
        ref={ref}
        className={`relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-1000 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-600">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Swipe Apps · Coming soon
            </span>

            <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em] text-stone-800">
              Four apps.{" "}
              <span className="bg-gradient-to-r from-stone-800 via-amber-700 to-amber-500 bg-clip-text text-transparent">
                One account.
              </span>
            </h2>

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-stone-500">
              Learn coding, money, personal growth and AI in short, swipeable lessons, a few minutes a day.
              One Swipe account and one plan work across all four apps on your iPhone.
            </p>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {APPS.map((app) => (
                <Link
                  key={app.slug}
                  href={`/apps#${app.slug}`}
                  className="group relative flex flex-col items-center rounded-[26px] border border-stone-200/80 bg-white/70 backdrop-blur-xl px-3 py-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-[20px] ${app.glow} blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-60`} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/logo-${app.slug}-black.png`}
                      alt={`${app.name} app icon`}
                      width={72}
                      height={72}
                      loading="lazy"
                      className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[20px] object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 text-center text-xs sm:text-sm font-bold text-stone-800">{app.name}</div>
                  <div className="mt-0.5 text-[11px] sm:text-xs text-stone-500">{app.tagline}</div>
                </Link>
              ))}
            </div>

            <Link
              href="/apps"
              className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-8 py-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative">Discover the Swipe Apps</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <KeynoteFilm />
        </div>

        {/* Free on the web — compact row instead of its own section */}
        <div className="mt-20 sm:mt-24">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Start free on the web — no app needed</p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {FREE.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group flex items-start gap-4 rounded-[24px] border border-stone-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-3xl">{f.emoji}</span>
                <span>
                  <span className="block font-bold text-stone-800">
                    {f.title} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-stone-500">{f.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
