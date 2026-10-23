import type { Metadata } from "next";
import Advisor, { type TrackInfo } from "@/components/tools/advisor/Advisor";
import { LEARN_APPS, flatLessons, getTrack, tracksOf } from "@/lib/learn";

export const metadata: Metadata = {
  alternates: { canonical: "/advisor" },
  title: "What Should I Learn? Free Learning Advisor | Swipe",
  description:
    "Answer four quick questions and get a personal learning path in coding, money, personal growth or AI — with free lessons to start today.",
};

export default function AdvisorPage() {
  const tracks: TrackInfo[] = LEARN_APPS.flatMap((app) =>
    tracksOf(app).map((e) => {
      const t = getTrack(app, e.slug);
      return { app: app.data, url: app.url, slug: e.slug, track: e.track, lessons: e.lessons, first: t ? flatLessons(t)[0]?.lesson.slug : undefined };
    })
  );
  return <Advisor tracks={tracks} />;
}
