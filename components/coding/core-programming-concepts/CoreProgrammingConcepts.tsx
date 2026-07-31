"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LessonKey, Lesson } from "./lessons/types";
import { variables } from "./lessons/01-variables";
import { dataTypes } from "./lessons/02-data-types";
import { operators } from "./lessons/03-operators";
import { conditions } from "./lessons/04-conditions";
import { loops } from "./lessons/05-loops";
import { functions } from "./lessons/06-functions";
import { arraysAndObjects } from "./lessons/07-arrays-and-objects";

// ================= Content =================
//
// Each chapter's lesson content lives in its own file under ./lessons — see
// components/finance/lessons/01-introduction-to-finance.ts for the format
// this mirrors. Adding or editing a lesson only ever means touching that one
// small file; this component never grows.

type Chapter = {
  number: string;
  icon: string;
  title: string;
  summary: string;
  lesson?: Lesson;
};

const CHAPTERS: Chapter[] = [
  { number: "01", icon: "📦", title: "Variables", summary: "Learn how variables store and organize data, making it possible for programs to remember and use information.", lesson: variables },
  { number: "02", icon: "🔀", title: "Data Types", summary: "Explore the different types of data, including numbers, text, booleans and collections, and understand when to use each one.", lesson: dataTypes },
  { number: "03", icon: "⚖️", title: "Operators", summary: "Discover how operators perform calculations, compare values and combine expressions to create program logic.", lesson: operators },
  { number: "04", icon: "🔍", title: "Conditions", summary: "Understand how programs make decisions using conditional statements like if, else and switch.", lesson: conditions },
  { number: "05", icon: "🔄", title: "Loops", summary: "Learn how loops repeat tasks efficiently, allowing programs to process data and automate repetitive actions.", lesson: loops },
  { number: "06", icon: "🧩", title: "Functions", summary: "Discover how functions organize reusable blocks of code, making programs cleaner, easier to maintain and more efficient.", lesson: functions },
  { number: "07", icon: "📚", title: "Arrays & Objects", summary: "Learn how arrays and objects organize related data, making it easier to store, access and manage information in your programs.", lesson: arraysAndObjects },
];

// The seven lesson sections shown inside every expanded chapter, in order.
const LESSON_SECTIONS: { key: LessonKey; label: string }[] = [
  { key: "introduction", label: "Introduction" },
  { key: "whyItMatters", label: "Why It Matters" },
  { key: "keyPrinciples", label: "Key Principles" },
  { key: "examples", label: "Examples" },
  { key: "commonMistakes", label: "Common Mistakes" },
  { key: "exercises", label: "Exercises" },
  { key: "summary", label: "Summary" },
];

// Turns **bold** and *italic* spans inside a line of lesson text into styled inline elements.
function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*.+?\*\*|\*.+?\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.length > 1 && part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-gray-600">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
}

// A tiny lesson-text parser: blank line = new paragraph, "* " = bullet, "## "/"### " =
// sub-heading, "---" = divider. Keeps pasted lesson copy free of any JSX/markup.
function renderLessonText(raw: string): ReactNode[] {
  const lines = raw.trim().split("\n").map((line) => line.trim());
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(
      <p key={blocks.length} className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
        {renderInline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul
        key={blocks.length}
        className="list-disc pl-5 space-y-1.5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500"
      >
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  for (const line of lines) {
    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (line === "---") {
      flushParagraph();
      flushList();
      blocks.push(
        <div
          key={blocks.length}
          className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent"
        />
      );
      continue;
    }

    const heading = line.match(/^#{2,3}\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(
        <h5 key={blocks.length} className="text-sm sm:text-base font-bold tracking-tight text-black">
          {renderInline(heading[1])}
        </h5>
      );
      continue;
    }

    const bullet = line.match(/^[*-]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function ChapterCard({
  chapter,
  isOpen,
  onToggle,
  revealClass,
}: {
  chapter: Chapter;
  isOpen: boolean;
  onToggle: () => void;
  revealClass: string;
}) {
  return (
    <div
      className={`group relative h-full transition-all duration-700 ease-out ${revealClass} ${
        isOpen ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >

      {/* Glowing border halo */}
      <div
        className={`absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-green-800/0 via-green-800/50 to-emerald-600/0 blur-md transition-opacity duration-500 -z-10 ${
          isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />

      <div
        className={`relative h-full flex flex-col overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-xl transition-all duration-500 ease-out ${
          isOpen ? "shadow-[0_40px_100px_-20px_rgba(20,83,45,0.3)]" : "hover:-translate-y-1.5"
        }`}
      >

        <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative w-full text-left p-6 sm:p-8 flex-1 flex flex-col"
        >

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-[22px] bg-gradient-to-br from-green-100 to-emerald-50 border border-white shadow-md text-2xl sm:text-3xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">
                <div className="absolute inset-0 rounded-[22px] bg-green-600 blur-lg opacity-30 -z-10" />
                <span>{chapter.icon}</span>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-wide text-green-900">
                  Chapter {chapter.number}
                </span>
                <h3 className="mt-0.5 text-lg sm:text-xl font-bold tracking-tight text-black">
                  {chapter.title}
                </h3>
              </div>

            </div>

            <span
              className={`mt-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-green-300 text-green-800 transition-transform duration-500 ${
                isOpen ? "rotate-90 bg-green-800 text-white border-green-800" : "group-hover:translate-x-0.5"
              }`}
            >
              →
            </span>

          </div>

          <p className="relative mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500 line-clamp-3">
            {chapter.summary}
          </p>

        </button>

        {/* Accordion body — animates via grid-template-rows, no JS height measuring needed */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="relative px-6 sm:px-8 pb-8 pt-2">

              <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent mb-6" />

              {chapter.lesson && Object.values(chapter.lesson).some(Boolean) ? (
                // Real lesson copy — read as a stacked document, one section after another.
                <div className="max-w-3xl mx-auto divide-y divide-green-100">
                  {LESSON_SECTIONS.map(({ key, label }) => (
                    <div key={key} className="py-6 first:pt-0 last:pb-0">
                      <h4 className="text-base sm:text-lg font-bold tracking-tight text-green-900">
                        {label}
                      </h4>
                      <div className="mt-3 space-y-3">
                        {chapter.lesson?.[key] ? (
                          renderLessonText(chapter.lesson[key]!)
                        ) : (
                          <p className="text-sm italic text-gray-400">[ Lesson content goes here ]</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // No lesson written yet — light placeholder grid.
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {LESSON_SECTIONS.map(({ key, label }) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-green-100 bg-green-50/40 p-4 sm:p-5"
                    >
                      <h4 className="text-sm font-bold tracking-tight text-green-900">
                        {label}
                      </h4>
                      <p className="mt-1.5 text-sm italic text-gray-400">
                        [ Lesson content goes here ]
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function CoreProgrammingConcepts() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridVisible, setGridVisible] = useState(false);

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
    const gridObserver = new IntersectionObserver(
      ([entry]) => setGridVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      heroObserver.disconnect();
      gridObserver.disconnect();
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
              Core Programming{" "}
              <span className="bg-gradient-to-r from-black via-green-900 to-emerald-700 bg-clip-text text-transparent">
                Concepts
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              Master the fundamental building blocks of programming. Learn
              how variables, conditions, loops, functions and other core
              concepts work together to create software in any programming
              language.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">

              <a
                href="#chapters"
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
              src="/liquid-glass-brain-green.png"
              alt="Core Programming Concepts preview"
              className="relative w-[240px] sm:w-[340px] lg:w-[420px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(20,83,45,0.2)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:rotate-2 hover:scale-[1.03] rotate-[-2deg]"
            />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Chapters ============ */}

        <div id="chapters" className="relative mt-16 sm:mt-20 lg:mt-24 scroll-mt-24">

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            {CHAPTERS.map((chapter, i) => (
              <ChapterCard
                key={chapter.number}
                chapter={chapter}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
                revealClass={gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
