"use client";

import { useEffect, useRef, useState } from "react";
import TrackModal from "@/components/app-tracks/TrackModal";
import ScrollStrip from "@/components/scroll-strip/ScrollStrip";
import { APPS, LAUNCH_LABEL, type ShowcaseApp } from "@/components/app-showcase/AppShowcase";

// One app on the /apps page — a light, editorial split layout (text on one
// side, a fan of three phone screenshots on the other), deliberately unlike
// the dark AppShowcase cards on the learning-path pages. Content comes from
// the same APPS data so both stay in sync.
//
// Like every image/text split on the site, the phone fan disappears once the
// columns stack; on small screens a swipeable screenshot strip takes over.

type Theme = {
  tint: string;
  blob: string;
  accent: string;
  accentBg: string;
  chip: string;
  dot: string;
  ring: string;
};

// Full class strings so Tailwind generates them.
const THEMES: Record<ShowcaseApp, Theme> = {
  coding: {
    tint: "from-green-50 via-white to-emerald-50/60",
    blob: "bg-green-300",
    accent: "text-green-700",
    accentBg: "bg-green-600",
    chip: "border-green-200 bg-green-50 text-green-800",
    dot: "bg-green-500",
    ring: "ring-green-200",
  },
  finance: {
    tint: "from-amber-50 via-white to-orange-50/60",
    blob: "bg-amber-300",
    accent: "text-amber-700",
    accentBg: "bg-amber-500",
    chip: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
    ring: "ring-amber-200",
  },
  growth: {
    tint: "from-orange-50 via-white to-amber-50/60",
    blob: "bg-orange-300",
    accent: "text-orange-700",
    accentBg: "bg-orange-500",
    chip: "border-orange-200 bg-orange-50 text-orange-800",
    dot: "bg-orange-500",
    ring: "ring-orange-200",
  },
  ai: {
    tint: "from-violet-50 via-white to-purple-50/60",
    blob: "bg-violet-300",
    accent: "text-violet-700",
    accentBg: "bg-violet-600",
    chip: "border-violet-200 bg-violet-50 text-violet-800",
    dot: "bg-violet-500",
    ring: "ring-violet-200",
  },
};

const TAGLINES: Record<ShowcaseApp, string> = {
  coding: "Learn to code, one swipe at a time",
  finance: "Master your money, one swipe at a time",
  growth: "Build better habits, one swipe at a time",
  ai: "Understand AI, one swipe at a time",
};

// Which three screenshots go in the fan (index into the app's 01–06 shots).
const FAN: Record<ShowcaseApp, [number, number, number]> = {
  coding: [1, 2, 3],
  finance: [1, 2, 6],
  growth: [1, 4, 5],
  ai: [1, 2, 3],
};

export default function AppDetail({ app, flip = false }: { app: ShowcaseApp; flip?: boolean }) {
  const c = APPS[app];
  const t = THEMES[app];
  const totalLevels = c.tracks.reduce((sum, track) => sum + track.levels, 0);
  const [left, mid, right] = FAN[app];

  const [openTrack, setOpenTrack] = useState<string | null>(null);
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

  const shot = (n: number) => `/app-screens/${app}/0${n}.webp`;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[36px] sm:rounded-[44px] bg-gradient-to-br ${t.tint} border border-stone-200/70 transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className={`absolute ${flip ? "-left-24" : "-right-24"} -top-24 w-80 h-80 rounded-full ${t.blob} blur-[120px] opacity-40`} />

      <div className="relative grid lg:grid-cols-2 items-center gap-10 lg:gap-6 p-6 sm:p-10 lg:p-14">

        {/* ---------- Text ---------- */}
        <div className={flip ? "lg:order-2" : ""}>
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={`/logo-${c.logo}-black.png`}
              alt={`Swipe ${c.name} app icon`}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[18px] sm:rounded-[22px] object-cover shadow-xl ring-4 ${t.ring}`}
            />
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900">
                Swipe {c.name}
              </h3>
              <div className={`mt-1 text-sm sm:text-base font-semibold ${t.accent}`}>{TAGLINES[app]}</div>
            </div>
          </div>

          <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-stone-600">{c.intro}</p>

          {/* Key facts as a single row of numbers */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <div><span className="text-2xl sm:text-3xl font-black text-stone-900">{c.tracks.length}</span> <span className="text-sm text-stone-500">tracks</span></div>
            <div><span className="text-2xl sm:text-3xl font-black text-stone-900">{totalLevels}</span> <span className="text-sm text-stone-500">levels</span></div>
            <div><span className="text-2xl sm:text-3xl font-black text-stone-900">Free</span> <span className="text-sm text-stone-500">to download</span></div>
          </div>

          {/* App-specific highlights as a numbered list */}
          <ol className="mt-7 space-y-4">
            {c.features.map((f, i) => (
              <li key={f.title} className="flex gap-4">
                <span className={`flex-none flex items-center justify-center w-8 h-8 rounded-full ${t.accentBg} text-white text-sm font-bold`}>
                  {i + 1}
                </span>
                <div>
                  <div className="font-bold text-stone-900">{f.title}</div>
                  <p className="mt-0.5 text-sm leading-6 text-stone-600">{f.text}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Tracks — tap one to see every level, chapter and lesson */}
          <div className="mt-7 text-xs font-semibold uppercase tracking-wider text-stone-400">Tap a track to see what&apos;s inside</div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {c.tracks.map((track) => (
              <button
                key={track.name}
                type="button"
                onClick={() => setOpenTrack(track.name)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${t.chip}`}
              >
                {track.name}
                <span className="opacity-60">· {track.levels}</span>
                <span className="opacity-50">›</span>
              </button>
            ))}
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white">
            <span className={`w-2 h-2 rounded-full ${t.dot} animate-pulse`} />
            On the App Store · {LAUNCH_LABEL}
          </div>
        </div>

        {/* ---------- Phone fan (side-by-side layout only) ---------- */}
        <div className={`max-lg:hidden relative h-[560px] ${flip ? "lg:order-1" : ""}`}>
          {[
            { n: left, cls: "left-[4%] top-12 -rotate-[9deg] z-10 scale-[0.88]" },
            { n: right, cls: "right-[4%] top-12 rotate-[9deg] z-10 scale-[0.88]" },
            { n: mid, cls: "left-1/2 -translate-x-1/2 top-0 z-20" },
          ].map(({ n, cls }) => (
            <div key={n} className={`absolute w-[230px] ${cls} transition-transform duration-700`}>
              <div className="rounded-[34px] bg-stone-900 p-[7px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]">
                <img src={shot(n)} alt={`Swipe ${c.name}: ${c.screens[n - 1]}`} loading="lazy" className="w-full rounded-[28px]" />
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Swipeable screenshots (stacked layout only) ---------- */}
        <div className="lg:hidden -mx-6 sm:-mx-10">
          <ScrollStrip className="flex gap-3 px-6 sm:px-10 pb-2" barClassName="bg-stone-200" thumbClassName="bg-stone-500">
            {c.screens.map((caption, i) => (
              <figure key={caption} className="snap-start shrink-0 w-[44%] sm:w-[30%]">
                <div className="rounded-[22px] bg-stone-900 p-[5px] shadow-lg">
                  <img src={shot(i + 1)} alt={`Swipe ${c.name}: ${caption}`} loading="lazy" className="w-full rounded-[18px]" />
                </div>
                <figcaption className="mt-2 text-[11px] sm:text-xs text-stone-500">{caption}</figcaption>
              </figure>
            ))}
          </ScrollStrip>
        </div>

      </div>

      <TrackModal app={app} track={openTrack} appName={`Swipe ${c.name}`} onClose={() => setOpenTrack(null)} />
    </div>
  );
}
