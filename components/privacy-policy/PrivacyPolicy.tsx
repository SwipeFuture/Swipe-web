"use client";

import { useEffect, useRef, useState } from "react";

// Each block is either a paragraph (string) or a bullet list (string array),
// rendered in order so sections can mix prose and lists.
const SECTIONS: {
  title: string;
  blocks: (string | string[])[];
  link?: { label: string; href: string };
}[] = [
  {
    title: "Introduction",
    blocks: [
      "Swipe (“we”, “our”, “us”) is a platform focused on helping people build knowledge in coding, artificial intelligence, finance and personal growth.",
      "We respect your privacy. This Privacy Policy explains what information may be collected when you visit Swipe and how it is used.",
    ],
  },
  {
    title: "Information We Collect",
    blocks: [
      "At this time, Swipe does not require user accounts and does not intentionally collect personal information such as your name, email address or payment details through the website.",
      "Like most websites, basic technical information (such as browser type, device information and pages visited) may be collected automatically by your browser or by our hosting provider to ensure the website functions correctly.",
    ],
  },
  {
    title: "How We Use Information",
    blocks: [
      "Any limited technical information is used only to:",
      [
        "keep the website running properly",
        "improve performance and user experience",
        "maintain the security and stability of Swipe",
      ],
      "We do not sell or share personal information for advertising purposes.",
    ],
  },
  {
    title: "Cookies",
    blocks: [
      "Swipe may use essential cookies or similar technologies that are necessary for the website to function properly.",
      "If additional analytics or optional cookies are introduced in the future, this Privacy Policy will be updated accordingly.",
    ],
  },
  {
    title: "Third-Party Services",
    blocks: [
      "Our website may rely on trusted third-party providers such as hosting or content delivery services. These providers may process limited technical information required to operate the website.",
    ],
  },
  {
    title: "Data Security",
    blocks: [
      "We take reasonable measures to protect the website and any information processed through it. However, no method of electronic transmission or storage can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your Rights",
    blocks: [
      "Depending on your location, you may have rights regarding your personal information under applicable privacy laws.",
      "If you have any questions or requests regarding privacy, you can contact us using the information below.",
    ],
  },
  {
    title: "Children's Privacy",
    blocks: [
      "Swipe is not intended for children under the age of 13. We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: "Changes to This Policy",
    blocks: [
      "We may update this Privacy Policy from time to time as Swipe grows and new features become available. Any changes will be published on this page.",
    ],
  },
  {
    title: "Contact Us",
    blocks: [
      "If you have any questions about this Privacy Policy, feel free to contact us.",
    ],
    link: { label: "Get in touch", href: "/contact" },
  },
];

export default function PrivacyPolicy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [parallax, setParallax] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  // Parallax on the background glows, tied to scroll position — same recipe as the rest of the site
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const sectionCenter = rect.top + rect.height / 2;
          const distance = viewportCenter - sectionCenter;
          setParallax(distance * 0.06);
        }
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const cardObserver = new IntersectionObserver(
      ([entry]) => setCardVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (cardRef.current) cardObserver.observe(cardRef.current);

    return () => {
      headerObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="privacy-policy"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 sm:py-36 lg:py-44 scroll-mt-24"
    >

      {/* ================= Background — same premium green language as the Hero ================= */}

      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-white via-gray-50 to-green-50" />

      <div
        className="absolute inset-0 -z-40 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax}px)` }}
      >

        <div className="absolute -top-10 -left-20 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full bg-green-300 blur-[110px] sm:blur-[150px] lg:blur-[190px] opacity-[0.16] animate-pulse" />

        <div className="hidden sm:block absolute top-1/3 right-0 w-[280px] h-[280px] lg:w-[500px] lg:h-[500px] rounded-full bg-emerald-200 blur-[110px] lg:blur-[170px] opacity-[0.16] -z-30 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gray-200 blur-[160px] opacity-20 -z-30 animate-[pulse_10s_ease-in-out_infinite]" />

      </div>

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${-parallax * 0.6}px)` }}
      >

        <div className="hidden md:block absolute -right-40 top-24 w-[500px] h-[500px] lg:-right-72 lg:w-[900px] lg:h-[900px] rounded-full border border-gray-200/50" />

        <div className="hidden lg:block absolute left-10 bottom-20 w-[380px] h-[380px] rounded-full border border-green-200/50" />

      </div>

      <div className="hidden sm:block absolute top-24 left-8 lg:top-32 lg:left-40 w-3 h-3 rounded-full bg-green-500 shadow-xl animate-bounce" />

      <div className="hidden sm:block absolute bottom-40 right-16 w-2 h-2 rounded-full bg-black/40" />

      <div className="hidden lg:block absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-green-400 animate-pulse" />

      <div
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
      >

        <div className="hidden lg:block absolute top-20 right-[14%] w-16 h-16 rounded-[22px] bg-white/50 backdrop-blur-xl border border-white rotate-12 shadow-xl" />

        <div className="hidden lg:block absolute bottom-24 left-[10%] w-12 h-12 rounded-2xl bg-green-100/60 backdrop-blur-xl border border-white/70 -rotate-6 shadow-lg" />

      </div>

      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,#000 1px,transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="hidden lg:block absolute top-28 left-1/3 w-40 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent rotate-12" />

      {/* Top / Bottom Fade — thin white sliver at each edge, matching the Navbar above and Footer below */}
      <div
        className="absolute top-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 z-10 w-full h-10 sm:h-14 lg:h-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #fff 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 85%, transparent 100%)",
        }}
      />

      {/* ================= Content ================= */}

      <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}

        <div
          ref={headerRef}
          className={`relative text-center transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >

          {/* Decorative liquid-glass image, tucked behind the header on larger screens */}
          <div className="hidden lg:block absolute -top-16 -right-16 w-56 h-56 rotate-6 opacity-90">
            <div className="absolute inset-4 rounded-full bg-green-300 blur-[80px] opacity-40 -z-10" />
            <img
              src="/liquid-glass-drei.png"
              alt=""
              className="w-full h-full object-cover rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-white/70"
            />
          </div>

          <div className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 sm:px-5 shadow-lg overflow-hidden">

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-green-100 to-transparent" />

            <div className="relative w-2 h-2 rounded-full bg-green-500 animate-pulse" />

            <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-gray-600">
              Legal
            </span>

          </div>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-black">
            Privacy{" "}
            <span className="bg-gradient-to-r from-black via-green-700 to-emerald-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-gray-400">
            Last updated: July 25, 2026
          </p>

          <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 max-w-2xl mx-auto">
            Your trust matters to us. Here&apos;s a clear, straightforward
            explanation of what data we collect, why we collect it, and how
            you stay in control.
          </p>

        </div>

        {/* Policy Card */}

        <div
          ref={cardRef}
          className={`relative mt-14 sm:mt-16 lg:mt-20 transition-all duration-1000 ease-out ${
            cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >

          <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/70 bg-white/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl">

            <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

            <div className="relative divide-y divide-gray-200/70">

              {SECTIONS.map((section, i) => (
                <div key={section.title} className={i === 0 ? "pb-8 sm:pb-10" : "py-8 sm:py-10"}>

                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-black">
                    {section.title}
                  </h2>

                  <div className="mt-3 space-y-3">
                    {section.blocks.map((block, j) =>
                      Array.isArray(block) ? (
                        <ul key={j} className="list-disc space-y-1.5 pl-5 text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                          {block.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p key={j} className="text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                          {block}
                        </p>
                      )
                    )}
                  </div>

                  {section.link && (
                    <a
                      href={section.link.href}
                      className="group/link mt-3 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-green-700 transition-colors duration-300 hover:text-green-800"
                    >
                      {section.link.label}
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        →
                      </span>
                    </a>
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
