import { Archivo } from "next/font/google";

// Brand typeface (2026-11-10 redesign): Archivo with its width axis, so headlines can run wide and heavy.
// Exposed as --font-archivo; loaded once in the root layout.
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
