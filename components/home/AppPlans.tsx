// How the plans in the Swipe apps work — explained plainly, nothing to buy on the website.
// Plan names and daily tokens mirror the apps' lib/tokens.js (Free 500, Go 1,000, Pro unlimited).
// No prices here on purpose: Apple sets them per country and the app shows the exact price first.

const wide = { fontStretch: "125%" } as const;

const PLANS = [
  { name: "Free", line: "500 tokens a day", detail: "About 5 lessons a day in all four apps. Free for as long as you like, no card needed.", face: "#E7FAF0", edge: "#BDEBD3", tag: "Most people start here" },
  { name: "Go", line: "1,000 tokens a day", detail: "About 10 lessons a day, for when you want to move faster.", face: "#FEF5DA", edge: "#F4DE9C", tag: "Optional" },
  { name: "Pro", line: "No daily limit", detail: "Learn as much as you want, every day.", face: "#F0EAFE", edge: "#D6C8FB", tag: "Optional" },
];

const FACTS = [
  { t: "Only for the apps", d: "Plans are for the iPhone apps and what's inside them. Everything on this website stays free, there is nothing to buy here." },
  { t: "Bought through Apple", d: "You subscribe with your Apple ID in the App Store. We never see your card or payment details." },
  { t: "Cancel any time", d: "In your iPhone Settings → your name → Subscriptions. No emails, no phone call, no questions." },
  { t: "One plan, all four apps", d: "A plan works with your one Swipe account in Coding, Finance, Personal Growth and AI." },
];

export default function AppPlans({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div>
      <H className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[40px]" style={wide}>
        Free to use. Plans if you want more.
      </H>
      <p className="mt-4 max-w-2xl text-[17px] leading-8 text-[#3a3a38]">
        Every lesson in the apps costs a few tokens. The free plan gives you enough for a steady habit. Go and Pro are monthly or yearly
        subscriptions, and the exact price in your currency is shown in the app before you decide.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.name} className="rounded-[24px] p-6" style={{ background: p.face, boxShadow: `0 5px 0 ${p.edge}` }}>
            <p className="text-[13px] font-bold text-[#121212]/60">{p.tag}</p>
            <p className="mt-1 text-[30px] font-extrabold leading-none" style={wide}>{p.name}</p>
            <p className="mt-3 text-[17px] font-bold">{p.line}</p>
            <p className="mt-1.5 text-[15px] leading-6 text-[#3a3a38]">{p.detail}</p>
          </div>
        ))}
      </div>

      <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {FACTS.map((f) => (
          <div key={f.t} className="border-t-2 border-[#ececea] pt-4">
            <dt className="text-[17px] font-extrabold" style={wide}>{f.t}</dt>
            <dd className="mt-1.5 text-[15px] leading-7 text-[#5c5c58]">{f.d}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
