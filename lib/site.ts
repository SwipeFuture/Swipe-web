// One place for the site's identity — used by metadata, the sitemap,
// robots.txt, the social preview image and the JSON-LD structured data.
export const SITE_URL = "https://swipefuture.dev";
export const SITE_NAME = "Swipe";
export const SITE_DESCRIPTION =
  "Learn coding, personal finance, personal growth and AI in five minutes a day — short, swipeable lessons, free guides and calculators from Swipe.";
// Date of the last real content update — used as lastModified in the sitemap and as the
// visible "Updated" date. Bump it when content changes (not on every deploy), so search
// engines can trust it.
export const SITE_UPDATED = "2026-10-22";
export const SITE_UPDATED_LABEL = "October 2026";

// Google Search Console: paste the content value of the "HTML tag" verification method
// here (only needed for a URL-prefix property; a domain property is verified via DNS).
export const GOOGLE_SITE_VERIFICATION = "rL-g-_LRDv1yV1paDrZ02Fe4POs8Njub4iGHMx4cZN0";

export const SOCIAL_LINKS = [
  "https://www.instagram.com/swipe.future",
  "https://www.tiktok.com/@swipe_future",
];

// Every public page, for the sitemap. Priority = how central the page is.
export const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/apps", priority: 0.9 },
  { path: "/learn", priority: 0.9 },
  { path: "/tools", priority: 0.9 },
  { path: "/advisor", priority: 0.8 },
  { path: "/coding", priority: 0.9 },
  { path: "/finance", priority: 0.9 },
  { path: "/personal-growth", priority: 0.9 },
  { path: "/ai", priority: 0.9 },
  { path: "/coding/introduction", priority: 0.8 },
  { path: "/coding/core-programming-concepts", priority: 0.8 },
  { path: "/coding/web-development", priority: 0.8 },
  { path: "/coding/developer-tools", priority: 0.8 },
  { path: "/coding/programming-languages", priority: 0.8 },
  { path: "/coding/programming-languages/python", priority: 0.7 },
  { path: "/coding/programming-languages/javascript", priority: 0.7 },
  { path: "/coding/programming-languages/typescript", priority: 0.7 },
  { path: "/coding/programming-languages/java", priority: 0.7 },
  { path: "/coding/programming-languages/csharp", priority: 0.7 },
  { path: "/coding/programming-languages/cpp", priority: 0.7 },
  { path: "/coding/programming-languages/go", priority: 0.7 },
  { path: "/coding/programming-languages/rust", priority: 0.7 },
  { path: "/finance/compound-interest-calculator", priority: 0.8 },
  { path: "/finance/etf-calculator", priority: 0.8 },
  { path: "/finance/budget-calculator", priority: 0.8 },
  { path: "/finance/savings-goal-calculator", priority: 0.8 },
  { path: "/finance/debt-payoff-calculator", priority: 0.8 },
  { path: "/finance/emergency-fund-calculator", priority: 0.8 },
  { path: "/finance/inflation-calculator", priority: 0.8 },
  { path: "/finance/fire-calculator", priority: 0.8 },
  { path: "/personal-growth/one-percent-calculator", priority: 0.8 },
  { path: "/personal-growth/sleep-calculator", priority: 0.8 },
  { path: "/coding/typing-speed-test", priority: 0.8 },
  { path: "/ai/prompt-builder", priority: 0.8 },
  { path: "/quiz/programming-language", priority: 0.8 },
  { path: "/quiz/money-type", priority: 0.8 },
  { path: "/quiz/habit-type", priority: 0.8 },
  { path: "/blueprint", priority: 0.6 },
  { path: "/motivation-experience", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/privacy-policy-apps", priority: 0.2 },
];
