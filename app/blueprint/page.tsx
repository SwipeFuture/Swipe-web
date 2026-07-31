import type { Metadata } from "next";
import Blueprint from "@/components/blueprint/Blueprint";

export const metadata: Metadata = {
  title: "The Blueprint | Swipe",
  description: "Build the skills that create opportunities — the full Swipe roadmap.",
};

export default function BlueprintPage() {
  return <Blueprint />;
}
