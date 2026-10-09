"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Pop-up outline of one app track: every level with its chapters and lesson
// titles. The data comes from public/app-tracks/<app>.json, exported straight
// from the apps' own lesson files, and is fetched the first time it's needed.

export type TrackApp = "coding" | "finance" | "growth" | "ai";
type Level = { number: number; test: boolean; chapters: { title: string; lessons: string[]; quiz: boolean }[] };
type Outline = Record<string, Level[]>;

const cache: Partial<Record<TrackApp, Promise<Outline>>> = {};
function loadOutline(app: TrackApp) {
  cache[app] ??= fetch(`/app-tracks/${app}.json`).then((r) => {
    if (!r.ok) throw new Error("load failed");
    return r.json();
  });
  return cache[app]!;
}

const ACCENT: Record<TrackApp, { pill: string; num: string; ring: string }> = {
  coding: { pill: "bg-green-100 text-green-800", num: "bg-green-600", ring: "ring-green-200" },
  finance: { pill: "bg-amber-100 text-amber-800", num: "bg-amber-500", ring: "ring-amber-200" },
  growth: { pill: "bg-orange-100 text-orange-800", num: "bg-orange-500", ring: "ring-orange-200" },
  ai: { pill: "bg-violet-100 text-violet-800", num: "bg-violet-600", ring: "ring-violet-200" },
};

export default function TrackModal({
  app,
  track,
  appName,
  onClose,
}: {
  app: TrackApp;
  track: string | null;
  appName: string;
  onClose: () => void;
}) {
  const [levels, setLevels] = useState<Level[] | null>(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState<number | null>(1);
  const a = ACCENT[app];

  useEffect(() => {
    if (!track) return;
    setLevels(null);
    setError(false);
    setOpen(1);
    loadOutline(app)
      .then((o) => setLevels(o[track] ?? []))
      .catch(() => setError(true));
  }, [app, track]);

  // Escape closes, page behind doesn't scroll while open.
  useEffect(() => {
    if (!track) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [track, onClose]);

  // Rendered into <body>: the cards around it animate with transforms, which
  // would otherwise trap a position:fixed overlay inside the card.
  if (!track || typeof document === "undefined") return null;

  const lessonCount = levels?.reduce((s, l) => s + l.chapters.reduce((x, c) => x + c.lessons.length, 0), 0) ?? 0;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={`${track} outline`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-2xl max-h-[88dvh] flex flex-col rounded-t-[28px] sm:rounded-[32px] bg-white shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 sm:p-7 border-b border-stone-100">
          <img src={`/logo-${app}-black.png`} alt="" className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ring-4 ${a.ring}`} />
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-stone-500">{appName}</div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">{track}</h3>
            {levels && (
              <div className="mt-1.5 flex flex-wrap gap-2 text-xs font-semibold">
                <span className={`rounded-full px-2.5 py-1 ${a.pill}`}>{levels.length} levels</span>
                <span className={`rounded-full px-2.5 py-1 ${a.pill}`}>{lessonCount} lessons</span>
                {levels.some((l) => l.chapters.some((c) => c.quiz)) && (
                  <span className="rounded-full px-2.5 py-1 bg-stone-100 text-stone-600">Quiz after every chapter</span>
                )}
                {levels.some((l) => l.test) && (
                  <span className="rounded-full px-2.5 py-1 bg-stone-100 text-stone-600">Level tests</span>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-none w-10 h-10 rounded-full bg-stone-100 text-stone-600 text-xl leading-none hover:bg-stone-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Levels */}
        <div className="overflow-y-auto p-3 sm:p-5">
          {error && <p className="p-4 text-center text-sm text-stone-500">Couldn&apos;t load the outline. Please try again.</p>}
          {!levels && !error && <p className="p-4 text-center text-sm text-stone-400">Loading…</p>}
          {levels?.map((level) => {
            const isOpen = open === level.number;
            return (
              <div key={level.number} className="border-b border-stone-100 last:border-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : level.number)}
                  className="w-full flex items-center gap-3 sm:gap-4 px-2 sm:px-3 py-3.5 text-left rounded-2xl hover:bg-stone-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className={`flex-none flex items-center justify-center w-9 h-9 rounded-full ${a.num} text-white text-sm font-bold`}>
                    {level.number}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-stone-900">Level {level.number}</span>
                    <span className="block text-sm text-stone-500 truncate">{level.chapters.map((c) => c.title).join(" · ")}</span>
                  </span>
                  <span className={`flex-none text-stone-400 text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="pl-14 sm:pl-16 pr-3 pb-4 space-y-4">
                    {level.chapters.map((chapter, i) => (
                      <div key={i}>
                        <div className="text-sm font-bold text-stone-800">{chapter.title}</div>
                        <ul className="mt-1.5 space-y-1">
                          {chapter.lessons.map((lesson) => (
                            <li key={lesson} className="flex gap-2 text-sm text-stone-600">
                              <span className="text-stone-300">•</span>
                              {lesson}
                            </li>
                          ))}
                          {chapter.quiz && (
                            <li className="flex gap-2 text-sm text-stone-400 italic">
                              <span className="text-stone-300">•</span>
                              Chapter quiz
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                    {level.test && <div className="text-sm text-stone-400 italic">+ Level test to finish the level</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
