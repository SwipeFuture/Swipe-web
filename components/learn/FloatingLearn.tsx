"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Small pill in the bottom-right corner that appears once you scroll past the hero:
// a constant shortcut from a reference page to the matching free lessons.
export default function FloatingLearn({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Link
      href={href}
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-black px-5 py-3.5 text-sm font-bold text-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-105 sm:bottom-8 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
      {label} →
    </Link>
  );
}
