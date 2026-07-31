import type { Metadata } from "next";
import PersonalGrowth from "@/components/personal-growth/PersonalGrowth";

export const metadata: Metadata = {
  title: "Personal Growth | Swipe",
  description: "Become the person your future needs — twelve chapters on discipline, habits, mindset and more.",
};

export default function PersonalGrowthPage() {
  return <PersonalGrowth />;
}
