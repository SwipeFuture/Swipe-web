import Swipey from "./Swipey";

// Flat illustration for the learning-area pages: Swipey on a tile in the area's colour.
// Replaces the old 3D "liquid glass" renders (2026-11-10 design: one mascot, flat colours).
const AREAS = {
  coding: { bright: "#22E08A", dark: "#127D4D", tint: "#E7FAF0", light: "#B9F5D6" },
  finance: { bright: "#FBBF24", dark: "#B45309", tint: "#FEF5DA", light: "#FDE9A8" },
  growth: { bright: "#FB923C", dark: "#C2410C", tint: "#FFEEDF", light: "#FED2AE" },
  ai: { bright: "#8B5CF6", dark: "#6D28D9", tint: "#F0EAFE", light: "#D6C8FB" },
} as const;

export type ArtArea = keyof typeof AREAS | "all";

export default function AreaArt({ area, className = "" }: { area: ArtArea; className?: string }) {
  if (area === "all") {
    return (
      <div className={`grid aspect-square grid-cols-2 gap-3 rounded-[32px] bg-[#F6F6F4] p-6 ${className}`} aria-hidden>
        {(Object.keys(AREAS) as (keyof typeof AREAS)[]).map((k) => (
          <div key={k} className="grid place-items-center rounded-[22px]" style={{ background: AREAS[k].tint }}>
            <Swipey accent={AREAS[k].bright} accentLight={AREAS[k].light} className="w-[52%]" />
          </div>
        ))}
      </div>
    );
  }
  const a = AREAS[area];
  return (
    <div className={`grid aspect-square place-items-center rounded-[32px] ${className}`} style={{ background: a.tint, boxShadow: `0 6px 0 ${a.light}` }} aria-hidden>
      <Swipey accent={a.bright} accentLight={a.light} className="w-[46%]" />
    </div>
  );
}
