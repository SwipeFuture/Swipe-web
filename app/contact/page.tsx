import type { Metadata } from "next";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Swipe — Support, Feedback & Partnerships",
  description:
    "Questions about the Swipe apps, feedback, a bug or a partnership idea? Get in touch with the Swipe team.",
};

export default function ContactPage() {
  return <Contact />;
}
