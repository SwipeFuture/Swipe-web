import type { Metadata } from "next";
import Hero from "@/components/hero-section/Hero";
import WhatIsSwipe from "@/components/what-is-swipe/WhatIsSwipe";
import WhySwipe from "@/components/why-swipe/why-swipe";
import SwipeTools from "@/components/swipe.tools/swipe-tools";
import Motivation from "@/components/motivation/motivation";
import SwipeAppsSection from "@/components/swipe-apps-section/SwipeAppsSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Swipe — Learn Coding, Finance, Growth & AI in 5 Minutes",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    founder: { "@type": "Person", "@id": `${SITE_URL}/about#colin`, name: "Colin" },
    alternateName: "SwipeFuture",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    sameAs: SOCIAL_LINKS,
    description: SITE_DESCRIPTION,
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${SITE_URL}/contact` },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "SwipeFuture",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <Hero />
      <WhatIsSwipe />
      <WhySwipe />
      <SwipeTools />
      <SwipeAppsSection />
      <Motivation />
    </>
  );
}