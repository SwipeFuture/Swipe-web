import type { Metadata } from "next";
import PrivacyPolicy from "@/components/privacy-policy/PrivacyPolicy";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy | Swipe",
  description: "How the Swipe website handles your information: what is collected, why, which services are involved and how it is protected.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
