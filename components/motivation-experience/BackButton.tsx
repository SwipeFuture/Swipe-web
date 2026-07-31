"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to Home"
      className="fixed top-4 sm:top-6 left-4 sm:left-6 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-black/30 backdrop-blur-2xl text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 hover:bg-black/50"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5" />
        <path d="M11 18l-6-6 6-6" />
      </svg>
    </Link>
  );
}
