"use client";

import { useState } from "react";
import { Card, Chips, ToolShell, THEMES, type FaqItem } from "../kit";

export const PROMPT_FAQ: FaqItem[] = [
  { q: "What makes a good AI prompt?", a: "A good prompt gives the AI a role, a clear task, the context it needs, the format you want back and any limits (length, tone, audience). The more specific you are, the less the AI has to guess." },
  { q: "Does this work with ChatGPT, Claude and Gemini?", a: "Yes. The structure — role, task, context, format, constraints — works with any modern AI chatbot. Copy the prompt and paste it into the tool you use." },
  { q: "Why should I give the AI a role?", a: "A role like 'experienced teacher' or 'senior developer' sets the level of detail, vocabulary and perspective of the answer, so you get a response that fits your situation." },
];

const TONES = ["Friendly", "Professional", "Simple", "Detailed"];
const FORMATS = ["Bullet points", "Step-by-step", "Short paragraph", "Table"];

export default function PromptBuilder() {
  const t = THEMES.ai;
  const [role, setRole] = useState("an experienced teacher");
  const [task, setTask] = useState("Explain how compound interest works");
  const [context, setContext] = useState("I'm 16 and just opened my first savings account.");
  const [audience, setAudience] = useState("a complete beginner");
  const [tone, setTone] = useState(TONES[0]);
  const [format, setFormat] = useState(FORMATS[1]);
  const [limit, setLimit] = useState("under 200 words, with one real-life example");
  const [copied, setCopied] = useState(false);

  const prompt = [
    role && `You are ${role}.`,
    task && `Your task: ${task.replace(/\.$/, "")}.`,
    context && `Context: ${context}`,
    audience && `Write for ${audience}.`,
    `Tone: ${tone.toLowerCase()}. Format: ${format.toLowerCase()}.`,
    limit && `Constraints: ${limit}.`,
    "If anything important is unclear, ask me one short question before answering.",
  ]
    .filter(Boolean)
    .join("\n");

  const field = (label: string, value: string, set: (v: string) => void, placeholder: string, area = false) => (
    <label className="block">
      <span className="text-xs font-semibold text-stone-600 sm:text-sm">{label}</span>
      {area ? (
        <textarea value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder} rows={2} className={`mt-2 w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-stone-800 shadow-sm outline-none focus:ring-4 sm:text-base ${t.ring}`} />
      ) : (
        <input value={value} onChange={(e) => set(e.target.value)} placeholder={placeholder} className={`mt-2 w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-stone-800 shadow-sm outline-none focus:ring-4 sm:text-base ${t.ring}`} />
      )}
    </label>
  );

  return (
    <ToolShell
      theme="ai"
      backHref="/ai"
      backLabel="Back to AI"
      eyebrow="AI Tool"
      title="AI Prompt"
      highlight="Builder"
      intro="Better prompts, better answers. Fill in the blocks — role, task, context, format — and get a ready-to-paste prompt for ChatGPT, Claude or Gemini."
      faq={PROMPT_FAQ}
      related={[
        { href: "/learn", label: "Free AI lessons" },
        { href: "/advisor", label: "Find your learning path" },
      ]}
    >
      <Card>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {field("Role — who should the AI be?", role, setRole, "a senior Python developer")}
          {field("Audience — who is it for?", audience, setAudience, "my little brother")}
          <div className="sm:col-span-2">{field("Task — what should it do?", task, setTask, "Write a study plan for my math exam", true)}</div>
          <div className="sm:col-span-2">{field("Context — what does it need to know?", context, setContext, "The exam is in 2 weeks, I have 30 minutes a day", true)}</div>
          <div className="sm:col-span-2">{field("Constraints", limit, setLimit, "max 150 words, no jargon")}</div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">Tone</span>
            <div className="mt-2">
              <Chips theme="ai" options={TONES} value={tone} onChange={setTone} />
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-600 sm:text-sm">Answer format</span>
            <div className="mt-2">
              <Chips theme="ai" options={FORMATS} value={format} onChange={setFormat} />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-stone-800 sm:text-lg">Your prompt</h2>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(prompt).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
              });
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${t.button}`}
          >
            {copied ? "Copied ✓" : "Copy prompt"}
          </button>
        </div>
        <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#14111f] p-5 font-mono text-sm leading-7 text-violet-100">{prompt}</pre>
      </Card>
    </ToolShell>
  );
}
