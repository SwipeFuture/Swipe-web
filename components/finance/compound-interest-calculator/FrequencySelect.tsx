"use client";

import { useEffect, useRef, useState } from "react";
import { COMPOUNDING_FREQUENCIES, type CompoundingFrequency } from "./calculations";

export default function FrequencySelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: CompoundingFrequency;
  onChange: (frequency: CompoundingFrequency) => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selected = COMPOUNDING_FREQUENCIES.find((f) => f.value === value) ?? COMPOUNDING_FREQUENCIES[1];

  // Rendered with `position: fixed` instead of being absolutely positioned inside the input
  // card — the card has `overflow-hidden` for its rounded glass corners, which was silently
  // clipping the bottom of this list with no way to scroll to the hidden options. Fixed
  // positioning escapes that clip entirely and renders relative to the viewport instead.
  const openDropdown = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setCoords({ top: rect.bottom + 8, left: rect.left, width: rect.width });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleScroll = () => setOpen(false);

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <span className="text-xs sm:text-sm font-semibold text-stone-600">{label}</span>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openDropdown())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="mt-2 flex w-full items-center justify-between gap-2 rounded-2xl border border-amber-200/70 bg-white/70 backdrop-blur-sm px-4 py-3 text-base font-semibold text-stone-800 shadow-sm outline-none transition-all duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
      >
        <span>{selected.label}</span>
        <span className={`text-stone-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{ position: "fixed", top: coords.top, left: coords.left, width: coords.width }}
          className="z-50 origin-top rounded-2xl border border-white/70 bg-white/95 backdrop-blur-xl shadow-2xl"
        >
          <div className="p-1.5">
            {COMPOUNDING_FREQUENCIES.map((f) => (
              <button
                key={f.value}
                type="button"
                role="option"
                aria-selected={f.value === value}
                onClick={() => {
                  onChange(f.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors duration-150 ${
                  f.value === value ? "bg-amber-100 text-amber-800" : "text-stone-600 hover:bg-amber-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
