"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, ToolShell, THEMES, type FaqItem, type RelatedLink, type ToolTheme } from "../kit";

// One generic personality-style quiz: every answer adds points to one or more
// results, the highest score wins. Each quiz is just data (see quizzes.ts).

export type QuizResult = {
  title: string;
  emoji: string;
  summary: string;
  strengths: string[];
  next: string[];
  links: RelatedLink[];
};

export type QuizQuestion = {
  q: string;
  options: { label: string; scores: Record<string, number> }[];
};

export type QuizData = {
  theme: ToolTheme;
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  highlight: string;
  intro: string;
  questions: QuizQuestion[];
  results: Record<string, QuizResult>;
  faq: FaqItem[];
  related: RelatedLink[];
};

export default function Quiz({ data }: { data: QuizData }) {
  const t = THEMES[data.theme];
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<Record<string, number>[]>([]);
  const [copied, setCopied] = useState(false);
  const done = step >= data.questions.length;

  const answer = (add: Record<string, number>) => {
    setHistory((h) => [...h, scores]);
    setScores((s) => {
      const next = { ...s };
      for (const [k, v] of Object.entries(add)) next[k] = (next[k] ?? 0) + v;
      return next;
    });
    setStep((s) => s + 1);
  };
  const back = () => {
    if (!history.length) return;
    setScores(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    setStep((s) => s - 1);
  };
  const restart = () => {
    setStep(0);
    setScores({});
    setHistory([]);
  };

  const ranked = Object.keys(data.results).sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0));
  const winner = data.results[ranked[0]];
  const runnerUp = data.results[ranked[1]];
  const q = data.questions[Math.min(step, data.questions.length - 1)];

  return (
    <ToolShell
      theme={data.theme}
      backHref={data.backHref}
      backLabel={data.backLabel}
      eyebrow={data.eyebrow}
      title={data.title}
      highlight={data.highlight}
      intro={data.intro}
      faq={data.faq}
      related={data.related}
    >
      {!done ? (
        <Card>
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>
              Question {step + 1} of {data.questions.length}
            </span>
            {step > 0 && (
              <button type="button" onClick={back} className="underline-offset-2 hover:underline">
                ← Back
              </button>
            )}
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
            <div className={`h-full rounded-full ${t.bar} transition-all duration-500`} style={{ width: `${(step / data.questions.length) * 100}%` }} />
          </div>
          <h2 key={step} className="mt-8 animate-[fadein_0.4s_ease-out] text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
            {q.q}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {q.options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => answer(o.scores)}
                className="rounded-[22px] border border-stone-200 bg-white/80 px-5 py-4 text-left text-sm font-semibold text-stone-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg sm:text-base"
              >
                {o.label}
              </button>
            ))}
          </div>
          <style>{`@keyframes fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>
        </Card>
      ) : (
        <>
          <Card className="text-center">
            <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${t.chip}`}>Your result</span>
            <div className="mt-5 text-6xl">{winner.emoji}</div>
            <h2 className={`mt-3 text-4xl font-black tracking-tight sm:text-5xl ${t.gradientText} bg-clip-text text-transparent`}>{winner.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">{winner.summary}</p>
            {runnerUp && <p className="mt-4 text-xs text-stone-400">Close second: {runnerUp.emoji} {runnerUp.title}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const text = `I got "${winner.title}" ${winner.emoji} in the Swipe ${data.title} ${data.highlight} — ${window.location.href}`;
                  if (navigator.share) navigator.share({ text }).catch(() => {});
                  else
                    navigator.clipboard?.writeText(text).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1600);
                    });
                }}
                className={`rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${t.button}`}
              >
                {copied ? "Copied ✓" : "Share my result"}
              </button>
              <button type="button" onClick={restart} className="rounded-full border border-stone-200 bg-white/70 px-6 py-3 text-sm font-semibold text-stone-700">
                Take it again ↻
              </button>
            </div>
          </Card>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="text-base font-bold text-stone-800">Your strengths</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-600">
                {winner.strengths.map((s) => (
                  <li key={s}>✓ {s}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-base font-bold text-stone-800">Your next steps</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-stone-600">
                {winner.next.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </Card>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {winner.links.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${t.button}`}>
                {l.label} →
              </Link>
            ))}
          </div>
        </>
      )}
    </ToolShell>
  );
}
