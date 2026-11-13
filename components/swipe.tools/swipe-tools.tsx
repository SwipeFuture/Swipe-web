"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Every color name below appears here as a literal class string on purpose — Tailwind's
// JIT scanner reads the raw file text, not runtime output, so classes only ever picked via
// a variable (e.g. `THEMES[path.theme]`) would otherwise never be generated.
type ColorTheme = {
  iconBg: string;
  iconGlow: string;
  glow2: string;
  halo: string;
  hoverText: string;
  hoverBorder: string;
  tint: string;
  decoColor: string;
};

const THEMES = {
  blue: {
    iconBg: "bg-white ",
    iconGlow: "bg-blue-400",
    glow2: "bg-sky-300",
    halo: "from-blue-400/0 via-blue-400/60 to-sky-300/0",
    hoverText: "group-hover:text-blue-700",
    hoverBorder: "hover:border-blue-300/80",
    tint: "from-blue-500/[0.09]",
    decoColor: "text-blue-300",
  },
  green: {
    iconBg: "bg-white ",
    iconGlow: "bg-emerald-800",
    glow2: "bg-green-600",
    halo: "from-emerald-800/0 via-emerald-800/60 to-green-700/0",
    hoverText: "group-hover:text-emerald-950",
    hoverBorder: "hover:border-emerald-500/80",
    tint: "from-emerald-800/[0.12]",
    decoColor: "text-emerald-700",
  },
  purple: {
    iconBg: "bg-white ",
    iconGlow: "bg-violet-400",
    glow2: "bg-purple-300",
    halo: "from-violet-500/0 via-violet-500/60 to-purple-400/0",
    hoverText: "group-hover:text-violet-700",
    hoverBorder: "hover:border-violet-300/80",
    tint: "from-violet-500/[0.12]",
    decoColor: "text-violet-400",
  },
  amber: {
    iconBg: "bg-white ",
    iconGlow: "bg-amber-300",
    glow2: "bg-orange-200",
    halo: "from-amber-400/0 via-amber-400/60 to-orange-300/0",
    hoverText: "group-hover:text-amber-700",
    hoverBorder: "hover:border-amber-300/80",
    tint: "from-amber-500/[0.12]",
    decoColor: "text-amber-400",
  },
  orange: {
    iconBg: "bg-white ",
    iconGlow: "bg-orange-400",
    glow2: "bg-amber-200",
    halo: "from-orange-500/0 via-orange-500/60 to-amber-400/0",
    hoverText: "group-hover:text-orange-700",
    hoverBorder: "hover:border-orange-300/80",
    tint: "from-orange-500/[0.12]",
    decoColor: "text-orange-400",
  },
} satisfies Record<string, ColorTheme>;

type ThemeKey = keyof typeof THEMES;

// Minimal line-art motifs, one per theme — a quiet nod to the topic (code brackets, a
// network graph, a bar chart, a growth curve, blueprint corner-marks) rather than literal
// icons, kept thin and low-opacity so they read as texture, not decoration competing with
// the real icon and copy.
function CodeDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className}>
      <path d="M35 20 L15 40 L35 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M85 20 L105 40 L85 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M67 10 L53 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function NetworkDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className}>
      <path d="M20 40 L60 16 M20 40 L60 64 M60 16 L100 40 M60 64 L100 40 M60 16 L60 64" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="40" r="6" fill="currentColor" />
      <circle cx="60" cy="16" r="6" fill="currentColor" />
      <circle cx="60" cy="64" r="6" fill="currentColor" />
      <circle cx="100" cy="40" r="6" fill="currentColor" />
    </svg>
  );
}

function ChartDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className}>
      <rect x="15" y="45" width="16" height="25" rx="2" fill="currentColor" />
      <rect x="47" y="30" width="16" height="40" rx="2" fill="currentColor" />
      <rect x="79" y="12" width="16" height="58" rx="2" fill="currentColor" />
    </svg>
  );
}

function GrowthDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className}>
      <path d="M12 66 Q45 66 55 40 Q65 14 100 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M84 14 L100 14 L100 30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlueprintDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className}>
      <path d="M6 6 L6 22 M6 6 L22 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M114 6 L114 22 M114 6 L98 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 74 L6 58 M6 74 L22 74" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M114 74 L114 58 M114 74 L98 74" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="40" r="16" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 4" />
    </svg>
  );
}

const DECOS: Record<ThemeKey, (props: { className?: string }) => ReactNode> = {
  blue: BlueprintDeco,
  green: CodeDeco,
  purple: NetworkDeco,
  amber: ChartDeco,
  orange: GrowthDeco,
};

const PATHS: {
  icon: string;
  title: string;
  text: string;
  delay: string;
  href?: string;
  comingSoon?: boolean;
  theme: ThemeKey;
}[] = [
  {
    icon: "💻",
    title: "Coding",
    text: "Learn modern programming through practical projects and real-world applications.",
    delay: "",
    href: "/coding",
    theme: "green",
  },
  {
    icon: "🤖",
    title: "Artificial Intelligence",
    text: "Explore AI, automation and the technology shaping the future.",
    delay: "delay-150",
    href: "/ai",
    theme: "purple",
  },
  {
    icon: "💰",
    title: "Finance",
    text: "Build financial knowledge, investing skills and smart money habits.",
    delay: "delay-300",
    href: "/finance",
    theme: "amber",
  },
  {
    icon: "🌱",
    title: "Personal Growth",
    text: "Develop discipline, productivity and habits that help you continuously improve.",
    delay: "delay-[450ms]",
    href: "/personal-growth",
    theme: "orange",
  },
];

export default function SwipeTools() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as "What is SwipeFuture"
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
          setParallax(distance * 0.08);
        }
        setScrollY(window.scrollY);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Each circle gets its own frequency/phase so they fade in and out at different
  // moments while scrolling, rather than all together
  const circlePulse = (freq: number, phase: number) =>
    0.5 + 0.5 * Math.sin(scrollY * freq + phase);

  // Reveal animations, re-trigger whether scrolling down into view or back up into view
  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const featuredObserver = new IntersectionObserver(
      ([entry]) => setFeaturedVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const gridObserver = new IntersectionObserver(
      ([entry]) => setGridVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (featuredRef.current) featuredObserver.observe(featuredRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      headerObserver.disconnect();
      featuredObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  return (
    <section id="learning-paths" ref={sectionRef} className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-28 scroll-mt-24">

      {/* ================= Background — identical language to "What is SwipeFuture" ================= */}

      {/* Mesh Gradient — plain white at the very top and bottom, the beige/amber tint only lives in the middle band */}
      

      {/* Grid */}
      

      {/* Glow layer — parallax + gentle scroll-tied breathing scale */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px) scale(${1 + Math.min(Math.abs(parallax), 40) * 0.0025})` }}
      >

        

        

        

        

        

        

        

        

        

      </div>

      {/* Decorative Circles — opposite parallax + rotation, each fades in/out on its own rhythm as you scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px) rotate(${parallax * 0.06}deg)` }}
      >

        <div
          className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-stone-300/40 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0016, 0) }}
        />

        <div
          className="hidden md:block absolute -right-32 top-40 w-[380px] h-[380px] lg:-right-56 lg:w-[650px] lg:h-[650px] rounded-full border border-stone-300/30 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0021, 1.4) }}
        />

        <div
          className="hidden md:block absolute right-0 top-56 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full border border-stone-300/30 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0013, 2.8) }}
        />

        <div
          className="hidden lg:block absolute left-10 top-40 w-[400px] h-[400px] rounded-full border border-amber-200/40 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0019, 4.2) }}
        />

        <div
          className="hidden lg:block absolute left-32 bottom-10 w-[280px] h-[280px] rounded-full border border-amber-200/50 transition-opacity duration-500 ease-out"
          style={{ opacity: circlePulse(0.0024, 5.6) }}
        />

      </div>

      {/* Floating Dots — drift sideways with scroll */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.25}px)` }}
      >

        

        <div className="hidden sm:block absolute top-60 right-16 lg:top-80 lg:right-80 w-2 h-2 rounded-full bg-stone-500/40" />

        <div className="hidden sm:block absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-amber-300" />

        <div className="hidden sm:block absolute top-40 right-10 lg:top-52 lg:right-32 w-4 h-4 rounded-full bg-white border border-stone-200 shadow-lg" />

        

        

        <div className="hidden sm:block absolute top-16 left-1/4 w-2 h-2 rounded-full bg-amber-300/80" />

        

        

      </div>

      {/* Floating Glass Squares / Rectangles */}
      <div className="absolute inset-0">

        

        

        <div className="hidden md:block absolute top-1/2 right-16 w-20 h-28 rounded-[24px] bg-white border border-white rotate-[18deg]" />

        

        <div className="hidden md:block absolute top-16 right-1/3 w-12 h-20 rounded-[18px] bg-white border border-white rotate-[-15deg] shadow-lg" />

      </div>

      {/* Noise Effect */}
      

      {/* Connection Lines */}
      <div
        className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-white rotate-12 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${parallax * 0.3}px) rotate(12deg)` }}
      />

      <div
        className="hidden lg:block absolute bottom-36 right-1/4 w-36 h-px bg-white -rotate-12 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(${-parallax * 0.3}px) rotate(-12deg)` }}
      />

      {/* Top Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}
      

      {/* Bottom Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}
      

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}

        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          <div className="group relative inline-flex items-center gap-3 bg-white border border-amber-200/70 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

            

            <div className="relative w-2 h-2 rounded-full bg-amber-500" />

            <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-stone-600">
              Choose Your Path
            </span>

          </div>

          <h2 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] lg:tracking-[-0.05em] text-stone-800">
            Learning{" "}
            <span className="" style={{ color: "#B45309" }}>
              Paths
            </span>
          </h2>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 text-stone-500">
            Discover the skills that will shape your future. Choose a learning
            path and start building knowledge that creates real opportunities.
          </p>

        </div>

        {/* Featured Path — the main highlight, full width, above the 2x2 grid */}

        <div
          ref={featuredRef}
          className={`group relative mt-14 sm:mt-20 lg:mt-24 transition-all duration-1000 ease-out ${
            featuredVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >

          {/* Glowing border halo — appears on hover */}
          

          <Link
            href="/blueprint"
            className="relative block overflow-hidden rounded-[36px] sm:rounded-[48px] border border-[#ececea] bg-white p-8 sm:p-12 lg:p-16 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-blue-300/80"
          >

            {/* Card sheen */}
            

            {/* Subtle color tint — a touch more than the grid cards get, but still restrained
                so the card reads as neutral/premium first and "blue" second */}
            

            {/* Inner accent glow */}
            
            

            {/* Thematic line-art deco — blueprint corner-marks, echoing the card's own name */}
            <BlueprintDeco className="pointer-events-none hidden sm:block absolute right-8 bottom-8 w-28 h-20 lg:w-36 lg:h-24 opacity-[0.16] text-blue-300" />

            {/* "Start here" badge */}
            <span className="absolute top-6 right-6 sm:top-8 sm:right-8 inline-flex items-center gap-1.5 rounded-full border border-blue-200/70 bg-blue-50/80 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wide text-blue-800/90 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Read First
            </span>

            <div className="relative flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

              <div className="flex-1">

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] bg-white border border-white shadow-lg text-4xl sm:text-5xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6">

                  

                  <span>🚀</span>

                </div>

                <h3 className="relative mt-6 sm:mt-8 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-800">
                  Success{" "}
                  <span className="" style={{ color: "#B45309" }}>
                    Blueprint
                  </span>
                </h3>

                <p className="relative mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-stone-500 max-w-2xl">
                  Learn the mindset, habits and principles behind long-term
                  success. Build a strong foundation before mastering any skill
                  and understand what truly creates lasting success.
                </p>

              </div>

              {/* CTA */}
              <div className="shrink-0">

                <span className="group/btn relative inline-flex overflow-hidden rounded-full bg-stone-900 text-white px-7 py-4 sm:px-9 sm:py-5 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">

                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-all" />

                  <span className="relative flex items-center gap-2">
                    Learn More
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>

                </span>

              </div>

            </div>

          </Link>

        </div>

        {/* Remaining Paths — 2x2 grid */}

        <div
          ref={gridRef}
          className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >

          {PATHS.map((path) => {
            const theme = THEMES[path.theme];
            const Deco = DECOS[path.theme];

            const cardInner = (
              <>
                {/* Card sheen */}
                

                {/* Subtle color tint — very low opacity, just enough to give the card its own identity */}
                <div className={`pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-br ${theme.tint} via-transparent to-transparent`} />

                {/* Ambient background glow — soft, low-opacity, echoes the icon color at card scale */}
                
                

                {/* Thematic line-art deco — quiet texture, not a second icon */}
                <Deco className={`pointer-events-none absolute -right-2 bottom-6 w-24 h-16 sm:w-28 sm:h-20 opacity-[0.14] ${theme.decoColor}`} />

                {path.comingSoon && (
                  <span className="absolute top-6 right-6 sm:top-8 sm:right-8 inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50/90 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-stone-500 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    Coming Soon
                  </span>
                )}

                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[24px] ${theme.iconBg} border border-white shadow-lg text-3xl sm:text-4xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-6`}>

                  

                  <span>{path.icon}</span>

                </div>

                <h3 className="relative mt-6 sm:mt-8 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-stone-800">
                  {path.title}
                </h3>

                <p className="relative mt-3 sm:mt-4 text-sm sm:text-base leading-6 sm:leading-7 text-stone-500">
                  {path.text}
                </p>

                <div className="relative mt-6 sm:mt-8 h-px w-full bg-white " />

                <div className={`relative mt-6 flex items-center gap-2 text-sm font-semibold text-stone-400 transition-colors duration-300 ${theme.hoverText}`}>
                  Learn more
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </>
            );

            const cardClassName = `relative h-full block rounded-[32px] sm:rounded-[40px] border border-[#ececea] bg-white p-8 sm:p-10 lg:p-12 transition-all duration-500 ease-out hover:-translate-y-2 ${theme.hoverBorder}`;

            return (
              <div
                key={path.title}
                className={`group relative transition-all duration-1000 ease-out ${path.delay} ${
                  gridVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
                }`}
              >

                {/* Glowing border halo — appears on hover */}
                

                {path.href ? (
                  <Link href={path.href} className={cardClassName}>
                    {cardInner}
                  </Link>
                ) : (
                  <div className={cardClassName}>{cardInner}</div>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
