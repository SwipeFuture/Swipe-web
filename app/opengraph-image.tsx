import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The preview card shown when a swipefuture.dev link is shared (WhatsApp, X,
// LinkedIn, iMessage, Discord …) and used by search engines as the page image.
export const alt = "Swipe — learn coding, finance, personal growth and AI in five minutes a day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENTS = [
  { label: "Coding", color: "#22E08A" },
  { label: "Finance", color: "#FBBF24" },
  { label: "Growth", color: "#FB923C" },
  { label: "AI", color: "#8B5CF6" },
];

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "app/icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "radial-gradient(circle at 80% 20%, #12301f 0%, #050505 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={112} height={112} style={{ borderRadius: 28 }} alt="" />
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -4 }}>Swipe</div>
        </div>
        <div style={{ marginTop: 34, fontSize: 54, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5, maxWidth: 980 }}>
          Learn the skills school skips — five minutes a day.
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {ACCENTS.map((a) => (
            <div
              key={a.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 26px",
                borderRadius: 999,
                border: `2px solid ${a.color}`,
                color: a.color,
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 14, background: a.color }} />
              {a.label}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", right: 90, bottom: 52, fontSize: 28, color: "#9a9a9a" }}>swipefuture.dev</div>
      </div>
    ),
    size
  );
}
