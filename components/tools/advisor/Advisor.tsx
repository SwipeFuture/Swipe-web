"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, ToolShell, THEMES, type FaqItem, type ToolTheme } from "../kit";

const ADVISOR_FAQ: FaqItem[] = [
  {
    q: "How does the learning advisor work?",
    a: "You pick an area (coding, money, personal growth or AI), your goal, how much you already know and how many minutes a day you have. The advisor matches that to the Swipe track that fits best, links the first free lesson and estimates how many days the free levels take at your pace.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The advisor and every lesson it recommends are free on this website — no account, no email and no payment. The first two levels of every Swipe track are open to everyone.",
  },
  {
    q: "I'm a complete beginner. Where should I start?",
    a: "Pick \"Total beginner\" in step three. Every Swipe track starts from zero, so you simply begin with the first lesson. Good first tracks are Python or HTML for coding, Money Basics for finance, Habits & Routines for personal growth and AI Fundamentals for AI.",
  },
  {
    q: "How long does a lesson take?",
    a: "About five minutes. Every lesson is short, uses real examples and ends with a quick check, and each chapter finishes with a small quiz — so even ten minutes a day gets you through a track surprisingly fast.",
  },
  {
    q: "Can I change my path later?",
    a: "Of course. Run the advisor again any time or browse all free lessons yourself. Many people combine areas — for example coding plus focus and productivity.",
  },
];

// The web version of the in-app advisors: area → goal → experience → time,
// then a concrete track from the free lesson library with a plan.

export type TrackInfo = { app: string; url: string; slug: string; track: string; lessons: number; first?: string };

type Goal = { label: string; tracks: string[]; tool?: { href: string; label: string } };
type Area = { key: string; label: string; emoji: string; theme: ToolTheme; app: string; goals: Goal[] };

const AREAS: Area[] = [
  {
    key: "coding",
    label: "Coding",
    emoji: "💻",
    theme: "coding",
    app: "coding",
    goals: [
      { label: "Build my own website", tracks: ["html", "javascript", "typescript"], tool: { href: "/coding/typing-speed-test", label: "Code Typing Test" } },
      { label: "Build apps & web products", tracks: ["javascript", "typescript", "ship-it"] },
      { label: "AI, data & automation", tracks: ["python", "go", "javascript"] },
      { label: "Make games", tracks: ["csharp", "cpp", "python"] },
      { label: "A job at a big company", tracks: ["java", "csharp", "python"] },
      { label: "Fast, low-level systems", tracks: ["rust", "cpp", "go"] },
      { label: "Ship a real project, fast", tracks: ["ship-it", "javascript", "python"] },
    ],
  },
  {
    key: "finance",
    label: "Money",
    emoji: "💰",
    theme: "finance",
    app: "finance",
    goals: [
      { label: "Get my money organised", tracks: ["money-basics", "credit-and-debt", "taxes"], tool: { href: "/finance/budget-calculator", label: "Budget Calculator" } },
      { label: "Start investing", tracks: ["investing-fundamentals", "stock-market-and-trading", "retirement-and-fire"], tool: { href: "/finance/etf-calculator", label: "ETF Calculator" } },
      { label: "Get out of debt", tracks: ["credit-and-debt", "money-basics", "taxes"], tool: { href: "/finance/debt-payoff-calculator", label: "Debt Payoff Calculator" } },
      { label: "Retire early (FIRE)", tracks: ["retirement-and-fire", "investing-fundamentals", "real-estate"], tool: { href: "/finance/fire-calculator", label: "FIRE Calculator" } },
      { label: "Understand stocks & trading", tracks: ["stock-market-and-trading", "investing-fundamentals", "crypto-and-alternative-assets"] },
      { label: "Crypto & alternatives", tracks: ["crypto-and-alternative-assets", "investing-fundamentals", "stock-market-and-trading"] },
      { label: "Buy property one day", tracks: ["real-estate", "credit-and-debt", "money-basics"], tool: { href: "/finance/savings-goal-calculator", label: "Savings Goal Calculator" } },
      { label: "A career in finance", tracks: ["corporate-finance-and-investment-banking", "stock-market-and-trading", "investing-fundamentals"] },
    ],
  },
  {
    key: "growth",
    label: "Personal growth",
    emoji: "🌱",
    theme: "growth",
    app: "personal-growth",
    goals: [
      { label: "Build better habits", tracks: ["habits-and-routines", "focus-and-productivity", "mindset-and-confidence"], tool: { href: "/quiz/habit-type", label: "Habit Type Quiz" } },
      { label: "Focus & get more done", tracks: ["focus-and-productivity", "habits-and-routines", "sleep"] },
      { label: "More confidence", tracks: ["mindset-and-confidence", "relationships-and-communication", "purpose-and-direction"] },
      { label: "Less stress", tracks: ["stress-and-emotional-resilience", "sleep", "mindset-and-confidence"] },
      { label: "Sleep better", tracks: ["sleep", "stress-and-emotional-resilience", "habits-and-routines"], tool: { href: "/personal-growth/sleep-calculator", label: "Sleep Calculator" } },
      { label: "Get fit", tracks: ["fitness-and-movement", "habits-and-routines", "sleep"] },
      { label: "Better relationships", tracks: ["relationships-and-communication", "mindset-and-confidence", "stress-and-emotional-resilience"] },
      { label: "Find my direction", tracks: ["purpose-and-direction", "mindset-and-confidence", "focus-and-productivity"] },
    ],
  },
  {
    key: "ai",
    label: "AI",
    emoji: "🤖",
    theme: "ai",
    app: "ai",
    goals: [
      { label: "Understand how AI works", tracks: ["ai-fundamentals", "machine-learning-fundamentals", "ai-ethics-and-safety"] },
      { label: "Use ChatGPT & co. better", tracks: ["using-ai-tools-well", "prompt-engineering", "ai-fundamentals"], tool: { href: "/ai/prompt-builder", label: "AI Prompt Builder" } },
      { label: "Write great prompts", tracks: ["prompt-engineering", "using-ai-tools-well", "ai-agents-and-automation"], tool: { href: "/ai/prompt-builder", label: "AI Prompt Builder" } },
      { label: "Build apps with AI", tracks: ["building-with-ai-apis", "ai-agents-and-automation", "prompt-engineering"] },
      { label: "Automate my work", tracks: ["ai-agents-and-automation", "using-ai-tools-well", "building-with-ai-apis"] },
      { label: "Go deep: ML & neural nets", tracks: ["machine-learning-fundamentals", "deep-learning-and-neural-networks", "ai-fundamentals"] },
      { label: "AI risks & ethics", tracks: ["ai-ethics-and-safety", "ai-fundamentals", "using-ai-tools-well"] },
    ],
  },
];

const LEVELS = [
  { label: "Total beginner", note: "We'll start at the very beginning." },
  { label: "I know a little", note: "Skim level 1, then dive into level 2." },
  { label: "Pretty experienced", note: "Use the chapter quizzes to skip what you know." },
];
const TIMES = [5, 15, 30, 60];

export default function Advisor({ tracks }: { tracks: TrackInfo[] }) {
  const [area, setArea] = useState<Area | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const theme: ToolTheme = area?.theme ?? "neutral";
  const t = THEMES[theme];
  const step = !area ? 0 : !goal ? 1 : level === null ? 2 : minutes === null ? 3 : 4;
  const find = (slug: string) => tracks.find((x) => x.url === area?.app && x.slug === slug);
  const reset = () => {
    setArea(null);
    setGoal(null);
    setLevel(null);
    setMinutes(null);
  };

  const Choice = ({ label, sub, onClick }: { label: string; sub?: string; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[22px] border border-stone-200 bg-white/80 px-5 py-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
    >
      <div className="text-sm font-bold text-stone-800 sm:text-base">{label}</div>
      {sub && <div className="mt-1 text-xs text-stone-500">{sub}</div>}
    </button>
  );

  const main = goal ? find(goal.tracks[0]) : undefined;
  const alternatives = goal ? goal.tracks.slice(1).map(find).filter(Boolean) as TrackInfo[] : [];
  const days = main && minutes ? Math.max(1, Math.ceil((main.lessons * 5) / minutes)) : 0;

  return (
    <ToolShell
      theme={theme}
      backHref="/learn"
      backLabel="Back to free lessons"
      eyebrow="Learning Advisor"
      title="Find Your"
      highlight="Learning Path"
      intro="Four quick questions, one clear answer: which Swipe track fits your goal, where to start and how long the free levels take at your pace."
      faq={ADVISOR_FAQ}
      related={[
        { href: "/quiz/programming-language", label: "Which programming language?" },
        { href: "/quiz/money-type", label: "Money type quiz" },
        { href: "/quiz/habit-type", label: "Habit type quiz" },
        { href: "/tools", label: "All free tools" },
      ]}
    >
      {step < 4 && (
        <Card>
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>Step {step + 1} of 4</span>
            {step > 0 && (
              <button type="button" onClick={reset} className="hover:underline">
                ↺ Start over
              </button>
            )}
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
            <div className={`h-full rounded-full ${t.bar} transition-all duration-500`} style={{ width: `${(step / 4) * 100}%` }} />
          </div>

          {step === 0 && (
            <>
              <h2 className="mt-8 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">What do you want to get better at?</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {AREAS.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setArea(a)}
                    className="rounded-[24px] border border-stone-200 bg-white/80 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-4xl">{a.emoji}</div>
                    <div className="mt-3 font-bold text-stone-800">{a.label}</div>
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 1 && area && (
            <>
              <h2 className="mt-8 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">What&apos;s your goal?</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {area.goals.map((g) => (
                  <Choice key={g.label} label={g.label} onClick={() => setGoal(g)} />
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="mt-8 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">How much do you already know?</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {LEVELS.map((l, i) => (
                  <Choice key={l.label} label={l.label} sub={l.note} onClick={() => setLevel(i)} />
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="mt-8 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">How much time can you give it per day?</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TIMES.map((m) => (
                  <Choice key={m} label={m === 60 ? "1 hour+" : `${m} minutes`} onClick={() => setMinutes(m)} />
                ))}
              </div>
            </>
          )}
        </Card>
      )}

      {step === 4 && area && goal && main && (
        <>
          <Card className="text-center">
            <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${t.chip}`}>Your path</span>
            <h2 className={`mt-4 text-4xl font-black tracking-tight sm:text-6xl ${t.gradientText} bg-clip-text text-transparent`}>{main.track}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              For “{goal.label.toLowerCase()}”, {main.track} is the best place to start. {LEVELS[level ?? 0].note}
            </p>
            <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/80 p-4">
                <div className="text-2xl font-black text-stone-900">{main.lessons}</div>
                <div className="text-xs text-stone-500">free lessons</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <div className="text-2xl font-black text-stone-900">{minutes === 60 ? "60+" : minutes}</div>
                <div className="text-xs text-stone-500">min per day</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <div className="text-2xl font-black text-stone-900">~{days}</div>
                <div className="text-xs text-stone-500">{days === 1 ? "day" : "days"} for levels 1–2</div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={`/learn/${main.url}/${main.slug}${main.first ? `/${main.first}` : ""}`} className={`rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg transition-all hover:scale-105 ${t.button}`}>
                Start the first lesson →
              </Link>
              <Link href={`/learn/${main.url}/${main.slug}`} className="rounded-full border border-stone-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-stone-700">
                See the full track
              </Link>
            </div>
            <button type="button" onClick={reset} className="mt-5 text-xs font-semibold text-stone-400 hover:underline">
              ↺ Start over
            </button>
          </Card>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-bold text-stone-800">Your plan</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-stone-600">
                <li>Do one {main.track} lesson a day — {minutes === 5 ? "one lesson fits exactly" : "a couple fit easily"} in your {minutes} minutes.</li>
                <li>Finish each chapter with its quiz (60% to pass).</li>
                <li>After levels 1–2, continue the full track in {area.label === "Money" ? "Swipe Finance" : area.label === "Personal growth" ? "Swipe Personal Growth" : `Swipe ${area.label}`} with streaks and XP.</li>
              </ol>
            </Card>
            <Card>
              <h3 className="text-base font-bold text-stone-800">Also a great fit</h3>
              <div className="mt-4 space-y-2">
                {alternatives.map((a) => (
                  <Link key={a.slug} href={`/learn/${a.url}/${a.slug}`} className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-white">
                    {a.track}
                    <span className="text-xs text-stone-400">{a.lessons} lessons →</span>
                  </Link>
                ))}
                {goal.tool && (
                  <Link href={goal.tool.href} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold ${t.softCard} border`}>
                    🧮 {goal.tool.label}
                    <span className="text-xs text-stone-400">free tool →</span>
                  </Link>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </ToolShell>
  );
}
