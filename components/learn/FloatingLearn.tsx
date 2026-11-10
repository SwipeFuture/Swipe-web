"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Small black button in the bottom-right corner that appears once you scroll past the hero:
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
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-xl bg-[#121212] px-5 py-3.5 text-[15px] font-bold text-white transition-all duration-500 hover:bg-[#2a2a2a] sm:bottom-8 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {label} →
    </Link>
  );
}
