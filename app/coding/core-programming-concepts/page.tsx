import type { Metadata } from "next";
import CoreProgrammingConcepts from "@/components/coding/core-programming-concepts/CoreProgrammingConcepts";

export const metadata: Metadata = {
  title: "Core Programming Concepts | Swipe Coding",
  description: "Learn the building blocks every programming language shares: variables, data types, operators, conditions, loops, functions, arrays and objects.",
};

export default function CoreProgrammingConceptsPage() {
  return <CoreProgrammingConcepts />;
}
