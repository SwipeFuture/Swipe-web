import type { Metadata } from "next";
import { AreaTools } from "@/components/tools/ToolGrid";
import PersonalGrowth from "@/components/personal-growth/PersonalGrowth";

export const metadata: Metadata = {
  alternates: { canonical: "/personal-growth" },
  title: "Swipe Personal Growth — Habits, Discipline & Mindset | Swipe",
  description:
    "Become the person your future needs: twelve chapters on discipline, habits, focus, mindset, confidence and productivity — practical lessons you can use today.",
};

export default function PersonalGrowthPage() {
  return (
    <>
      <PersonalGrowth />
      <AreaTools area="growth" />
    </>
  );
}
