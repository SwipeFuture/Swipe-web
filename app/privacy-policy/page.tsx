import type { Metadata } from "next";
import PrivacyPolicy from "@/components/privacy-policy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | Swipe",
  description: "How Swipe collects, uses and protects your information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
