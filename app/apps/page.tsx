import type { Metadata } from "next";
import SwipeApps from "@/components/swipe-apps/SwipeApps";

export const metadata: Metadata = {
  alternates: { canonical: "/apps" },
  title: "Swipe Apps | Coding, Finance, Personal Growth & AI",
  description: "Swipe Coding, Swipe Finance, Swipe Personal Growth and Swipe AI: four learning apps for iPhone, coming soon to the App Store.",
};

export default function SwipeAppsPage() {
  return <SwipeApps />;
}
