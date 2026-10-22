import fs from "node:fs";
import path from "node:path";
import type { ToolTheme } from "@/components/tools/themes";

// The public lesson library: levels 1–2 of every track, exported from the apps by
// scratchpad/lessonexp/export-lessons.js into content/learn/<app>/<track>.json.
// Server-only (reads files at build time).

export type Highlight = { text: string; color: string };
export type CodeSample = { code: string; caption?: string };
export type Block =
  | { type: "text"; body: string; robotComment?: string; highlights?: Highlight[]; code?: CodeSample }
  | { type: "code"; code: string; caption?: string; robotComment?: string }
  | { type: "multiple-choice"; question: string; options: string[]; correctIndex: number; explanation?: string; code?: string | CodeSample }
  | { type: "true-false"; statement: string; correct: boolean; explanation?: string; robotComment?: string; code?: string | CodeSample }
  | { type: "fill-blank"; sentence: string; options: string[]; correct: string; explanation?: string };
export type Lesson = { title: string; slug: string; blocks: Block[] };
export type Chapter = { title: string; lessons: Lesson[]; quiz: { title: string; questions: Block[] } | null };
export type Track = { app: DataApp; track: string; slug: string; levels: { number: number; chapters: Chapter[] }[] };

type DataApp = "coding" | "finance" | "growth" | "ai";

// URL slug → data folder, display name, theme.
export const LEARN_APPS = [
  { url: "coding", data: "coding", name: "Swipe Coding", area: "Coding", theme: "coding", blurb: "Programming from your first line of code — 9 languages plus a shipping track." },
  { url: "finance", data: "finance", name: "Swipe Finance", area: "Finance", theme: "finance", blurb: "Money, investing, credit, taxes and more — the money skills school skips." },
  { url: "personal-growth", data: "growth", name: "Swipe Personal Growth", area: "Personal Growth", theme: "growth", blurb: "Habits, focus, mindset, sleep and relationships — practical lessons for real life." },
  { url: "ai", data: "ai", name: "Swipe AI", area: "AI", theme: "ai", blurb: "How AI really works, how to prompt it well and how to build with it." },
] as const satisfies readonly { url: string; data: DataApp; name: string; area: string; theme: ToolTheme; blurb: string }[];

export type LearnApp = (typeof LEARN_APPS)[number];

const DIR = path.join(process.cwd(), "content", "learn");

export const appByUrl = (url: string) => LEARN_APPS.find((a) => a.url === url);

type IndexEntry = { app: DataApp; track: string; slug: string; lessons: number };
export function learnIndex(): IndexEntry[] {
  return JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8"));
}

const cache = new Map<string, Track>();
export function getTrack(app: LearnApp, slug: string): Track | null {
  const key = `${app.data}/${slug}`;
  if (cache.has(key)) return cache.get(key)!;
  const file = path.join(DIR, app.data, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const t = JSON.parse(fs.readFileSync(file, "utf8")) as Track;
  cache.set(key, t);
  return t;
}

export function tracksOf(app: LearnApp) {
  return learnIndex().filter((e) => e.app === app.data);
}

// Flat, ordered lesson list of a track with chapter info — for prev/next and quizzes.
export function flatLessons(track: Track) {
  const out: { lesson: Lesson; level: number; chapter: Chapter; chapterIndex: number; lastInChapter: boolean }[] = [];
  track.levels.forEach((lv) =>
    lv.chapters.forEach((ch, ci) =>
      ch.lessons.forEach((l, i) => out.push({ lesson: l, level: lv.number, chapter: ch, chapterIndex: ci, lastInChapter: i === ch.lessons.length - 1 }))
    )
  );
  return out;
}

// Levels 3+ (titles only) from the full app outline, to show what the app adds.
export function laterLevels(app: LearnApp, trackName: string) {
  const file = path.join(process.cwd(), "public", "app-tracks", `${app.data}.json`);
  if (!fs.existsSync(file)) return [];
  const all = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, { number: number; chapters: { title: string; lessons: string[] }[] }[]>;
  return (all[trackName] ?? []).filter((l) => l.number > 2);
}

export function lessonDescription(lesson: Lesson, track: Track) {
  const first = lesson.blocks.find((b) => b.type === "text") as { body: string } | undefined;
  const body = (first?.body ?? `${lesson.title} — a free ${track.track} lesson from Swipe.`).replace(/\s+/g, " ");
  return body.length > 155 ? body.slice(0, 152).replace(/\s+\S*$/, "") + "…" : body;
}

export function allLessonParams() {
  return LEARN_APPS.flatMap((app) =>
    tracksOf(app).flatMap((e) => {
      const t = getTrack(app, e.slug);
      return t ? flatLessons(t).map((x) => ({ app: app.url, track: t.slug, lesson: x.lesson.slug })) : [];
    })
  );
}
