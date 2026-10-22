import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { THEMES } from "@/components/tools/themes";
import { LEARN_APPS, appByUrl, flatLessons, getTrack, laterLevels, lessonDescription, tracksOf } from "@/lib/learn";
import { SITE_URL } from "@/lib/site";

type Params = { app: string; track: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return LEARN_APPS.flatMap((a) => tracksOf(a).map((t) => ({ app: a.url, track: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = await params;
  const app = appByUrl(p.app);
  const track = app && getTrack(app, p.track);
  if (!app || !track) return {};
  const n = flatLessons(track).length;
  return {
    alternates: { canonical: `/learn/${app.url}/${track.slug}` },
    title: [`Learn ${track.track} — ${n} Free Beginner Lessons | ${app.name}`, `Learn ${track.track} — ${n} Free Lessons | Swipe`, `${track.track} — Free Lessons | Swipe`].find((v) => v.length <= 65) ?? `${track.track} | Swipe`,
    description: `Start learning ${track.track} for free: ${n} short, beginner-friendly lessons with examples, practice questions and chapter quizzes — the first two levels of the ${app.name} track.`,
  };
}

export default async function TrackPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const app = appByUrl(p.app);
  const track = app && getTrack(app, p.track);
  if (!app || !track) notFound();
  const t = THEMES[app.theme];
  const lessons = flatLessons(track);
  const later = laterLevels(app, track.track);
  const base = `/learn/${app.url}/${track.slug}`;
  const first = lessons[0]?.lesson;
  let n = 0;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className={`absolute inset-0 -z-50 ${t.pageBg}`} />
      <div className={`absolute -right-24 -top-24 -z-40 h-[520px] w-[520px] rounded-full ${t.blobA} opacity-20 blur-[150px]`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Learn", item: `${SITE_URL}/learn` },
            { "@type": "ListItem", position: 2, name: track.track, item: `${SITE_URL}${base}` },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${track.track} for Beginners`,
          description: first ? lessonDescription(first, track) : `Learn ${track.track} with Swipe.`,
          url: `${SITE_URL}${base}`,
          isAccessibleForFree: true,
          inLanguage: "en",
          provider: { "@type": "Organization", name: "Swipe", url: SITE_URL },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${Math.max(1, Math.round(lessons.length * 5))}M` },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" },
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-500 sm:text-sm">
          <Link href="/learn" className="hover:text-stone-800">Learn</Link>
          <span>/</span>
          <span className="text-stone-400">{app.area}</span>
        </nav>

        <header className="mt-8 text-center">
          <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${t.chip}`}>{app.name} · free lessons</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-6xl">
            Learn <span className={`${t.gradientText} bg-clip-text text-transparent`}>{track.track}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
            {lessons.length} short lessons from the first two levels of the {track.track} track — real examples, quick checks and a quiz after every chapter. About 5 minutes each.
          </p>
          {first && (
            <Link href={`${base}/${first.slug}`} className={`mt-8 inline-flex rounded-full px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:scale-105 sm:text-base ${t.button}`}>
              Start with “{first.title}” →
            </Link>
          )}
        </header>

        <div className="mt-16 space-y-10">
          {track.levels.map((lv) => (
            <div key={lv.number}>
              <h2 className="text-xl font-black tracking-tight text-stone-900 sm:text-2xl">Level {lv.number}</h2>
              <div className="mt-5 space-y-5">
                {lv.chapters.map((ch) => (
                  <div key={ch.title} className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-lg backdrop-blur-xl sm:p-8">
                    <h3 className="text-base font-bold text-stone-800 sm:text-lg">{ch.title}</h3>
                    <ol className="mt-4 space-y-2">
                      {ch.lessons.map((l) => {
                        n += 1;
                        return (
                          <li key={l.slug}>
                            <Link href={`${base}/${l.slug}`} className="group flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white">
                              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${t.chip} border`}>{n}</span>
                              <span className="flex-1 text-sm font-semibold text-stone-700 sm:text-base">{l.title}</span>
                              <span className="text-stone-300 transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                    {ch.quiz && <p className="mt-3 pl-3 text-xs font-semibold text-stone-400">+ chapter quiz ({ch.quiz.questions.length} questions) at the end</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {later.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-black tracking-tight text-stone-900 sm:text-2xl">Continue in the app: levels 3–{later[later.length - 1].number}</h2>
            <p className="mt-2 text-sm text-stone-500">The full {track.track} track goes much further. Here&apos;s what comes next:</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {later.map((lv) => (
                <div key={lv.number} className="rounded-[22px] border border-white/60 bg-white/50 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-stone-800">Level {lv.number}</span>
                    <span className="text-xs font-semibold text-stone-400">🔒 in the app</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-stone-500">{lv.chapters.map((c) => c.title).join(" · ")}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/apps" className={`inline-flex rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg transition-all hover:scale-105 ${t.button}`}>
                Get {app.name} →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
