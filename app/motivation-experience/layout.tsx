import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/motivation-experience" },
  title: "Motivation — Mindset Quotes on Discipline & Habits | Swipe",
  description:
    "Scroll through the mindset behind every success: discipline, consistency, focus and the math of getting 1% better every day.",
};

export default function MotivationExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
