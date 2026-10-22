import type { Metadata } from "next";
import SwipeApps from "@/components/swipe-apps/SwipeApps";
import { FAQ } from "@/components/swipe-apps/faq";
import { APPS } from "@/components/app-showcase/data";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/apps" },
  title: "Swipe Apps | Coding, Finance, Personal Growth & AI",
  description:
    "Swipe Coding, Swipe Finance, Swipe Personal Growth and Swipe AI: four learning apps for iPhone with short, swipeable lessons and one account for all of them.",
};

// FAQ rich results + the four apps as software products.
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
  ...Object.values(APPS).map((app) => ({
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: `Swipe ${app.name}`,
    operatingSystem: "iOS",
    applicationCategory: "EducationalApplication",
    description: app.intro,
    image: `${SITE_URL}/logo-${app.logo}-black.png`,
    url: `${SITE_URL}/apps`,
    publisher: { "@type": "Organization", name: "Swipe", url: SITE_URL },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  })),
];

export default function SwipeAppsPage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <SwipeApps />
    </>
  );
}
