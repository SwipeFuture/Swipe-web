// Shared types for lesson content files in this folder.
//
// Each chapter's lesson is written as lightly-formatted text (blank line = new
// paragraph, "* " = bullet, "## "/"### " = sub-heading, "---" = divider,
// **bold**/*italic* = inline emphasis) and parsed by renderLessonText in
// CoreProgrammingConcepts.tsx, so a new lesson file never needs any JSX — just
// fill in as many of the eight keys below as you have copy for.

export type LessonKey =
  | "introduction"
  | "whyItMatters"
  | "keyPrinciples"
  | "examples"
  | "commonMistakes"
  | "exercises"
  | "summary"
  | "resources";

export type Lesson = Partial<Record<LessonKey, string>>;
