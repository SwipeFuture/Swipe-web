import type { Metadata } from "next";
import PrivacyPolicyApps from "@/components/privacy-policy-apps/PrivacyPolicyApps";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy-apps" },
  // Opened from inside the apps and App Store Connect; not part of the website itself.
  robots: { index: false, follow: false },
  title: "Privacy Policy – Apps | Swipe",
  description:
    "How the Swipe Coding, Swipe Finance, Swipe Personal Growth, and Swipe AI apps collect, use, and protect your information.",
};

export default function PrivacyPolicyAppsPage() {
  return <PrivacyPolicyApps />;
}
