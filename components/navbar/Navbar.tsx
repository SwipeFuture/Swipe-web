"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Section anchors only exist on the homepage, so they're prefixed with "/" to work
// from any route (e.g. the Privacy Policy page). "#footer" needs no prefix since the
// footer itself is rendered globally in the root layout. Apps and Motivation have their
// own pages, so they link there directly instead of to the homepage sections.
const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Why us", href: "/#why-us" },
  { label: "Learning paths", href: "/#learning-paths" },
  { label: "Free lessons", href: "/learn" },
  { label: "Tools", href: "/tools" },
  { label: "Apps", href: "/apps" },
  { label: "Motivation", href: "/motivation-experience" },
  { label: "Information", href: "#footer" },
];

// Content for the slide-in drawer opened by the three-bar menu button, now built into the
// pill itself instead of living as a separate floating circular button.
const PATH_LINKS: { label: string; href: string; comingSoon?: boolean }[] = [
  { label: "Success Blueprint", href: "/blueprint" },
  { label: "Coding", href: "/coding" },
  { label: "Artificial Intelligence", href: "/ai" },
  { label: "Finance", href: "/finance" },
  { label: "Personal Growth", href: "/personal-growth" },
  { label: "Free Lessons", href: "/learn" },
  { label: "Free Tools & Quizzes", href: "/tools" },
  { label: "Learning Advisor", href: "/advisor" },
];

const APPS_LINK = { label: "Swipe Apps", href: "/apps" };

const MOTIVATION_LINK = { label: "Motivation", href: "/motivation-experience" };

const INFO_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [isDark, setIsDark] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Watch whether every link still fits on one line. As soon as one would be
  // cut off, the whole link row is hidden (logo + menu button stay) instead
  // of turning into a sideways-scrolling strip; the menu has all the links.
  // The row stays in the layout (just invisible) so it can keep measuring.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const update = () => setIsOverflowing(nav.scrollWidth > nav.clientWidth + 1);

    update();
    window.addEventListener("resize", update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(nav);

    return () => {
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, []);

  // Sections can opt into a dark navbar theme via data-nav-theme="dark" (see Motivation).
  // We check whatever sits directly behind the navbar's vertical position as the page scrolls,
  // so the logo/links/menu button flip between black and white to stay readable either way.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (headerRef.current) {
          const navRect = headerRef.current.getBoundingClientRect();
          const probeY = navRect.top + navRect.height / 2;

          const darkSections = document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]');
          let overDark = false;

          darkSections.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (probeY >= rect.top && probeY <= rect.bottom) overDark = true;
          });

          setIsDark(overDark);
          setScrolled(window.scrollY > 8);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Drawer: close on outside click / Escape, lock body scroll while open.
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  if (pathname === "/motivation-experience") return null;

  return (
    <>
      {/* Flat white bar (2026-11-10 redesign, see DESIGN-REGELN.md):
          no glass, blur or glow. It gets a hairline once the page scrolls, and flips to ink over
          sections marked data-nav-theme="dark". */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 font-[family-name:var(--font-archivo)] transition-colors duration-300 ${
          isDark ? "bg-[#121212] text-white" : "bg-white text-[#121212]"
        } ${scrolled ? (isDark ? "border-b border-white/10" : "border-b border-[#ececea]") : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 sm:h-[72px] sm:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Swipe home">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-[9px] sm:h-9 sm:w-9" />
            <span className="text-[19px] font-extrabold tracking-[-0.01em] sm:text-[21px]" style={{ fontStretch: "125%" }}>
              Swipe
            </span>
          </a>

          {/* All links on one line, or none at all (see the overflow effect above) */}
          <div className="mx-2 flex min-w-0 flex-1 justify-center">
            <nav
              ref={navRef}
              aria-hidden={isOverflowing}
              className={`flex w-full items-center justify-center gap-5 overflow-hidden whitespace-nowrap xl:gap-7 ${isOverflowing ? "invisible" : ""}`}
            >
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`shrink-0 text-[15px] font-semibold underline-offset-[6px] decoration-2 hover:underline ${
                    isDark ? "text-white/80 hover:text-white" : "text-[#3a3a38] hover:text-[#121212]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="/learn"
              className="hidden rounded-xl bg-[#22E08A] px-4 py-2.5 text-[15px] font-bold text-[#121212] shadow-[0_3px_0_#127D4D] transition-transform active:translate-y-[2px] active:shadow-none sm:inline-block"
            >
              Start a lesson
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label="Open navigation"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                isDark ? "border-white/20 hover:bg-white/10" : "border-[#e2e2df] hover:bg-[#F2F2F0]"
              }`}
            >
              <span className="flex flex-col items-center gap-[5px]">
                <span className={`h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`h-[2px] w-[18px] rounded-full bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#121212]/40 transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel — slides in from the right */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm border-l border-[#ececea] bg-white font-[family-name:var(--font-archivo)] text-[#121212] transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto px-7 py-8">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-[9px]" />
            <span className="text-[19px] font-extrabold" style={{ fontStretch: "125%" }}>Swipe</span>
          </div>

          <a
            href="/learn"
            onClick={() => setMenuOpen(false)}
            className="mt-8 block rounded-2xl bg-[#22E08A] px-5 py-3.5 text-center text-[16px] font-bold text-[#121212] shadow-[0_4px_0_#127D4D]"
          >
            Start a free lesson
          </a>

          <a
            href={APPS_LINK.href}
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex items-center gap-3 rounded-xl px-2 py-2.5 text-[17px] font-semibold hover:bg-[#F2F2F0]"
          >
            <span className="flex -space-x-2">
              {["coding", "finance", "growth", "ai"].map((slug) => (
                <img key={slug} src={`/logo-${slug}-black.png`} alt="" loading="lazy" width={24} height={24} className="h-6 w-6 rounded-md border border-white object-cover" />
              ))}
            </span>
            {APPS_LINK.label}
          </a>

          <p className="mt-7 px-2 text-[14px] text-[#8a8a86]">Paths</p>
          <div className="mt-1 flex flex-col">
            {PATH_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between gap-2 rounded-xl px-2 py-2.5 text-[17px] font-medium hover:bg-[#F2F2F0]"
              >
                {link.label}
                {link.comingSoon && <span className="text-[13px] text-[#8a8a86]">Coming soon</span>}
              </a>
            ))}
          </div>

          <a
            href={MOTIVATION_LINK.href}
            onClick={() => setMenuOpen(false)}
            className="mt-5 block rounded-xl px-2 py-2.5 text-[17px] font-medium hover:bg-[#F2F2F0]"
          >
            {MOTIVATION_LINK.label}
          </a>

          <p className="mt-7 px-2 text-[14px] text-[#8a8a86]">Information</p>
          <div className="mt-1 flex flex-col">
            {INFO_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-2 py-2.5 text-[17px] font-medium hover:bg-[#F2F2F0]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
