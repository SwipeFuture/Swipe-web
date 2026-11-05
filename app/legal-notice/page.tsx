import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/legal-notice" },
  title: "Legal Notice | Swipe",
  description: "Who operates swipefuture.dev and how to contact us.",
};

export default function LegalNoticePage() {
  return (
    <section className="bg-white px-6 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">Legal Notice</h1>
        <h2 className="mt-10 text-lg font-bold text-black">Operator</h2>
        <address className="mt-3 text-base not-italic leading-7 text-gray-600">
          Roger Sigrist
          <br />
          Jungfrauweg 4
          <br />
          3053 Lätti
          <br />
          Switzerland
          <br />
          Email:{" "}
          <a href="mailto:swipefuture@icloud.com" className="underline underline-offset-2">
            swipefuture@icloud.com
          </a>
        </address>
      </div>
    </section>
  );
}
