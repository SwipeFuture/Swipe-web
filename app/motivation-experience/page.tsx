"use client";

import dynamic from "next/dynamic";

// The whole experience is WebGL/DOM-imperative and has no meaningful server-rendered output,
// so it's loaded client-only — this also keeps three/gsap out of the server bundle entirely.
const MotivationExperience = dynamic(
  () => import("@/components/motivation-experience/MotivationExperience"),
  { ssr: false }
);

export default function MotivationExperiencePage() {
  return <MotivationExperience />;
}
