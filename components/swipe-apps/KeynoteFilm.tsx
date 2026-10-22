"use client";

import { useEffect, useRef, useState } from "react";

// The Swipe keynote ad (34 s, vertical) in a phone-shaped frame. Plays muted and
// looped only while it's on screen; the button turns the sound on.
export default function KeynoteFilm({ title = "See the apps in action", className = "" }: { title?: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    if (muted) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    setMuted(!muted);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{title}</span>
      <div className="relative mt-6 w-[260px] sm:w-[300px] lg:w-[320px]">
        <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-emerald-200 via-amber-100 to-violet-200 blur-3xl opacity-60" />
        <div className="relative rounded-[44px] bg-black p-2.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)] ring-1 ring-stone-300">
          <video
            ref={videoRef}
            className="block aspect-[9/16] w-full rounded-[36px] bg-stone-100 object-cover"
            src="/video/swipe-keynote.mp4"
            poster="/video/swipe-keynote-poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Swipe apps keynote film"
          />
          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
          >
            {muted ? "🔇 Sound on" : "🔊 Sound off"}
          </button>
        </div>
      </div>
    </div>
  );
}
