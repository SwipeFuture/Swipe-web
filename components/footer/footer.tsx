"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Swipey from "@/components/home/Swipey";

// Site footer (2026-11-10 design): plain white with a hairline, the Archivo wordmark, link
// columns and the four Swipeys in the app colours. No glows, blobs or parallax.

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M14 4 L14 15.2 A3.4 3.4 0 1 1 11.2 11.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4 C14.4 6.4 16.4 8.1 19 8.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SOCIALS = [
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@swipe_future?_r=1&_t=ZN-98UWTABxcuM" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/swipe.future?igsh=MThzeG92bDFkYnBhMw%3D%3D&utm_source=qr" },
];

const COLUMNS = [
  {
    heading: "Learning paths",
    links: [["Success Blueprint", "/blueprint"], ["Coding", "/coding"], ["Artificial Intelligence", "/ai"], ["Finance", "/finance"], ["Personal Growth", "/personal-growth"]],
  },
  {
    heading: "Free",
    links: [["Free Lessons", "/learn"], ["Free Tools", "/tools"], ["Learning Advisor", "/advisor"], ["The app", "/apps"]],
  },
  {
    heading: "Information",
    links: [["Contact", "/contact"], ["About", "/about"], ["Privacy Policy", "/privacy-policy"], ["Legal Notice", "/legal-notice"]],
  },
] as const;

const SWIPEYS = [
  ["#22E08A", "#B9F5D6"],
  ["#FBBF24", "#FDE9A8"],
  ["#FB923C", "#FED2AE"],
  ["#8B5CF6", "#D6C8FB"],
] as const;

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/motivation-experience") return null;

  return (
    <footer id="footer" className="scroll-mt-24 border-t-2 border-[#ececea] bg-white px-6 pb-10 pt-16 font-[family-name:var(--font-archivo)] text-[#121212] sm:px-10 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-xl" />
              <span className="text-[22px] font-extrabold" style={{ fontStretch: "125%" }}>SwipeFuture</span>
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-7 text-[#5c5c58]">
              Short lessons and free tools for coding, money, personal growth and AI.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#e6e6e3] text-[#3a3a38] transition-colors hover:border-[#121212] hover:text-[#121212]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[15px] font-extrabold" style={{ fontStretch: "115%" }}>{column.heading}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-[15px] text-[#3a3a38] underline-offset-4 hover:text-[#121212] hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t-2 border-[#ececea] pt-6">
          <p className="text-[14px] text-[#5c5c58]">© 2026 SwipeFuture</p>
          <div className="flex items-end gap-2" aria-hidden>
            {SWIPEYS.map(([accent, light]) => (
              <Swipey key={accent} accent={accent} accentLight={light} className="w-7" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
