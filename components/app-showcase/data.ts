// Plain data for the Swipe app showcases — no "use client", so server pages
// (metadata, structured data) can import it too. AppShowcase re-exports it.

export type ShowcaseApp = "coding" | "finance" | "growth" | "ai";

// Release date of all four apps (local midnight), or null while it isn't fixed —
// then everything just says "Coming soon". Once a set date has passed, the badge
// switches from "Coming Soon" to "Out now".
export const LAUNCH = null as Date | null;
export const LAUNCH_LABEL = LAUNCH
  ? LAUNCH.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  : "Coming soon";

export type Feature = { icon: string; title: string; text: string };
export type Track = { name: string; levels: number };

export type AppContent = {
  name: string;
  logo: string;
  intro: string;
  advisor: string;
  tracks: Track[];
  screens: string[];
  features: Feature[];
};

// Shared across all four apps — what every Swipe app does the same way.
export const SHARED_FEATURES: Feature[] = [
  {
    icon: "⭐",
    title: "Stars, XP & streaks",
    text: "Earn up to three stars per level, collect XP and keep your daily streak alive.",
  },
  {
    icon: "🏆",
    title: "Leaderboards",
    text: "Climb the leaderboard for this app — or across the whole Swipe family.",
  },
  {
    icon: "🔗",
    title: "One account, four apps",
    text: "Your Swipe account, profile and plan work in Coding, Finance, Personal Growth and AI.",
  },
];

export const APPS: Record<ShowcaseApp, AppContent> = {
  coding: {
    name: "Coding",
    logo: "coding",
    intro:
      "Learn to code in short, swipeable lessons — from your very first line to real, job-ready skills. Every concept comes with a live example, a quick check and a chapter quiz.",
    advisor: "Code Advisor",
    tracks: [
      { name: "Python", levels: 20 },
      { name: "JavaScript", levels: 20 },
      { name: "TypeScript", levels: 20 },
      { name: "HTML", levels: 20 },
      { name: "Java", levels: 20 },
      { name: "C#", levels: 20 },
      { name: "C++", levels: 20 },
      { name: "Go", levels: 20 },
      { name: "Rust", levels: 20 },
      { name: "Ship It", levels: 9 },
    ],
    screens: [
      "Your learning path",
      "Bite-sized lessons with real code",
      "Code Advisor builds your path",
      "Chapter quizzes",
      "Leaderboards",
      "Your statistics",
    ],
    features: [
      {
        icon: "💻",
        title: "9 languages + Ship It",
        text: "Python, JavaScript, TypeScript, HTML, Java, C#, C++, Go and Rust — plus Ship It: terminal, Git, hosting, domains and publishing your own app.",
      },
      {
        icon: "🧭",
        title: "Code Advisor",
        text: "Answer a few questions and get a personal path: which language, up to which level, and how long it takes at your pace.",
      },
      {
        icon: "🧩",
        title: "Learn by doing",
        text: "Every lesson pairs an explanation with a real code example — then checks that you actually understood it.",
      },
    ],
  },
  finance: {
    name: "Finance",
    logo: "finance",
    intro:
      "Master your money in short, swipeable lessons — from your first budget to investing, taxes and retirement. Clear explanations, real-world examples and quizzes that make it stick.",
    advisor: "Money Advisor",
    tracks: [
      { name: "Money Basics", levels: 10 },
      { name: "Investing Fundamentals", levels: 10 },
      { name: "Stock Market & Trading", levels: 10 },
      { name: "Credit & Debt", levels: 10 },
      { name: "Taxes", levels: 10 },
      { name: "Retirement & FIRE", levels: 10 },
      { name: "Real Estate", levels: 10 },
      { name: "Crypto & Alternative Assets", levels: 10 },
      { name: "Corporate Finance & Investment Banking", levels: 10 },
    ],
    screens: [
      "Your learning path",
      "Bite-sized money lessons",
      "Leaderboards",
      "Your statistics",
      "Quick true-or-false checks",
      "Money Advisor builds your plan",
    ],
    features: [
      {
        icon: "💰",
        title: "9 finance tracks",
        text: "Budgeting, investing, the stock market, credit, taxes, retirement, real estate, crypto and corporate finance.",
      },
      {
        icon: "🧭",
        title: "Money Advisor",
        text: "Tell it your goal — get out of debt, build wealth, retire early — and get a matching track and a realistic timeline.",
      },
      {
        icon: "📈",
        title: "Real-world scenarios",
        text: "Every idea is explained with concrete numbers and everyday examples, then checked with a quick question.",
      },
    ],
  },
  growth: {
    name: "Personal Growth",
    logo: "growth",
    intro:
      "Build better habits, sharper focus and calmer days in short, swipeable lessons — grounded in research, practical from day one and checked with quick quizzes.",
    advisor: "Growth Advisor",
    tracks: [
      { name: "Habits & Routines", levels: 10 },
      { name: "Focus & Productivity", levels: 10 },
      { name: "Stress & Emotional Resilience", levels: 10 },
      { name: "Sleep", levels: 10 },
      { name: "Fitness & Movement", levels: 10 },
      { name: "Mindset & Confidence", levels: 10 },
      { name: "Relationships & Communication", levels: 10 },
      { name: "Purpose & Direction", levels: 10 },
    ],
    screens: [
      "Your learning path",
      "Leaderboards",
      "Your statistics",
      "Bite-sized lessons",
      "Growth Advisor builds your plan",
      "Quick true-or-false checks",
    ],
    features: [
      {
        icon: "🌱",
        title: "8 growth tracks",
        text: "Habits, focus, stress, sleep, fitness, mindset, relationships and purpose — the areas that shape your everyday life.",
      },
      {
        icon: "🧭",
        title: "Growth Advisor",
        text: "Share what you want to improve and get the track that fits, with a plan that matches the time you really have.",
      },
      {
        icon: "🧠",
        title: "Practical, not preachy",
        text: "Clear ideas you can try the same day — explained simply and backed up with a quick check.",
      },
    ],
  },
  ai: {
    name: "AI",
    logo: "ai",
    intro:
      "Understand and use AI in short, swipeable lessons — from what a token is to prompt engineering, machine learning and building with AI APIs. No hype, just skills.",
    advisor: "AI Advisor",
    tracks: [
      { name: "AI Fundamentals", levels: 10 },
      { name: "Using AI Tools Well", levels: 10 },
      { name: "Prompt Engineering", levels: 10 },
      { name: "Machine Learning Fundamentals", levels: 10 },
      { name: "Deep Learning & Neural Networks", levels: 10 },
      { name: "Building With AI APIs", levels: 10 },
      { name: "AI Agents & Automation", levels: 10 },
      { name: "AI Ethics & Safety", levels: 10 },
    ],
    screens: [
      "Your learning path",
      "Bite-sized AI lessons",
      "AI Advisor builds your plan",
      "Chapter quizzes",
      "Leaderboards",
      "Your statistics",
    ],
    features: [
      {
        icon: "🤖",
        title: "8 AI tracks",
        text: "Fundamentals, everyday AI tools, prompt engineering, machine learning, deep learning, APIs, agents and AI safety.",
      },
      {
        icon: "🧭",
        title: "AI Advisor",
        text: "Whether you want to use AI better or build with it — get the matching track and a timeline at your pace.",
      },
      {
        icon: "✍️",
        title: "Hands-on prompting",
        text: "Learn how models really work, then turn that into prompts and workflows that give reliable results.",
      },
    ],
  },
};
