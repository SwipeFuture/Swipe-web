"use client";

import Link from "next/link";
import AdviceNote from "@/components/learn/AdviceNote";
import { usePathname } from "next/navigation";
import { SITE_UPDATED, SITE_UPDATED_LABEL, SITE_URL } from "@/lib/site";
import { useEffect, useRef, useState, type ReactNode } from "react";
import JsonLd from "@/components/seo/JsonLd";
import { useAnimatedNumber } from "@/components/finance/shared/useAnimatedNumber";
import { THEMES, type ToolTheme } from "./themes";

// Shared building blocks for every SwipeFuture tool page (calculators, quizzes, advisor):
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
    <section className="relative bg-white pb-24 pt-28 sm:pb-32 sm:pt-36">
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
            publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "SwipeFuture", url: SITE_URL },
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
        <Link href={backHref} className="group inline-flex items-center gap-2 text-[15px] font-bold text-[#3a3a38] hover:text-[#121212]">
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          {backLabel}
        </Link>

        <div className={`mt-8 transition-opacity duration-500 sm:mt-10 ${shown ? "opacity-100" : "opacity-0"}`}>
          <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[14px] font-bold ${t.chip}`}>{eyebrow}</span>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[56px] lg:text-[64px]" style={{ fontStretch: "125%" }}>
            {title} <span style={{ color: t.dark }}>{highlight}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[#3a3a38] sm:text-[19px]">{intro}</p>
          <p className="mt-3 text-[14px] text-[#5c5c58]">Free · no sign-up · updated {SITE_UPDATED_LABEL}</p>
        </div>

        <div className="mt-12 space-y-6 sm:mt-16 sm:space-y-8">{children}</div>

        {(theme === "finance" || theme === "growth") && <AdviceNote area={theme} className="mx-auto mt-10 max-w-3xl" />}

        {faq && faq.length > 0 && (
          <div className="mt-20 sm:mt-28">
            <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[36px]" style={{ fontStretch: "125%" }}>Frequently asked questions</h2>
            <div className="mt-6 max-w-3xl divide-y-2 divide-[#ececea] border-y-2 border-[#ececea]">
              {faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold">
                    {f.q}
                    <span className="text-[22px] leading-none text-[#5c5c58] transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-7 text-[#3a3a38]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {related && related.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <h2 className="text-[20px] font-extrabold" style={{ fontStretch: "125%" }}>Keep going</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="rounded-xl px-4 py-2.5 text-[15px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ background: t.tint, color: t.dark }}
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[24px] border-2 border-[#ececea] bg-white p-6 sm:p-8 ${className}`}>
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
      <span className="text-[14px] font-bold text-[#3a3a38]">{label}</span>
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
          className={`w-full rounded-xl border-2 bg-white py-3 text-[17px] font-bold text-[#121212] outline-none transition-colors duration-200 focus:ring-4 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${t.ring} ${
            prefix ? (prefix.length > 1 ? "pl-14" : "pl-10") : "pl-4"
          } ${suffix ? "pr-16" : "pr-4"}`}
        />
        {suffix && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-400">{suffix}</span>}
      </div>
      {hint && <span className="mt-1.5 block text-[13px] text-[#5c5c58]">{hint}</span>}
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
          className={`rounded-xl border-2 px-4 py-2 text-[15px] font-bold transition-colors duration-200 ${
            o === value ? t.activeChip : "border-[#e6e6e3] bg-white text-[#3a3a38] hover:border-[#c9c9c5]"
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
    <div className="rounded-[24px] p-6 sm:p-8" style={{ background: t.tint }}>
      <span className="text-[15px] font-bold" style={{ color: t.dark }}>{label}</span>
      <div className="mt-2 text-[44px] font-extrabold leading-none tracking-[-0.02em] sm:text-[60px]" style={{ fontStretch: "125%" }}>{value}</div>
      {note && <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#3a3a38]">{note}</p>}
    </div>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="border-t-2 border-[#ececea] pt-4">
          <span className="block text-[14px] font-bold text-[#5c5c58]">{it.label}</span>
          <span className="mt-1.5 block text-[22px] font-extrabold tracking-tight sm:text-[26px]" style={{ fontStretch: "115%" }}>{it.value}</span>
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
      <h2 className="text-[17px] font-extrabold">{title}</h2>
      <div ref={ref} className="mt-6 flex h-56 items-end gap-[3px] sm:h-72 sm:gap-1.5">
        {bars.map((b, i) => (
          <div key={b.label + i} className="group relative flex h-full flex-1 flex-col justify-end">
            {b.soft !== undefined && (
              <div className={`absolute bottom-0 left-0 right-0 rounded-t-md ${t.barSoft} opacity-70 transition-all duration-700`} style={{ height: inView ? `${(b.soft / max) * 100}%` : "0%" }} />
            )}
            <div className={`relative rounded-t-md ${t.bar} transition-all duration-700`} style={{ height: inView ? `${(b.value / max) * 100}%` : "0%", transitionDelay: `${i * 12}ms` }} />
            <div className="pointer-events-none absolute -top-9 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#121212] px-2 py-1 text-[12px] font-bold text-white group-hover:block">
              {b.label}: {format(b.value)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-[3px] sm:gap-1.5">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 text-center text-[11px] text-[#5c5c58] sm:text-xs">
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
