import Link from "next/link";
import AboutStory from "./AboutStory";
import Swipey from "@/components/home/Swipey";

// The /about page (2026-11-10 design): a short header, Colin's own story (AboutStory, unchanged
// text), the four areas in their app colours and a plain way to start. The old mission/vision
// sections were slogans that would fit any competitor, so they are gone.

const AREAS = [
  { name: "Coding", href: "/coding", bright: "#22E08A", dark: "#127D4D", tint: "#E7FAF0", light: "#B9F5D6", text: "From your first line of code to shipping your own website, in nine languages plus a track about publishing." },
  { name: "Finance", href: "/finance", bright: "#FBBF24", dark: "#B45309", tint: "#FEF5DA", light: "#FDE9A8", text: "Budgeting, saving, credit, taxes and investing, explained with real numbers. Educational, not financial advice." },
  { name: "Personal Growth", href: "/personal-growth", bright: "#FB923C", dark: "#C2410C", tint: "#FFEEDF", light: "#FED2AE", text: "Habits, focus, sleep and stress as small ideas you can try the same day. Educational, not medical advice." },
  { name: "AI", href: "/ai", bright: "#8B5CF6", dark: "#6D28D9", tint: "#F0EAFE", light: "#D6C8FB", text: "How AI works, how to prompt it well and how to build with it, without the hype." },
] as const;

export default function About() {
  return (
    <main className="bg-white px-6 pb-24 pt-28 text-[#121212] sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-lg bg-[#E6F0FF] px-2.5 py-1 text-[14px] font-bold text-[#0057C2]">About</span>
          <h1 className="mt-5 text-[40px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[60px]">About SwipeFuture</h1>
          <p className="mt-6 text-[19px] leading-8 text-[#3a3a38]">
            SwipeFuture makes short lessons and free tools for coding, money, personal growth and AI. One idea per lesson, a quick check
            after it, and nothing to sign up for on the website.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <AboutStory />
        </div>

        <section className="mt-24" aria-labelledby="areas-title">
          <h2 id="areas-title" className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[42px]">The four areas</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {AREAS.map((a) => (
              <Link
                key={a.name}
                href={a.href}
                className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-[26px] p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8"
                style={{ background: a.tint, boxShadow: `0 5px 0 ${a.light}` }}
              >
                <span className="relative z-10 max-w-[70%] text-[26px] font-extrabold leading-none" style={{ fontStretch: "125%" }}>{a.name}</span>
                <span className="relative z-10 mt-3 max-w-[70%] text-[16px] leading-7 text-[#3a3a38]">{a.text}</span>
                <span className="relative z-10 mt-auto pt-5 text-[15px] font-bold" style={{ color: a.dark }}>See the {a.name} lessons →</span>
                <Swipey accent={a.bright} accentLight={a.light} className="pointer-events-none absolute -bottom-3 -right-1 w-[22%] max-w-[120px]" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24 max-w-3xl border-t-2 border-[#ececea] pt-10">
          <h2 className="text-[28px] font-extrabold leading-tight sm:text-[36px]">Try one lesson.</h2>
          <p className="mt-4 text-[18px] leading-8 text-[#3a3a38]">It takes about five minutes. If it isn&apos;t for you, nothing is lost.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/learn" className="inline-block rounded-xl bg-[#121212] px-7 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]">Start a free lesson</Link>
            <Link href="/advisor" className="text-[17px] font-bold underline decoration-2 underline-offset-[6px] hover:decoration-[#0072FE]">Find my path</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
