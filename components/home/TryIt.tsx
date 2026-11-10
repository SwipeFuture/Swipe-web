"use client";

import { useState } from "react";

// Step 2 of "How a lesson works": the real fill-in-the-blank from the Python "Strings" lesson,
// answerable right on the homepage.
const OPTIONS = ["slice", "f-string", "concatenation"];
const CORRECT = "f-string";

export default function TryIt() {
  const [picked, setPicked] = useState<string | null>(null);
  const done = picked === CORRECT;
  return (
    <div>
      <p className="text-[15px] leading-7 text-[#3a3a38]">
        To put a variable inside a string, you can write an{" "}
        <span
          className="inline-block min-w-[78px] rounded-lg border-2 border-dashed px-2 text-center font-[family-name:var(--font-geist-mono)] text-[14px] transition-colors"
          style={{ borderColor: done ? "#22C97A" : "#127D4D", background: done ? "#E7FAF0" : "transparent", color: "#127D4D" }}
        >
          {done ? CORRECT : "____"}
        </span>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {OPTIONS.map((o) => {
          const state = picked === o ? (o === CORRECT ? "right" : "wrong") : null;
          const color = state === "right" ? "#22C97A" : state === "wrong" ? "#F26B5B" : "#e6e6e3";
          return (
            <button
              key={o}
              type="button"
              onClick={() => setPicked(o)}
              className="rounded-xl border-2 bg-white px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-[13px] transition-transform active:translate-y-[2px]"
              style={{ borderColor: color, boxShadow: `0 3px 0 ${color}`, background: state === "right" ? "#E7FAF0" : state === "wrong" ? "#FDECEA" : "#fff" }}
            >
              {o}
            </button>
          );
        })}
      </div>
      <p className="mt-3 h-6 text-[14px] text-[#5c5c58]">
        {picked === null ? "Your turn, tap one." : done ? "Correct. f\"Hello, {name}\" puts the value right in." : "Not quite, try another one."}
      </p>
    </div>
  );
}
