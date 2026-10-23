import Link from "next/link";
import { appLessons, learnAppUrl } from "@/lib/learn-links";

const AREAS = [
  { app: "coding", emoji: "💻", name: "Coding", text: "Python, JavaScript, HTML and 6 more languages.", accent: "text-green-700" },
  { app: "finance", emoji: "💰", name: "Finance", text: "Budgeting, investing, credit and taxes.", accent: "text-amber-700" },
  { app: "growth", emoji: "🌱", name: "Personal Growth", text: "Habits, focus, mindset and sleep.", accent: "text-emerald-700" },
  { app: "ai", emoji: "🤖", name: "AI", text: "How AI works and how to use it well.", accent: "text-violet-700" },
] as const;

const TOTAL_LESSONS = AREAS.reduce((n, a) => n + appLessons(a.app), 0);

export default function Hero() {
  return (
    <section id="home" className="relative lg:min-h-[100dvh] overflow-hidden bg-white scroll-mt-24">

      {/* ================= Background ================= */}

      {/* Mesh Gradient — vertical, so top and bottom edges are a flat, predictable color across the full width */}
      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-gray-50 to-green-50" />

      {/* Grid */}
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

      {/* Glow 1 — pulled well down from the corner so its own blur fades out naturally before reaching the top edge, instead of a pinned overlay faking the transition */}
      <div className="absolute top-24 -left-20 w-[350px] h-[350px] sm:top-32 sm:w-[500px] sm:h-[500px] lg:top-48 lg:-left-40 lg:w-[700px] lg:h-[700px] rounded-full bg-green-300 blur-[100px] sm:blur-[140px] lg:blur-[170px] opacity-20 animate-pulse" />

      {/* Glow 2 */}
      <div className="absolute top-16 right-0 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:top-32 lg:w-[600px] lg:h-[600px] rounded-full bg-emerald-200 blur-[100px] sm:blur-[140px] lg:blur-[180px] opacity-25" />

      {/* Glow 3 */}
      <div className="absolute bottom-0 left-1/2 w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-gray-200 blur-[90px] sm:blur-[120px] lg:blur-[160px] opacity-40" />

      {/* Big Circle */}
      <div className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-gray-200/50" />

      <div className="hidden md:block absolute -right-32 top-40 w-[380px] h-[380px] lg:-right-56 lg:w-[650px] lg:h-[650px] rounded-full border border-gray-200/40" />

      <div className="hidden md:block absolute right-0 top-56 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full border border-gray-200/40" />

      {/* Floating Dots */}

      <div className="hidden sm:block absolute top-24 left-8 lg:top-32 lg:left-40 w-3 h-3 rounded-full bg-green-500 shadow-xl animate-bounce" />

      <div className="hidden sm:block absolute top-60 right-16 lg:top-80 lg:right-80 w-2 h-2 rounded-full bg-black/40" />

      <div className="hidden sm:block absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-green-400" />

      <div className="hidden sm:block absolute top-40 right-10 lg:top-52 lg:right-32 w-4 h-4 rounded-full bg-white shadow-lg border border-gray-200" />

      {/* ================= Content ================= */}

      {/* First screen answers three questions at a glance: what is this (free 5-minute lessons
          in four areas), is it for me (no sign-up, beginner-friendly), where do I click (start a
          lesson, let the advisor choose, get an overview, or pick one of the area cards below). */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-36 pb-16 lg:pb-20">

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 lg:gap-8">

          {/* Left */}

          <div className="max-w-2xl text-center lg:text-left">

            <div className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />

              <div className="relative w-2 h-2 rounded-full bg-green-500 animate-pulse" />

              <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-gray-600">
                {TOTAL_LESSONS} free lessons · no sign-up
              </span>

            </div>

            <h1 className="mt-8 sm:mt-10 text-[44px] sm:text-[60px] md:text-[76px] lg:text-[95px] font-black leading-[0.95] lg:leading-[0.9] tracking-[-0.04em] lg:tracking-[-0.06em] text-black">

              Build
              <br />

              <span className="relative inline-block bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">

                Your Future

                <div className="absolute -bottom-2 lg:-bottom-3 left-2 w-32 sm:w-44 lg:w-52 h-3 lg:h-4 bg-green-300/50 blur-sm rounded-full" />

              </span>

            </h1>

            <p className="mt-6 sm:mt-8 lg:mt-10 text-base sm:text-xl lg:text-2xl leading-7 sm:leading-9 lg:leading-10 text-gray-500 max-w-xl mx-auto lg:mx-0">

              Learn <strong className="font-semibold text-gray-800">coding, money, personal growth and AI</strong> in
              short lessons of about five minutes — free, right here in your browser.

            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-10 lg:mt-12 justify-center lg:justify-start">

              <Link
                href="/learn"
                className="group relative overflow-hidden rounded-full bg-black text-white px-7 py-4 sm:px-8 text-center font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(34,197,94,0.5)]"
              >

                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-20 transition-all" />

                <span className="relative">
                  Start a free lesson →
                </span>

              </Link>

              <Link
                href="/advisor"
                className="rounded-full border border-gray-200 bg-white/80 px-7 py-4 sm:px-8 text-center font-semibold text-gray-800 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Not sure? Find your path
              </Link>

            </div>

            <p className="mt-5 text-xs sm:text-sm font-medium text-gray-400">
              No account · beginner-friendly · quiz after every chapter
            </p>

          </div>

          {/* Right */}

          <div className="max-lg:hidden relative w-full max-w-[340px] h-[340px] sm:max-w-[420px] sm:h-[420px] md:max-w-[500px] md:h-[500px] lg:w-[560px] lg:h-[560px] lg:max-w-none flex items-center justify-center">

            {/* Main Glow */}

            <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[480px] lg:h-[480px] rounded-full bg-green-300 blur-[90px] sm:blur-[110px] lg:blur-[140px] opacity-40" />

            {/* Spinning Accent Ring */}

            <div className="hidden sm:block absolute w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[430px] md:h-[430px] lg:w-[540px] lg:h-[540px] rounded-full border border-dashed border-green-400/30 animate-[spin_30s_linear_infinite]" />

            {/* Glass Ring */}

            <div className="absolute w-[230px] h-[230px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] lg:w-[510px] lg:h-[510px] rounded-full border border-white/70 backdrop-blur-xl shadow-2xl" />

            {/* Logo */}

            <img
              src="/logo.png"
              alt="Swipe"
              className="relative w-[150px] sm:w-[210px] md:w-[260px] lg:w-[280px] rounded-[36px] sm:rounded-[50px] lg:rounded-[64px] drop-shadow-[0_40px_70px_rgba(0,0,0,0.18)] hover:scale-105 hover:-rotate-6 transition-all duration-700 cursor-pointer"
            />

          </div>

        </div>

        {/* The four areas as direct doors into the free lessons */}

        <div className="relative mt-16 lg:mt-12">

          {/* Header row: label left, overview button right (stacked and centred on phones) */}
          <div className="mb-4 flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Pick an area to start
            </p>
            <a
              href="#learning-paths"
              className="rounded-full border border-dashed border-gray-300 bg-white/40 px-6 py-2.5 text-center text-sm font-semibold text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-black"
            >
              See all learning paths ↓
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {AREAS.map((a) => (
              <Link
                key={a.app}
                href={learnAppUrl(a.app)}
                className="group rounded-3xl border border-white/80 bg-white/75 p-4 sm:p-6 text-left shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="text-2xl sm:text-3xl" aria-hidden>{a.emoji}</span>
                <span className="mt-2 sm:mt-3 block text-base sm:text-xl font-black tracking-tight text-black">{a.name}</span>
                <span className="mt-1 block text-xs sm:text-sm leading-5 text-gray-500">{a.text}</span>
                <span className={`mt-3 sm:mt-4 inline-block text-xs sm:text-sm font-semibold ${a.accent}`}>
                  {appLessons(a.app)} free lessons <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>

        </div>

      </div>

      {/* ================= Decorative Elements ================= */}

      {/* Floating Shapes */}

      <div className="hidden lg:block absolute -top-8 right-32 w-24 h-24 rounded-[35px] border border-gray-200 bg-white/60 backdrop-blur-xl rotate-12 shadow-xl"></div>

      <div className="hidden lg:block absolute bottom-0 right-40 w-16 h-16 rounded-full bg-gradient-to-br from-green-300 to-green-500 blur-sm opacity-70"></div>

      <div className="hidden sm:block absolute top-64 left-8 lg:left-24 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-green-500 animate-ping"></div>

      <div className="hidden sm:block absolute bottom-40 right-8 lg:right-24 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-black/40"></div>

      <div className="hidden lg:block absolute top-20 left-52 w-2 h-2 rounded-full bg-black"></div>

      {/* Connection Lines */}

      <div className="hidden lg:block absolute top-28 left-48 w-40 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-12"></div>

      <div className="hidden lg:block absolute bottom-36 right-32 w-36 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent -rotate-12"></div>

      {/* Top Wave */}
      <svg
        className="absolute top-0 left-0 w-full h-32 sm:h-48 lg:h-64 opacity-[0.04] -z-20"
        viewBox="0 0 1440 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,128L80,149.3C160,171,320,213,480,224C640,235,800,213,960,181.3C1120,149,1280,107,1360,85.3L1440,64V0H0Z"
        />
      </svg>

      {/* Giant Blur Blob */}
      <div className="absolute -left-60 top-52 w-[500px] h-[500px] sm:-left-80 sm:w-[700px] sm:h-[700px] lg:-left-96 lg:w-[900px] lg:h-[900px] rounded-full bg-gradient-to-br from-green-200 to-emerald-400 blur-[120px] sm:blur-[170px] lg:blur-[220px] opacity-20 -z-30" />

      {/* Right Blur */}
      <div className="hidden md:block absolute -right-40 bottom-20 w-[400px] h-[400px] lg:-right-72 lg:w-[700px] lg:h-[700px] rounded-full bg-gradient-to-br from-blue-100 to-white blur-[110px] lg:blur-[180px] opacity-40 -z-30" />

      {/* Mesh Lines */}

      <div className="absolute inset-0 -z-20 overflow-hidden">

        <svg
          className="w-full h-full opacity-[0.05]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 800"
        >

          <path
            d="M0 200 C250 100 350 300 600 200 S900 100 1200 250"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />

          <path
            d="M0 500 C300 350 450 650 800 500 S1000 450 1200 600"
            stroke="#22c55e"
            strokeWidth="2"
            fill="none"
          />

        </svg>

      </div>

      {/* Huge Transparent Circles */}

      <div className="hidden lg:block absolute left-20 top-32 w-[550px] h-[550px] rounded-full border border-gray-200/40"></div>

      <div className="hidden lg:block absolute left-40 top-52 w-[350px] h-[350px] rounded-full border border-gray-200/50"></div>

      <div className="hidden lg:block absolute right-32 bottom-20 w-[500px] h-[500px] rounded-full border border-green-200/60"></div>

      {/* Noise Effect */}

      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Floating Glass Squares */}

      <div className="hidden lg:block absolute top-24 right-1/4 w-24 h-24 rounded-[28px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />

      <div className="hidden lg:block absolute bottom-32 left-1/4 w-16 h-16 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white -rotate-12 shadow-lg" />

      <div className="hidden sm:block absolute top-1/2 left-4 lg:left-10 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-green-400 animate-pulse" />

      <div className="hidden sm:block absolute top-1/3 right-4 lg:right-10 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-black/20 animate-bounce" />

      <div className="hidden lg:block absolute bottom-24 right-1/3 w-5 h-5 rounded-full bg-green-300 animate-ping" />

      {/* Vertical Glow */}

      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-green-300/30 to-transparent blur-sm"></div>

      {/* Bottom Fade — only the sliver right at the edge is pure white, eased out softly rather than a hard linear cut */}

      <div
        className="absolute bottom-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      ></div>

    </section>
  );
}