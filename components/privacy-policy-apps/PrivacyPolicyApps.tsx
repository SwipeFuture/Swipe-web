"use client";

import { useEffect, useRef, useState } from "react";

// Content mirrors each app's own in-app Privacy Policy (lib/privacyPolicy.js
// in every one of the 4 apps' repos) — this page is the public web copy of
// that same document, not a separate/different policy. Keep the two in sync:
// whenever an app's in-app copy changes, update the matching section here
// too. This is a solid starting draft, not legal advice — have an actual
// lawyer review it before relying on it for a real App Store/Play Store
// submission, especially the children's-privacy section.
//
// Each block is either a paragraph (string) or a bullet list (string array),
// rendered in order so sections can mix prose and lists — same shape as the
// website's own general Privacy Policy component.
const SECTIONS: {
  title: string;
  blocks: (string | string[])[];
  link?: { label: string; href: string };
}[] = [
  {
    title: "Introduction",
    blocks: [
      "This Privacy Policy covers the Swipe app family — Swipe Coding, Swipe Finance, Swipe Personal Growth, and Swipe AI. All four apps share one account and one backend, so this single policy applies to all of them.",
      "This is different from swipefuture.dev's own general Privacy Policy, which covers this website itself, not the apps.",
    ],
  },
  {
    title: "Information We Collect",
    blocks: [
      "Account information: your email address and password, used only to sign you in (your password is hashed and never visible to us).",
      "Sign in with Apple: if you choose to sign in with Apple, Apple shares a unique account identifier and, if you allow it, your name and email address with us. If you choose \"Hide My Email\", we only receive a private relay address from Apple, never your real one. We also keep a sign-in token from Apple, used only to revoke your Apple sign-in for the Swipe apps when you delete your account.",
      "Optional recovery email: a separate email address you can add in Settings, used only to send you a password-reset link if you forget your password.",
      "Optional profile information: display name, bio, avatar photo, country, age group, gender, what you're most interested in learning, and one just-for-fun preference question — you choose whether to provide any of this, and gender/age/interest/preference answers are used only for anonymous, aggregated statistics, never shown to other users.",
      "Learning data: which lessons, quizzes, and tests you have completed in each app, your XP, and your daily streak.",
      "Plan and usage data: which plan you're on (Free or a paid plan) and how many daily lesson tokens you have left, used only to apply that plan's daily limit.",
      "App usage time: how much time you spend with each Swipe app open in the foreground, and how often you open it, totaled per month. We do not record what you tap, type, or look at — only these two totals.",
    ],
  },
  {
    title: "How We Use Your Information",
    blocks: [
      "To run your account and keep your learning progress in sync across the app(s) you use.",
      "To personalize your profile and certificate.",
      "To apply your plan's daily lesson-token limit and let you switch plans.",
      "To show you your own usage statistics, such as how much time you've spent learning with Swipe over a month or a year. Your usage time is only ever shown to you, never to other users.",
      "To send you a password-reset link if you request one, and a one-time confirmation link when you add a recovery email.",
      "To send you an optional streak-reminder notification if you turn that on in Settings — this is scheduled on your own device and does not involve sending your data anywhere.",
      "We do not use your data for advertising, do not build advertising profiles from it, and do not sell it to anyone.",
    ],
  },
  {
    title: "Public Leaderboard & Other Users",
    blocks: [
      "Each app includes a leaderboard and name search so you can see how you compare to other users. If you have a profile, your display name, avatar photo, country, bio, badges, and your level/streak/progress in each Swipe app are visible to other signed-in Swipe users through this leaderboard and search — that is how these features work.",
      "Your email address, recovery email, password, plan/billing status, survey answers, and app usage time are never shown to any other user, on the leaderboard or anywhere else.",
      "You can turn this off completely at any time in Settings → Privacy → \"Hide From Leaderboard\" — this does not just remove you from the leaderboard rankings, it removes you from name search too and stops anyone from viewing your public profile at all, at every rank, for every query. With that setting on, it is the same as never having had a public profile in the first place, and you can turn it back off again whenever you want.",
      "You can change or clear your display name, avatar, bio, and country at any time in your profile, and permanently removing your account (Settings → Delete Account) also permanently removes you from the leaderboard and search.",
    ],
  },
  {
    title: "Educational Content, Not Financial Advice",
    blocks: [
      "Swipe Finance, one of the four apps in this family, is an educational app. Everything in it — lessons, quizzes, the Money Advisor, and every other feature — is provided for general informational and educational purposes only, to help you understand financial concepts. It is not financial, investment, tax, legal, or other professional advice, and it is not a personalized recommendation to buy, sell, or hold any security, cryptocurrency, or other asset.",
      "Tax and retirement content in particular describes general concepts only, since exact rules vary by country and change over time — always check your own country's current rules or a qualified professional before acting on them.",
      "We do not know your personal financial situation, and nothing in Swipe Finance should be treated as a substitute for advice from a licensed financial advisor, tax professional, or attorney. Investing and trading involve risk, including the possible loss of money; past performance shown in any example does not guarantee future results. You are solely responsible for any financial decisions you make.",
    ],
  },
  {
    title: "Subscriptions & Payment",
    blocks: [
      "Go and Pro are auto-renewable subscriptions bought through the Apple App Store. All payment is handled entirely by Apple — we never see, receive, or store your card details or any other payment information. We only store which plan you're currently on, so the app can apply the right daily token limit in all four apps.",
      "We use RevenueCat, a subscription-management service, to verify purchases and keep your plan in sync across the four apps. RevenueCat receives your Swipe account ID (a random identifier) and your App Store purchase records for the Swipe apps — which plan, when it was bought, renewed, or cancelled — but never your name, email address, or payment details.",
      "Managing or cancelling a subscription is done in your Apple ID subscription settings, not within any Swipe app.",
    ],
  },
  {
    title: "Where Your Data Is Stored",
    blocks: [
      "Your data is stored with Supabase, the third-party backend provider that hosts our database, authentication, and file storage.",
      "Password-reset and recovery-email confirmation emails are sent through Brevo, a third-party email delivery provider. Brevo only receives the address the email is sent to and the email itself, solely to deliver it.",
      "Subscription purchase records are processed by RevenueCat, as described in \"Subscriptions & Payment\" above.",
      "If you sign in with Apple, Apple handles that sign-in under its own privacy policy; when you delete your account, we ask Apple to revoke the Swipe apps' access to your Apple ID.",
      "We do not share your data with any other third party.",
    ],
  },
  {
    title: "Your Choices",
    blocks: [
      "You can edit or remove most profile fields (including your display name, avatar, bio, and country — everything shown on the leaderboard) at any time in the app.",
      "You can hide your profile from the leaderboard and search entirely, making it completely private, at any time in Settings → Privacy → \"Hide From Leaderboard\" — see \"Public Leaderboard & Other Users\" above for exactly what this does.",
      "You can report or block another user directly from their profile if their content is inappropriate; reported profiles are reviewed and can be removed.",
      "You can upgrade your plan in the app, and change or cancel a subscription at any time in your Apple ID subscription settings.",
      "You can turn streak-reminder notifications and lesson sounds on or off at any time in Settings.",
      "You can permanently delete your account and everything tied to it, including removing yourself from the leaderboard and search, at any time via Settings → Delete Account — this cannot be undone.",
    ],
  },
  {
    title: "Children's Privacy",
    blocks: [
      "The Swipe apps are intended for a general audience and are not directed at children under 13 without the involvement of a parent or guardian.",
    ],
  },
  {
    title: "Changes to This Policy",
    blocks: [
      "We may update this policy from time to time. Continuing to use an app after a change means you accept the updated policy.",
    ],
  },
  {
    title: "Contact",
    blocks: ["Questions about this policy? Reach out via swipefuture.dev."],
    link: { label: "Get in touch", href: "/contact" },
  },
];

export default function PrivacyPolicyApps() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as the rest of the site
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - sectionCenter;
          setParallax(distance * 0.06);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const cardObserver = new IntersectionObserver(
      ([entry]) => setCardVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (cardRef.current) cardObserver.observe(cardRef.current);

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="privacy-policy-apps"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-44 scroll-mt-24"
    >

      {/* ================= Background — same premium green language as the general Privacy Policy page ================= */}

      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-gray-50 to-green-50" />

      <div
        className="absolute inset-0 -z-40 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="absolute -top-10 -left-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-green-300 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.16] animate-pulse" />

        <div className="hidden sm:block absolute top-1/3 right-0 w-[280px] h-[280px] lg:w-[500px] lg:h-[500px] rounded-full bg-emerald-200 blur-[110px] lg:blur-[170px] opacity-[0.16] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gray-200 blur-[160px] opacity-20 -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

      </div>

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-gray-200/50" />

        <div className="hidden lg:block absolute left-10 bottom-20 w-[380px] h-[380px] rounded-full border border-green-200/50" />

      </div>

      <div className="hidden sm:block absolute top-24 left-8 lg:top-32 lg:left-40 w-3 h-3 rounded-full bg-green-500 shadow-xl animate-bounce" />

      <div className="hidden sm:block absolute bottom-40 right-16 w-2 h-2 rounded-full bg-black/40" />

      <div className="hidden lg:block absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-green-400 animate-pulse" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >

        <div className="hidden lg:block absolute top-20 right-[14%] w-16 h-16 rounded-[22px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />

        <div className="hidden lg:block absolute bottom-24 left-[10%] w-12 h-12 rounded-2xl bg-green-100/60 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />

      </div>

      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-12" />

      {/* Top / Bottom Fade — thin white sliver at each edge, matching the Navbar above and Footer below */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}

        <div
          ref={headerRef}
          className={`relative text-center transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          {/* Decorative liquid-glass image, tucked behind the header on larger screens */}
          <div className="hidden lg:block absolute -top-16 -right-16 w-56 h-56 rotate-6 opacity-90">
            <div className="absolute inset-4 rounded-full bg-green-300 blur-[80px] opacity-40 -z-10" />
            <img
              src="/liquid-glass-drei.png"
              alt=""
              className="w-full h-full object-cover rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-white/70"
            />
          </div>

          <div className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />

            <div className="relative w-2 h-2 rounded-full bg-green-500 animate-pulse" />

            <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-gray-600">
              Legal — Apps
            </span>

          </div>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-black">
            Privacy Policy{" "}
            <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
              for the Apps
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-gray-400">
            Last updated: September 29, 2026
          </p>

          <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-2xl mx-auto">
            This page covers Swipe Coding, Swipe Finance, Swipe Personal
            Growth, and Swipe AI — the four apps that share one Swipe
            account. Here&apos;s a clear, straightforward explanation of what
            data we collect, why we collect it, and how you stay in control.
          </p>

        </div>

        {/* Policy Card */}

        <div
          ref={cardRef}
          className={`relative mt-14 sm:mt-16 lg:mt-20 transition-all duration-1000 ease-out ${
            cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/70 bg-white/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl">

            <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

            <div className="relative divide-y divide-gray-200/70">

              {SECTIONS.map((section, i) => (
                <div key={section.title} className={i === 0 ? "pb-8 sm:pb-10" : "py-8 sm:py-10"}>

                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
                    {section.title}
                  </h2>

                  <div className="mt-3 space-y-3">
                    {section.blocks.map((block, j) =>
                      Array.isArray(block) ? (
                        <ul key={j} className="list-disc space-y-1.5 pl-5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                          {block.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j} className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                          {block}
                        </p>
                      )
                    )}
                  </div>

                  {section.link && (
                    <a
                      href={section.link.href}
                      className="group/link mt-3 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-green-700 transition-colors duration-300 hover:text-green-800"
                    >
                      {section.link.label}
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
