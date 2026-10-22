import type { Metadata } from "next";
import Link from "next/link";
import { THEMES } from "@/components/tools/themes";
import { LEARN_APPS, tracksOf } from "@/lib/learn";

export const metadata: Metadata = {
  alternates: { canonical: "/learn" },
  title: "Free Lessons — Learn Coding, Finance, Personal Growth & AI | Swipe",
  description:
    "Hundreds of free, beginner-friendly lessons from the Swipe apps: Python, JavaScript, HTML, investing, money basics, habits, focus, prompt engineering and more — with practice questions and quizzes.",
};

export default function LearnPage() {
  const total = LEARN_APPS.reduce((s, a) => s + tracksOf(a).reduce((x, t) => x + t.lessons, 0), 0);
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-stone-50 to-stone-100" />
      <div className="absolute -left-32 top-20 -z-40 h-[500px] w-[500px] rounded-full bg-emerald-300 opacity-20 blur-[150px]" />
      <div className="absolute -right-32 top-1/3 -z-40 h-[500px] w-[500px] rounded-full bg-violet-300 opacity-20 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <header className="text-center">
          <span className="inline-flex items-center rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-xs font-semibold tracking-wide text-stone-600">
            {total} free lessons · no account needed
          </span>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-stone-900 sm:text-7xl">
            Learn something{" "}
            <span className="bg-gradient-to-r from-stone-900 via-emerald-700 to-violet-600 bg-clip-text text-transparent">today.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
            The first two levels of every Swipe track, free on the web: short lessons, real examples, quick checks and a quiz after every chapter. Pick a track and start.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/advisor" className="rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105">
              Not sure where to start? Ask the advisor →
            </Link>
            <Link href="/tools" className="rounded-full border border-stone-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-stone-700 shadow-sm">
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
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>{app.name}</span>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{app.area}</h2>
                    <p className="mt-2 max-w-xl text-sm text-stone-500 sm:text-base">{app.blurb}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tracks.map((tr) => (
                    <Link
                      key={tr.slug}
                      href={`/learn/${app.url}/${tr.slug}`}
                      className="group rounded-[26px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${t.chip}`}>{tr.lessons} free lessons</div>
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
