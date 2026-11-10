import Link from "next/link";
import Swipey from "@/components/home/Swipey";
import PhoneShot from "@/components/home/PhoneShot";
import AppPlans from "@/components/home/AppPlans";
import styles from "@/components/home/home.module.css";

// The /apps page in the 2026-11-10 design (same rules as the homepage: white, the four app
// colours at full strength, Archivo, chunky buttons, real app screens instead of decoration).
// It describes the apps; it doesn't sell anything and makes no promises.

const INK = "#121212";
const MUTED = "#5c5c58";
const wide = { fontStretch: "125%" } as const;
const EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

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

const APPS = [
  {
    slug: "coding", name: "Swipe Coding", bright: "#22E08A", dark: "#127D4D", tint: "#E7FAF0", light: "#B9F5D6", learn: "/learn",
    intro: "Programming from your very first line of code. Each lesson explains one idea with a real code example, then checks it with a quick question. Every chapter ends with a quiz.",
    advisor: "Code Advisor: a few questions, then a path with the language, the target level and how long it takes at your pace.",
    tracks: [["Python", 20], ["JavaScript", 20], ["TypeScript", 20], ["HTML", 20], ["Java", 20], ["C#", 20], ["C++", 20], ["Go", 20], ["Rust", 20], ["Ship It", 9]],
    screens: [["01", "Your learning path"], ["02", "A lesson with real code"], ["04", "A chapter quiz"]],
  },
  {
    slug: "finance", name: "Swipe Finance", bright: "#FBBF24", dark: "#B45309", tint: "#FEF5DA", light: "#FDE9A8", learn: "/learn",
    intro: "Budgeting, investing, credit, taxes and retirement, explained with concrete numbers and everyday examples. Educational only, not financial advice.",
    advisor: "Money Advisor: tell it your goal, like getting out of debt or saving for later, and get a matching track and timeline.",
    tracks: [["Money Basics", 10], ["Investing Fundamentals", 10], ["Stock Market & Trading", 10], ["Credit & Debt", 10], ["Taxes", 10], ["Retirement & FIRE", 10], ["Real Estate", 10], ["Crypto & Alternative Assets", 10], ["Corporate Finance", 10]],
    screens: [["01", "Your learning path"], ["02", "A money lesson"], ["06", "Money Advisor"]],
  },
  {
    slug: "growth", name: "Swipe Personal Growth", bright: "#FB923C", dark: "#C2410C", tint: "#FFEEDF", light: "#FED2AE", learn: "/learn",
    intro: "Habits, focus, sleep, stress and confidence, as practical ideas you can try the same day. Educational only, not medical or psychological advice.",
    advisor: "Growth Advisor: share what you want to improve and get the track that fits the time you really have.",
    tracks: [["Habits & Routines", 10], ["Focus & Productivity", 10], ["Stress & Resilience", 10], ["Sleep", 10], ["Fitness & Movement", 10], ["Mindset & Confidence", 10], ["Relationships", 10], ["Purpose & Direction", 10]],
    screens: [["01", "Your learning path"], ["04", "A lesson"], ["05", "Growth Advisor"]],
  },
  {
    slug: "ai", name: "Swipe AI", bright: "#8B5CF6", dark: "#6D28D9", tint: "#F0EAFE", light: "#D6C8FB", learn: "/learn",
    intro: "What AI is and how it works, how to prompt it well, and how to build with it. The app teaches about AI and has no AI chatbot inside.",
    advisor: "AI Advisor: whether you want to use AI better or build with it, you get the track and a timeline at your pace.",
    tracks: [["AI Fundamentals", 10], ["Using AI Tools Well", 10], ["Prompt Engineering", 10], ["Machine Learning", 10], ["Deep Learning", 10], ["Building With AI APIs", 10], ["AI Agents & Automation", 10], ["AI Ethics & Safety", 10]],
    screens: [["01", "Your learning path"], ["02", "An AI lesson"], ["04", "A chapter quiz"]],
  },
] as const;

const SHARED = [
  ["A daily streak", "Keep it alive with one lesson a day. An optional evening reminder helps, and you decide if you want it."],
  ["Stars, XP and levels", "Up to three stars per level, level tests to move on, and your statistics over the weeks."],
  ["Leaderboards", "Compare with other learners, or hide yourself from the leaderboard completely in the settings."],
  ["One account for all four", "Sign up once with email or Sign in with Apple. Your profile and plan work in every Swipe app."],
] as const;

export default function SwipeApps() {
  return (
    <main className="bg-white font-[family-name:var(--font-archivo)]" style={{ color: INK }}>
      {/* ---------- Hero ---------- */}
      <section className="overflow-x-clip px-6 pb-16 pt-28 sm:px-10 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="inline-block rounded-lg bg-[#22E08A] px-2.5 py-1 text-[14px] font-bold">Coming soon to the App Store</p>
          <h1 className="mt-6 max-w-4xl text-[44px] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[72px]" style={wide}>
            Four apps. One Swipe account.
          </h1>
          <p className="mt-6 max-w-2xl text-[19px] leading-8 text-[#3a3a38]">
            The website has the first two levels of every track. The iPhone apps have all of them, with quizzes, level tests, a
            learning advisor, your statistics and a daily streak.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <PressLink href="#keynote" face={INK} edge="#000" className="px-6 py-3.5 text-[16px]">Watch the keynote</PressLink>
            <PressLink href="/learn" face="#22E08A" edge="#127D4D" text={INK} className="px-6 py-3.5 text-[16px]">Try a free lesson</PressLink>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {APPS.map((a) => (
              <li key={a.slug}>
                <a href={`#${a.slug}`} className={`${styles.tile} group flex h-full flex-col rounded-[26px] p-5 transition-transform hover:-translate-y-1`} style={{ background: a.tint, boxShadow: `0 5px 0 ${a.light}` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/logo-${a.slug}-black.png`} alt="" width={72} height={72} className="h-16 w-16 rounded-[18px] sm:h-[72px] sm:w-[72px]" />
                  <span className="mt-4 text-[19px] font-extrabold leading-tight" style={wide}>{a.name}</span>
                  <span className="mt-1 text-[14px] font-bold" style={{ color: a.dark }}>{a.tracks.length} tracks ↓</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Keynote ---------- */}
      <section id="keynote" className="scroll-mt-24 px-6 sm:px-10" aria-labelledby="keynote-title">
        {/* the keynote is a 9:16 phone video, so it sits beside the text instead of filling the width */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[36px] p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14" style={{ background: INK }}>
          <video
            className="mx-auto block aspect-[9/16] w-full max-w-[360px] rounded-[26px] bg-black"
            src="/video/swipe-keynote.mp4"
            poster="/video/swipe-keynote-poster.webp"
            controls
            playsInline
            preload="metadata"
          />
          <div>
            <h2 id="keynote-title" className="text-[34px] font-extrabold leading-none tracking-[-0.02em] sm:text-[52px]" style={wide}>The Swipe keynote</h2>
            <p className="mt-5 max-w-md text-[18px] leading-8 text-white/75">
              35 seconds, all four apps: the learning path, a lesson, a chapter quiz and the advisor, filmed straight from the app.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {APPS.map((a) => (
                <li key={a.slug} className="rounded-xl px-3 py-1.5 text-[14px] font-bold" style={{ background: a.bright, color: INK }}>{a.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Each app ---------- */}
      {APPS.map((a, i) => (
        <section key={a.slug} id={a.slug} className="scroll-mt-24 px-6 py-20 sm:px-10 lg:py-28" style={{ background: i % 2 ? "#F6F6F4" : "#fff" }} aria-labelledby={`${a.slug}-title`}>
          <div className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logo-${a.slug}-black.png`} alt="" width={64} height={64} className="h-16 w-16 rounded-[18px]" />
                <h2 id={`${a.slug}-title`} className="text-[32px] font-extrabold leading-none tracking-[-0.02em] sm:text-[44px]" style={wide}>{a.name}</h2>
              </div>
              <p className="mt-6 text-[18px] leading-8 text-[#3a3a38]">{a.intro}</p>
              <p className="mt-4 rounded-2xl px-4 py-3 text-[16px] leading-7" style={{ background: a.tint }}>
                <b style={{ color: a.dark }}>{a.advisor.split(":")[0]}:</b>{a.advisor.slice(a.advisor.indexOf(":") + 1)}
              </p>
              <h3 className="mt-8 text-[15px] font-bold" style={{ color: MUTED }}>Tracks in the app</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.tracks.map(([t, levels]) => (
                  <li key={t} className="rounded-xl border-2 px-3 py-1.5 text-[14px] font-bold" style={{ borderColor: a.light }}>
                    {t} <span style={{ color: a.dark }}>{levels} levels</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PressLink href={a.learn} face={a.bright} edge={a.dark} text={INK} className="px-6 py-3.5 text-[16px]">Try the free levels</PressLink>
                <span className="text-[15px]" style={{ color: MUTED }}>Coming soon to the App Store</span>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[520px] items-end justify-center gap-3 sm:gap-4">
              {a.screens.map(([n, label], k) => (
                <div key={n} className={k === 0 ? "w-[31%] -rotate-6" : k === 1 ? "w-[36%] -translate-y-8" : "w-[31%] rotate-6"}>
                  <div className={k === 0 ? styles.floatSlow : k === 1 ? styles.float : styles.floatFast}>
                    <PhoneShot src={`/app-screens/${a.slug}/${n}.webp`} alt={`${a.name}: ${label}`} />
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute -top-6 w-14 sm:w-16" style={i % 2 ? { right: -8 } : { left: -8 }}>
                <Swipey accent={a.bright} accentLight={a.light} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ---------- What every app has ---------- */}
      <section className="px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[40px]" style={wide}>In every Swipe app</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {SHARED.map(([t, d], k) => (
              <div key={t} className="border-t-4 pt-4" style={{ borderColor: APPS[k].bright }}>
                <dt className="text-[18px] font-extrabold" style={wide}>{t}</dt>
                <dd className="mt-2 text-[15px] leading-7" style={{ color: MUTED }}>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Plans + notes ---------- */}
      <section className="bg-[#F6F6F4] px-6 py-20 sm:px-10 lg:py-24" aria-label="Plans">
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex flex-wrap items-center gap-2 rounded-xl border-2 border-[#dcdcd8] bg-white px-3.5 py-2 text-[14px] font-bold">
            <span className="rounded-md bg-[#121212] px-1.5 py-0.5 text-[12px] text-white">Info</span>
            Subscriptions are sold and handled by Apple. This is information, not a recommendation to buy.
          </p>
          <div className="mt-8">
            <AppPlans headingLevel="h2" />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-6xl border-t-2 border-[#ececea] pt-8 text-[15px] leading-7" style={{ color: MUTED }}>
          <p>
            This page describes the Swipe apps. It makes no promises about results, and features can change before and after the
            release. The legal details are in the{" "}
            <Link href="/privacy-policy-apps" className="font-bold text-[#121212] underline decoration-2 underline-offset-4">App Privacy Policy</Link>{" "}
            and in{" "}
            <a href={EULA} target="_blank" rel="noopener noreferrer" className="font-bold text-[#121212] underline decoration-2 underline-offset-4">Apple&apos;s terms for apps</a>.
            Questions? <Link href="/contact" className="font-bold text-[#121212] underline decoration-2 underline-offset-4">Contact us</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
