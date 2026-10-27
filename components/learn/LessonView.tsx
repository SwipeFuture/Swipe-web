import Link from "next/link";
import type { ReactNode } from "react";
import { THEMES } from "@/components/tools/themes";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_UPDATED, SITE_UPDATED_LABEL, SITE_URL } from "@/lib/site";
import { TOOL_AREAS } from "@/lib/tools-catalog";
import type { Block, Chapter, Highlight, LearnApp, Lesson, Track } from "@/lib/learn";
import { ChapterQuiz, PracticeCard } from "./Exercise";

// One lesson as a readable page of app-style cards. Text and code are plain server
// HTML (fully indexable); the practice questions are small client islands.

const HL: Record<string, string> = {
  green: "bg-emerald-100/80 text-emerald-800",
  blue: "bg-sky-100/80 text-sky-800",
  violet: "bg-violet-100/80 text-violet-800",
  yellow: "bg-amber-100/80 text-amber-800",
  orange: "bg-orange-100/80 text-orange-800",
};

function withHighlights(text: string, highlights: Highlight[] = []): ReactNode[] {
  let parts: ReactNode[] = [text];
  highlights.forEach((h, hi) => {
    const next: ReactNode[] = [];
    let done = false;
    for (const p of parts) {
      if (done || typeof p !== "string") {
        next.push(p);
        continue;
      }
      const at = p.indexOf(h.text);
      if (at < 0) {
        next.push(p);
        continue;
      }
      next.push(p.slice(0, at));
      next.push(
        <mark key={`h${hi}`} className={`rounded-md px-1 py-0.5 font-semibold ${HL[h.color] ?? HL.green}`}>
          {h.text}
        </mark>
      );
      next.push(p.slice(at + h.text.length));
      done = true;
    }
    parts = next;
  });
  return parts;
}

function Swipey({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-base">🤖</div>
      <div className="rounded-2xl rounded-tl-sm border border-stone-200 bg-white px-4 py-2.5 text-sm leading-6 text-stone-600 shadow-sm">{text}</div>
    </div>
  );
}

function CodeBox({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure className="mt-5">
      <pre className="overflow-x-auto rounded-2xl bg-[#0f1115] p-4 font-mono text-[13px] leading-6 text-stone-100 sm:p-5 sm:text-sm">{code}</pre>
      {caption && <figcaption className="mt-2 text-xs leading-5 text-stone-500 sm:text-sm">{caption}</figcaption>}
    </figure>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "text") {
    return (
      <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-lg backdrop-blur-xl sm:p-8">
        {block.robotComment && <Swipey text={block.robotComment} />}
        <p className="text-base leading-8 text-stone-700 sm:text-lg sm:leading-9">{withHighlights(block.body, block.highlights)}</p>
        {block.code && <CodeBox code={block.code.code} caption={block.code.caption} />}
      </div>
    );
  }
  if (block.type === "code") {
    return (
      <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-lg backdrop-blur-xl sm:p-8">
        {block.robotComment && <Swipey text={block.robotComment} />}
        <CodeBox code={block.code} caption={block.caption} />
      </div>
    );
  }
  return <PracticeCard block={block} />;
}

export default function LessonView({
  app,
  track,
  lesson,
  level,
  chapter,
  lastInChapter,
  prev,
  next,
  position,
  total,
}: {
  app: LearnApp;
  track: Track;
  lesson: Lesson;
  level: number;
  chapter: Chapter;
  lastInChapter: boolean;
  prev: Lesson | null;
  next: Lesson | null;
  position: number;
  total: number;
}) {
  const t = THEMES[app.theme];
  const base = `/learn/${app.url}/${track.slug}`;
  const practice = chapter.quiz?.questions.filter((q) => q.type !== "text" && q.type !== "code") ?? [];
  return (
    <article className="relative overflow-hidden py-24 sm:py-32">
      <div className={`absolute inset-0 -z-50 ${t.pageBg}`} />
      <div className={`absolute -left-24 -top-24 -z-40 h-[460px] w-[460px] rounded-full ${t.blobA} opacity-20 blur-[140px]`} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: lesson.title,
            learningResourceType: "Lesson",
            educationalLevel: "Beginner",
            inLanguage: "en",
            isAccessibleForFree: true,
            dateModified: SITE_UPDATED,
            url: `${SITE_URL}${base}/${lesson.slug}`,
            // reference the full Course on the track page (it carries description + provider)
            isPartOf: { "@id": `${SITE_URL}${base}#course` },
            provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Swipe", url: SITE_URL },
            author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Swipe", url: SITE_URL },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Learn", item: `${SITE_URL}/learn` },
              { "@type": "ListItem", position: 2, name: track.track, item: `${SITE_URL}${base}` },
              { "@type": "ListItem", position: 3, name: lesson.title, item: `${SITE_URL}${base}/${lesson.slug}` },
            ],
          },
        ]}
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-500 sm:text-sm">
          <Link href="/learn" className="hover:text-stone-800">Learn</Link>
          <span>/</span>
          <Link href={base} className="hover:text-stone-800">{track.track}</Link>
          <span>/</span>
          <span className="text-stone-400">Level {level}</span>
        </nav>

        <header className="mt-8">
          <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${t.chip}`}>
            {chapter.title} · Lesson {position} of {total}
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-5xl">{lesson.title}</h1>
          <p className="mt-3 text-sm text-stone-500">
            A free lesson from {app.name} · {track.track}, level {level} · updated {SITE_UPDATED_LABEL}
          </p>
          <p className="mt-1 text-xs text-stone-400">
            By the Swipe team, founded by Colin ·{" "}
            <Link href="/about#how-we-make-lessons" className="underline-offset-2 hover:underline">
              how we make lessons
            </Link>
          </p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/70">
            <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${(position / total) * 100}%` }} />
          </div>
        </header>

        <div className="mt-10 space-y-5 sm:space-y-6">
          {lesson.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>

        {lastInChapter && chapter.quiz && practice.length > 0 && (
          <div className="mt-14">
            <ChapterQuiz title={chapter.quiz.title} questions={practice as never} />
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`${base}/${prev.slug}`} className="rounded-[22px] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all hover:shadow-lg">
              <span className="text-xs font-semibold text-stone-400">← Previous</span>
              <div className="mt-1 font-bold text-stone-800">{prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`${base}/${next.slug}`} className={`rounded-[22px] p-5 text-right shadow-lg transition-all hover:scale-[1.01] ${t.button}`}>
              <span className="text-xs font-semibold opacity-70">Next lesson →</span>
              <div className="mt-1 font-bold">{next.title}</div>
            </Link>
          ) : (
            <Link href={base} className={`rounded-[22px] p-5 text-right shadow-lg ${t.button}`}>
              <span className="text-xs font-semibold opacity-70">You finished the free levels 🎉</span>
              <div className="mt-1 font-bold">Back to {track.track} →</div>
            </Link>
          )}
        </div>

        {(() => {
          const area = TOOL_AREAS.find((a) => a.key === app.data);
          if (!area) return null;
          return (
            <div className="mt-14">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Free {area.label.toLowerCase()} tools</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {area.tools.slice(0, 5).map((tool) => (
                  <Link key={tool.href} href={tool.href} className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-md">
                    {tool.emoji} {tool.title}
                  </Link>
                ))}
                <Link href="/advisor" className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm backdrop-blur-xl">
                  🧭 Learning Advisor
                </Link>
              </div>
            </div>
          );
        })()}

        <div className={`mt-14 rounded-[28px] border p-6 text-center sm:p-8 ${t.softCard}`}>
          <h2 className="text-lg font-bold text-black sm:text-xl">Keep your streak going in {app.name}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-stone-600">
            Swipe through every level of {track.track} on your iPhone — with XP, stars, streaks, a personal advisor and the full track beyond these free levels.
          </p>
          <Link href="/apps" className={`mt-5 inline-flex rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 ${t.button}`}>
            Get the Swipe apps →
          </Link>
        </div>
      </div>
    </article>
  );
}
