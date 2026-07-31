"use client";

import { useEffect, useRef, useState } from "react";

// Eases the displayed value from wherever it was to the new target whenever `target`
// changes — the "premium fintech" counting effect on every result, driven purely by rAF
// so it stays smooth regardless of how often inputs change.
export function useAnimatedNumber(target: number, durationMs = 500): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(target)) return;
    const from = fromRef.current;
    const to = target;

    if (from === to) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return display;
}
