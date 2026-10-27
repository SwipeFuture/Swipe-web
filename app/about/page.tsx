import type { Metadata } from "next";
import About from "@/components/about/About";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About SwipeFuture — Our Story & How We Make Lessons",
  description:
    "Meet Colin, founder of SwipeFuture: why he builds it, the four skills that matter for the future, and how every one of the 2,590 lessons is made.",
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
    name: "Colin",
    jobTitle: "Founder",
    url: `${SITE_URL}/about`,
    worksFor: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Swipe", url: SITE_URL },
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
