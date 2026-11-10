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
      <div className="absolute inset-0 -z-50 bg-white " />
      
      
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-3xl">
          <span className="inline-flex items-center rounded-lg bg-[#F6F6F4] px-2.5 py-1 text-[14px] font-bold text-[#3a3a38]">
            {count} free tools · no sign-up
          </span>
          <h1 className="mt-5 text-[40px] font-extrabold leading-[1] tracking-[-0.025em] text-[#121212] sm:text-[60px]">
            Free{" "}
            <span className="" style={{ color: "#127D4D" }}>tools</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[#3a3a38]">
            Calculators, quizzes and helpers for money, coding, habits and AI — built by the team behind the Swipe learning apps.
          </p>
        </header>

        <Link
          href="/advisor"
          className="group mt-12 flex max-w-3xl flex-col items-start gap-2 rounded-[26px] bg-[#E7FAF0] p-7 text-left text-[#121212] transition-transform duration-200 hover:-translate-y-1 sm:p-9" style={{ boxShadow: "0 5px 0 #B9F5D6" }}
        >
          <span className="text-[26px] font-extrabold leading-tight sm:text-[32px]">Learning Advisor</span>
          <span className="max-w-lg text-[16px] leading-7 text-[#3a3a38]">Not sure what to learn? Four questions, and you get your personal learning path with free lessons.</span>
          <span className="mt-2 text-[15px] font-bold text-[#127D4D]">Find my path →</span>
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
