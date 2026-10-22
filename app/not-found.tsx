import Link from "next/link";

// Friendly 404 with the most useful next stops instead of a dead end.
export default function NotFound() {
  const links = [
    { href: "/learn", label: "Free lessons" },
    { href: "/tools", label: "Free tools & quizzes" },
    { href: "/advisor", label: "Learning advisor" },
    { href: "/apps", label: "The Swipe apps" },
  ];
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <span className="text-6xl">🧭</span>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-stone-900 sm:text-6xl">This page swiped away.</h1>
      <p className="mt-4 max-w-md text-base text-stone-500">The page you&apos;re looking for doesn&apos;t exist (anymore). Here are a few good places to go instead:</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm hover:shadow-md">
            {l.label} →
          </Link>
        ))}
      </div>
      <Link href="/" className="mt-8 text-sm font-semibold text-stone-500 hover:text-stone-800">← Back home</Link>
    </section>
  );
}
