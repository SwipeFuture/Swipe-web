"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Horizontal strip (e.g. app screenshots) that also works with a mouse:
// a visible bar underneath — drag its thumb or click anywhere on it — and
// click-and-drag on the strip itself. Touch keeps the native swipe.
// The bar only appears when the content is actually wider than the strip.

export default function ScrollStrip({
  children,
  className = "",
  barClassName = "bg-black/10",
  thumbClassName = "bg-black/40",
}: {
  children: ReactNode;
  className?: string;
  barClassName?: string;
  thumbClassName?: string;
}) {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });
  const [overflowing, setOverflowing] = useState(false);
  const dragMoved = useRef(false);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () => {
      const { scrollWidth, clientWidth, scrollLeft } = strip;
      setOverflowing(scrollWidth > clientWidth + 1);
      const width = Math.min(100, Math.max((clientWidth / scrollWidth) * 100, 12));
      const max = scrollWidth - clientWidth;
      setThumb({ width, left: max > 0 ? (scrollLeft / max) * (100 - width) : 0 });
    };
    update();
    strip.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(strip);
    return () => {
      strip.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  // Move the strip so the thumb's center lands at `clientX` on the bar.
  const scrollToBarPosition = (clientX: number, grabOffsetPct = thumb.width / 2) => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100 - grabOffsetPct;
    const ratio = Math.min(1, Math.max(0, pct / (100 - thumb.width)));
    strip.scrollLeft = ratio * (strip.scrollWidth - strip.clientWidth);
  };

  const onBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const rect = track.getBoundingClientRect();
    const clickPct = ((e.clientX - rect.left) / rect.width) * 100;
    // Grabbing the thumb keeps the grab point; clicking the bar centers the thumb there.
    const onThumb = clickPct >= thumb.left && clickPct <= thumb.left + thumb.width;
    const grab = onThumb ? clickPct - thumb.left : thumb.width / 2;
    if (!onThumb) scrollToBarPosition(e.clientX, grab);
    const move = (ev: PointerEvent) => scrollToBarPosition(ev.clientX, grab);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  // Mouse drag on the strip itself (touch already scrolls natively).
  const onStripPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const strip = stripRef.current;
    if (!strip) return;
    const startX = e.clientX;
    const startLeft = strip.scrollLeft;
    dragMoved.current = false;
    strip.style.scrollSnapType = "none";
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 4) dragMoved.current = true;
      strip.scrollLeft = startLeft - dx;
    };
    const up = () => {
      strip.style.scrollSnapType = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div>
      <div
        ref={stripRef}
        onPointerDown={onStripPointerDown}
        onClickCapture={(e) => {
          // A drag shouldn't count as a click on whatever is under the cursor.
          if (dragMoved.current) {
            e.preventDefault();
            e.stopPropagation();
            dragMoved.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className={`overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none ${
          overflowing ? "cursor-grab active:cursor-grabbing" : ""
        } ${className}`}
      >
        {children}
      </div>

      {overflowing && (
        <div className="mt-4 flex justify-center px-6">
          <div
            ref={trackRef}
            onPointerDown={onBarPointerDown}
            role="scrollbar"
            aria-orientation="horizontal"
            aria-valuenow={Math.round(thumb.left)}
            className={`relative h-2 w-full max-w-[260px] rounded-full cursor-pointer touch-none ${barClassName}`}
          >
            <div
              className={`absolute top-0 h-2 rounded-full cursor-grab active:cursor-grabbing transition-[width] ${thumbClassName}`}
              style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
