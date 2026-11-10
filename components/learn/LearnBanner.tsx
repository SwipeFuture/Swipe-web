import Link from "next/link";

// "Want to learn this like in the app?" banner that links a page to the matching
// free lessons and tools. Plain markup — usable from server and client components.
// 2026-11-10 design: flat app-colour tint, small tinted label, black button, underlined links.
// Old dark version: swipe-assistant/logs/redesign-backup/LearnBanner.tsx.wave2

type Accent = "coding" | "finance" | "growth" | "ai";

const ACCENTS: Record<Accent, { tint: string; light: string; dark: string; bright: string }> = {
  coding: { tint: "#E7FAF0", light: "#B9F5D6", dark: "#127D4D", bright: "#22E08A" },
  finance: { tint: "#FEF5DA", light: "#FDE9A8", dark: "#B45309", bright: "#FBBF24" },
  growth: { tint: "#FFEEDF", light: "#FED2AE", dark: "#C2410C", bright: "#FB923C" },
  ai: { tint: "#F0EAFE", light: "#D6C8FB", dark: "#6D28D9", bright: "#8B5CF6" },
};

export type BannerLink = { href: string; label: string };

export default function LearnBanner({
  accent,
  eyebrow = "Free, like in the app",
  title,
  text,
  primary,
  secondary = [],
  className = "",
}: {
  accent: Accent;
  eyebrow?: string;
  title: string;
  text: string;
  primary: BannerLink;
  secondary?: BannerLink[];
  className?: string;
}) {
  const a = ACCENTS[accent];
  return (
    <div className={`rounded-[26px] p-7 text-left text-[#121212] sm:p-10 ${className}`} style={{ background: a.tint, boxShadow: `0 5px 0 ${a.light}` }}>
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex rounded-lg bg-white px-2.5 py-1 text-[14px] font-bold" style={{ color: a.dark }}>{eyebrow}</span>
          <h2 className="mt-4 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[32px]">{title}</h2>
          <p className="mt-3 text-[16px] leading-7 text-[#3a3a38]">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4">
          <Link href={primary.href} className="inline-block rounded-xl bg-[#121212] px-6 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">
            {primary.label} →
          </Link>
          {secondary.map((s) => (
            <Link key={s.href} href={s.href} className="text-[15px] font-bold underline decoration-2 underline-offset-[5px]" style={{ textDecorationColor: a.bright }}>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
