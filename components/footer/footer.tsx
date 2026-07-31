"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Minimal line-art social glyphs, drawn to match the site's custom icon language
// instead of pulling in an icon library for four static links.

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14 4 L14 15.2 A3.4 3.4 0 1 1 11.2 11.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4 C14.4 6.4 16.4 8.1 19 8.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIALS = [
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@swipe_future?_r=1&_t=ZN-98UWTABxcuM" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/swipe.future?igsh=MThzeG92bDFkYnBhMw%3D%3D&utm_source=qr" },
];

const COLUMNS = [
  {
    heading: "Learning Paths",
    links: ["Success Blueprint", "Coding", "Artificial Intelligence", "Finance", "Personal Growth"],
  },
  {
    heading: "Information",
    links: ["Contact", "About", "Privacy Policy"],
  },
];

// Paths without a page yet get a "Coming Soon" badge instead of a real destination.
const COMING_SOON = new Set<string>([]);

// Only links with a real destination so far — the rest stay "#" until those pages exist.
const LINK_HREFS: Record<string, string> = {
  "Success Blueprint": "/blueprint",
  Coding: "/coding",
  "Artificial Intelligence": "/ai",
  Finance: "/finance",
  "Personal Growth": "/personal-growth",
  Contact: "/contact",
  About: "/about",
  "Privacy Policy": "/privacy-policy",
};

export default function Footer() {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as the rest of the page
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - sectionCenter;
          setParallax(distance * 0.06);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setContentVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  if (pathname === "/motivation-experience") return null;

  return (
    <footer id="footer" ref={sectionRef} className="relative overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-32 pb-10 scroll-mt-24">

      {/* ================= Background — same warm beige/amber/stone language as "What is Swipe" ================= */}

      {/* Mesh Gradient — white at the top only; the bottom is the true end of the page, so it settles into a deeper warm stone instead of fading back to white */}
      <div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, #fbf8f3 22%, #fffbeb 55%, #f5f0e6 100%)",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 -z-40 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow layer — parallax */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="hidden sm:block absolute -top-10 left-0 w-[300px] h-[300px] lg:w-[550px] lg:h-[550px] rounded-full bg-amber-200 blur-[120px] lg:blur-[190px] opacity-[0.14] animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="absolute top-1/3 right-0 w-[260px] h-[260px] lg:w-[500px] lg:h-[500px] rounded-full bg-stone-300 blur-[110px] lg:blur-[170px] opacity-10 -z-30 animate-[pulse_9s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-orange-100 blur-[160px] opacity-[0.12] -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

      </div>

      {/* Floating Glass Elements */}
      <div className="hidden lg:block absolute top-16 right-[8%] w-16 h-16 rounded-[22px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />

      <div className="hidden lg:block absolute top-1/2 left-[6%] w-12 h-12 rounded-2xl bg-amber-100/60 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />

      {/* Noise Effect */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Top Fade — only a thin sliver right at the edge is pure white, softly eased, matching every other section. No bottom fade — this is the end of the page. */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div
        ref={contentRef}
        className={`relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 transition-all duration-1000 ease-out ${
          contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10 flex-1">

            {/* Column 1 — Brand */}

            <div>

              <div className="flex items-center gap-2.5">

                <img src="/logo.png" alt="Swipe" className="w-9 h-9 rounded-xl" />

                <span className="text-xl font-bold tracking-tight text-stone-800">Swipe</span>

              </div>

              <p className="mt-5 text-sm sm:text-base leading-6 sm:leading-7 text-stone-500 max-w-xs">
                Building the future through coding, artificial intelligence,
                finance and personal growth.
              </p>

              <div className="flex items-center gap-3 mt-6">

                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 bg-white/70 backdrop-blur-xl text-stone-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-amber-700 hover:border-amber-300/70 hover:shadow-[0_12px_30px_-8px_rgba(180,140,80,0.45)]"
                  >
                    <div className="absolute inset-0 rounded-full bg-amber-300 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
                    <Icon className="w-4 h-4" />
                  </a>
                ))}

              </div>

            </div>

            {/* Columns 2–3 — Link groups */}

            {COLUMNS.map((column) => (
              <div key={column.heading}>

                <h3 className="text-sm font-semibold tracking-wide text-stone-800">
                  {column.heading}
                </h3>

                <ul className="mt-5 space-y-3">

                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={LINK_HREFS[link] ?? "#"}
                        className="group relative inline-flex items-center gap-2 text-sm sm:text-base text-stone-500 transition-colors duration-300 hover:text-amber-700"
                      >
                        {link}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 group-hover:w-full" />
                        {COMING_SOON.has(link) && (
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-stone-500">
                            <span className="w-1 h-1 rounded-full bg-stone-400" />
                            Coming Soon
                          </span>
                        )}
                      </a>
                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>

          {/* Image — sits to the far right of every column */}

          <div className="relative w-full sm:w-64 lg:w-80 shrink-0 self-center lg:self-start">
            <div className="absolute -inset-6 rounded-[36px] bg-amber-200 blur-3xl opacity-30 -z-10" />
            <img
              src="/liquid-glass-zwei.png"
              alt=""
              className="w-full rounded-[28px] shadow-[0_30px_70px_rgba(120,90,50,0.2)] border border-white/70"
            />
          </div>

        </div>

        {/* Divider */}

        <div className="mt-16 sm:mt-20 lg:mt-24 h-px w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

        {/* Bottom Row */}

        <div className="mt-8 text-center sm:text-left">

          <p className="text-sm text-stone-500">
            © 2026 Swipe. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}
