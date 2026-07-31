"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { TEXT_BEATS, rangeOpacity, smoothstep } from "./keyframes";

type TextOverlayProps = {
  progressRef: React.RefObject<number>;
};

// Text opacity/position is written directly to refs every frame (rAF), same rationale as
// BackgroundLayer — this is the one place a per-frame React state update would visibly hitch.
export default function TextOverlay({ progressRef }: TextOverlayProps) {
  const beatRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const p = progressRef.current ?? 0;

      for (const beat of TEXT_BEATS) {
        const el = beatRefs.current[beat.id];
        if (!el) continue;

        const opacity = beat.final
          ? smoothstep(beat.start - beat.fade, beat.start, p)
          : rangeOpacity(p, beat.start, beat.end, beat.fade);

        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 24}px)`;
        el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [progressRef]);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center px-6 pointer-events-none">
      {TEXT_BEATS.map((beat) => (
        <div
          key={beat.id}
          ref={(el) => {
            beatRefs.current[beat.id] = el;
            if (el) el.style.opacity = "0";
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center transition-none"
        >
          <h2
            className={`font-black text-white leading-[1.1] tracking-[-0.02em] drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] ${
              beat.final
                ? "text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
                : "text-3xl sm:text-5xl md:text-6xl max-w-3xl"
            }`}
          >
            {beat.title}
          </h2>

          {beat.body && (
            <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-white/75 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              {beat.body}
            </p>
          )}

          {beat.final && (
            <Link
              href="/#learning-paths"
              className="group/btn relative mt-10 sm:mt-12 overflow-hidden rounded-full bg-white text-black px-9 py-4 sm:px-11 sm:py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
            >
              <span className="relative flex items-center gap-2 text-base sm:text-lg font-semibold tracking-wide">
                Start Learning
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
