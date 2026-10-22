import type { MetadataRoute } from "next";
import { ROUTES, SITE_UPDATED, SITE_URL } from "@/lib/site";
import { LEARN_APPS, allLessonParams, tracksOf } from "@/lib/learn";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(SITE_UPDATED);
  const learn = [
    ...LEARN_APPS.flatMap((a) => tracksOf(a).map((t) => ({ path: `/learn/${a.url}/${t.slug}`, priority: 0.7 }))),
    ...allLessonParams().map((l) => ({ path: `/learn/${l.app}/${l.track}/${l.lesson}`, priority: 0.6 })),
  ];
  return [...ROUTES, ...learn].map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: priority >= 0.9 ? "weekly" : "monthly",
    priority,
  }));
}
