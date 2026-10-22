// Colour themes per learning area — plain data (no "use client"), so server pages can
// use them too. Tailwind only ships classes it can see, so every class is spelled out.

export type ToolTheme = "finance" | "growth" | "coding" | "ai" | "neutral";

type Theme = {
  pageBg: string;
  blobA: string;
  blobB: string;
  chip: string;
  accentText: string;
  gradientText: string;
  ring: string;
  bar: string;
  barSoft: string;
  button: string;
  activeChip: string;
  softCard: string;
};

export const THEMES: Record<ToolTheme, Theme> = {
  finance: {
    pageBg: "bg-gradient-to-b from-white via-amber-50 to-orange-100",
    blobA: "bg-amber-400",
    blobB: "bg-orange-300",
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    accentText: "text-amber-700",
    gradientText: "bg-gradient-to-r from-black via-amber-600 to-orange-500",
    ring: "focus:border-amber-400 focus:ring-amber-100 border-amber-200/70",
    bar: "bg-gradient-to-t from-amber-500 to-orange-400",
    barSoft: "bg-amber-200",
    button: "bg-black text-white hover:shadow-[0_15px_35px_-10px_rgba(217,119,6,0.5)]",
    activeChip: "bg-black text-white border-black",
    softCard: "border-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50",
  },
  growth: {
    pageBg: "bg-gradient-to-b from-white via-orange-50 to-rose-100",
    blobA: "bg-orange-400",
    blobB: "bg-rose-300",
    chip: "border-orange-200 bg-orange-50 text-orange-700",
    accentText: "text-orange-700",
    gradientText: "bg-gradient-to-r from-black via-orange-600 to-rose-500",
    ring: "focus:border-orange-400 focus:ring-orange-100 border-orange-200/70",
    bar: "bg-gradient-to-t from-orange-500 to-rose-400",
    barSoft: "bg-orange-200",
    button: "bg-black text-white hover:shadow-[0_15px_35px_-10px_rgba(234,88,12,0.5)]",
    activeChip: "bg-black text-white border-black",
    softCard: "border-orange-200/70 bg-gradient-to-br from-orange-50 to-rose-50",
  },
  coding: {
    pageBg: "bg-gradient-to-b from-white via-emerald-50 to-green-100",
    blobA: "bg-emerald-400",
    blobB: "bg-green-300",
    chip: "border-emerald-200 bg-emerald-50 text-emerald-700",
    accentText: "text-emerald-700",
    gradientText: "bg-gradient-to-r from-black via-emerald-600 to-green-500",
    ring: "focus:border-emerald-400 focus:ring-emerald-100 border-emerald-200/70",
    bar: "bg-gradient-to-t from-emerald-500 to-green-400",
    barSoft: "bg-emerald-200",
    button: "bg-black text-white hover:shadow-[0_15px_35px_-10px_rgba(16,185,129,0.5)]",
    activeChip: "bg-black text-white border-black",
    softCard: "border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-green-50",
  },
  ai: {
    pageBg: "bg-gradient-to-b from-white via-violet-50 to-indigo-100",
    blobA: "bg-violet-400",
    blobB: "bg-indigo-300",
    chip: "border-violet-200 bg-violet-50 text-violet-700",
    accentText: "text-violet-700",
    gradientText: "bg-gradient-to-r from-black via-violet-600 to-indigo-500",
    ring: "focus:border-violet-400 focus:ring-violet-100 border-violet-200/70",
    bar: "bg-gradient-to-t from-violet-500 to-indigo-400",
    barSoft: "bg-violet-200",
    button: "bg-black text-white hover:shadow-[0_15px_35px_-10px_rgba(139,92,246,0.5)]",
    activeChip: "bg-black text-white border-black",
    softCard: "border-violet-200/70 bg-gradient-to-br from-violet-50 to-indigo-50",
  },
  neutral: {
    pageBg: "bg-gradient-to-b from-white via-stone-50 to-stone-100",
    blobA: "bg-emerald-300",
    blobB: "bg-violet-300",
    chip: "border-stone-200 bg-stone-50 text-stone-700",
    accentText: "text-stone-600",
    gradientText: "bg-gradient-to-r from-stone-900 via-emerald-700 to-violet-600",
    ring: "focus:border-stone-400 focus:ring-stone-100 border-stone-200",
    bar: "bg-gradient-to-t from-emerald-500 to-violet-400",
    barSoft: "bg-stone-200",
    button: "bg-black text-white hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.4)]",
    activeChip: "bg-black text-white border-black",
    softCard: "border-stone-200 bg-gradient-to-br from-stone-50 to-white",
  },
};

