import Link from "next/link";

const EMAIL = "SwipeFuture@icloud.com";

const QUICK_ANSWERS = [
  { q: "Where do I start learning?", a: "Hundreds of short lessons in coding, money, personal growth and AI are free right here — no account needed.", href: "/learn", link: "Free lessons" },
  { q: "I don't know what to learn.", a: "Answer four quick questions and the learning advisor suggests the track that fits your goal and your time.", href: "/advisor", link: "Find your path" },
  { q: "When can I get the apps?", a: "The four Swipe apps are made for iPhone and coming to the App Store soon.", href: "/apps", link: "About the apps" },
  { q: "What happens with my data?", a: "The website needs no account, and we never sell your data.", href: "/privacy-policy", link: "Privacy policy" },
];

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7 L12 13 L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact() {
  return (
    <main className="bg-white px-6 pb-24 pt-28 text-[#121212] sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-lg bg-[#E7FAF0] px-2.5 py-1 text-[14px] font-bold text-[#127D4D]">Contact</span>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[1] tracking-[-0.025em] sm:text-[56px]">Write to us.</h1>
          <p className="mt-6 text-[18px] leading-8 text-[#3a3a38]">
            Questions about Swipe, feedback, a mistake in a lesson, or just want to say hi? Send an email and we&apos;ll get back to you as
            soon as we can.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#121212] px-6 py-4 text-[17px] font-bold text-white transition-colors hover:bg-[#2a2a2a]"
          >
            <MailIcon className="h-5 w-5" />
            {EMAIL}
          </a>
        </div>

        <h2 className="mt-20 text-[28px] font-extrabold leading-tight sm:text-[36px]">Quick answers</h2>
        <p className="mt-3 text-[17px] text-[#5c5c58]">Maybe your question is already answered here.</p>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {QUICK_ANSWERS.map((item) => (
            <div key={item.q} className="border-t-2 border-[#ececea] pt-5">
              <dt className="text-[19px] font-extrabold">{item.q}</dt>
              <dd className="mt-2 text-[16px] leading-7 text-[#3a3a38]">{item.a}</dd>
              <dd className="mt-3">
                <Link href={item.href} className="text-[16px] font-bold underline decoration-2 underline-offset-4 hover:decoration-[#22E08A]">
                  {item.link} →
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
