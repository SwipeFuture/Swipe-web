import type { Metadata } from "next";
import LearnBanner from "@/components/learn/LearnBanner";
import Blueprint from "@/components/blueprint/Blueprint";

export const metadata: Metadata = {
  alternates: { canonical: "/blueprint" },
  title: "The Blueprint | Swipe",
  description: "Build the skills that create opportunities — the full Swipe roadmap.",
};

export default function BlueprintPage() {
  return (
    <>
      <Blueprint />
      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-8">
        <LearnBanner
          accent="growth"
          eyebrow="Put the blueprint into practice"
          title="Start building the skills — for free"
          text="Find the path that fits your goal in four questions, then start with free lessons from the Swipe apps: coding, money, personal growth and AI."
          primary={{ href: "/advisor", label: "Find my learning path" }}
          secondary={[
            { href: "/learn", label: "Browse 384 free lessons" },
            { href: "/tools", label: "Free tools & quizzes" },
          ]}
        />
      </div>
    </>
  );
}
