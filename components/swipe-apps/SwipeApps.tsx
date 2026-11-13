import Link from "next/link";
import Swipey from "@/components/home/Swipey";
import AppPlans from "@/components/home/AppPlans";
import styles from "@/components/home/home.module.css";

// The /apps page (2026-11-13): the four apps become ONE app, SwipeFuture, after Apple's 4.3 review.
// No keynote video and no screenshots of the old single apps; only what is already certain,
// written as information without promises. House colour blue, the areas keep their colours.

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

const BLUE = "#0072FE";
const BLUE_DARK = "#0057C2";
const BLUE_TINT = "#E6F0FF";
const BLUE_EDGE = "#B8D4FF";

const AREAS = [
  {
    slug: "coding", name: "Coding", bright: "#22E08A", dark: "#127D4D", tint: "#E7FAF0", light: "#B9F5D6",
    intro: "Programming from your first line of code, with a real code example in every lesson.",
    tracks: ["Python", "JavaScript", "TypeScript", "HTML", "Java", "C#", "C++", "Go", "Rust", "Ship It"],
  },
  {
    slug: "finance", name: "Finance", bright: "#FBBF24", dark: "#B45309", tint: "#FEF5DA", light: "#FDE9A8",
    intro: "Budgeting, investing, credit, taxes and retirement with concrete numbers. Educational only, not financial advice.",
    tracks: ["Money Basics", "Investing Fundamentals", "Stock Market & Trading", "Credit & Debt", "Taxes", "Retirement & FIRE", "Real Estate", "Crypto & Alternative Assets", "Corporate Finance"],
  },
  {
    slug: "growth", name: "Personal Growth", bright: "#FB923C", dark: "#C2410C", tint: "#FFEEDF", light: "#FED2AE",
    intro: "Habits, focus, sleep, stress and confidence as ideas you can try the same day. Not medical advice.",
    tracks: ["Habits & Routines", "Focus & Productivity", "Stress & Resilience", "Sleep", "Fitness & Movement", "Mindset & Confidence", "Relationships", "Purpose & Direction"],
  },
  {
    slug: "ai", name: "AI", bright: "#8B5CF6", dark: "#6D28D9", tint: "#F0EAFE", light: "#D6C8FB",
    intro: "How AI works, how to prompt it well and how to build with it. The app teaches about AI, there is no chatbot inside.",
    tracks: ["AI Fundamentals", "Using AI Tools Well", "Prompt Engineering", "Machine Learning", "Deep Learning", "Building With AI APIs", "AI Agents & Automation", "AI Ethics & Safety"],
  },
] as const;

const CERTAIN = [
  ["Four areas, one app", "Coding, Finance, Personal Growth and AI live in the same app. You switch between them at the top of the screen."],
  ["One account", "Sign up once with email or Sign in with Apple. Your progress in every area belongs to the same profile."],
  ["Free tokens every day", "Lessons cost a few tokens. The free plan refills every day. Go and Pro are optional subscriptions."],
  ["The full tracks", "The website has the first two levels of each track. The app has every level, with quizzes and level tests."],
] as const;

const INSIDE = [
  ["Learning advisor", "A few questions about your goal, then a track and a level to aim for in the area you chose."],
  ["Daily streak", "One lesson a day keeps it going. An evening reminder is optional and off unless you turn it on."],
  ["Stars, XP and levels", "Up to three stars per level, level tests to move on, and your statistics over the weeks."],
  ["Leaderboards", "Compare with other learners, or hide yourself from the leaderboards completely in the settings."],
] as const;

export default function SwipeApps() {
  return (
    <main className="bg-white font-[family-name:var(--font-archivo)]" style={{ color: INK }}>
      {/* ---------- Hero ---------- */}
      <section className="overflow-x-clip px-6 pb-16 pt-28 sm:px-10 sm:pt-36">
        <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <p className="inline-block rounded-lg px-2.5 py-1 text-[14px] font-bold text-white" style={{ background: BLUE }}>Coming soon to the App Store</p>
            <h1 className="mt-6 max-w-4xl text-[44px] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[72px]" style={wide}>
              SwipeFuture.<br />The app is coming.
            </h1>
            <p className="mt-6 max-w-2xl text-[19px] leading-8 text-[#3a3a38]">
              One iPhone app for coding, money, personal growth and AI. Until it is in the App Store, the first two levels of every
              track are free here on the website, no account needed.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <PressLink href="/learn" face={BLUE} edge={BLUE_DARK} className="px-6 py-3.5 text-[16px]">Try a free lesson</PressLink>
              <PressLink href="#areas" face={INK} edge="#000" className="px-6 py-3.5 text-[16px]">What&apos;s inside</PressLink>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="SwipeFuture app icon" width={220} height={220} className="hidden h-[220px] w-[220px] rounded-[50px] lg:block" style={{ boxShadow: `0 8px 0 ${BLUE_EDGE}` }} />
        </div>
      </section>

      {/* ---------- What is already certain ---------- */}
      <section className="px-6 pb-20 sm:px-10 lg:pb-24" aria-labelledby="certain-title">
        <div className="mx-auto max-w-6xl rounded-[30px] p-7 sm:p-10" style={{ background: BLUE_TINT, boxShadow: `0 6px 0 ${BLUE_EDGE}` }}>
          <h2 id="certain-title" className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[40px]" style={wide}>What&apos;s already certain</h2>
          <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {CERTAIN.map(([t, d], k) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[17px] font-extrabold text-white" style={{ background: BLUE, boxShadow: `0 3px 0 ${BLUE_DARK}` }}>{k + 1}</span>
                <div>
                  <h3 className="text-[19px] font-extrabold" style={wide}>{t}</h3>
                  <p className="mt-1.5 text-[16px] leading-7 text-[#3a3a38]">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- The four areas ---------- */}
      <section id="areas" className="scroll-mt-24 bg-[#F6F6F4] px-6 py-20 sm:px-10 lg:py-24" aria-labelledby="areas-title">
        <div className="mx-auto max-w-6xl">
          <h2 id="areas-title" className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[40px]" style={wide}>Four areas in one app</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-[#3a3a38]">Each area keeps its own colour, tracks and advisor. Your account, streak and plan are shared.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {AREAS.map((a) => (
              <article key={a.slug} className="relative overflow-hidden rounded-[26px] bg-white p-6 sm:p-8" style={{ boxShadow: `0 5px 0 ${a.light}` }}>
                <div className="relative z-10 max-w-[78%]">
                  <span className="inline-block rounded-lg px-2.5 py-1 text-[14px] font-bold" style={{ background: a.tint, color: a.dark }}>{a.tracks.length} tracks</span>
                  <h3 className="mt-4 text-[28px] font-extrabold leading-none" style={wide}>{a.name}</h3>
                  <p className="mt-3 text-[16px] leading-7 text-[#3a3a38]">{a.intro}</p>
                </div>
                <ul className="relative z-10 mt-5 flex flex-wrap gap-2">
                  {a.tracks.map((t) => (
                    <li key={t} className="rounded-lg px-2.5 py-1 text-[13px] font-semibold" style={{ background: a.tint, color: a.dark }}>{t}</li>
                  ))}
                </ul>
                <Swipey accent={a.bright} accentLight={a.light} className="pointer-events-none absolute -right-1 top-5 w-[17%] max-w-[90px]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Inside the app ---------- */}
      <section className="px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[40px]" style={wide}>Also inside</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {INSIDE.map(([t, d]) => (
              <div key={t} className="border-t-4 pt-4" style={{ borderColor: BLUE }}>
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
            <span className="rounded-md px-1.5 py-0.5 text-[12px] text-white" style={{ background: BLUE }}>Info</span>
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
            This page describes the SwipeFuture app before its release. It makes no promises about results, and features can change
            before and after the release. The legal details are in the{" "}
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
