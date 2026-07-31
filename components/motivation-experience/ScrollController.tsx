"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOTAL_SCROLL_VH } from "./keyframes";

gsap.registerPlugin(ScrollTrigger);

type ScrollControllerProps = {
  progressRef: React.RefObject<number>;
  enabled: boolean;
};

// A tall, invisible spacer is the actual scroll fuel — everything the user sees (canvas,
// background, text) is fixed/full-viewport and reacts only to the 0..1 progress value
// ScrollTrigger's scrub writes straight into a ref, never into React state, so 60fps camera
// motion is never gated behind a re-render.
export default function ScrollController({ progressRef, enabled }: ScrollControllerProps) {
  const spacerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const spacer = spacerRef.current;
    if (!spacer) return;

    const trigger = ScrollTrigger.create({
      trigger: spacer,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
    };
  }, [enabled, progressRef]);

  return <div ref={spacerRef} className="relative w-full" style={{ height: `${TOTAL_SCROLL_VH}vh` }} />;
}
