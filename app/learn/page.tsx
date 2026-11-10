import type { Metadata } from "next";
import Link from "next/link";
import { THEMES } from "@/components/tools/themes";
import { LEARN_APPS, tracksOf } from "@/lib/learn";

export const metadata: Metadata = {
  alternates: { canonical: "/learn" },
  title: "Free Lessons — Coding, Finance, Growth & AI | Swipe",
  description:
    "Hundreds of free beginner lessons from the Swipe apps — Python, JavaScript, investing, habits, focus, AI prompting and more, with quizzes.",
};

export default function LearnPage() {
  const total = LEARN_APPS.reduce((s, a) => s + tracksOf(a).reduce((x, t) => x + t.lessons, 0), 0);
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-50 bg-white " />
      
      
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-3xl">
          <span className="inline-flex items-center rounded-lg bg-[#F6F6F4] px-2.5 py-1 text-[14px] font-bold text-[#3a3a38]">
            {total} free lessons · no account needed
          </span>
          <h1 className="mt-5 text-[40px] font-extrabold leading-[1] tracking-[-0.025em] text-[#121212] sm:text-[60px]">
            Learn something{" "}
            <span className="" style={{ color: "#127D4D" }}>today.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[#3a3a38]">
            The first two levels of every Swipe track, free on the web: short lessons, real examples, quick checks and a quiz after every chapter. Pick a track and start.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/advisor" className="rounded-xl bg-[#121212] px-7 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">
              Not sure where to start? Ask the advisor →
            </Link>
            <Link href="/tools" className="rounded-xl border-2 border-[#ececea] bg-white px-7 py-3.5 text-[16px] font-bold text-[#121212] hover:border-[#121212]">
              Free tools & quizzes
            </Link>
          </div>
        </header>

        <div className="mt-20 space-y-16">
          {LEARN_APPS.map((app) => {
            const t = THEMES[app.theme];
            const tracks = tracksOf(app);
            return (
              <div key={app.url} id={app.url} className="scroll-mt-28">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className={`text-xs font-bold  ${t.accentText}`}>{app.name}</span>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{app.area}</h2>
                    <p className="mt-2 max-w-xl text-sm text-stone-500 sm:text-base">{app.blurb}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tracks.map((tr) => (
                    <Link
                      key={tr.slug}
                      href={`/learn/${app.url}/${tr.slug}`}
                      className="group rounded-[26px] border border-[#ececea] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`inline-flex rounded-lg border px-2.5 py-1 text-[12px] font-semibold ${t.chip}`}>{tr.lessons} free lessons</div>
                      <h3 className="mt-4 text-lg font-bold text-stone-900">{tr.track}</h3>
                      <span className={`mt-3 inline-block text-sm font-semibold ${t.accentText} transition-transform group-hover:translate-x-1`}>Start learning →</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
