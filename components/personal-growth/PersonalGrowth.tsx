"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LessonKey, Lesson } from "./lessons/types";
import { discipline } from "./lessons/01-discipline";
import { habits } from "./lessons/02-habits";
import { focus } from "./lessons/03-focus";
import { productivity } from "./lessons/04-productivity";
import { learning } from "./lessons/05-learning";
import { mindset } from "./lessons/06-mindset";
import { confidence } from "./lessons/07-confidence";
import { communication } from "./lessons/08-communication";
import { health } from "./lessons/09-health";
import { timeManagement } from "./lessons/10-time-management";
import { resilience } from "./lessons/11-resilience";
import { purpose } from "./lessons/12-purpose";

// ================= Content =================
//
// Each chapter's lesson content lives in its own file under ./lessons — see
// lessons/01-discipline.ts for the format. Adding or editing a lesson only
// ever means touching that one small file; this component never grows.

type Chapter = {
  number: string;
  icon: string;
  title: string;
  summary: string;
  lesson?: Lesson;
};

const CHAPTERS: Chapter[] = [
  { number: "01", icon: "🎯", title: "Discipline", summary: "Discipline is the ability to take action even when motivation disappears. It helps you stay consistent, build trust in yourself and continue moving toward your goals one small step at a time.", lesson: discipline },
  { number: "02", icon: "🔁", title: "Habits", summary: "Your daily habits shape your future more than occasional moments of motivation. Learn how small actions repeated consistently can completely transform your life over time.", lesson: habits },
  { number: "03", icon: "🧭", title: "Focus", summary: "Your attention is one of your most valuable resources. Discover how to eliminate distractions, improve concentration and spend more time doing meaningful work.", lesson: focus },
  { number: "04", icon: "⚡", title: "Productivity", summary: "Being productive isn't about doing more. It's about doing the right things efficiently while avoiding unnecessary work and distractions.", lesson: productivity },
  { number: "05", icon: "🧠", title: "Learning", summary: "Learning is a skill that can itself be improved. Understand how your brain remembers information and discover techniques that help you learn faster and retain knowledge longer.", lesson: learning },
  { number: "06", icon: "🌊", title: "Mindset", summary: "The way you think influences every decision you make. Build a mindset focused on growth, resilience and continuous improvement instead of fear and limitation.", lesson: mindset },
  { number: "07", icon: "💪", title: "Confidence", summary: "Confidence isn't something people are born with. It grows every time you keep promises to yourself, overcome challenges and take action despite uncertainty.", lesson: confidence },
  { number: "08", icon: "💬", title: "Communication", summary: "Strong communication opens doors in every area of life. Learn how to express yourself clearly, listen actively and build better relationships with others.", lesson: communication },
  { number: "09", icon: "❤️", title: "Health", summary: "Your body and mind work together. Good sleep, movement, nutrition and recovery provide the energy needed to learn, create and perform at your best.", lesson: health },
  { number: "10", icon: "⏳", title: "Time Management", summary: "Everyone has the same twenty-four hours. Learn how to prioritize what truly matters, organize your time and make steady progress every day.", lesson: timeManagement },
  { number: "11", icon: "🛡️", title: "Resilience", summary: "Challenges and setbacks are part of every journey. Build the ability to recover, adapt and keep moving forward when things become difficult.", lesson: resilience },
  { number: "12", icon: "🌟", title: "Purpose", summary: "Long-term success becomes meaningful when it is connected to a clear purpose. Discover how your values, goals and daily actions work together to shape the future you want.", lesson: purpose },
];

// The eight lesson sections shown inside every expanded chapter, in order.
const LESSON_SECTIONS: { key: LessonKey; label: string }[] = [
  { key: "introduction", label: "Introduction" },
  { key: "whyItMatters", label: "Why It Matters" },
  { key: "keyPrinciples", label: "Key Principles" },
  { key: "examples", label: "Examples" },
  { key: "commonMistakes", label: "Common Mistakes" },
  { key: "exercises", label: "Exercises" },
  { key: "summary", label: "Summary" },
  { key: "resources", label: "Resources" },
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
          className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent"
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
        className={`absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-orange-400/0 via-orange-400/50 to-orange-300/0 blur-md transition-opacity duration-500 -z-10 ${
          isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />

      <div
        className={`relative h-full flex flex-col overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl shadow-xl transition-all duration-500 ease-out ${
          isOpen ? "shadow-[0_40px_100px_-20px_rgba(234,88,12,0.3)]" : "hover:-translate-y-1.5"
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

              <div className="relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-[22px] bg-gradient-to-br from-orange-100 to-orange-50 border border-white shadow-md text-2xl sm:text-3xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">
                <div className="absolute inset-0 rounded-[22px] bg-orange-300 blur-lg opacity-40 -z-10" />
                <span>{chapter.icon}</span>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-wide text-orange-500">
                  Chapter {chapter.number}
                </span>
                <h3 className="mt-0.5 text-lg sm:text-xl font-bold tracking-tight text-black">
                  {chapter.title}
                </h3>
              </div>

            </div>

            <span
              className={`mt-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-orange-200 text-orange-600 transition-transform duration-500 ${
                isOpen ? "rotate-90 bg-orange-500 text-white border-orange-500" : "group-hover:translate-x-0.5"
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

              <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent mb-6" />

              {chapter.lesson && Object.values(chapter.lesson).some(Boolean) ? (
                // Real lesson copy — read as a stacked document, one section after another.
                <div className="max-w-3xl mx-auto divide-y divide-orange-100">
                  {LESSON_SECTIONS.map(({ key, label }) => (
                    <div key={key} className="py-6 first:pt-0 last:pb-0">
                      <h4 className="text-base sm:text-lg font-bold tracking-tight text-orange-700">
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
                      className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4 sm:p-5"
                    >
                      <h4 className="text-sm font-bold tracking-tight text-orange-700">
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

export default function PersonalGrowth() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [parallax, setParallax] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [gridVisible, setGridVisible] = useState(false);

  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

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
    const make = (setter: (v: boolean) => void, threshold: number) =>
      new IntersectionObserver(([entry]) => setter(entry.isIntersecting), { threshold });

    const heroObserver = make(setHeroVisible, 0.2);
    const aboutObserver = make(setAboutVisible, 0.2);
    const gridObserver = make(setGridVisible, 0.05);
    const ctaObserver = make(setCtaVisible, 0.3);

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (aboutRef.current) aboutObserver.observe(aboutRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);
    if (ctaRef.current) ctaObserver.observe(ctaRef.current);

    return () => {
      heroObserver.disconnect();
      aboutObserver.disconnect();
      gridObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="personal-growth"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — same premium language as the Hero, in electric orange ================= */}

      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-orange-50 to-orange-100" />

      <div
        className="absolute inset-0 -z-40 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#ea580c 1px,transparent 1px),
            linear-gradient(to bottom,#ea580c 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-orange-300/40 to-transparent blur-[1px]" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        <div className="absolute -top-20 -left-20 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px] rounded-full bg-orange-500 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.3] animate-pulse" />
        <div className="hidden sm:block absolute top-1/4 right-0 w-[320px] h-[320px] lg:w-[600px] lg:h-[600px] rounded-full bg-orange-300 blur-[120px] lg:blur-[180px] opacity-[0.3] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute bottom-1/4 left-0 w-[420px] h-[420px] rounded-full bg-orange-400 blur-[160px] opacity-[0.3] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 blur-[200px] opacity-[0.28] -z-30 animate-[pulse_11s_ease-in-out_infinite]" />
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-orange-600 blur-[180px] opacity-[0.15] -z-30 animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        <div className="hidden md:block absolute -right-40 top-40 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-orange-300/40" />
        <div className="hidden lg:block absolute left-16 bottom-32 w-[380px] h-[380px] rounded-full border border-orange-300/50" />
        <div className="hidden lg:block absolute right-1/4 top-16 w-[240px] h-[240px] rounded-full border border-orange-200/60" />
      </div>

      {/* Floating Glass Squares */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />
        <div className="hidden lg:block absolute bottom-32 left-1/5 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />
        <div className="hidden md:block absolute top-1/2 left-10 w-14 h-14 rounded-2xl bg-orange-100/70 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />
      </div>

      {/* Floating Dots */}
      <div className="hidden sm:block absolute top-32 left-10 w-3 h-3 rounded-full bg-orange-500 shadow-xl animate-bounce" />
      <div className="hidden sm:block absolute top-2/3 right-16 w-2 h-2 rounded-full bg-black/40" />
      <div className="hidden lg:block absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
      <div className="hidden lg:block absolute bottom-24 right-1/4 w-3 h-3 rounded-full bg-orange-400 animate-ping" />

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

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="text-center lg:text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-orange-700 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-orange-100 to-transparent" />
              <span className="relative">12 Chapters</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Personal{" "}
              <span className="bg-gradient-to-r from-black via-orange-600 to-orange-400 bg-clip-text text-transparent">
                Growth
              </span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-gray-600 font-medium">
              Become the person your future needs.
            </p>

            <div className="mt-6 space-y-3 max-w-xl mx-auto lg:mx-0">
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
                Everything you want to achieve begins long before anyone
                notices it.
              </p>
              <p className="text-base sm:text-lg font-semibold text-black">Your habits.</p>
              <p className="text-base sm:text-lg font-semibold text-black">Your mindset.</p>
              <p className="text-base sm:text-lg font-semibold text-black">Your discipline.</p>
              <p className="text-base sm:text-lg font-semibold text-black">Your decisions.</p>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
                Personal growth is the foundation behind every successful
                career, business and meaningful life.
              </p>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-500">
                Swipe helps you build that foundation one skill at a time.
              </p>
            </div>

            <a
              href="#chapters"
              className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-7 py-4 sm:px-9 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(234,88,12,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-all" />
              <span className="relative">Start</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

          </div>

          {/* Placeholder image — swap for the final orange liquid-glass illustration later */}
          <div className="relative order-1 lg:order-2 flex justify-center">

            <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full bg-orange-500 blur-[100px] sm:blur-[150px] opacity-50 animate-pulse" />

            <img
              src="/liquid-glass-sechs.png"
              alt="Personal Growth preview"
              className="relative w-[240px] sm:w-[340px] lg:w-[420px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(120,40,0,0.2)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:rotate-2 hover:scale-[1.03] rotate-[-2deg]"
            />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ About ============ */}

        <div
          ref={aboutRef}
          className={`mt-16 sm:mt-24 lg:mt-28 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="relative flex justify-center order-1">

            <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full bg-orange-400 blur-[100px] sm:blur-[130px] opacity-40" />

            <img
              src="/liquid-glass-zehn.png"
              alt="Why personal growth matters"
              className="relative w-[220px] sm:w-[300px] lg:w-[360px] rounded-[32px] sm:rounded-[40px] border border-white/70 shadow-[0_35px_80px_rgba(120,40,0,0.18)] backdrop-blur-xl bg-white/40 transition-transform duration-700 hover:-rotate-2 hover:scale-[1.03] rotate-2"
            />

          </div>

          <div className="text-center lg:text-left order-2">

            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-orange-700">
              Why Personal Growth
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Habits{" "}
              <span className="bg-gradient-to-r from-black via-orange-600 to-orange-400 bg-clip-text text-transparent">
                nobody taught you
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              Discipline, focus, resilience and mindset shape everything you
              achieve — yet almost no one is ever taught how to build them on
              purpose. Swipe Personal Growth closes that gap.
            </p>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl mx-auto lg:mx-0">
              Growth isn&apos;t about a single breakthrough moment. It&apos;s
              the small, repeatable habits and decisions that quietly
              compound into the person you become over months and years.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "📚", label: "12 practical chapters" },
                { icon: "🔁", label: "Habits you can start today" },
                { icon: "🎯", label: "No jargon, just clarity" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3 text-left"
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* ============ Chapters ============ */}

        <div id="chapters" className="relative mt-16 sm:mt-20 lg:mt-24 scroll-mt-24">

          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-orange-700">
              Learning Chapters
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Twelve{" "}
              <span className="bg-gradient-to-r from-black via-orange-600 to-orange-400 bg-clip-text text-transparent">
                Chapters
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Tap a chapter to preview what you&apos;ll learn inside.
            </p>
          </div>

          <div
            ref={gridRef}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
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

        {/* ============ CTA ============ */}

        <div
          ref={ctaRef}
          className={`relative mt-16 sm:mt-24 lg:mt-28 transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          <div className="absolute -inset-px rounded-[36px] sm:rounded-[48px] bg-gradient-to-br from-orange-400/0 via-orange-400/50 to-orange-300/0 opacity-60 blur-lg -z-10" />

          <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-white/70 bg-white/60 backdrop-blur-xl p-10 sm:p-16 lg:p-20 shadow-2xl text-center">

            <div className="pointer-events-none absolute inset-0 rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

            <div className="hidden sm:block absolute -right-16 -top-16 w-72 h-72 rounded-full bg-orange-300 blur-[110px] opacity-40 -z-10" />
            <div className="hidden lg:block absolute -left-10 -bottom-16 w-64 h-64 rounded-full bg-orange-200 blur-[100px] opacity-40 -z-10" />

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Your growth{" "}
              <span className="bg-gradient-to-r from-black via-orange-600 to-orange-400 bg-clip-text text-transparent">
                starts today
              </span>
            </h2>

            <p className="relative mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl mx-auto">
              Every meaningful change starts with a single small decision.
              Keep building your habits with Swipe and turn what you learn
              into the person you&apos;re becoming.
            </p>

            <div className="relative mt-8 sm:mt-10 flex justify-center">
              <Link
                href="/#learning-paths"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-black text-white px-8 py-4 sm:px-10 sm:py-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(234,88,12,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-all" />
                <span className="relative">Explore More Paths</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
