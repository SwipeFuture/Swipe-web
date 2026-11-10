// "For learning only" note for finance and personal-growth pages, which touch on money and
// health. Growth also points to real help for anyone who is struggling.
export default function AdviceNote({ area, className = "" }: { area: "finance" | "growth"; className?: string }) {
  return (
    <aside className={`rounded-[22px] border border-stone-200/80 bg-white p-5 text-sm leading-6 text-stone-600 ${className}`}>
      {area === "finance" ? (
        <p>
          <strong className="font-semibold text-stone-800">For learning only.</strong> Nothing here is financial, investment, tax or legal advice, and examples
          and results are illustrations, not promises. For decisions about your own money, talk to a qualified professional.
        </p>
      ) : (
        <p>
          <strong className="font-semibold text-stone-800">For learning only.</strong> Nothing here is medical or psychological advice, diagnosis or treatment.
          If you&apos;re struggling, talk to someone you trust or a doctor. If you&apos;re in crisis or in danger, call your local emergency number or find a free
          helpline at{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
            findahelpline.com
          </a>
          .
        </p>
      )}
    </aside>
  );
}
