"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Section anchors only exist on the homepage, so they're prefixed with "/" to work
// from any route (e.g. the Privacy Policy page). "#footer" needs no prefix since the
// footer itself is rendered globally in the root layout.
const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Swipe", href: "/#swipe" },
  { label: "Why us", href: "/#why-us" },
  { label: "Learning paths", href: "/#learning-paths" },
  { label: "Motivation", href: "/#motivation" },
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
];

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [isDark, setIsDark] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the draggable thumb in sync with the nav's actual scroll position/size.
  // The bar and wheel-scroll are always active, even when everything already fits.
  useEffect(() => {
    const nav = navRef.current;
    const thumb = thumbRef.current;
    if (!nav) return;

    const update = () => {
      const { scrollWidth, clientWidth, scrollLeft } = nav;
      const overflowing = scrollWidth > clientWidth + 1;
      setIsOverflowing(overflowing);
      if (!thumb) return;

      const thumbWidthPct = Math.min(Math.max((clientWidth / scrollWidth) * 100, 12), 100);
      const maxScrollLeft = scrollWidth - clientWidth;
      const thumbLeftPct = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (100 - thumbWidthPct) : 0;
      thumb.style.width = `${thumbWidthPct}%`;
      thumb.style.left = `${thumbLeftPct}%`;
    };

    update();

    // Let a normal (vertical) mouse-wheel scroll pan the link row left/right on laptop/desktop,
    // same as the native touch-scroll behavior already works on mobile.
    const handleWheel = (e: WheelEvent) => {
      if (nav.scrollWidth <= nav.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      nav.scrollLeft += e.deltaY;
    };

    nav.addEventListener("wheel", handleWheel, { passive: false });
    nav.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(nav);

    return () => {
      nav.removeEventListener("wheel", handleWheel);
      nav.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, []);

  // Drag the thumb to scroll the nav — a visible bar you can grab, not just wheel/touch.
  useEffect(() => {
    const thumb = thumbRef.current;
    const nav = navRef.current;
    const track = trackRef.current;
    if (!thumb || !nav || !track) return;

    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const startX = e.clientX;
      const startScrollLeft = nav.scrollLeft;
      const trackWidth = track.clientWidth;
      const thumbWidth = thumb.offsetWidth;
      const draggableTrackPx = trackWidth - thumbWidth;
      const maxScrollLeft = nav.scrollWidth - nav.clientWidth;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (draggableTrackPx <= 0) return;
        const deltaX = moveEvent.clientX - startX;
        const deltaScroll = (deltaX / draggableTrackPx) * maxScrollLeft;
        nav.scrollLeft = startScrollLeft + deltaScroll;
      };

      const handlePointerUp = () => {
        setIsDragging(false);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    thumb.addEventListener("pointerdown", handlePointerDown);
    return () => thumb.removeEventListener("pointerdown", handlePointerDown);
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
      <header
        ref={headerRef}
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:px-6"
      >
        <div
          className={`
            relative
            mx-auto
            max-w-7xl
            flex
            items-center
            justify-between
            gap-3

            rounded-full

            border
            ${isDark ? "border-white/15" : "border-white/30"}

            ${isDark ? "bg-black/30" : "bg-white/20"}

            backdrop-blur-3xl

            shadow-[0_12px_40px_rgba(0,0,0,0.08)]

            transition-colors duration-500

            px-4
            py-3
            sm:px-6
            sm:py-3.5
            lg:px-8
            lg:py-4

            overflow-hidden
          `}
        >
          {/* Glass Reflection */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">

            <div
              className={`absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b transition-opacity duration-500 ${
                isDark ? "from-white/10 via-white/5 to-transparent" : "from-white/50 via-white/20 to-transparent"
              }`}
            />

            <div className="absolute -left-20 top-0 h-full w-40 rotate-12 bg-white/10 blur-3xl" />

            <div className="absolute right-0 bottom-0 h-20 w-40 rounded-full bg-green-300/10 blur-3xl" />

          </div>

          {/* Logo */}
          <div className="relative flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0">

            <img
              src="/logo.png"
              alt="Swipe"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl"
            />

            <h1
              className={`hidden sm:block text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-500 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Swipe
            </h1>

          </div>

          {/* Navigation wrapper — nav scrolls, the drag bar lives outside it as its own row so
              dragging it isn't affected by the scroll it's controlling */}
          <div className="relative flex-1 min-w-0 flex flex-col items-center mx-2">

            {/* Navigation — horizontally scrollable everywhere; a vertical wheel scroll pans it too.
                If everything fits, it just shows all links, no fade/scroll affordance at all. */}
            <nav
              ref={navRef}
              className={`
                relative
                w-full
                flex
                items-center
                justify-center
                gap-6
                lg:gap-10
                overflow-x-auto
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                whitespace-nowrap
                ${isOverflowing ? "justify-start [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]" : ""}
              `}
            >

              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm sm:text-base font-medium transition-all duration-300 lg:hover:scale-105 shrink-0 ${
                    isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {link.label}
                </a>
              ))}

            </nav>

            {/* Drag bar — always present and always draggable, but subtle until you hover or grab it */}
            <div
              ref={trackRef}
              className={`group relative mt-2 h-1 w-full max-w-[220px] rounded-full transition-colors duration-300 ${
                isDragging
                  ? isDark ? "bg-white/20" : "bg-black/10"
                  : isDark ? "bg-white/5 hover:bg-white/15" : "bg-black/[0.04] hover:bg-black/10"
              }`}
            >
              <div
                ref={thumbRef}
                className={`absolute top-1/2 -translate-y-1/2 h-1 rounded-full cursor-grab active:cursor-grabbing transition-all duration-300 ${
                  isDragging
                    ? `${isDark ? "bg-white" : "bg-black/70"} h-1.5 shadow-sm`
                    : `${isDark ? "bg-white/25 group-hover:bg-white/70" : "bg-black/15 group-hover:bg-black/45"}`
                }`}
                style={{ touchAction: "none" }}
              />
            </div>

          </div>

          {/* Menu button — three bars, now part of the pill instead of a separate floating circle */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open navigation"
            className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full transition-colors duration-300 ${
              isDark ? "text-white hover:bg-white/10" : "text-stone-700 hover:bg-black/5"
            }`}
          >
            <span className="flex flex-col items-center gap-[5px]">
              <span
                className={`h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded-full bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel — slides in from the right */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-50 w-[82%] max-w-xs sm:max-w-sm border-l border-stone-200/70 bg-white/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Ambient warm glow, matching the site's beige/amber language */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-200 blur-[100px] opacity-40 -z-10 pointer-events-none" />

        <div className="relative h-full overflow-y-auto px-6 sm:px-8 py-8 sm:py-10">

          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Swipe" className="w-8 h-8 rounded-xl" />
            <span className="text-lg font-bold tracking-tight text-stone-800">Swipe</span>
          </div>

          <p className="mt-8 px-1 text-[11px] font-semibold tracking-wide text-stone-400 uppercase">
            Paths
          </p>

          <div className="mt-2 flex flex-col">
            {PATH_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700"
              >
                {link.label}
                {link.comingSoon && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-stone-500">
                    <span className="w-1 h-1 rounded-full bg-stone-400" />
                    Coming Soon
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="my-5 h-px w-full bg-stone-200/70" />

          <a
            href={MOTIVATION_LINK.href}
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-3 py-2.5 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            {MOTIVATION_LINK.label}
          </a>

          <div className="my-5 h-px w-full bg-stone-200/70" />

          <p className="px-1 text-[11px] font-semibold tracking-wide text-stone-400 uppercase">
            Information
          </p>

          <div className="mt-2 flex flex-col">
            {INFO_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium text-stone-700 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700"
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
