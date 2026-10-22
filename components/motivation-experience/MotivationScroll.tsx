"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import BackButton from "./BackButton";

// The Motivation page: pitch black, one mindset line per screen. Every chapter is a
// tall section with a sticky stage; scrolling through it drives the image reveal
// (black & white → colour, zoom out, clip opens) and the word-by-word text.
// No WebGL — just images, transforms and filters, so it's fast and fully SSR'd.

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p: number, from: number, to: number) => clamp((p - from) / (to - from));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

// 0 when the section's top hits the viewport top, 1 when its bottom leaves it.
function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      setP(span > 0 ? clamp(-r.top / span) : r.top < 0 ? 1 : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

// Words rise out of a blur one after another while `t` goes 0 → 1.
function Words({ text, t, className, accent }: { text: string; t: number; className?: string; accent?: string[] }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => {
        const k = ease(range(t, i / (words.length + 2), (i + 3) / (words.length + 2)));
        const hot = accent?.includes(w.replace(/[^A-Za-z]/g, "").toLowerCase());
        return (
          <span
            key={i}
            className={`inline-block mr-[0.22em] ${hot ? "bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent" : ""}`}
            style={{ opacity: k, filter: `blur(${(1 - k) * 12}px)`, transform: `translateY(${(1 - k) * 0.5}em)` }}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}

type Chapter = {
  kind: "photo" | "object";
  image: string;
  keyword: string;
  line: string;
  accent: string[];
  body: string;
  glow?: string;
};

const CHAPTERS: Chapter[] = [
  {
    kind: "photo",
    image: "/motivation/sonnenuntergang.webp",
    keyword: "Decision",
    line: "Nobody is coming to save you.",
    accent: ["save"],
    body: "That's the good news. It means every change in your life is one you get to make.",
  },
  {
    kind: "object",
    image: "/liquid-glass-dreizehn.webp",
    keyword: "Consistency",
    line: "Small steps. Every single day.",
    accent: ["every", "day"],
    body: "Five focused minutes today beat five perfect hours someday.",
    glow: "rgba(34,197,94,0.35)",
  },
  {
    kind: "photo",
    image: "/motivation/wolken.webp",
    keyword: "Habit",
    line: "Motivation starts it. Habit finishes it.",
    accent: ["habit"],
    body: "Feelings come and go. Systems show up on the days you don't feel like it.",
  },
  {
    kind: "photo",
    image: "/motivation/ozean.webp",
    keyword: "Courage",
    line: "You don't have to be great to start.",
    accent: ["start"],
    body: "But you have to start to become great. The first version of anything is supposed to be bad.",
  },
  {
    kind: "object",
    image: "/liquid-glass-sieben-pmg.webp",
    keyword: "Focus",
    line: "Your future is built in the hours nobody sees.",
    accent: ["future", "nobody"],
    body: "Late nights, early mornings, one more lesson when everyone else scrolls.",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    kind: "photo",
    image: "/motivation/berglandschaft.webp",
    keyword: "Discipline",
    line: "Discipline is choosing what you want most over what you want now.",
    accent: ["most", "now"],
    body: "Every choice is a vote for the person you're becoming.",
  },
  {
    kind: "photo",
    image: "/motivation/city-skyline.webp",
    keyword: "Growth",
    line: "Comfort is a beautiful place. Nothing grows there.",
    accent: ["nothing", "grows"],
    body: "The version of you that you're chasing lives on the other side of uncomfortable.",
  },
];

function PhotoChapter({ c, index }: { c: Chapter; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const open = ease(range(p, 0, 0.25));
  const colour = range(p, 0.15, 0.55);
  const text = range(p, 0.12, 0.5);
  const body = ease(range(p, 0.5, 0.65));
  const out = range(p, 0.88, 1);
  return (
    <section ref={ref} className="relative h-[220vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(${(1 - open) * 12}% ${(1 - open) * 8}% round ${(1 - open) * 40}px)`,
            opacity: 0.35 + open * 0.65 - out * 0.85,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: `scale(${1.35 - open * 0.25 + out * 0.1})`,
              filter: `grayscale(${1 - colour}) brightness(${0.55 + colour * 0.3}) contrast(1.08)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/45" />
        </div>
        <Stage c={c} index={index} text={text} body={body} out={out} />
      </div>
    </section>
  );
}

function ObjectChapter({ c, index }: { c: Chapter; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const show = ease(range(p, 0, 0.18));
  const text = range(p, 0.12, 0.5);
  const body = ease(range(p, 0.45, 0.6));
  const out = range(p, 0.88, 1);
  const spin = (p - 0.5) * 50;
  return (
    <section ref={ref} className="relative h-[220vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px", opacity: show * (1 - out) }}>
          <div
            className="absolute rounded-full"
            style={{ width: "70vmin", height: "70vmin", background: `radial-gradient(circle, ${c.glow}, transparent 65%)`, filter: "blur(40px)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            alt=""
            className="relative w-[78vmin] max-w-[760px]"
            style={{
              transform: `translateY(${(1 - show) * 18 - p * 6}vh) rotateY(${spin}deg) rotateX(${(0.5 - p) * 14}deg) scale(${0.75 + show * 0.25 + out * 0.3})`,
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 38%, transparent 70%)",
              maskImage: "radial-gradient(circle at 50% 50%, black 38%, transparent 70%)",
            }}
          />
        </div>
        <Stage c={c} index={index} text={text} body={body} out={out} low />
      </div>
    </section>
  );
}

function Stage({ c, index, text, body, out, low }: { c: Chapter; index: number; text: number; body: number; out: number; low?: boolean }) {
  return (
    <div
      className={`relative z-10 flex h-full flex-col items-center px-6 text-center ${low ? "justify-end pb-[14vh]" : "justify-center"}`}
      style={{ opacity: 1 - out, transform: `scale(${1 + out * 0.08})`, filter: `blur(${out * 10}px)` }}
    >
      <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-emerald-300/80" style={{ opacity: ease(range(text, 0, 0.3)) }}>
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-8 bg-emerald-300/50" />
        {c.keyword}
      </div>
      <h2 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
        <Words text={c.line} t={text} accent={c.accent} />
      </h2>
      <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8" style={{ opacity: body, transform: `translateY(${(1 - body) * 16}px)` }}>
        {c.body}
      </p>
    </div>
  );
}

// 1% better every day, compounded: 1.01^365 ≈ 37.78.
function CompoundChapter() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const k = ease(range(p, 0.1, 0.7));
  const days = Math.round(k * 365);
  const value = Math.pow(1.01, days);
  const out = range(p, 0.85, 1);
  return (
    <section ref={ref} className="relative h-[280vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center" style={{ opacity: 1 - out }}>
        <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 50% 55%, rgba(16,185,129,${0.15 + k * 0.35}), transparent ${30 + k * 30}%)` }} />
        <p className="relative text-xs font-bold uppercase tracking-[0.35em] text-emerald-300/80">The math of getting better</p>
        <div className="relative mt-6 text-7xl font-black tabular-nums tracking-[-0.04em] text-white sm:text-9xl lg:text-[11rem]">
          {value.toFixed(2)}
          <span className="text-emerald-400">×</span>
        </div>
        <p className="relative mt-4 text-lg text-zinc-400 sm:text-2xl">
          1% better every day for <span className="font-bold text-white tabular-nums">{days}</span> {days === 1 ? "day" : "days"}.
        </p>
        <div className="relative mt-10 h-1 w-64 overflow-hidden rounded-full bg-white/10 sm:w-96">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-300" style={{ width: `${k * 100}%` }} />
        </div>
        <p className="relative mt-10 max-w-lg text-base text-zinc-500 sm:text-lg" style={{ opacity: range(p, 0.65, 0.78) }}>
          You won&apos;t feel it on day one. You&apos;ll feel it on day 365.
        </p>
      </div>
    </section>
  );
}

const WORDS = ["Discipline", "Focus", "Consistency", "Courage", "Growth", "Patience", "Habits", "Grit"];

function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black py-6">
      <div className="flex w-max animate-[mv-marquee_28s_linear_infinite] gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-3xl font-black uppercase tracking-tight text-white/15 sm:text-5xl">
            {w}
            <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <p className="relative text-xs font-bold uppercase tracking-[0.4em] text-emerald-300/80 transition-all duration-1000" style={{ opacity: ready ? 1 : 0 }}>
        Mindset
      </p>
      <h1 className="relative mt-6 max-w-5xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
        <Words text="Everything you want is on the other side of consistency." t={ready ? 1 : 0} accent={["consistency"]} />
      </h1>
      <div className="absolute bottom-10 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Scroll
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>
    </section>
  );
}

function Finale() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const t = range(p, 0.05, 0.5);
  return (
    <section ref={ref} className="relative h-[180vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/15 to-transparent" style={{ opacity: ease(t) }} />
        <h2 className="relative text-6xl font-black tracking-[-0.05em] text-white sm:text-8xl lg:text-9xl">
          <Words text="Start today." t={t} accent={["today"]} />
        </h2>
        <p className="relative mt-6 max-w-xl text-lg text-zinc-400" style={{ opacity: ease(range(p, 0.35, 0.5)) }}>
          Five minutes. One lesson. The person you want to become is built exactly like that.
        </p>
        <div className="relative mt-10 flex flex-col gap-4 sm:flex-row" style={{ opacity: ease(range(p, 0.42, 0.56)) }}>
          <Link href="/apps" className="rounded-full bg-emerald-400 px-9 py-4 font-semibold text-black transition-transform duration-300 hover:scale-105">
            Learn with Swipe →
          </Link>
          <Link href="/" className="rounded-full border border-white/15 px-9 py-4 font-semibold text-white transition-colors duration-300 hover:bg-white/10">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MotivationScroll() {
  return (
    <main className="bg-black text-white">
      <style>{`@keyframes mv-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <BackButton />
      <Intro />
      <Marquee />
      {CHAPTERS.slice(0, 3).map((c, i) =>
        c.kind === "photo" ? <PhotoChapter key={c.keyword} c={c} index={i} /> : <ObjectChapter key={c.keyword} c={c} index={i} />
      )}
      <CompoundChapter />
      {CHAPTERS.slice(3).map((c, i) =>
        c.kind === "photo" ? <PhotoChapter key={c.keyword} c={c} index={i + 3} /> : <ObjectChapter key={c.keyword} c={c} index={i + 3} />
      )}
      <Marquee />
      <Finale />
    </main>
  );
}
