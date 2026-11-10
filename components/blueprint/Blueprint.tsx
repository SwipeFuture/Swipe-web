import Link from "next/link";
import Swipey from "@/components/home/Swipey";

// The /blueprint page (2026-11-10 design): one roadmap per area, as a plain numbered list in the
// app colour. The old version was mostly slogans ("Build skills. Build confidence…", "There is no
// shortcut") that would fit any competitor, so this keeps only what a reader can act on.
// Old version: swipe-assistant/logs/redesign-backup/Blueprint.tsx.wave2

type Area = {
  id: string;
  title: string;
  href: string;
  bright: string;
  dark: string;
  tint: string;
  light: string;
  intro: string;
  steps: { name: string; what: string }[];
};

const AREAS: Area[] = [
  {
    id: "blueprint-coding",
    title: "Coding",
    href: "/coding",
    bright: "#22E08A",
    dark: "#127D4D",
    tint: "#E7FAF0",
    light: "#B9F5D6",
    intro: "From a first web page to a project other people can use. Employers often look at what you built, so every step ends in something you can show.",
    steps: [
      { name: "HTML and CSS", what: "Build and style a simple page." },
      { name: "JavaScript", what: "Make the page react to clicks and input." },
      { name: "Git and GitHub", what: "Save your work in versions and put it online." },
      { name: "TypeScript and React", what: "Build bigger interfaces without losing track." },
      { name: "APIs", what: "Load real data from other services." },
      { name: "Your own project", what: "Ship one small thing from start to finish." },
      { name: "Portfolio", what: "Collect your projects on one page you can link to." },
    ],
  },
  {
    id: "blueprint-ai",
    title: "AI",
    href: "/ai",
    bright: "#8B5CF6",
    dark: "#6D28D9",
    tint: "#F0EAFE",
    light: "#D6C8FB",
    intro: "Understand what AI tools actually do, use them well, and then build small things with them yourself.",
    steps: [
      { name: "How AI works", what: "What a language model is, and where it gets things wrong." },
      { name: "Prompting", what: "Write prompts that give useful, checkable answers." },
      { name: "Everyday use", what: "Summaries, drafts and research without copying blindly." },
      { name: "Automation", what: "Hand repeated tasks to a tool and check the result." },
      { name: "Building with AI", what: "Connect a model to a small app of your own." },
    ],
  },
  {
    id: "blueprint-finance",
    title: "Finance",
    href: "/finance",
    bright: "#FBBF24",
    dark: "#B45309",
    tint: "#FEF5DA",
    light: "#FDE9A8",
    intro: "How money works over many years, with real numbers. Educational, not financial advice.",
    steps: [
      { name: "Budgeting", what: "Know where your money goes each month." },
      { name: "Saving and an emergency fund", what: "A buffer for surprises before anything else." },
      { name: "Debt and credit", what: "What interest costs you, and how to avoid the expensive kind." },
      { name: "Compound interest", what: "Why time matters more than the amount at the start." },
      { name: "ETFs and long-term investing", what: "What they are, what they cost and what the risks are." },
    ],
  },
  {
    id: "blueprint-growth",
    title: "Personal Growth",
    href: "/personal-growth",
    bright: "#FB923C",
    dark: "#C2410C",
    tint: "#FFEEDF",
    light: "#FED2AE",
    intro: "The habits that make the other three easier: learning regularly, focusing, sleeping enough. Educational, not medical advice.",
    steps: [
      { name: "Habits", what: "Start one small habit and keep it going." },
      { name: "Focus", what: "Work on one thing without your phone pulling you away." },
      { name: "Sleep and stress", what: "What helps, explained without myths." },
      { name: "Planning", what: "Break a big goal into steps for this week." },
      { name: "Consistency", what: "Keep going on days when motivation is low." },
    ],
  },
];

export default function Blueprint() {
  return (
    <main className="bg-white px-6 pb-16 pt-28 text-[#121212] sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-lg bg-[#F0EAFE] px-2.5 py-1 text-[14px] font-bold text-[#6D28D9]">Roadmap</span>
          <h1 className="mt-5 text-[40px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[60px]">The Blueprint</h1>
          <p className="mt-6 text-[19px] leading-8 text-[#3a3a38]">
            One roadmap for each of the four Swipe areas: what to learn, in which order, and what each step is for. Pick one area
            and start at step one. The areas work on their own, but they help each other.
          </p>
          <nav aria-label="Areas" className="mt-8 flex flex-wrap gap-2.5">
            {AREAS.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="rounded-xl px-4 py-2.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5" style={{ background: a.tint, color: a.dark }}>
                {a.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-20 space-y-20 sm:space-y-24">
          {AREAS.map((a) => (
            <section key={a.id} id={a.id} className="scroll-mt-28 border-t-2 border-[#ececea] pt-10" aria-labelledby={`${a.id}-title`}>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <div>
                  <h2 id={`${a.id}-title`} className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[44px]">{a.title}</h2>
                  <p className="mt-4 max-w-md text-[17px] leading-8 text-[#3a3a38]">{a.intro}</p>
                  <Link href={a.href} className="mt-6 inline-block text-[16px] font-bold underline decoration-2 underline-offset-[6px]" style={{ textDecorationColor: a.bright }}>
                    See the {a.title} lessons →
                  </Link>
                  <Swipey accent={a.bright} accentLight={a.light} className="mt-10 hidden w-[120px] lg:block" />
                </div>

                <ol className="rounded-[24px] p-3 sm:p-4" style={{ background: a.tint }}>
                  {a.steps.map((s, i) => (
                    <li key={s.name} className="flex gap-4 rounded-2xl px-3 py-3.5 sm:px-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[15px] font-extrabold"
                        style={{ color: a.dark, boxShadow: `0 3px 0 ${a.light}` }}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 pt-0.5">
                        <span className="block text-[17px] font-extrabold leading-snug">{s.name}</span>
                        <span className="mt-0.5 block text-[15px] leading-6 text-[#3a3a38]">{s.what}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-24 max-w-3xl border-t-2 border-[#ececea] pt-10">
          <h2 className="text-[28px] font-extrabold leading-tight sm:text-[36px]">How to use it</h2>
          <ul className="mt-5 space-y-3 text-[17px] leading-8 text-[#3a3a38]">
            <li>Start with one area, not all four at once.</li>
            <li>About 15 minutes a day is enough. Over a year that is more than 90 hours.</li>
            <li>Finish a step before you start the next one. Skipping ahead usually means going back later.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
