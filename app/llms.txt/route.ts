import { LEARN_APPS, tracksOf } from "@/lib/learn";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { TOOL_AREAS } from "@/lib/tools-catalog";

// /llms.txt — a plain-text map of the site for AI assistants and AI search engines
// (llmstxt.org convention), generated from the same data as the pages themselves.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Swipe",
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Swipe makes four learning apps for iPhone (Swipe Coding, Swipe Finance, Swipe Personal Growth, Swipe AI) with short, swipeable lessons. This website offers free lessons, calculators, quizzes and a learning advisor.",
    "",
    "## Main pages",
    `- [The Swipe apps](${SITE_URL}/apps): the four iPhone apps, plans and FAQ`,
    `- [Free lessons](${SITE_URL}/learn): levels 1–2 of every Swipe track`,
    `- [Free tools](${SITE_URL}/tools): calculators, quizzes and helpers`,
    `- [Learning advisor](${SITE_URL}/advisor): personal learning path in four questions`,
    "",
    "## Free lesson tracks",
    ...LEARN_APPS.flatMap((a) => tracksOf(a).map((t) => `- [${t.track} (${a.name})](${SITE_URL}/learn/${a.url}/${t.slug}): ${t.lessons} free lessons`)),
    "",
    "## Free tools",
    ...TOOL_AREAS.flatMap((a) => a.tools.map((t) => `- [${t.title}](${SITE_URL}${t.href}): ${t.text}`)),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
