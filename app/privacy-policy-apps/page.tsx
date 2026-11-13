import type { Metadata } from "next";
import PrivacyPolicyApps from "@/components/privacy-policy-apps/PrivacyPolicyApps";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy-apps" },
  // Opened from inside the apps and App Store Connect; not part of the website itself.
  robots: { index: false, follow: false },
  title: "Privacy Policy – App | SwipeFuture",
  description:
    "How the SwipeFuture app (Coding, Finance, Personal Growth and AI) collects, uses, and protects your information.",
};

export default function PrivacyPolicyAppsPage() {
  return <PrivacyPolicyApps />;
}
