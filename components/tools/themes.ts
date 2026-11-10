// Colour themes per learning area — plain data (no "use client"), so server pages can
// use them too. Tailwind only ships classes it can see, so every class is spelled out.
// 2026-11-10 design: flat colours only (white pages, the app colours at full strength,
// a light tint for cards). No gradients, blobs or glows: `gradientText` is a solid colour
// that still works with bg-clip-text, and `blobA`/`blobB` hide the old decoration.

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
  /** app colours as plain values, for inline styles */
  bright: string;
  dark: string;
  tint: string;
};

export const THEMES: Record<ToolTheme, Theme> = {
  finance: {
    pageBg: "bg-white",
    blobA: "hidden",
    blobB: "hidden",
    chip: "border-transparent bg-[#FEF5DA] text-[#B45309]",
    accentText: "text-[#B45309]",
    gradientText: "bg-[#B45309]",
    ring: "border-[#e6e6e3] focus:border-[#B45309] focus:ring-[#FEF5DA]",
    bar: "bg-[#FBBF24]",
    barSoft: "bg-[#FDE9A8]",
    button: "bg-[#121212] text-white hover:bg-[#2a2a2a]",
    activeChip: "border-[#121212] bg-[#121212] text-white",
    softCard: "border-transparent bg-[#FEF5DA]",
    bright: "#FBBF24",
    dark: "#B45309",
    tint: "#FEF5DA",
  },
  growth: {
    pageBg: "bg-white",
    blobA: "hidden",
    blobB: "hidden",
    chip: "border-transparent bg-[#FFEEDF] text-[#C2410C]",
    accentText: "text-[#C2410C]",
    gradientText: "bg-[#C2410C]",
    ring: "border-[#e6e6e3] focus:border-[#C2410C] focus:ring-[#FFEEDF]",
    bar: "bg-[#FB923C]",
    barSoft: "bg-[#FED2AE]",
    button: "bg-[#121212] text-white hover:bg-[#2a2a2a]",
    activeChip: "border-[#121212] bg-[#121212] text-white",
    softCard: "border-transparent bg-[#FFEEDF]",
    bright: "#FB923C",
    dark: "#C2410C",
    tint: "#FFEEDF",
  },
  coding: {
    pageBg: "bg-white",
    blobA: "hidden",
    blobB: "hidden",
    chip: "border-transparent bg-[#E7FAF0] text-[#127D4D]",
    accentText: "text-[#127D4D]",
    gradientText: "bg-[#127D4D]",
    ring: "border-[#e6e6e3] focus:border-[#127D4D] focus:ring-[#E7FAF0]",
    bar: "bg-[#22E08A]",
    barSoft: "bg-[#B9F5D6]",
    button: "bg-[#121212] text-white hover:bg-[#2a2a2a]",
    activeChip: "border-[#121212] bg-[#121212] text-white",
    softCard: "border-transparent bg-[#E7FAF0]",
    bright: "#22E08A",
    dark: "#127D4D",
    tint: "#E7FAF0",
  },
  ai: {
    pageBg: "bg-white",
    blobA: "hidden",
    blobB: "hidden",
    chip: "border-transparent bg-[#F0EAFE] text-[#6D28D9]",
    accentText: "text-[#6D28D9]",
    gradientText: "bg-[#6D28D9]",
    ring: "border-[#e6e6e3] focus:border-[#6D28D9] focus:ring-[#F0EAFE]",
    bar: "bg-[#8B5CF6]",
    barSoft: "bg-[#D6C8FB]",
    button: "bg-[#121212] text-white hover:bg-[#2a2a2a]",
    activeChip: "border-[#121212] bg-[#121212] text-white",
    softCard: "border-transparent bg-[#F0EAFE]",
    bright: "#8B5CF6",
    dark: "#6D28D9",
    tint: "#F0EAFE",
  },
  neutral: {
    pageBg: "bg-white",
    blobA: "hidden",
    blobB: "hidden",
    chip: "border-transparent bg-[#F6F6F4] text-[#3a3a38]",
    accentText: "text-[#3a3a38]",
    gradientText: "bg-[#121212]",
    ring: "border-[#e6e6e3] focus:border-[#121212] focus:ring-[#F6F6F4]",
    bar: "bg-[#121212]",
    barSoft: "bg-[#dcdcd8]",
    button: "bg-[#121212] text-white hover:bg-[#2a2a2a]",
    activeChip: "border-[#121212] bg-[#121212] text-white",
    softCard: "border-transparent bg-[#F6F6F4]",
    bright: "#22E08A",
    dark: "#121212",
    tint: "#F6F6F4",
  },
};
