import type { Metadata } from "next";
import { AreaTools } from "@/components/tools/ToolGrid";
import Coding from "@/components/coding/Coding";

export const metadata: Metadata = {
  alternates: { canonical: "/coding" },
  title: "Learn Programming from Zero | SwipeFuture",
  description:
    "Learn how software is built, step by step: programming basics, web development, developer tools and the 8 most popular languages — explained simply.",
};

export default function CodingPage() {
  return (
    <>
      <Coding />
      <AreaTools area="coding" />
    </>
  );
}
