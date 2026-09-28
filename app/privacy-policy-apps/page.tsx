import type { Metadata } from "next";
import PrivacyPolicyApps from "@/components/privacy-policy-apps/PrivacyPolicyApps";

export const metadata: Metadata = {
  title: "Privacy Policy – Apps | Swipe",
  description:
    "How the Swipe Coding, Swipe Finance, Swipe Personal Growth, and Swipe AI apps collect, use, and protect your information.",
};

export default function PrivacyPolicyAppsPage() {
  return <PrivacyPolicyApps />;
}
