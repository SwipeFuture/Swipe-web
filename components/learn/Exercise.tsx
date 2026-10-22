"use client";

import { useState } from "react";
import type { Block } from "@/lib/learn";

// Interactive practice blocks (same three types as in the apps) plus the
// chapter quiz that strings them together with a score at the end.

type Practice = Extract<Block, { type: "multiple-choice" | "true-false" | "fill-blank" }>;

const codeOf = (c: unknown) => (typeof c === "string" ? c : (c as { code?: string } | undefined)?.code);

function Option({ label, state, onClick, disabled }: { label: string; state: "idle" | "right" | "wrong" | "dim"; onClick: () => void; disabled: boolean }) {
  const cls =
    state === "right"
      ? "border-emerald-400 bg-emerald-50 text-emerald-800"
      : state === "wrong"
        ? "border-rose-300 bg-rose-50 text-rose-700"
        : state === "dim"
          ? "border-stone-200 bg-white/60 text-stone-400"
          : "border-stone-200 bg-white/80 text-stone-700 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md";
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-300 sm:text-base ${cls}`}>
      {label}
    </button>
  );
}

export function PracticeCard({ block, onDone, compact }: { block: Practice; onDone?: (correct: boolean) => void; compact?: boolean }) {
  const [picked, setPicked] = useState<number | null>(null);
  const options: string[] = block.type === "true-false" ? ["True", "False"] : block.options;
  const correctIndex =
    block.type === "multiple-choice" ? block.correctIndex : block.type === "true-false" ? (block.correct ? 0 : 1) : block.options.indexOf(block.correct);
  const answered = picked !== null;
  const right = picked === correctIndex;
  const code = "code" in block ? codeOf(block.code) : undefined;

  const prompt =
    block.type === "multiple-choice" ? block.question : block.type === "true-false" ? `True or false: ${block.statement}` : block.sentence;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    onDone?.(i === correctIndex);
  };

  return (
    <div className={`rounded-[28px] border border-white/70 bg-white/70 shadow-lg backdrop-blur-xl ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
        {block.type === "fill-blank" ? "Fill in the blank" : block.type === "true-false" ? "True or false" : "Quick check"}
      </span>
      <p className="mt-3 text-base font-bold leading-7 text-stone-900 sm:text-lg">
        {block.type === "fill-blank"
          ? prompt.split("___").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={`mx-1 inline-block min-w-16 rounded-lg border-b-2 px-2 text-center ${answered ? (right ? "border-emerald-500 text-emerald-700" : "border-rose-400 text-rose-600") : "border-stone-300 text-transparent"}`}>
                    {answered ? options[picked!] : "____"}
                  </span>
                )}
              </span>
            ))
          : block.type === "true-false"
            ? block.statement
            : prompt}
      </p>
      {code && <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#0f1115] p-4 font-mono text-sm leading-6 text-stone-100">{code}</pre>}
      <div className={`mt-5 grid gap-2.5 ${block.type === "true-false" ? "grid-cols-2" : "grid-cols-1"}`}>
        {options.map((o, i) => (
          <Option
            key={o + i}
            label={o}
            disabled={answered}
            onClick={() => pick(i)}
            state={!answered ? "idle" : i === correctIndex ? "right" : i === picked ? "wrong" : "dim"}
          />
        ))}
      </div>
      {answered && (
        <div className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-6 ${right ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
          <strong>{right ? "Correct! " : `Not quite — the answer is "${options[correctIndex]}". `}</strong>
          {block.explanation}
        </div>
      )}
    </div>
  );
}

export function ChapterQuiz({ title, questions }: { title: string; questions: Practice[] }) {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [key, setKey] = useState(0);
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  return (
    <div className="rounded-[32px] border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-6 shadow-xl sm:p-10">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Chapter quiz</span>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">{title.replace(/^Chapter Quiz — /, "")}</h2>
      <p className="mt-2 text-sm text-stone-500">{questions.length} questions · pass with 60% — just like in the app.</p>
      <div key={key} className="mt-8 space-y-5">
        {questions.map((q, i) => (
          <PracticeCard
            key={i}
            compact
            block={q}
            onDone={(ok) => {
              setAnswered((a) => a + 1);
              if (ok) setScore((s) => s + 1);
            }}
          />
        ))}
      </div>
      {answered === questions.length && questions.length > 0 && (
        <div className="mt-8 rounded-[24px] bg-black p-6 text-center text-white sm:p-8">
          <div className="text-5xl">{pct >= 90 ? "🏆" : pct >= 60 ? "✅" : "💪"}</div>
          <div className="mt-3 text-3xl font-black">
            {score}/{questions.length} · {pct}%
          </div>
          <p className="mt-2 text-sm text-stone-300">{pct >= 60 ? "Chapter passed! In the app, this would earn you stars and XP." : "Not passed yet — read the lessons once more and try again."}</p>
          <button
            type="button"
            onClick={() => {
              setScore(0);
              setAnswered(0);
              setKey((k) => k + 1);
            }}
            className="mt-5 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black"
          >
            Try again ↻
          </button>
        </div>
      )}
    </div>
  );
}
