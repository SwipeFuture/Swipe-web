import type { Metadata } from "next";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact SwipeFuture — Support, Feedback & Partnerships",
  description:
    "Questions about the SwipeFuture app, feedback, a bug or a partnership idea? Get in touch with the SwipeFuture team.",
};

export default function ContactPage() {
  return <Contact />;
}
