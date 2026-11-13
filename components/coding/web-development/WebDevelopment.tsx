"use client";

import Link from "next/link";
import AreaArt from "@/components/home/AreaArt";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LessonKey, Lesson } from "./lessons/types";
import { howWebsitesWork } from "./lessons/01-how-websites-work";
import { htmlFundamentals } from "./lessons/02-html-fundamentals";
import { cssFundamentals } from "./lessons/03-css-fundamentals";
import { javascriptAndTypescript } from "./lessons/04-javascript-and-typescript";
import { frontendFrameworks } from "./lessons/05-frontend-frameworks";
import { backendAndApis } from "./lessons/06-backend-and-apis";
import { deploymentAndDevelopmentWorkflow } from "./lessons/07-deployment-and-development-workflow";
import LearnBanner from "@/components/learn/LearnBanner";
import { learnTrackUrl } from "@/lib/learn-links";

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
  { number: "01", icon: "🌍", title: "How Websites Work", summary: "Learn how browsers, servers and the internet work together to deliver websites and web applications to users around the world.", lesson: howWebsitesWork },
  { number: "02", icon: "🏗️", title: "HTML Fundamentals", summary: "Discover how HTML provides the structure of every webpage using elements like headings, images, links, forms and semantic layouts.", lesson: htmlFundamentals },
  { number: "03", icon: "🎨", title: "CSS Fundamentals", summary: "Learn how CSS transforms simple HTML into modern, responsive and visually appealing websites through layouts, colors and typography.", lesson: cssFundamentals },
  { number: "04", icon: "⚡", title: "JavaScript & TypeScript", summary: "Understand how JavaScript adds interactivity to websites and why TypeScript has become the preferred choice for building large, scalable applications.", lesson: javascriptAndTypescript },
  { number: "05", icon: "⚛️", title: "Frontend Frameworks", summary: "Explore modern frameworks like React and Next.js, and learn how component-based development makes building complex user interfaces faster and more efficient.", lesson: frontendFrameworks },
  { number: "06", icon: "🗄️", title: "Backend & APIs", summary: "Discover how servers, databases and APIs work together to process requests, store data and power dynamic web applications.", lesson: backendAndApis },
  { number: "07", icon: "🚀", title: "Deployment & Development Workflow", summary: "Learn how professional developers use Git, GitHub, hosting platforms and deployment tools to publish, maintain and scale modern web projects.", lesson: deploymentAndDevelopmentWorkflow },
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

              <div className="h-px w-full bg-white mb-6" />

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

export default function WebDevelopment() {
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

        <Link
          href="/coding"
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-[#3a3a38] hover:text-[#121212]"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to Coding
        </Link>

        {/* ============ Hero ============ */}

        <div
          ref={heroRef}
          className={`mt-10 sm:mt-14 grid lg:grid-cols-2 items-center gap-12 lg:gap-20 transition-all duration-1000 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="text-left order-2 lg:order-1">

            <span className="relative inline-flex items-center rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: "#E7FAF0", color: "#127D4D" }}>
              
              <span className="relative">Coding · Learning Area</span>
            </span>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
              Web{" "}
              <span className="" style={{ color: "#127D4D" }}>
                Development
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-xl">
              Learn how modern websites and web applications are built.
              Explore the technologies, tools and workflows that power
              today&apos;s web—from HTML and CSS to React, APIs and
              deployment.
            </p>

            <div className="mt-10 flex justify-start">

              <a
                href="#chapters"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]"
              >
                <span className="relative">Start</span>
                <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

            </div>

          </div>

          <div className="max-lg:hidden relative order-1 lg:order-2 flex justify-center">

            

            <AreaArt area="coding" className="w-[240px] sm:w-[340px] lg:w-[420px]" />

          </div>

        </div>

        {/* Learn it like in the app */}
        <LearnBanner
          accent="coding"
          className="mt-14 sm:mt-20"
          title="Build your first web page like in the app"
          text="Start with HTML, then make it interactive with JavaScript — free lessons from the SwipeFuture app with real code and quick checks."
          primary={{ href: learnTrackUrl("coding", "html") ?? "/learn#coding", label: "Start free HTML lessons" }}
          secondary={[
            { href: learnTrackUrl("coding", "javascript") ?? "/learn#coding", label: "Free JavaScript lessons" },
            { href: "/coding/typing-speed-test", label: "Code typing speed test" },
          ]}
        />

        {/* Divider */}
        <div className="mt-16 sm:mt-24 lg:mt-28 h-px w-full bg-white " />

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
                revealClass={gridVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
