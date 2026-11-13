import Link from "next/link";

// Shared layout for the two privacy pages (2026-11-10 design): left-aligned header, one ink
// colour, sections as a plain list with hairlines. The texts live in each page's SECTIONS.
export type PolicySection = {
  title: string;
  blocks: (string | string[])[];
  link?: { label: string; href: string };
};

export default function PolicyView({ label, title, updated, intro, sections }: { label: string; title: string; updated: string; intro: string; sections: PolicySection[] }) {
  return (
    <main className="bg-white px-6 pb-24 pt-28 text-[#121212] sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <span className="inline-flex rounded-lg bg-[#E6F0FF] px-2.5 py-1 text-[14px] font-bold text-[#0057C2]">{label}</span>
        <h1 className="mt-5 text-[38px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[56px]">{title}</h1>
        <p className="mt-4 text-[15px] text-[#5c5c58]">Last updated: {updated}</p>
        <p className="mt-6 text-[18px] leading-8 text-[#3a3a38]">{intro}</p>

        <div className="mt-12 divide-y-2 divide-[#ececea] border-t-2 border-[#ececea]">
          {sections.map((section) => (
            <section key={section.title} className="py-8">
              <h2 className="text-[22px] font-extrabold leading-tight sm:text-[26px]">{section.title}</h2>
              <div className="mt-3 space-y-3">
                {section.blocks.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="list-disc space-y-1.5 pl-5 text-[16px] leading-7 text-[#3a3a38]">
                      {block.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : (
                    <p key={j} className="text-[16px] leading-7 text-[#3a3a38]">{block}</p>
                  )
                )}
              </div>
              {section.link && (
                <Link href={section.link.href} className="mt-3 inline-block text-[16px] font-bold underline decoration-2 underline-offset-4 hover:decoration-[#0072FE]">
                  {section.link.label} →
                </Link>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
