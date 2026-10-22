import type { ToolTheme } from "@/components/tools/themes";

// Every free tool, quiz and the advisor — one list for /tools and the area pages.
export type ToolEntry = { href: string; title: string; text: string; emoji: string; kind: "Calculator" | "Quiz" | "Tool" };
export type ToolArea = { key: "finance" | "growth" | "coding" | "ai"; label: string; theme: ToolTheme; learn: string; tools: ToolEntry[] };

export const TOOL_AREAS: ToolArea[] = [
  {
    key: "finance",
    label: "Finance",
    theme: "finance",
    learn: "/learn#finance",
    tools: [
      { href: "/finance/budget-calculator", title: "Budget Calculator", text: "Split your pay with the 50/30/20 rule.", emoji: "🧾", kind: "Calculator" },
      { href: "/finance/savings-goal-calculator", title: "Savings Goal Calculator", text: "How long until you reach your goal?", emoji: "🎯", kind: "Calculator" },
      { href: "/finance/debt-payoff-calculator", title: "Debt Payoff Calculator", text: "Your debt-free date and interest saved.", emoji: "⛓️", kind: "Calculator" },
      { href: "/finance/emergency-fund-calculator", title: "Emergency Fund Calculator", text: "How big should your safety net be?", emoji: "🛟", kind: "Calculator" },
      { href: "/finance/inflation-calculator", title: "Inflation Calculator", text: "What your money is really worth later.", emoji: "🎈", kind: "Calculator" },
      { href: "/finance/fire-calculator", title: "FIRE Calculator", text: "Your number for financial independence.", emoji: "🔥", kind: "Calculator" },
      { href: "/finance/etf-calculator", title: "ETF Calculator", text: "How a monthly ETF plan could grow.", emoji: "📈", kind: "Calculator" },
      { href: "/finance/compound-interest-calculator", title: "Compound Interest Calculator", text: "The power of compounding, live.", emoji: "🌀", kind: "Calculator" },
      { href: "/quiz/money-type", title: "Money Type Quiz", text: "Saver, spender, investor or avoider?", emoji: "💸", kind: "Quiz" },
    ],
  },
  {
    key: "coding",
    label: "Coding",
    theme: "coding",
    learn: "/learn#coding",
    tools: [
      { href: "/quiz/programming-language", title: "Which Language Should You Learn?", text: "7 questions to your first language.", emoji: "🧭", kind: "Quiz" },
      { href: "/coding/typing-speed-test", title: "Code Typing Speed Test", text: "Your WPM on real Python & JavaScript.", emoji: "⌨️", kind: "Tool" },
    ],
  },
  {
    key: "growth",
    label: "Personal Growth",
    theme: "growth",
    learn: "/learn#personal-growth",
    tools: [
      { href: "/personal-growth/one-percent-calculator", title: "1% Better Every Day", text: "What tiny habits add up to.", emoji: "📈", kind: "Calculator" },
      { href: "/personal-growth/sleep-calculator", title: "Sleep Calculator", text: "Best bedtime by sleep cycles.", emoji: "😴", kind: "Calculator" },
      { href: "/quiz/habit-type", title: "Habit Type Quiz", text: "Why your habits don't stick.", emoji: "🔁", kind: "Quiz" },
    ],
  },
  {
    key: "ai",
    label: "AI",
    theme: "ai",
    learn: "/learn#ai",
    tools: [{ href: "/ai/prompt-builder", title: "AI Prompt Builder", text: "Better prompts for ChatGPT & Claude.", emoji: "✨", kind: "Tool" }],
  },
];
