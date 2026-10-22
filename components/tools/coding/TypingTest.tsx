"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Chips, HeroResult, StatGrid, ToolShell, type FaqItem } from "../kit";

export const TYPING_FAQ: FaqItem[] = [
  { q: "How is coding speed measured?", a: "Like normal typing: words per minute (WPM), where one word counts as 5 characters including spaces and symbols. Only correctly typed characters count, and accuracy shows how many keystrokes were right." },
  { q: "What is a good typing speed for programmers?", a: "Around 40–60 WPM on code is solid. Code is slower to type than prose because of brackets, symbols and indentation — and in real work, thinking matters far more than raw speed." },
  { q: "How can I type code faster?", a: "Learn to type without looking at the keyboard, practise the symbols you use most ({ } ( ) [ ] = : ;), and let your editor's autocomplete and snippets do the repetitive parts." },
];

const SNIPPETS: Record<string, string[]> = {
  Python: [
    'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Swipe"))',
    "scores = [72, 88, 95]\naverage = sum(scores) / len(scores)\nprint(round(average, 1))",
    "for i in range(1, 6):\n    if i % 2 == 0:\n        print(i, \"is even\")",
  ],
  JavaScript: [
    "const greet = (name) => `Hello, ${name}!`;\nconsole.log(greet(\"Swipe\"));",
    "const prices = [4, 8, 15];\nconst total = prices.reduce((sum, p) => sum + p, 0);\nconsole.log(total);",
    "for (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) console.log(i);\n}",
  ],
  HTML: [
    '<button class="cta" onclick="start()">\n  Start learning\n</button>',
    '<ul>\n  <li>Python</li>\n  <li>JavaScript</li>\n</ul>',
  ],
};

export default function TypingTest() {
  const [lang, setLang] = useState("Python");
  const [round, setRound] = useState(0);
  const target = useMemo(() => SNIPPETS[lang][round % SNIPPETS[lang].length], [lang, round]);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);
  const [keys, setKeys] = useState(0);
  const [errors, setErrors] = useState(0);
  const [, setTick] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTyped("");
    setStart(null);
    setEnd(null);
    setKeys(0);
    setErrors(0);
  }, [target]);

  useEffect(() => {
    if (!start || end) return;
    const id = setInterval(() => setTick((x) => x + 1), 250);
    return () => clearInterval(id);
  }, [start, end]);

  const elapsed = start ? ((end ?? Date.now()) - start) / 1000 : 0;
  const correct = [...typed].filter((c, i) => c === target[i]).length;
  const wpm = elapsed > 0 ? (correct / 5) / (elapsed / 60) : 0;
  const accuracy = keys > 0 ? Math.max(0, ((keys - errors) / keys) * 100) : 100;

  const onChange = (v: string) => {
    if (end) return;
    if (!start) setStart(Date.now());
    if (v.length > typed.length) {
      setKeys((k) => k + (v.length - typed.length));
      const ch = v[v.length - 1];
      if (ch !== target[v.length - 1]) setErrors((e) => e + 1);
    }
    setTyped(v.slice(0, target.length));
    if (v.length >= target.length && v.slice(0, target.length) === target) setEnd(Date.now());
  };

  return (
    <ToolShell
      theme="coding"
      backHref="/coding"
      backLabel="Back to Coding"
      eyebrow="Coding Tool"
      title="Code Typing"
      highlight="Speed Test"
      intro="How fast can you type real code — brackets, symbols, indentation and all? Pick a language, start typing, and get your WPM and accuracy."
      faq={TYPING_FAQ}
      related={[
        { href: "/quiz/programming-language", label: "Which language should you learn?" },
        { href: "/learn", label: "Free coding lessons" },
        { href: "/coding/programming-languages", label: "Programming languages compared" },
      ]}
    >
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Chips theme="coding" options={Object.keys(SNIPPETS)} value={lang} onChange={(l) => { setLang(l); setRound(0); }} />
          <button type="button" onClick={() => setRound((r) => r + 1)} className="rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-600">
            New snippet ↻
          </button>
        </div>
        <div className="relative mt-6 cursor-text rounded-2xl bg-[#0f1115] p-5 font-mono text-sm leading-7 sm:text-base" onClick={() => inputRef.current?.focus()}>
          <pre className="whitespace-pre-wrap break-words">
            {[...target].map((c, i) => {
              const state = i < typed.length ? (typed[i] === c ? "ok" : "bad") : i === typed.length ? "cur" : "todo";
              const cls =
                state === "ok" ? "text-emerald-400" : state === "bad" ? "bg-rose-500/40 text-rose-200" : state === "cur" ? "border-l-2 border-emerald-400 text-stone-300" : "text-stone-500";
              return (
                <span key={i} className={cls}>
                  {c === "\n" ? "↵\n" : c}
                </span>
              );
            })}
          </pre>
          <textarea
            ref={inputRef}
            value={typed}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                onChange(typed + "    ");
              }
            }}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="absolute inset-0 h-full w-full resize-none opacity-0"
            aria-label="Type the code here"
          />
        </div>
        <p className="mt-3 text-xs text-stone-500">{start ? (end ? "Done! Pick a new snippet to go again." : "Keep going…") : "Click the code and start typing — the timer starts with your first key."}</p>
      </Card>

      <HeroResult theme="coding" label={end ? "Your result" : "Live"} value={`${Math.round(wpm)} WPM`} note={`${accuracy.toFixed(0)}% accuracy`} />
      <StatGrid
        items={[
          { label: "Time", value: `${elapsed.toFixed(1)} s` },
          { label: "Correct characters", value: `${correct}/${target.length}` },
          { label: "Mistakes", value: String(errors) },
          { label: "Accuracy", value: `${accuracy.toFixed(0)}%` },
        ]}
      />
    </ToolShell>
  );
}
