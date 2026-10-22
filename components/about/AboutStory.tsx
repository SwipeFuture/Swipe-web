"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// The personal part of the About page: a note from the founder, how Swipe
// started (sketches → website → four apps) and how lessons are made.

function Reveal({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div id={id} ref={ref} className={`scroll-mt-28 transition-all duration-1000 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

const NUMBERS = [
  { value: "4", label: "apps" },
  { value: "35", label: "learning tracks" },
  { value: "439", label: "levels" },
  { value: "2,590", label: "lessons" },
];

const TIMELINE = [
  {
    when: "The beginning",
    title: "Sketches",
    text: "Before a single line of code: notebooks full of rough screens, arrows and questions. What if learning felt as easy as scrolling — but actually left you better than before?",
  },
  {
    when: "Idea after idea",
    title: "From scroll to swipe",
    text: "Short cards instead of long videos. A quick check after every idea. Streaks that bring you back tomorrow. A small robot called Swipey who keeps you company. Every sketch added one more piece.",
  },
  {
    when: "July 2026",
    title: "The website goes live",
    text: "swipefuture.dev launched with the first learning paths, the Success Blueprint and the first calculators — the place where the idea became real.",
  },
  {
    when: "September 2026",
    title: "One app becomes four",
    text: "Swipe Coding came first. Then Finance, Personal Growth and AI followed — four apps, one account, one plan, and a personal advisor in each of them.",
  },
  {
    when: "October 2026",
    title: "App Store & free lessons",
    text: "All four apps went to the App Store, and the first two levels of every track — 384 lessons — became free on the web, together with calculators, quizzes and a learning advisor.",
  },
  {
    when: "Next",
    title: "Launch — and much more",
    text: "More tracks, more tools and a lot more ideas still sitting in the sketchbook.",
  },
];

const PROCESS = [
  { n: "01", title: "Map the whole path", text: "Every track is planned from zero to advanced before writing starts: levels, chapters and lessons, in the order that actually makes sense to learn them." },
  { n: "02", title: "Write the first level by hand", text: "The first level of a track sets the tone and the quality bar. Everything that follows is measured against it." },
  { n: "03", title: "Same shape, every lesson", text: "Short cards, real examples, a quick check after every idea, a quiz after every chapter and a test after every level — so you always know where you are." },
  { n: "04", title: "Check, test, fix", text: "Every lesson is reviewed for accuracy and clarity, every quiz answer is verified, and everything is tested in the app before it ships. AI tools help us draft and double-check — every track is planned, reviewed and approved by us." },
  { n: "05", title: "Keep improving", text: "Feedback, reports from learners and new knowledge flow back into the lessons. Finance and personal-growth lessons are educational, never financial or medical advice." },
];

export default function AboutStory() {
  return (
    <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
      {/* A note from Colin */}
      <Reveal id="story">
        <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white p-7 shadow-xl sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-200 opacity-40 blur-[100px]" />
          <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-green-700">A note from the founder</span>
          <h2 className="relative mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl">Hi, I&apos;m Colin.</h2>
          <div className="relative mt-6 space-y-4 text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
            <p>
              I&apos;m the person behind Swipe. It started with a simple frustration: the skills that shape your future — how to code, how money
              works, how to build habits, how to use AI — are the ones you&apos;re rarely taught properly. They&apos;re scattered across endless
              videos and hour-long courses most people never finish.
            </p>
            <p>
              So I started sketching. Page after page of rough screens and notes, one question at a time: what if learning felt as easy as
              scrolling — but actually left you better than before? One idea led to the next, and slowly the sketches turned into Swipe.
            </p>
            <p>
              The sketches became a website, the website became an app, and one app became four. Every lesson, every tool and every little
              detail you see here grew out of that sketchbook — and I&apos;m only getting started.
            </p>
          </div>
          <p className="relative mt-8 font-[cursive] text-3xl text-black">Colin Farron</p>
          <p className="relative text-sm text-gray-400">Founder of Swipe</p>
        </div>
      </Reveal>

      {/* Numbers */}
      <Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.label} className="rounded-[24px] border border-gray-200 bg-white p-6 text-center shadow-sm">
              <div className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">{n.value}</div>
              <div className="mt-1 text-sm font-semibold text-gray-500">{n.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* How Swipe started */}
      <Reveal id="how-it-started">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">How it started</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl">From a sketchbook to four apps</h2>
        </div>
        <ol className="relative mx-auto mt-12 max-w-3xl">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-green-300 via-emerald-300 to-transparent sm:left-1/2" />
          {TIMELINE.map((step, i) => (
            <li key={step.title} className={`relative mb-10 pl-12 sm:mb-14 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
              <span className={`absolute left-[7px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-green-500 shadow ${i % 2 ? "sm:-left-2" : "sm:left-auto sm:-right-2"}`} />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">{step.when}</span>
              <h3 className="mt-1 text-xl font-black tracking-tight text-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-500 sm:text-base">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* How we make lessons */}
      <Reveal id="how-we-make-lessons">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">How we make lessons</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl">Five steps behind every lesson</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">Short doesn&apos;t mean shallow. This is how a Swipe track goes from idea to the lesson on your screen.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROCESS.map((s, i) => (
            <div key={s.n} className={`rounded-[26px] border border-gray-200 bg-white p-6 shadow-sm sm:p-7 ${i === PROCESS.length - 1 ? "sm:col-span-2" : ""}`}>
              <span className="text-sm font-black text-green-600">{s.n}</span>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-black">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-500 sm:text-base">{s.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
