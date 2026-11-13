"use client";

import Link from "next/link";
import AreaArt from "@/components/home/AreaArt";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LessonKey, Lesson } from "./lessons/types";
import { introductionToAI } from "./lessons/01-introduction-to-ai";
import { howAiWorks } from "./lessons/02-how-ai-works";
import { machineLearning } from "./lessons/03-machine-learning";
import { largeLanguageModels } from "./lessons/04-large-language-models";
import { promptEngineering } from "./lessons/05-prompt-engineering";
import { aiTools } from "./lessons/06-ai-tools";
import { aiForLearning } from "./lessons/07-ai-for-learning";
import { aiForProductivity } from "./lessons/08-ai-for-productivity";
import { aiForCoding } from "./lessons/09-ai-for-coding";
import { aiForBusiness } from "./lessons/10-ai-for-business";
import { aiEthicsAndRisks } from "./lessons/11-ai-ethics-and-risks";
import { futureOfAI } from "./lessons/12-future-of-ai";

// ================= Content =================
//
// Each chapter's lesson content lives in its own file under ./lessons — see
// components/personal-growth/lessons/01-discipline.ts for the format this
// mirrors. Adding or editing a lesson only ever means touching that one
// small file; this component never grows.

type Chapter = {
  number: string;
  icon: string;
  title: string;
  summary: string;
  lesson?: Lesson;
};

const CHAPTERS: Chapter[] = [
  { number: "01", icon: "🤖", title: "Introduction to Artificial Intelligence", summary: "Learn what artificial intelligence is, where it came from, how it has evolved and why it is transforming nearly every industry today.", lesson: introductionToAI },
  { number: "02", icon: "⚙️", title: "How AI Works", summary: "Understand the core concepts behind AI, including data, algorithms, models, training, inference and neural networks explained in a beginner-friendly way.", lesson: howAiWorks },
  { number: "03", icon: "📊", title: "Machine Learning", summary: "Discover how machines learn from data through supervised, unsupervised and reinforcement learning, with practical real-world examples.", lesson: machineLearning },
  { number: "04", icon: "💬", title: "Large Language Models (LLMs)", summary: "Explore how models like ChatGPT work, including tokens, parameters, context windows, training and why LLMs can sometimes hallucinate.", lesson: largeLanguageModels },
  { number: "05", icon: "✍️", title: "Prompt Engineering", summary: "Learn how to communicate effectively with AI by writing better prompts, structuring requests and avoiding common prompting mistakes.", lesson: promptEngineering },
  { number: "06", icon: "🧰", title: "AI Tools", summary: "Get an overview of today's most important AI tools and understand what each one is best used for in learning, creativity, coding and productivity.", lesson: aiTools },
  { number: "07", icon: "🎓", title: "AI for Learning", summary: "Discover how AI can become your personal tutor by helping you study, summarize information, create quizzes and accelerate learning.", lesson: aiForLearning },
  { number: "08", icon: "⚡", title: "AI for Productivity", summary: "Learn how AI saves time by assisting with emails, planning, note-taking, writing, organization and everyday workflows.", lesson: aiForProductivity },
  { number: "09", icon: "💻", title: "AI for Coding", summary: "See how developers use AI to generate code, explain complex concepts, debug software and build applications more efficiently.", lesson: aiForCoding },
  { number: "10", icon: "📈", title: "AI for Business", summary: "Understand how businesses use AI for marketing, customer support, automation, analytics, sales and content creation.", lesson: aiForBusiness },
  { number: "11", icon: "⚖️", title: "AI Ethics & Risks", summary: "Learn about hallucinations, bias, privacy, copyright, misinformation, deepfakes and the importance of using AI responsibly.", lesson: aiEthicsAndRisks },
  { number: "12", icon: "🚀", title: "The Future of AI", summary: "Explore where artificial intelligence is heading, including AI agents, robotics, automation, future careers and the skills needed in an AI-driven world.", lesson: futureOfAI },
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
          className="h-px w-full bg-white "
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
        className={`relative h-full flex flex-col overflow-hidden rounded-[32px] sm:rounded-[36px] border border-[#ececea] bg-white transition-all duration-500 ease-out ${
          isOpen ? "" : "hover:-translate-y-1.5"
        }`}
      >

        

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative w-full text-left p-6 sm:p-8 flex-1 flex flex-col"
        >

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-4">

              <div>
                <span className="text-[13px] font-bold text-[#6D28D9]">
                  Chapter {chapter.number}
                </span>
                <h3 className="mt-0.5 text-lg sm:text-xl font-bold tracking-tight text-black">
                  {chapter.title}
                </h3>
              </div>

            </div>

            <span
              className={`mt-2 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-violet-200 text-violet-600 transition-transform duration-500 ${
                isOpen ? "rotate-90 bg-violet-600 text-white border-violet-600" : "group-hover:translate-x-0.5"
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

              <div className="h-px w-full bg-white mb-6" />

              {chapter.lesson && Object.values(chapter.lesson).some(Boolean) ? (
                // Real lesson copy — read as a stacked document, one section after another.
                <div className="max-w-3xl mx-auto divide-y divide-violet-100">
                  {LESSON_SECTIONS.map(({ key, label }) => (
                    <div key={key} className="py-6 first:pt-0 last:pb-0">
                      <h4 className="text-base sm:text-lg font-bold tracking-tight text-violet-700">
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
                      className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4 sm:p-5"
                    >
                      <h4 className="text-sm font-bold tracking-tight text-violet-700">
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

export default function SwipeAI() {
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
      id="swipe-ai"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40 scroll-mt-24"
    >

      {/* ================= Background — same premium language as the Hero, in electric purple ================= */}

      <div className="absolute inset-0 -z-50 bg-white " />

      

      

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >
        
        
        
        
        
      </div>

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >
        
        
      </div>

      {/* Floating Glass Squares */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >
        
        
        
      </div>

      {/* Floating Dots */}
      
      

      {/* Noise */}
      

      {/* Top / Bottom Fade */}
      
      

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="text-left order-2 lg:order-1">

            <span className="group relative inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 sm:px-5 text-xs sm:text-sm font-semibold text-violet-700 overflow-hidden">
              
              <span className="relative">Artificial Intelligence</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Learn AI from the{" "}
              <span className="" style={{ color: "#6D28D9" }}>
                Ground Up
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl">
              Artificial intelligence is one of the most important
              technologies of our generation. SwipeFuture helps you understand it
              from the fundamentals to practical, everyday applications —
              no confusing jargon, just a clear path from curious to
              confident.
            </p>

            <div className="mt-10 flex justify-start">

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
                <Link href="/learn#ai" className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">
                <span className="relative">Start a free lesson</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
                <a href="#chapters" className="inline-flex items-center justify-center rounded-xl border-2 border-[#ececea] bg-white px-7 py-4 text-[17px] font-bold text-[#121212] transition-colors hover:border-[#121212]">Explore topics ↓</a>
              </div>

            </div>

          </div>

          {/* Placeholder image — swap for the final purple liquid-glass illustration later */}
          <div className="max-lg:hidden relative order-1 lg:order-2 flex justify-center">

            

            <AreaArt area="ai" className="w-[240px] sm:w-[340px] lg:w-[420px]" />

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ About ============ */}

        <div
          ref={aboutRef}
          className={`mt-16 sm:mt-24 lg:mt-28 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            aboutVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="max-lg:hidden relative flex justify-center order-1">

            

            <AreaArt area="ai" className="w-[220px] sm:w-[300px] lg:w-[360px]" />

          </div>

          <div className="text-left order-2">

            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#F0EAFE", color: "#6D28D9" }}>
              Why SwipeFuture
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              AI skills{" "}
              <span>
                nobody taught you
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl">
              Most people use AI every day without understanding how it
              actually works — what it&apos;s good at, where it fails and
              how to get real value out of it instead of just playing with
              it. SwipeFuture closes that gap.
            </p>

            <p className="mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-xl">
              AI literacy is quickly becoming as fundamental as computer
              literacy once was. It&apos;s not about becoming an engineer —
              it&apos;s about understanding the tools shaping how we learn,
              work and create, so you can use them with confidence.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "📚", label: "12 practical chapters" },
                { icon: "🛠️", label: "Real tools, real prompts" },
                { icon: "🎯", label: "No jargon, just clarity" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/50 px-4 py-3 text-left"
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-50" aria-hidden />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

        {/* ============ Chapters ============ */}

        <div id="chapters" className="relative mt-16 sm:mt-20 lg:mt-24 scroll-mt-24">

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#F0EAFE", color: "#6D28D9" }}>
              Learning Chapters
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Twelve{" "}
              <span>
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
                revealClass={gridVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
              />
            ))}
          </div>

        </div>

        {/* ============ CTA ============ */}

        <div
          ref={ctaRef}
          className={`relative mt-16 sm:mt-24 lg:mt-28 transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          

          <div className="relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-[#ececea] bg-white p-8 sm:p-12 lg:p-16 text-left">

            

            
            

            <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
              Start with how AI{" "}
              <span>
                actually works.
              </span>
            </h2>

            <p className="relative mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-gray-500 max-w-2xl">
              Tokens, prompts and models explained in short lessons, then you
              try it yourself. Free, and no account needed.
            </p>

            <div className="relative mt-8 sm:mt-10 flex justify-start">
              <Link
                href="/#learning-paths"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]"
              >
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
