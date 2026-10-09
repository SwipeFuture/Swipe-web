import Hero from "@/components/hero-section/Hero";
import WhatIsSwipe from "@/components/what-is-swipe/WhatIsSwipe";
import WhySwipe from "@/components/why-swipe/why-swipe";
import SwipeTools from "@/components/swipe.tools/swipe-tools";
import Motivation from "@/components/motivation/motivation";
import SwipeAppsSection from "@/components/swipe-apps-section/SwipeAppsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsSwipe />
      <WhySwipe />
      <SwipeTools />
      <SwipeAppsSection />
      <Motivation />
    </>
  );
}