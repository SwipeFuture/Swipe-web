import type { Metadata } from "next";
import AdviceNote from "@/components/learn/AdviceNote";
import { AreaTools } from "@/components/tools/ToolGrid";
import PersonalGrowth from "@/components/personal-growth/PersonalGrowth";

export const metadata: Metadata = {
  alternates: { canonical: "/personal-growth" },
  title: "Habits, Discipline & Mindset | SwipeFuture",
  description:
    "Twelve chapters on discipline, habits, focus, mindset, confidence and productivity — practical lessons you can use today.",
};

export default function PersonalGrowthPage() {
  return (
    <>
      <PersonalGrowth />
      <AreaTools area="growth" />
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <AdviceNote area="growth" />
      </div>
    </>
  );
}
