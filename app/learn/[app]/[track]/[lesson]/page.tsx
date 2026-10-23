import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonView from "@/components/learn/LessonView";
import { allLessonParams, appByUrl, flatLessons, getTrack, lessonDescription } from "@/lib/learn";

type Params = { app: string; track: string; lesson: string };

export const dynamicParams = false;

// Longest variant that still fits Google's title width (~65 characters).
// Google shows ~60 characters of a title; take the most descriptive variant that fits.
const pickTitle = (variants: string[]) => variants.find((v) => v.length <= 60) ?? variants[variants.length - 1];

export function generateStaticParams() {
  return allLessonParams();
}

function load(p: Params) {
  const app = appByUrl(p.app);
  const track = app && getTrack(app, p.track);
  if (!app || !track) return null;
  const list = flatLessons(track);
  const i = list.findIndex((x) => x.lesson.slug === p.lesson);
  if (i < 0) return null;
  return { app, track, list, i };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const d = load(await params);
  if (!d) return {};
  const { app, track, list, i } = d;
  const lesson = list[i].lesson;
  return {
    alternates: { canonical: `/learn/${app.url}/${track.slug}/${lesson.slug}` },
    title: pickTitle([
      `${lesson.title} — Free ${track.track} Lesson | ${app.name}`,
      `${lesson.title} — ${track.track} | Swipe`,
      // short generic titles ("The Shape of This Track") exist in several tracks — keep the track name so titles stay unique
      ...(lesson.title.length < 30 ? [`${lesson.title} — ${track.track}`] : []),
      `${lesson.title} | Swipe`,
      lesson.title,
    ]),
    description: lessonDescription(lesson, track),
    openGraph: { type: "article" },
  };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const d = load(await params);
  if (!d) notFound();
  const { app, track, list, i } = d;
  const cur = list[i];
  return (
    <LessonView
      app={app}
      track={track}
      lesson={cur.lesson}
      level={cur.level}
      chapter={cur.chapter}
      lastInChapter={cur.lastInChapter}
      prev={list[i - 1]?.lesson ?? null}
      next={list[i + 1]?.lesson ?? null}
      position={i + 1}
      total={list.length}
    />
  );
}
