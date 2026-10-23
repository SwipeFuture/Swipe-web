import type { Metadata } from "next";
import JavaScript from "@/components/coding/programming-languages/javascript/JavaScript";

export const metadata: Metadata = {
  alternates: { canonical: "/coding/programming-languages/javascript" },
  title: "JavaScript — What It Is & How to Learn It | Swipe Coding",
  description:
    "Learn JavaScript, the language of the web: how it makes websites interactive, where it runs (browser, servers, apps), code examples and how to get started.",
};

export default function JavaScriptPage() {
  return <JavaScript />;
}
