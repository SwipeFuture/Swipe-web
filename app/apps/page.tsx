import type { Metadata } from "next";
import SwipeApps from "@/components/swipe-apps/SwipeApps";

export const metadata: Metadata = {
  alternates: { canonical: "/apps" },
  title: "The SwipeFuture App | Coding, Finance, Personal Growth & AI",
  description: "SwipeFuture is one iPhone app for coding, finance, personal growth and AI: four areas, one account, free daily tokens. Coming soon to the App Store.",
};

export default function SwipeAppsPage() {
  return <SwipeApps />;
}
