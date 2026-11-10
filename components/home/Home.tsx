import Link from "next/link";
import Swipey from "./Swipey";
import LessonDeck from "./LessonDeck";
import TryIt from "./TryIt";
import PhoneShot from "./PhoneShot";
import AppPlans from "./AppPlans";
import styles from "./home.module.css";
import { appLessons, learnAppUrl } from "@/lib/learn-links";
import { TOOL_AREAS } from "@/lib/tools-catalog";
import index from "@/content/learn/index.json";

// The homepage (redesigned 2026-11-10, rules in Design-Recherche/2026-11-10/DESIGN-REGELN.md).
// Clean white with the four app colours at full strength, Swipey as the only illustration, one
// typeface (Archivo, wide + heavy for headlines), chunky press-able buttons, and the real product
// (a swipeable lesson deck, answerable quizzes) instead of gradients, glass or emoji cards.
// Section ids #home, #why-us and #learning-paths are linked from the navbar and must stay.

const INK = "#121212";
const MUTED = "#5c5c58";

const AREAS = [
  { app: "coding", name: "Coding", short: "Coding", bright: "#22E08A", dark: "#127D4D", tint: "#E7FAF0", page: "/coding", blurb: "From your first print() to shipping a real website." },
  { app: "finance", name: "Finance", short: "Finance", bright: "#FBBF24", dark: "#B45309", tint: "#FEF5DA", page: "/finance", blurb: "Budgets, investing, credit and taxes without the jargon." },
  { app: "growth", name: "Personal Growth", short: "Growth", bright: "#FB923C", dark: "#C2410C", tint: "#FFEEDF", page: "/personal-growth", blurb: "Habits, focus, sleep and confidence that hold up on bad days." },
  { app: "ai", name: "AI", short: "AI", bright: "#8B5CF6", dark: "#6D28D9", tint: "#F0EAFE", page: "/ai", blurb: "How AI works, how to prompt it, and how to use it well." },
] as const;

type Entry = { app: string; track: string; slug: string; lessons: number };
const tracksOf = (app: string) => (index as Entry[]).filter((e) => e.app === app);
const TOTAL = AREAS.reduce((n, a) => n + appLessons(a.app), 0);
const TRACKS = (index as Entry[]).length;
const TOOL_COUNT = TOOL_AREAS.reduce((n, a) => n + a.tools.length, 0);
const FEATURED_TOOLS = [
  "/finance/budget-calculator",
  "/finance/compound-interest-calculator",
  "/finance/fire-calculator",
  "/coding/typing-speed-test",
  "/personal-growth/sleep-calculator",
  "/ai/prompt-builder",
];
const TOOLS = TOOL_AREAS.flatMap((a) => a.tools.map((t) => ({ ...t, area: a.key }))).filter((t) => FEATURED_TOOLS.includes(t.href));
const AREA_BY_APP: Record<string, (typeof AREAS)[number]> = Object.fromEntries(AREAS.map((a) => [a.app, a]));

const wide = { fontStretch: "125%" } as const;

// Chunky buttons: a solid face with a darker "edge" underneath that disappears when pressed.
function PressLink({ href, children, face, edge, text = "#fff", className = "" }: { href: string; children: React.ReactNode; face: string; edge: string; text?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`${styles.press} inline-block rounded-2xl px-7 py-4 text-[17px] font-bold active:shadow-none ${className}`}
      style={{ background: face, color: text, boxShadow: `0 4px 0 ${edge}` }}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="bg-white font-[family-name:var(--font-archivo)]" style={{ color: INK }}>
      <Hero />
      <Numbers />
      <Areas />
      <HowItWorks />
      <Tools />
      <Apps />
      <Note />
    </main>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="home" className="scroll-mt-24 overflow-x-clip px-6 pb-16 pt-28 sm:px-10 sm:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <p className="inline-flex flex-wrap gap-2 text-[14px] font-semibold">
            {["Free", "No account", "5 minutes a lesson"].map((t, i) => (
              <span key={t} className="rounded-lg px-2.5 py-1" style={{ background: AREAS[i].tint, color: AREAS[i].dark }}>{t}</span>
            ))}
          </p>
          <h1 className="mt-6 text-left text-[38px] font-extrabold leading-[0.98] tracking-[-0.025em] min-[400px]:text-[42px] sm:text-[66px] lg:text-[78px]" style={wide}>
            Five-minute lessons that{" "}
            <span className="relative whitespace-nowrap">
              <span className="absolute inset-x-0 bottom-[0.1em] top-[0.64em] -z-0 rounded-md bg-[#22E08A]" aria-hidden />
              <span className="relative">actually stick.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#3a3a38] sm:text-xl sm:leading-9">
            {TOTAL} free lessons on Python, investing, sleep, prompt writing and more. Read one short card, try it yourself, then
            check what you remember. Right here in your browser.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/learn" className="inline-block rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">Start a free lesson</Link>
            <Link href="/advisor" className="text-[17px] font-bold underline decoration-2 underline-offset-[6px] hover:decoration-[#22E08A]">Find my path</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:mr-6">
          {/* one Swipey next to the deck, nothing else around it */}
          <div className="pointer-events-none absolute -right-4 -top-12 z-10 w-12 sm:-right-10 sm:w-16">
            <Swipey accent="#22E08A" accentLight="#B9F5D6" />
          </div>
          <div className="relative z-[5]">
            <LessonDeck />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Numbers ---------------- */

function Numbers() {
  const items = [
    { n: TOTAL, label: "free lessons", a: AREAS[0] },
    { n: TRACKS, label: "learning tracks", a: AREAS[1] },
    { n: TOOL_COUNT, label: "free tools", a: AREAS[2] },
    { n: 0, label: "accounts needed", a: AREAS[3] },
  ];
  return (
    <section aria-label="Swipe in numbers" className="px-6 pb-6 sm:px-10">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 border-t-2 border-[#ececea] pt-8 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label}>
            <dt className="sr-only">{it.label}</dt>
            <dd>
              <span className="block text-[40px] font-extrabold leading-none sm:text-[48px]" style={wide}>{it.n}</span>
              <span className="mt-2 block text-[15px] font-semibold text-[#3a3a38]">{it.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------- Areas ---------------- */

function Areas() {
  return (
    <section id="learning-paths" className="scroll-mt-24 px-6 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl text-[36px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[52px]" style={wide}>
            Four things school rarely teaches properly.
          </h2>
          <Link href="/blueprint" className="text-[16px] font-bold underline decoration-[3px] underline-offset-[6px] hover:decoration-[#22E08A]">
            How they fit together
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {AREAS.map((a) => {
            const tracks = tracksOf(a.app);
            return (
              <div
                key={a.app}
                className={`${styles.tile} relative flex flex-col overflow-hidden rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9`}
                style={{ background: a.bright, boxShadow: `0 6px 0 ${a.dark}` }}
              >
                <div className="relative z-10 flex max-w-[68%] flex-1 flex-col">
                  <p className="text-[15px] font-bold text-[#121212]/70">{appLessons(a.app)} free lessons · {tracks.length} tracks</p>
                  <h3 className="mt-2 text-[36px] font-extrabold leading-none tracking-[-0.025em] sm:text-[44px]" style={wide}>{a.name}</h3>
                  <p className="mt-4 text-[16px] font-medium leading-7 text-[#121212]/85">{a.blurb}</p>
                  <p className="mt-5 text-[14px] leading-6 text-[#121212]/70">{tracks.map((t) => t.track).join(" · ")}</p>
                  {/* pinned to the bottom so the buttons line up in every tile */}
                  <div className="mt-auto flex flex-col items-start pt-7">
                    <div className="inline-flex flex-col items-center gap-3">
                    <PressLink href={learnAppUrl(a.app)} face={INK} edge="#000" className="px-5 py-3 text-[15px]">Start {a.short}</PressLink>
                    {/* centred under the button */}
                    <Link href={a.page} className="text-[15px] font-bold underline decoration-2 underline-offset-[5px]">What you&apos;ll learn</Link>
                    </div>
                  </div>
                </div>
                {/* sized from the tile width so it never reaches the text column (max 68%) */}
                <Swipey accent={a.dark} accentLight="#ffffff" className={`${styles.wave} pointer-events-none absolute -bottom-4 -right-2 w-[24%] max-w-[170px]`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How a lesson works ---------------- */

function HowItWorks() {
  return (
    <section id="why-us" className="scroll-mt-24 bg-[#F6F6F4] px-6 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-[36px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[52px]" style={wide}>
          No videos. No hour-long courses. One idea per lesson.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3a3a38]">
          Every lesson works the same way, so you can do one on the bus and still remember it the next day. Try step 2 right here.
        </p>

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          <Step n="1" color={AREAS[1]} title="Read a short card" text="A few sentences and a real example. The important words are marked, nothing else.">
            <p className="text-[15px] leading-7 text-[#3a3a38]">
              Compound interest means you earn interest on <span className="rounded-md bg-[#FDE7A9] px-1 py-0.5 font-semibold text-[#121212]">your interest</span>, not
              just on what you put in.
            </p>
          </Step>
          <Step n="2" color={AREAS[0]} title="Try it right away" text="Fill in a blank, pick an answer or spot the mistake, right after you read it.">
            <TryIt />
          </Step>
          <Step n="3" color={AREAS[3]} title="Check what stuck" text="Every chapter ends with a short quiz. Get it right and the next level opens.">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold">Chapter quiz</span>
              <span className="text-[15px] font-extrabold text-[#6D28D9]">3 / 3</span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2].map((i) => <span key={i} className="h-2.5 flex-1 rounded-full bg-[#8B5CF6]" />)}
            </div>
            <p className="mt-3 inline-block rounded-lg bg-[#F0EAFE] px-2.5 py-1 text-[14px] font-bold text-[#6D28D9]">Level 3 unlocked</p>
          </Step>
        </ol>
      </div>
    </section>
  );
}

function Step({ n, color, title, text, children }: { n: string; color: (typeof AREAS)[number]; title: string; text: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col rounded-[22px] border border-[#e6e6e3] bg-white p-6 sm:p-7">
      <span className="text-[15px] font-extrabold" style={{ ...wide, color: color.dark }}>Step {n}</span>
      <h3 className="mt-2 text-[22px] font-extrabold tracking-[-0.01em]" style={wide}>{title}</h3>
      <p className="mt-2 text-[16px] leading-7" style={{ color: MUTED }}>{text}</p>
      <div className="mt-6 flex-1 rounded-[18px] bg-[#F6F6F4] p-5">{children}</div>
    </li>
  );
}

/* ---------------- Tools ---------------- */

function Tools() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-[36px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[52px]" style={wide}>
            {TOOL_COUNT} free tools for your real numbers.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#3a3a38]">
            Put in your own pay, savings or bedtime and see what it means. Nothing is saved, nothing to sign up for.
          </p>
          <div className="mt-8">
            <PressLink href="/tools" face={INK} edge="#000" className="px-6 py-3.5 text-[16px]">See all {TOOL_COUNT} tools</PressLink>
          </div>
        </div>
        <ul className="grid gap-3">
          {TOOLS.map((t) => {
            const a = AREA_BY_APP[t.area];
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="group flex items-center gap-5 rounded-[20px] border-2 border-[#ececea] bg-white px-5 py-4 shadow-[0_4px_0_#ececea] transition-transform hover:-translate-y-0.5"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl text-[13px] font-extrabold" style={{ background: a.tint, color: a.dark }}>
                    {a.short.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[18px] font-extrabold tracking-[-0.01em]" style={wide}>{t.title}</span>
                    <span className="mt-0.5 block text-[15px]" style={{ color: MUTED }}>{t.text}</span>
                  </span>
                  <span aria-hidden className="text-xl font-bold transition-transform group-hover:translate-x-1" style={{ color: a.dark }}>→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Apps ---------------- */

const APP_LIST = [
  { slug: "coding", name: "Swipe Coding", what: "Python, JavaScript, HTML and 7 more, from zero to real projects." },
  { slug: "finance", name: "Swipe Finance", what: "Budgeting, investing, credit, taxes and retirement." },
  { slug: "growth", name: "Swipe Personal Growth", what: "Habits, focus, sleep, mindset and relationships." },
  { slug: "ai", name: "Swipe AI", what: "How AI works, prompting, agents and building with AI." },
] as const;

function Apps() {
  return (
    <section id="apps" className="scroll-mt-24 px-6 sm:px-10" aria-labelledby="apps-title">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] text-white" style={{ background: INK }}>
        <div className="grid items-center gap-12 px-7 pt-14 sm:px-12 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:pb-16">
          <div>
            <p className="inline-block rounded-lg bg-[#22E08A] px-2.5 py-1 text-[14px] font-bold text-[#121212]">Coming soon to the App Store</p>
            <h2 id="apps-title" className="mt-5 text-[38px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[54px]" style={wide}>
              The full Swipe, in your pocket.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/75">
              The website has the first two levels of every track. The iPhone apps have all of them, plus everything that keeps you
              going: a daily streak, chapter quizzes and level tests, a learning advisor, your statistics and a leaderboard.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {APP_LIST.map((a) => (
                <li key={a.slug} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/logo-${a.slug}-black.png`} alt="" width={48} height={48} className="h-12 w-12 flex-none rounded-[13px] border border-white/15" />
                  <span>
                    <span className="block text-[15px] font-extrabold" style={wide}>{a.name}</span>
                    <span className="mt-0.5 block text-[13px] leading-5 text-white/65">{a.what}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <PressLink href="/apps" face="#fff" edge="#9c9c98" text={INK} className="px-6 py-3.5 text-[16px]">Meet the apps</PressLink>
              <span className="text-[15px] text-white/60">One account for all four apps</span>
            </div>
          </div>

          {/* real screens from Swipe Coding */}
          <div className="relative mx-auto flex w-full max-w-[520px] items-end justify-center gap-3 sm:gap-4 lg:-mb-16">
            <div className="w-[31%] -rotate-6"><div className={styles.floatSlow}><PhoneShot src="/app-screens/coding/01.webp" alt="Swipe Coding: the JavaScript learning path" /></div></div>
            <div className="w-[36%] -translate-y-8"><div className={styles.float}><PhoneShot src="/app-screens/coding/02.webp" alt="Swipe Coding: a lesson about elif and else" /></div></div>
            <div className="w-[31%] rotate-6"><div className={styles.floatFast}><PhoneShot src="/app-screens/coding/04.webp" alt="Swipe Coding: a chapter quiz question" /></div></div>
            <div className="pointer-events-none absolute -left-2 top-0 w-14 sm:-left-8 sm:w-20">
              <Swipey body="#ffffff" face={INK} accent="#22E08A" accentLight="#ffffff" />
            </div>
          </div>
        </div>
        <div className="h-14 lg:h-0" />
      </div>

      <div className="mx-auto max-w-6xl px-1 pt-16 sm:pt-20">
        <AppPlans />
      </div>
    </section>
  );
}

/* ---------------- Note from Colin ---------------- */

function Note() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:py-28">
      <figure className="mx-auto flex max-w-4xl flex-col gap-8 sm:flex-row sm:items-start">
        <div className="w-20 flex-none sm:w-24">
          <Swipey accent="#22E08A" accentLight="#B9F5D6" />
        </div>
        <div>
          <blockquote className="text-[24px] font-bold leading-[1.4] tracking-[-0.01em] sm:text-[30px]">
            &ldquo;We all spend hours a day swiping through social media, and it gets us nowhere. Swipe turns that same swipe into a
            few minutes a day that move you forward.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px]">
            <span style={{ color: MUTED }}>Colin, founder of Swipe</span>
            <Link href="/about" className="font-bold underline decoration-2 underline-offset-[5px] hover:decoration-[#22E08A]">Read the story</Link>
            <Link href="/motivation-experience" className="font-bold underline decoration-2 underline-offset-[5px] hover:decoration-[#22E08A]">Need a push today?</Link>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
