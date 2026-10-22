import Link from "next/link";
import { THEMES } from "./themes";
import { TOOL_AREAS, type ToolArea } from "@/lib/tools-catalog";

export function ToolCards({ area }: { area: ToolArea }) {
  const t = THEMES[area.theme];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {area.tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group rounded-[26px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">{tool.emoji}</span>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${t.chip}`}>{tool.kind}</span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-stone-900">{tool.title}</h3>
          <p className="mt-1 text-sm text-stone-500">{tool.text}</p>
          <span className={`mt-3 inline-block text-sm font-semibold ${t.accentText} transition-transform group-hover:translate-x-1`}>Open →</span>
        </Link>
      ))}
    </div>
  );
}

// Strip for the bottom of each area page: its tools + free lessons + advisor.
export function AreaTools({ area }: { area: ToolArea["key"] }) {
  const a = TOOL_AREAS.find((x) => x.key === area)!;
  const t = THEMES[a.theme];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className={`absolute inset-0 -z-10 ${t.pageBg}`} />
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="text-center">
          <span className={`text-xs font-bold uppercase tracking-[0.2em] ${t.accentText}`}>Free & no account needed</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900 sm:text-5xl">{a.label} tools & lessons</h2>
        </div>
        <div className="mt-10">
          <ToolCards area={a} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={a.learn} className={`rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg transition-all hover:scale-105 ${t.button}`}>
            Free {a.label.toLowerCase()} lessons →
          </Link>
          <Link href="/advisor" className="rounded-full border border-stone-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-stone-700">
            Find your learning path
          </Link>
        </div>
      </div>
    </section>
  );
}
