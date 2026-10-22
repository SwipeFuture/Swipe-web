import type { Metadata } from "next";
import About from "@/components/about/About";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Swipe — The Story, the Founder & How We Make Lessons",
  description:
    "Meet Colin Farron, the founder of Swipe: how Swipe went from a sketchbook to four learning apps with 2,590 lessons, and how every lesson is planned, written and tested.",
};

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Swipe",
    url: `${SITE_URL}/about`,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about#colin`,
    name: "Colin Farron",
    jobTitle: "Founder",
    url: `${SITE_URL}/about`,
    worksFor: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Swipe" },
    sameAs: SOCIAL_LINKS,
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <About />
    </>
  );
}
