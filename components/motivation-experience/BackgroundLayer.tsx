"use client";

import { useEffect, useRef } from "react";
import { getWhiteOverlayOpacity, getFinaleOverlayOpacity } from "./keyframes";

type BackgroundLayerProps = {
  progressRef: React.RefObject<number>;
};

// The actual background photos render inside the WebGL scene now (see BackgroundPlanes) —
// this layer just sits on top of the canvas as a darkening scrim/vignette plus the white
// flash/finale overlay, all in plain DOM since they don't need to be lit or occluded by 3D
// geometry. Opacity is written directly to refs every frame (rAF), not React state.
export default function BackgroundLayer({ progressRef }: BackgroundLayerProps) {
  const whiteRef = useRef<HTMLDivElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const p = progressRef.current ?? 0;
      if (whiteRef.current) {
        whiteRef.current.style.opacity = String(getWhiteOverlayOpacity(p));
      }
      if (finaleRef.current) {
        finaleRef.current.style.opacity = String(getFinaleOverlayOpacity(p));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [progressRef]);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      {/* Darkening scrim — moodier/premium, but light enough that the backgrounds stay visible */}
      <div className="absolute inset-0 bg-black/25" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div
        ref={(el) => {
          whiteRef.current = el;
          if (el) el.style.opacity = "0";
        }}
        className="absolute inset-0 bg-white"
      />

      {/* Finale fades to black (not white) so it reads as a continuation of the dark,
          premium tone rather than a hard cut to a bright ending. */}
      <div
        ref={(el) => {
          finaleRef.current = el;
          if (el) el.style.opacity = "0";
        }}
        className="absolute inset-0 bg-black"
      />
    </div>
  );
}
