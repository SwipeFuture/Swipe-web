import index from "@/content/learn/index.json";

// Client-safe helpers for linking to the free lesson library from anywhere
// (only reads the small index, not the lesson content).

type Entry = { app: "coding" | "finance" | "growth" | "ai"; track: string; slug: string; lessons: number };
const INDEX = index as Entry[];

export const LEARN_URL_SLUG = { coding: "coding", finance: "finance", growth: "personal-growth", ai: "ai" } as const;

export function learnTrackUrl(app: Entry["app"], trackNameOrSlug: string) {
  const e = INDEX.find((x) => x.app === app && (x.track === trackNameOrSlug || x.slug === trackNameOrSlug));
  return e ? `/learn/${LEARN_URL_SLUG[app]}/${e.slug}` : null;
}

export function trackLessons(app: Entry["app"], trackNameOrSlug: string) {
  return INDEX.find((x) => x.app === app && (x.track === trackNameOrSlug || x.slug === trackNameOrSlug))?.lessons ?? 0;
}

export function appLessons(app: Entry["app"]) {
  return INDEX.filter((x) => x.app === app).reduce((s, x) => s + x.lessons, 0);
}

export const learnAppUrl = (app: Entry["app"]) => `/learn#${LEARN_URL_SLUG[app]}`;
export const toolsAppUrl = (app: Entry["app"]) => `/tools#${app}`;
