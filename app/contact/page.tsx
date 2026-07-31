import type { Metadata } from "next";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact | Swipe",
  description: "Get in touch with the Swipe team.",
};

export default function ContactPage() {
  return <Contact />;
}
