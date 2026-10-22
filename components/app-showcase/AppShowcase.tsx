"use client";

import Link from "next/link";
import { appLessons, learnAppUrl, toolsAppUrl } from "@/lib/learn-links";
import { APPS, LAUNCH, LAUNCH_LABEL, SHARED_FEATURES, type AppContent, type Feature, type ShowcaseApp, type Track } from "./data";

export { APPS, LAUNCH_LABEL };
export type { AppContent, Feature, ShowcaseApp, Track };
import { useEffect, useRef, useState } from "react";
import TrackModal from "@/components/app-tracks/TrackModal";
import ScrollStrip from "@/components/scroll-strip/ScrollStrip";

// ================= App Showcase =================
//
// The featured "Swipe <App> — Coming Soon" block shown on each learning-area page
// (Coding, Finance, Personal Growth, AI). One component, four themes, so all four
// pages stay in sync: big release date, real App Store screenshots, what's
// inside the app and every track with its level count.
//
// Tailwind only ships classes it can see in source, so every themed class is
// spelled out in full inside THEMES below — never built from string fragments.



type Theme = {
  card: string;
  glowA: string;
  glowB: string;
  outerGlow: string;
  badge: string;
  dot: string;
  titleGradient: string;
  muted: string;
  chipText: string;
  accentText: string;
  accentBg: string;
  iconTile: string;
};

const THEMES: Record<ShowcaseApp, Theme> = {
  coding: {
    card: "from-green-950 via-green-900 to-emerald-950",
    glowA: "bg-green-500",
    glowB: "bg-emerald-400",
    outerGlow: "from-green-500/0 via-green-500/50 to-emerald-400/0",
    badge: "border-green-400/30 bg-green-400/10 text-green-300",
    dot: "bg-green-400",
    titleGradient: "from-green-300 via-emerald-300 to-green-200",
    muted: "text-green-100/70",
    chipText: "text-green-100/90",
    accentText: "text-green-300",
    accentBg: "bg-green-400",
    iconTile: "from-green-400/25 to-emerald-400/5",
  },
  finance: {
    card: "from-amber-950 via-amber-900 to-orange-950",
    glowA: "bg-amber-500",
    glowB: "bg-orange-400",
    outerGlow: "from-amber-500/0 via-amber-500/50 to-orange-400/0",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    dot: "bg-amber-400",
    titleGradient: "from-amber-300 via-orange-300 to-amber-200",
    muted: "text-amber-100/70",
    chipText: "text-amber-100/90",
    accentText: "text-amber-300",
    accentBg: "bg-amber-400",
    iconTile: "from-amber-400/25 to-orange-400/5",
  },
  growth: {
    card: "from-orange-950 via-orange-900 to-orange-950",
    glowA: "bg-orange-500",
    glowB: "bg-amber-400",
    outerGlow: "from-orange-500/0 via-orange-500/50 to-amber-400/0",
    badge: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    dot: "bg-orange-400",
    titleGradient: "from-orange-300 via-amber-300 to-orange-200",
    muted: "text-orange-100/70",
    chipText: "text-orange-100/90",
    accentText: "text-orange-300",
    accentBg: "bg-orange-400",
    iconTile: "from-orange-400/25 to-amber-400/5",
  },
  ai: {
    card: "from-violet-950 via-violet-900 to-purple-950",
    glowA: "bg-violet-500",
    glowB: "bg-purple-400",
    outerGlow: "from-violet-500/0 via-violet-500/50 to-purple-400/0",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    dot: "bg-violet-400",
    titleGradient: "from-violet-300 via-purple-300 to-violet-200",
    muted: "text-violet-100/70",
    chipText: "text-violet-100/90",
    accentText: "text-violet-300",
    accentBg: "bg-violet-400",
    iconTile: "from-violet-400/25 to-purple-400/5",
  },
};


function useLaunched() {
  // false until mounted, so server and client render the same markup.
  const [launched, setLaunched] = useState(false);
  useEffect(() => {
    setLaunched(LAUNCH !== null && Date.now() >= LAUNCH.getTime());
  }, []);
  return launched;
}

export default function AppShowcase({ app }: { app: ShowcaseApp }) {
  const t = THEMES[app];
  const c = APPS[app];
  const launched = useLaunched();
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

  const totalLevels = c.tracks.reduce((sum, track) => sum + track.levels, 0);
  const stats = [
    { value: String(c.tracks.length), label: "Tracks" },
    { value: String(totalLevels), label: "Levels" },
    { value: "Free", label: "To download" },
    { value: "4 in 1", label: "Swipe account" },
  ];
  const features = [...c.features, ...SHARED_FEATURES];

  return (
    <div
      ref={ref}
      className={`group relative transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      <div className={`absolute -inset-px rounded-[36px] sm:rounded-[48px] bg-gradient-to-br ${t.outerGlow} opacity-60 blur-lg -z-10`} />

      <div className={`relative overflow-hidden rounded-[36px] sm:rounded-[48px] border border-white/10 bg-gradient-to-br ${t.card} py-8 sm:py-12 lg:py-16 shadow-2xl text-center`}>

        <div className="pointer-events-none absolute inset-0 rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        <div className={`hidden sm:block absolute -right-20 -top-20 w-80 h-80 rounded-full ${t.glowA} blur-[130px] opacity-30`} />
        <div className={`hidden lg:block absolute -left-16 bottom-40 w-72 h-72 rounded-full ${t.glowB} blur-[120px] opacity-20`} />

        <div className="relative px-6 sm:px-12 lg:px-16">

          {/* ---------- Badges ---------- */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className={`inline-flex items-center gap-2 rounded-full border backdrop-blur-sm px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide ${t.badge}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${t.dot}`} />
              {launched ? "Out now on the App Store" : "Coming Soon"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white/85">
              📱 iPhone · App Store
            </span>
          </div>

          {/* ---------- Logos ---------- */}
          <div className="relative mx-auto mt-10 sm:mt-12 flex items-center justify-center w-56 h-36 sm:w-72 sm:h-44">
            <div className={`absolute inset-0 rounded-[40px] ${t.glowA} blur-3xl opacity-20 -z-10`} />
            <img
              src={`/logo-${c.logo}-black.png`}
              alt={`Swipe ${c.name} app icon`}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-[28px] object-cover shadow-2xl -rotate-6 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:-translate-x-2"
            />
            <img
              src={`/logo-${c.logo}-white.png`}
              alt=""
              className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-[28px] object-cover shadow-2xl rotate-6 transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:translate-x-2"
            />
          </div>

          <h3 className="mt-8 sm:mt-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Swipe{" "}
            <span className={`bg-gradient-to-r ${t.titleGradient} bg-clip-text text-transparent`}>
              {c.name}
            </span>
          </h3>

          <p className={`mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 max-w-2xl mx-auto ${t.muted}`}>
            {c.intro}
          </p>

          {/* ---------- Release date ---------- */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center">
            <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>
              {launched ? "Released" : "Release date"}
            </span>
            <div className="mt-3 rounded-3xl border border-white/10 bg-black/25 backdrop-blur-sm px-7 sm:px-10 py-4 sm:py-5">
              <div className={`bg-gradient-to-r ${t.titleGradient} bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight`}>
                {LAUNCH_LABEL}
              </div>
            </div>
          </div>

          {/* ---------- Stats ---------- */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-4">
                <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                <div className={`mt-0.5 text-xs sm:text-sm font-medium ${t.muted}`}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ---------- Screenshots (full-bleed horizontal strip) ---------- */}
        <div className="relative mt-12 sm:mt-14">
          <div className="px-6 sm:px-12 lg:px-16">
            <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>
              Sneak peek
            </span>
            <h4 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              A first look inside the app
            </h4>
          </div>

          <ScrollStrip
            className="mt-6 sm:mt-8 flex gap-4 sm:gap-5 px-6 sm:px-12 lg:px-16 pb-4"
            barClassName="bg-white/15"
            thumbClassName="bg-white/70"
          >
            {c.screens.map((caption, i) => (
              <figure key={caption} className="snap-center shrink-0 w-[62%] sm:w-[34%] lg:w-[23%]">
                <div className="rounded-[28px] sm:rounded-[32px] border border-white/15 bg-black p-1.5 shadow-2xl transition-transform duration-500 ease-out hover:-translate-y-1.5">
                  <img
                    src={`/app-screens/${app}/0${i + 1}.webp`}
                    alt={`Swipe ${c.name}: ${caption}`}
                    loading="lazy"
                    width={640}
                    height={1385}
                    className="w-full h-auto rounded-[22px] sm:rounded-[26px]"
                  />
                </div>
                <figcaption className={`mt-3 text-xs sm:text-sm font-medium ${t.chipText}`}>
                  {caption}
                </figcaption>
              </figure>
            ))}
          </ScrollStrip>
        </div>

        <div className="relative px-6 sm:px-12 lg:px-16">

          {/* ---------- What's inside ---------- */}
          <div className="mt-12 sm:mt-14">
            <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>
              What&apos;s coming
            </span>
            <h4 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              Everything inside Swipe {c.name}
            </h4>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-left">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br ${t.iconTile} border border-white/10 text-xl`}>
                    {feature.icon}
                  </div>
                  <div className="mt-4 text-base sm:text-lg font-bold text-white">{feature.title}</div>
                  <p className={`mt-1.5 text-sm leading-6 ${t.muted}`}>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Tracks ---------- */}
          <div className="mt-12 sm:mt-14">
            <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>
              Tracks at launch
            </span>
            <h4 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              {c.tracks.length} tracks, {totalLevels} levels
            </h4>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
              {c.tracks.map((track) => (
                <button
                  key={track.name}
                  type="button"
                  onClick={() => setOpenTrack(track.name)}
                  className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm pl-3.5 pr-2 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5 ${t.chipText}`}
                >
                  {track.name}
                  <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white/70">
                    {track.levels} levels
                  </span>
                </button>
              ))}
            </div>
            <p className={`mt-5 text-xs sm:text-sm ${t.muted}`}>
              Tap a track to see every level and lesson. Plus a free Sandbox intro and the {c.advisor} — more tracks are already in the works.
            </p>
          </div>

          {/* ---------- Try it free on the web ---------- */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={learnAppUrl(app)}
              className="rounded-full bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-black shadow-xl transition-all duration-300 hover:scale-105"
            >
              Try {appLessons(app)} lessons free — like in the app →
            </Link>
            <Link
              href={toolsAppUrl(app)}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Free tools & quizzes
            </Link>
          </div>

          {/* ---------- Plans ---------- */}
          <div className="mt-12 sm:mt-14 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="text-base sm:text-lg font-bold text-white">Free to start — upgrade only if you want more</div>
            <p className={`mt-2 text-sm leading-6 ${t.muted}`}>
              The free plan gives you about five lessons every day. Go and Pro raise the daily limit — and one
              plan always covers all four Swipe apps.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
              {[
                { name: "Free", detail: "~5 lessons / day" },
                { name: "Go", detail: "~10 lessons / day" },
                { name: "Pro", detail: "No daily limit" },
              ].map((plan) => (
                <div key={plan.name} className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3">
                  <div className={`text-sm sm:text-base font-black ${plan.name === "Free" ? "text-white" : t.accentText}`}>{plan.name}</div>
                  <div className={`mt-0.5 text-[11px] sm:text-xs ${t.muted}`}>{plan.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- To the /apps page ---------- */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              href={`/apps#${app}`}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-black shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              Discover all Swipe Apps
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>

      </div>

      <TrackModal app={app} track={openTrack} appName={`Swipe ${c.name}`} onClose={() => setOpenTrack(null)} />
    </div>
  );
}
