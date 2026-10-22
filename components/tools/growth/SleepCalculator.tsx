"use client";

import { useState } from "react";
import { Card, Chips, ToolShell, THEMES, type FaqItem } from "../kit";

export const SLEEP_FAQ: FaqItem[] = [
  { q: "How does the sleep calculator work?", a: "Sleep runs in cycles of roughly 90 minutes. Waking up at the end of a cycle usually feels easier than waking up in the middle of deep sleep. The calculator counts back (or forward) in 90-minute cycles and adds about 15 minutes to fall asleep." },
  { q: "How many sleep cycles do I need?", a: "Most adults need 7–9 hours, which is 5 or 6 cycles. Teenagers usually need more — around 8–10 hours." },
  { q: "Is the 90-minute cycle exact?", a: "No — cycles vary between about 80 and 120 minutes from person to person and through the night. Treat the times as a good starting point and adjust by 15 minutes if you still wake up groggy." },
];

const MODES = ["I want to wake up at…", "I'm going to bed now"] as const;
type Mode = (typeof MODES)[number];
const FALL_ASLEEP = 15;

const fmt = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return `${h % 12 === 0 ? 12 : h % 12}:${mm} ${h < 12 ? "AM" : "PM"}`;
};

export default function SleepCalculator() {
  const t = THEMES.growth;
  const [mode, setMode] = useState<Mode>(MODES[0]);
  const [wake, setWake] = useState("07:00");
  const [now] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  const [h, m] = wake.split(":").map(Number);
  const wakeMins = h * 60 + m;
  const cycles = [6, 5, 4, 3];
  const times =
    mode === MODES[0]
      ? cycles.map((c) => ({ c, time: wakeMins - c * 90 - FALL_ASLEEP }))
      : cycles.slice().reverse().map((c) => ({ c, time: now + FALL_ASLEEP + c * 90 })).reverse();

  return (
    <ToolShell
      theme="growth"
      backHref="/personal-growth"
      backLabel="Back to Personal Growth"
      eyebrow="Growth Tool"
      title="Sleep"
      highlight="Calculator"
      intro="Wake up between sleep cycles instead of in the middle of deep sleep. Find the best time to go to bed — or to set your alarm."
      faq={SLEEP_FAQ}
      related={[
        { href: "/personal-growth/one-percent-calculator", label: "1% Better Every Day" },
        { href: "/quiz/habit-type", label: "Habit Type Quiz" },
      ]}
    >
      <Card>
        <div className="space-y-6">
          <Chips theme="growth" options={[...MODES]} value={mode} onChange={setMode} />
          {mode === MODES[0] && (
            <label className="block">
              <span className="text-xs font-semibold text-stone-600 sm:text-sm">Wake-up time</span>
              <input
                type="time"
                value={wake}
                onChange={(e) => e.target.value && setWake(e.target.value)}
                className={`mt-2 w-full rounded-2xl border bg-white/70 px-4 py-3 text-lg font-semibold text-stone-800 shadow-sm outline-none focus:ring-4 sm:w-60 ${t.ring}`}
              />
            </label>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-center text-base font-bold text-stone-800 sm:text-lg">
          {mode === MODES[0] ? `To wake up at ${fmt(wakeMins)}, go to bed at:` : "If you fall asleep in about 15 minutes, set your alarm for:"}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {times.map(({ c, time }) => (
            <div key={c} className={`rounded-[24px] border p-5 text-center ${c === 6 || c === 5 ? "border-orange-300 bg-orange-50" : "border-stone-200 bg-white/70"}`}>
              <div className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">{fmt(time)}</div>
              <div className="mt-1 text-xs font-semibold text-stone-500">
                {c} cycles · {(c * 1.5).toFixed(1)} h
              </div>
              {(c === 6 || c === 5) && <div className="mt-2 text-xs font-bold text-orange-600">Recommended</div>}
            </div>
          ))}
        </div>
      </Card>
    </ToolShell>
  );
}
