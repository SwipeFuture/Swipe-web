import type { Metadata } from "next";
import SwipeApps from "@/components/swipe-apps/SwipeApps";

export const metadata: Metadata = {
  title: "Swipe Apps | Coding, Finance, Personal Growth & AI",
  description:
    "Swipe Coding, Swipe Finance, Swipe Personal Growth and Swipe AI: four learning apps for iPhone with short, swipeable lessons and one account for all of them.",
};

export default function SwipeAppsPage() {
  return <SwipeApps />;
}
