"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// The hero's stack of real cards from the free library. It swipes on its own every few seconds;
// visitors can drag/flick the top card away or tap "Next", and answer the quiz card for real.
// Auto-play pauses while the pointer is over the deck and stops for good once someone interacts.

const GREEN = "#127D4D";
const ORANGE = "#C2410C";

type Card = { key: string; label: string; title: string; progress: number; accent: string; href: string };
const CARDS: Card[] = [
  { key: "strings", label: "Python · Level 2", title: "Strings", progress: 2, accent: GREEN, href: "/learn/coding/python/strings" },
  { key: "quiz", label: "Python · Quiz", title: 'What does "Python"[0:3] return?', progress: 5, accent: GREEN, href: "/learn/coding/python/strings" },
  { key: "habits", label: "Habits & Routines · Level 1", title: "Why willpower alone doesn't work", progress: 3, accent: ORANGE, href: "/learn/personal-growth/habits-and-routines" },
];

const Mark = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span className="rounded-md px-1 py-0.5 font-semibold text-[#121212]" style={{ background: color }}>{children}</span>
);

export default function LessonDeck() {
  const [top, setTop] = useState(0); // index of the card in front
  const [leaving, setLeaving] = useState<number | null>(null);
  const [drag, setDrag] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const start = useRef<number | null>(null);

  const next = () => {
    if (leaving !== null) return;
    setLeaving(top);
    setTimeout(() => {
      setTop((t) => (t + 1) % CARDS.length);
      setLeaving(null);
      setDrag(0);
      setAnswer(null);
    }, 420);
  };

  useEffect(() => {
    if (!auto || hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, 4800);
    return () => clearInterval(id);
  });

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    start.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    setDrag(Math.min(0, e.clientX - start.current));
  };
  const onUp = () => {
    if (start.current === null) return;
    start.current = null;
    setAuto(false);
    if (drag < -70) next();
    else setDrag(0);
  };

  return (
    <div
      className="relative aspect-[2/3] w-full select-none sm:aspect-[4/5]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {CARDS.map((card, i) => {
        const pos = (i - top + CARDS.length) % CARDS.length; // 0 = front
        const isLeaving = leaving === i;
        const transform = isLeaving
          ? "translate(-120%, -4%) rotate(-18deg)"
          : pos === 0
            ? `translate(${drag}px, 0) rotate(${-2 + drag / 40}deg)`
            : pos === 1
              ? "translate(14px, 12px) rotate(3deg)"
              : "translate(28px, 24px) rotate(7deg)";
        return (
          <div
            key={card.key}
            aria-hidden={pos !== 0}
            onPointerDown={pos === 0 ? onDown : undefined}
            onPointerMove={pos === 0 ? onMove : undefined}
            onPointerUp={pos === 0 ? onUp : undefined}
            onPointerCancel={pos === 0 ? onUp : undefined}
            className={`absolute inset-0 flex flex-col rounded-[24px] border-2 border-[#ececea] bg-white p-6 sm:p-7 ${pos === 0 ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{
              transform,
              opacity: isLeaving ? 0 : 1,
              zIndex: isLeaving ? 4 : 3 - pos,
              transition: start.current !== null && pos === 0 ? "none" : "transform 420ms cubic-bezier(.6,0,.25,1), opacity 420ms",
              boxShadow: pos === 0 ? "0 6px 0 #ececea" : "0 4px 0 #ececea",
              touchAction: "pan-y",
            }}
          >
            <div className="flex gap-1.5">
              {Array.from({ length: 6 }, (_, k) => (
                <span key={k} className="h-2 flex-1 rounded-full" style={{ background: k < card.progress ? card.accent : "#eeeeec" }} />
              ))}
            </div>
            <p className="mt-5 text-[13px] font-bold" style={{ color: card.accent }}>{card.label}</p>
            <h3 className="mt-1.5 text-[22px] font-extrabold leading-tight tracking-[-0.01em]" style={{ fontStretch: "125%" }}>{card.title}</h3>
            <div className="mt-4 flex-1">
              {card.key === "strings" && (
                <>
                  <p className="text-[15px] leading-7 text-[#3a3a38]">
                    You can join strings together with <Mark color="#C9F5DF">the + operator</Mark>, called <Mark color="#FDE7A9">concatenation</Mark>.
                  </p>
                  <pre className="mt-4 overflow-hidden rounded-2xl bg-[#121212] p-4 font-[family-name:var(--font-geist-mono)] text-[13px] leading-6 text-[#ecebe6]">
                    <span className="text-[#7ee8b3]">first</span>{' = "Py"\n'}
                    <span className="text-[#7ee8b3]">second</span>{' = "thon"\n'}
                    <span className="text-[#fbbf24]">print</span>{"(first + second)"}
                    <span className="text-[#85837c]">{"  # Python"}</span>
                  </pre>
                  <p className="mt-4 rounded-2xl bg-[#EAFBF2] px-4 py-3 text-[14px] leading-6 text-[#21322a]">
                    <b className="text-[#127D4D]">Swipey:</b> Strings are the building block you&apos;ll type most.
                  </p>
                </>
              )}
              {card.key === "quiz" && (
                <>
                  <ul className="space-y-2.5">
                    {["Pyt", "Pyth", "yth", "Python"].map((o, k) => {
                      const picked = answer === k;
                      const show = answer !== null && (picked || k === 0);
                      const right = k === 0;
                      return (
                        <li key={o}>
                          <button
                            type="button"
                            tabIndex={pos === 0 ? 0 : -1}
                            onClick={() => { setAuto(false); setAnswer(k); }}
                            className="flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 text-left font-[family-name:var(--font-geist-mono)] text-[15px] transition-colors"
                            style={{
                              borderColor: show ? (right ? "#22C97A" : "#F26B5B") : "#e6e6e3",
                              background: show ? (right ? "#E7FAF0" : "#FDECEA") : "#fff",
                              boxShadow: `0 3px 0 ${show ? (right ? "#22C97A" : "#F26B5B") : "#e6e6e3"}`,
                            }}
                          >
                            {o}
                            {show && <span className="font-[family-name:var(--font-archivo)] text-[13px] font-bold">{right ? "Correct" : "Not quite"}</span>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-4 text-[14px] leading-6 text-[#5c5c58]">
                    {answer === null ? "Tap an answer." : "[0:3] takes index 0, 1 and 2, up to but not including 3."}
                  </p>
                </>
              )}
              {card.key === "habits" && (
                <>
                  <p className="text-[15px] leading-7 text-[#3a3a38]">
                    Most people try to build a habit by wanting it more. It works for a while. Then a stressful day happens, or a bad
                    night&apos;s sleep, and <Mark color="#FFDCC7">the habit quietly stops</Mark>.
                  </p>
                  <p className="mt-4 text-[15px] leading-7 text-[#3a3a38]">The fix isn&apos;t more willpower. It&apos;s a better setup.</p>
                </>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <Link href={card.href} tabIndex={pos === 0 ? 0 : -1} className="text-[14px] font-semibold underline decoration-2 underline-offset-4">
                Open this lesson
              </Link>
              <button
                type="button"
                tabIndex={pos === 0 ? 0 : -1}
                onClick={() => { setAuto(false); next(); }}
                className="rounded-xl border-2 border-[#e6e6e3] bg-white px-4 py-2 text-[14px] font-bold shadow-[0_3px_0_#e6e6e3] transition-transform active:translate-y-[2px] active:shadow-[0_1px_0_#e6e6e3]"
              >
                Next card →
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
