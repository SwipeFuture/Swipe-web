"use client";

import Link from "next/link";
import { type ShowcaseApp } from "@/components/app-showcase/AppShowcase";
import AppDetail from "./AppDetail";

// The /apps page: everything about the four Swipe apps in one place —
// what they are, how they work, plans, privacy, FAQ, and each app's full
// details (icons, screenshots, tracks) in its own layout (AppDetail).

const APPS: { slug: ShowcaseApp; name: string; tagline: string; glow: string; text: string }[] = [
  { slug: "coding", name: "Swipe Coding", tagline: "Learn to code", glow: "bg-green-400", text: "text-green-700" },
  { slug: "finance", name: "Swipe Finance", tagline: "Master your money", glow: "bg-amber-400", text: "text-amber-700" },
  { slug: "growth", name: "Swipe Personal Growth", tagline: "Build better habits", glow: "bg-orange-400", text: "text-orange-700" },
  { slug: "ai", name: "Swipe AI", tagline: "Understand AI", glow: "bg-violet-400", text: "text-violet-700" },
];

const HOW_IT_WORKS = [
  {
    icon: "👆",
    title: "Swipe through short lessons",
    text: "Every lesson explains one idea at a time in a few swipes, with examples and quick questions along the way.",
  },
  {
    icon: "🧭",
    title: "Get a personal plan",
    text: "Each app has its own advisor: answer a few questions and get the track, the target level and a realistic timeline.",
  },
  {
    icon: "🔥",
    title: "Stay on track",
    text: "Stars, XP, levels, daily streaks, tags to collect and leaderboards keep you coming back, plus an optional evening reminder.",
  },
  {
    icon: "🔗",
    title: "One account for everything",
    text: "Sign up once with email or Sign in with Apple. Your profile, progress and plan work in all four apps.",
  },
];

const PLANS = [
  { name: "Free", price: "$0, always", detail: "500 tokens every day, about 5 lessons", highlight: false },
  { name: "Go", price: "$3.99 / month or $34.99 / year", detail: "1,000 tokens every day, about 10 lessons", highlight: true },
  { name: "Pro", price: "$12.99 / month or $99.99 / year", detail: "No daily limit at all", highlight: false },
];

const FAQ = [
  {
    q: "Are the apps free?",
    a: "Yes. All four apps are free to download, and the free plan gives you about five new lessons every day. Replaying lessons you've already opened is always free. Go and Pro are optional subscriptions for more.",
  },
  {
    q: "Do I need four accounts?",
    a: "No. One Swipe account works in all four apps, and a Go or Pro plan counts in all of them at once.",
  },
  {
    q: "Which devices are supported?",
    a: "The Swipe apps are made for iPhone and available on the App Store from October 21, 2026.",
  },
  {
    q: "How do I cancel a subscription?",
    a: "Subscriptions are handled by Apple. You can manage or cancel them anytime in your Apple ID settings, or from the plans screen in the app. Cancel at least 24 hours before the end of the current period to avoid renewal.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes, directly in the app under Settings → Delete Account. Your account and its data are deleted right away.",
  },
  {
    q: "Is Swipe Finance or Swipe Personal Growth professional advice?",
    a: "No. All apps are educational. Swipe Finance doesn't give financial, investment, tax or legal advice, and Swipe Personal Growth is not medical or psychological advice.",
  },
];

export default function SwipeApps() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="hidden sm:block absolute -left-40 top-20 w-[28rem] h-[28rem] rounded-full bg-amber-100 blur-[150px] opacity-70" />
      <div className="hidden sm:block absolute -right-40 top-[40rem] w-[28rem] h-[28rem] rounded-full bg-violet-100 blur-[150px] opacity-70" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-24 sm:pb-32">

        {/* ---------- Hero ---------- */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-stone-600">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Coming to the App Store · October 21, 2026
          </span>
          <h1 className="mt-6 sm:mt-8 text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-[-0.04em] text-stone-800">
            The Swipe{" "}
            <span className="bg-gradient-to-r from-stone-800 via-amber-700 to-amber-500 bg-clip-text text-transparent">
              Apps
            </span>
          </h1>
          <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl leading-7 sm:leading-9 text-stone-500">
            Four learning apps for iPhone: coding, money, personal growth and AI. Short, swipeable lessons,
            a personal advisor and one account for all of them.
          </p>

          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {APPS.map((app) => (
              <a
                key={app.slug}
                href={`#${app.slug}`}
                className="group flex flex-col items-center rounded-[28px] border border-stone-200/80 bg-white/70 backdrop-blur-xl px-4 py-6 sm:py-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative">
                  <div className={`absolute inset-0 rounded-[24px] ${app.glow} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                  <img
                    src={`/logo-${app.slug}-black.png`}
                    alt={`${app.name} app icon`}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] sm:rounded-[26px] object-cover shadow-lg"
                  />
                </div>
                <div className="mt-4 text-sm sm:text-base font-bold text-stone-800">{app.name}</div>
                <div className={`mt-1 text-xs sm:text-sm font-medium ${app.text}`}>{app.tagline} ↓</div>
              </a>
            ))}
          </div>
        </div>

        {/* ---------- How it works ---------- */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">How it works</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-800">
              Learning that fits into your day
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-stone-200/80 bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-stone-50 border border-white text-2xl shadow-sm">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg sm:text-xl font-bold text-stone-800">{item.title}</h3>
                <p className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-stone-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Plans ---------- */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Plans</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-800">
              Free to start. One plan for all four apps.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-7 text-stone-500">
              Opening a new lesson uses 100 tokens, a quiz or level test 200. Replaying anything you've already opened is always free.
            </p>
          </div>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-[28px] border p-6 sm:p-8 shadow-sm ${
                  plan.highlight ? "border-amber-300 bg-amber-50/70" : "border-stone-200/80 bg-white/70"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute top-5 right-5 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Popular
                  </span>
                )}
                <div className="text-2xl font-black text-stone-800">{plan.name}</div>
                <div className="mt-2 text-sm sm:text-base font-semibold text-stone-700">{plan.price}</div>
                <div className="mt-3 text-sm text-stone-500">{plan.detail}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs sm:text-sm text-stone-400">
            US prices shown; the App Store shows the price in your local currency. Go and Pro are auto-renewable subscriptions
            and can be cancelled anytime in your Apple ID settings.
          </p>
        </div>

        {/* ---------- Each app in detail ---------- */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">The apps</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-800">
              Every app in detail
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 flex flex-col gap-12 sm:gap-16">
            {APPS.map((app, i) => (
              <div key={app.slug} id={app.slug} className="scroll-mt-28">
                <AppDetail app={app.slug} flip={i % 2 === 1} />
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Privacy & safety ---------- */}
        <div className="mt-24 sm:mt-32 rounded-[32px] sm:rounded-[40px] border border-stone-200/80 bg-stone-50/80 p-6 sm:p-10 lg:p-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Privacy & safety</span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-800">
            Your data stays yours
          </h2>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm sm:text-base leading-7 text-stone-600">
            <li>✓ No ads and no third-party tracking</li>
            <li>✓ Data stored on servers in the EU (Ireland)</li>
            <li>✓ Delete your account anytime, right in the app</li>
            <li>✓ Report and block anyone, with zero tolerance for abuse</li>
            <li>✓ Payments handled securely by Apple</li>
            <li>✓ No AI chatbot and no data shared with AI providers</li>
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/privacy-policy-apps"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Privacy Policy for the apps →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-stone-700 transition-colors duration-300 hover:bg-stone-100"
            >
              Contact & support
            </Link>
          </div>
        </div>

        {/* ---------- FAQ ---------- */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-800">
              Good to know
            </h2>
          </div>
          <div className="mt-10 sm:mt-14 max-w-3xl mx-auto flex flex-col gap-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-stone-200/80 bg-white/70 px-5 sm:px-6 py-4 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-bold text-stone-800">
                  {item.q}
                  <span className="text-stone-400 transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm sm:text-base leading-7 text-stone-500">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
