import type { Metadata } from "next";
import SwipeApps from "@/components/swipe-apps/SwipeApps";
import { FAQ } from "@/components/swipe-apps/faq";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/apps" },
  title: "Swipe Apps | Coding, Finance, Personal Growth & AI",
  description:
    "Swipe Coding, Swipe Finance, Swipe Personal Growth and Swipe AI: four learning apps for iPhone with short, swipeable lessons and one account for all of them.",
};

// FAQ rich results. (App markup comes back once the apps have real App Store ratings —
// Google rejects MobileApplication data without aggregateRating/review.)
const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

export default function SwipeAppsPage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <SwipeApps />
    </>
  );
}
