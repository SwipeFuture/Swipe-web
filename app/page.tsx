import Hero from "@/components/hero-section/Hero";
import WhatIsSwipe from "@/components/what-is-swipe/WhatIsSwipe";
import WhySwipe from "@/components/why-swipe/why-swipe";
import SwipeTools from "@/components/swipe.tools/swipe-tools";
import Motivation from "@/components/motivation/motivation";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsSwipe />
      <WhySwipe />
      <SwipeTools />
      <Motivation />
    </>
  );
}