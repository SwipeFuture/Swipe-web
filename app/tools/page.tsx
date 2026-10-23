import type { Metadata } from "next";
import Link from "next/link";
import { ToolCards } from "@/components/tools/ToolGrid";
import { THEMES } from "@/components/tools/themes";
import { TOOL_AREAS } from "@/lib/tools-catalog";

export const metadata: Metadata = {
  alternates: { canonical: "/tools" },
  title: "Free Calculators, Quizzes & Tools | Swipe",
  description:
    "Free budget, savings, debt, inflation and FIRE calculators, a sleep calculator, a code typing test, an AI prompt builder and quizzes — no sign-up needed.",
};

export default function ToolsPage() {
  const count = TOOL_AREAS.reduce((s, a) => s + a.tools.length, 0) + 1;
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-stone-50 to-stone-100" />
      <div className="absolute -left-32 top-20 -z-40 h-[500px] w-[500px] rounded-full bg-amber-300 opacity-20 blur-[150px]" />
      <div className="absolute -right-32 top-1/3 -z-40 h-[500px] w-[500px] rounded-full bg-emerald-300 opacity-20 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <header className="text-center">
          <span className="inline-flex items-center rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-stone-600">
            {count} free tools · no sign-up
          </span>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-stone-900 sm:text-7xl">
            Free{" "}
            <span className="bg-gradient-to-r from-stone-900 via-amber-600 to-emerald-600 bg-clip-text text-transparent">tools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
            Calculators, quizzes and helpers for money, coding, habits and AI — built by the team behind the Swipe learning apps.
          </p>
        </header>

        <Link
          href="/advisor"
          className="group mx-auto mt-14 flex max-w-3xl flex-col items-center gap-2 rounded-[30px] bg-black p-8 text-center text-white shadow-2xl transition-all duration-300 hover:scale-[1.01] sm:p-10"
        >
          <span className="text-4xl">🧭</span>
          <span className="text-2xl font-black tracking-tight sm:text-3xl">Learning Advisor</span>
          <span className="max-w-lg text-sm text-stone-300 sm:text-base">Not sure what to learn? Four questions, and you get your personal learning path with free lessons.</span>
          <span className="mt-2 text-sm font-semibold text-emerald-300 transition-transform group-hover:translate-x-1">Find my path →</span>
        </Link>

        <div className="mt-16 space-y-14">
          {TOOL_AREAS.map((a) => (
            <div key={a.key} id={a.key} className="scroll-mt-28">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">{a.label}</h2>
                <Link href={a.learn} className={`text-sm font-semibold ${THEMES[a.theme].accentText}`}>
                  Free lessons →
                </Link>
              </div>
              <div className="mt-5">
                <ToolCards area={a} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
