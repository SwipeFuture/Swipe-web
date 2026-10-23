"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_UPDATED, SITE_UPDATED_LABEL, SITE_URL } from "@/lib/site";
import { useEffect, useRef, useState, type ReactNode } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { useAnimatedNumber } from "@/components/finance/shared/useAnimatedNumber";
import { THEMES, type ToolTheme } from "./themes";

// Shared building blocks for every Swipe tool page (calculators, quizzes, advisor):
// one themed page shell per learning area, inputs, result cards, a bar chart and an
// FAQ that is also emitted as FAQPage structured data. Colours live in ./themes.ts.

export type { ToolTheme };
export { THEMES };

export type FaqItem = { q: string; a: string };
export type RelatedLink = { href: string; label: string };

export function ToolShell({
  theme,
  backHref,
  backLabel,
  eyebrow,
  title,
  highlight,
  intro,
  faq,
  related,
  children,
}: {
  theme: ToolTheme;
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  faq?: FaqItem[];
  related?: RelatedLink[];
  children: ReactNode;
}) {
  const t = THEMES[theme];
  const pathname = usePathname();
  const name = `${title} ${highlight}`;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-36">
      <div className={`absolute inset-0 -z-50 ${t.pageBg}`} />
      <div className={`absolute -top-24 -left-24 -z-40 h-[420px] w-[420px] rounded-full ${t.blobA} opacity-25 blur-[140px] sm:h-[620px] sm:w-[620px]`} />
      <div className={`absolute top-1/3 -right-24 -z-40 hidden h-[520px] w-[520px] rounded-full ${t.blobB} opacity-25 blur-[160px] sm:block`} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            // WebPage, not WebApplication: Google only accepts app markup with real ratings/reviews
            "@type": "WebPage",
            name,
            description: intro,
            url: `${SITE_URL}${pathname}`,
            isAccessibleForFree: true,
            dateModified: SITE_UPDATED,
            inLanguage: "en",
            publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Swipe", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
              { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${pathname}` },
            ],
          },
        ]}
      />
      {faq && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {backLabel}
        </Link>

        <div className={`mt-10 text-center transition-all duration-1000 ease-out sm:mt-14 ${shown ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${t.chip}`}>{eyebrow}</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
            {title} <span className={`${t.gradientText} bg-clip-text text-transparent`}>{highlight}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">{intro}</p>
          <p className="mt-4 text-xs font-medium text-stone-400">Free · no sign-up · updated {SITE_UPDATED_LABEL}</p>
        </div>

        <div className="mt-12 space-y-6 sm:mt-16 sm:space-y-8">{children}</div>

        {faq && faq.length > 0 && (
          <div className="mt-20 sm:mt-28">
            <h2 className="text-center text-2xl font-black tracking-tight text-stone-800 sm:text-3xl">Frequently asked questions</h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-[22px] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-stone-800 sm:text-base">
                    {f.q}
                    <span className="text-stone-400 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-stone-500 sm:text-base sm:leading-7">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {related && related.length > 0 && (
          <div className="mt-16 text-center sm:mt-20">
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>Keep going</span>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="rounded-full border border-white/70 bg-white/70 px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        <AppCta theme={theme} />
      </div>
    </section>
  );
}

// Closing card on every tool: the apps teach the why behind the numbers.
export function AppCta({ theme }: { theme: ToolTheme }) {
  const t = THEMES[theme];
  return (
    <div className={`mx-auto mt-16 max-w-3xl rounded-[28px] border p-6 text-center sm:mt-20 sm:p-8 ${t.softCard}`}>
      <h3 className="text-lg font-bold tracking-tight text-black sm:text-xl">Learn the skills behind it, five minutes a day</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
        Swipe turns coding, money, personal growth and AI into short, swipeable lessons for iPhone — free to start, one account for all four apps.
      </p>
      <Link
        href="/apps"
        className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${t.button}`}
      >
        Discover the Swipe apps →
      </Link>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-xl backdrop-blur-xl sm:rounded-[32px] sm:p-8 ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/60 via-white/10 to-transparent sm:rounded-[32px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function NumberInput({
  theme,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: {
  theme: ToolTheme;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  const t = THEMES[theme];
  return (
    <label className="block">
      <span className="text-xs font-semibold text-stone-600 sm:text-sm">{label}</span>
      <div className="relative mt-2">
        {prefix && <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold ${t.accentText}`}>{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const n = e.target.value === "" ? min : Number(e.target.value);
            if (!Number.isFinite(n)) return;
            onChange(Math.min(max ?? Infinity, Math.max(min, n)));
          }}
          className={`w-full rounded-2xl border bg-white/70 py-3 text-base font-semibold text-stone-800 shadow-sm outline-none backdrop-blur-sm transition-all duration-300 focus:ring-4 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${t.ring} ${
            prefix ? (prefix.length > 1 ? "pl-14" : "pl-10") : "pl-4"
          } ${suffix ? "pr-16" : "pr-4"}`}
        />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-400">{suffix}</span>}
      </div>
      {hint && <span className="mt-1.5 block text-xs text-stone-400">{hint}</span>}
    </label>
  );
}

export function Chips<T extends string | number>({
  theme,
  options,
  value,
  onChange,
  format,
}: {
  theme: ToolTheme;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  const t = THEMES[theme];
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={String(o)}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
            o === value ? t.activeChip : "border-stone-200 bg-white/70 text-stone-600 hover:border-stone-300"
          }`}
        >
          {format ? format(o) : String(o)}
        </button>
      ))}
    </div>
  );
}

export function HeroResult({ theme, label, value, note }: { theme: ToolTheme; label: string; value: string; note?: string }) {
  const t = THEMES[theme];
  return (
    <Card className="text-center">
      <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${t.chip}`}>{label}</span>
      <div className={`mt-4 text-5xl font-black tracking-tight ${t.gradientText} bg-clip-text text-transparent sm:text-6xl lg:text-7xl`}>{value}</div>
      {note && <p className="mx-auto mt-4 max-w-xl text-xs text-stone-500 sm:text-sm">{note}</p>}
    </Card>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-[24px] border border-white/70 bg-white/60 p-5 shadow-lg backdrop-blur-xl sm:p-6">
          <span className="block text-xs font-medium text-stone-500 sm:text-sm">{it.label}</span>
          <span className="mt-2 block text-lg font-bold tracking-tight text-stone-800 sm:text-2xl">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

// Simple responsive bar chart; `soft` draws a lighter second series behind each bar.
export function BarChart({
  theme,
  bars,
  format,
  title,
}: {
  theme: ToolTheme;
  bars: { label: string; value: number; soft?: number }[];
  format: (v: number) => string;
  title: string;
}) {
  const t = THEMES[theme];
  const max = Math.max(1, ...bars.map((b) => Math.max(b.value, b.soft ?? 0)));
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const step = Math.max(1, Math.ceil(bars.length / 10));
  return (
    <Card>
      <h2 className="text-base font-bold text-stone-800 sm:text-lg">{title}</h2>
      <div ref={ref} className="mt-6 flex h-56 items-end gap-[3px] sm:h-72 sm:gap-1.5">
        {bars.map((b, i) => (
          <div key={b.label + i} className="group relative flex h-full flex-1 flex-col justify-end">
            {b.soft !== undefined && (
              <div className={`absolute bottom-0 left-0 right-0 rounded-t-md ${t.barSoft} opacity-70 transition-all duration-700`} style={{ height: inView ? `${(b.soft / max) * 100}%` : "0%" }} />
            )}
            <div className={`relative rounded-t-md ${t.bar} transition-all duration-700`} style={{ height: inView ? `${(b.value / max) * 100}%` : "0%", transitionDelay: `${i * 12}ms` }} />
            <div className="pointer-events-none absolute -top-9 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-[11px] font-semibold text-white group-hover:block">
              {b.label}: {format(b.value)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-[3px] sm:gap-1.5">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 text-center text-[10px] text-stone-400 sm:text-xs">
            {i % step === 0 ? b.label : ""}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function useAnimated(value: number) {
  return useAnimatedNumber(value);
}
