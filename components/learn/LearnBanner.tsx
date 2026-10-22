import Link from "next/link";

// "Want to learn this like in the app?" banner that links a page to the matching
// free lessons and tools. Plain markup — usable from server and client components.

type Accent = "coding" | "finance" | "growth" | "ai";

const ACCENTS: Record<Accent, { glow: string; text: string; button: string; dot: string }> = {
  coding: { glow: "from-emerald-500/40 to-green-400/10", text: "text-emerald-300", button: "bg-emerald-400 text-black", dot: "bg-emerald-400" },
  finance: { glow: "from-amber-500/40 to-orange-400/10", text: "text-amber-300", button: "bg-amber-400 text-black", dot: "bg-amber-400" },
  growth: { glow: "from-orange-500/40 to-rose-400/10", text: "text-orange-300", button: "bg-orange-400 text-black", dot: "bg-orange-400" },
  ai: { glow: "from-violet-500/40 to-indigo-400/10", text: "text-violet-300", button: "bg-violet-400 text-black", dot: "bg-violet-400" },
};

export type BannerLink = { href: string; label: string };

export default function LearnBanner({
  accent,
  eyebrow = "Free · like in the app",
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
    <div className={`relative overflow-hidden rounded-[30px] bg-[#0b0b0d] p-7 text-left text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10 ${className}`}>
      <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${a.glow} blur-3xl`} />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${a.text}`}>
            <span className={`h-2 w-2 animate-pulse rounded-full ${a.dot}`} />
            {eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300 sm:text-base sm:leading-7">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
          <Link href={primary.href} className={`rounded-full px-6 py-3.5 text-center text-sm font-bold shadow-lg transition-transform duration-300 hover:scale-105 ${a.button}`}>
            {primary.label} →
          </Link>
          {secondary.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10">
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
