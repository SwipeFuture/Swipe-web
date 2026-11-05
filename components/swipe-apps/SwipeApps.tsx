import Link from "next/link";

// The /apps page: a short, factual note that the apps exist. The website itself is about
// the free lessons and tools.

const APPS = [
  { slug: "coding", name: "Swipe Coding", topic: "Programming" },
  { slug: "finance", name: "Swipe Finance", topic: "Money" },
  { slug: "growth", name: "Swipe Personal Growth", topic: "Personal growth" },
  { slug: "ai", name: "Swipe AI", topic: "Artificial intelligence" },
];

export default function SwipeApps() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-4xl px-5 pb-24 pt-32 text-center sm:px-8 sm:pb-32 sm:pt-40">
        <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold tracking-wide text-stone-600 sm:text-sm">
          Coming soon to the App Store
        </span>
        <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-stone-900 sm:mt-8 sm:text-6xl lg:text-7xl">
          The Swipe{" "}
          <span className="bg-gradient-to-r from-stone-800 via-amber-700 to-amber-500 bg-clip-text text-transparent">Apps</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-500 sm:mt-8 sm:text-lg sm:leading-8">
          Four learning apps for iPhone with short, swipeable lessons. Until they are out, you can use the free lessons and tools right here.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-4">
          {APPS.map((app) => (
            <div key={app.slug} className="flex flex-col items-center rounded-[28px] border border-stone-200/80 bg-white/70 p-5 shadow-sm sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/logo-${app.slug}-black.png`}
                alt={`${app.name} app icon`}
                width={96}
                height={96}
                className="h-20 w-20 rounded-[22px] object-cover shadow-lg sm:h-24 sm:w-24 sm:rounded-[26px]"
              />
              <div className="mt-4 text-sm font-bold text-stone-800 sm:text-base">{app.name}</div>
              <div className="mt-1 text-xs font-medium text-stone-500 sm:text-sm">{app.topic}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/learn" className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105">
            Free lessons →
          </Link>
          <Link href="/tools" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-800 transition-transform hover:scale-105">
            Free tools
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-800 transition-transform hover:scale-105">
            Contact & support
          </Link>
        </div>
      </div>
    </section>
  );
}
