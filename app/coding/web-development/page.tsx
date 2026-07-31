import type { Metadata } from "next";
import WebDevelopment from "@/components/coding/web-development/WebDevelopment";

export const metadata: Metadata = {
  title: "Web Development | Swipe Coding",
  description: "Learn how modern websites and web applications are built — from HTML, CSS and JavaScript to frontend frameworks, backend APIs and deployment.",
};

export default function WebDevelopmentPage() {
  return <WebDevelopment />;
}
