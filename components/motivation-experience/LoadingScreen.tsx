"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress, useGLTF } from "@react-three/drei";
import { MODEL_PATHS } from "./keyframes";

type LoadingScreenProps = {
  onDone: () => void;
};

const MIN_VISIBLE_MS = 500;

// drei's useProgress() is backed by THREE's shared loading manager, which every THREE.Loader
// (GLTFLoader for the models, TextureLoader for the background plates in BackgroundPlanes)
// reports to automatically — so this one hook alone tracks every asset the experience needs.
// Nothing fades out — and scrolling stays locked (see MotivationExperience) — until 100%.
export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const doneRef = useRef(false);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    MODEL_PATHS.forEach((path) => useGLTF.preload(path));
  }, []);

  const percent = Math.min(100, Math.round(progress));

  useEffect(() => {
    if (doneRef.current) return;
    if (percent < 100 || active) return;

    const elapsed = Date.now() - mountedAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

    const t = setTimeout(() => {
      doneRef.current = true;
      setFadingOut(true);
      const t2 = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 700);
      return () => clearTimeout(t2);
    }, wait);

    return () => clearTimeout(t);
  }, [percent, active, onDone]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-out ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/70" />

      <div className="relative flex flex-col items-center px-6">
        <p className="text-white/90 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide">
          Loading Experience
        </p>

        <div className="mt-8 w-56 sm:w-80 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white transition-[width] duration-200 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-4 text-white/60 text-sm font-mono tabular-nums">{percent}%</p>

        <p className="mt-2 text-white/30 text-xs tracking-[0.15em] uppercase">
          Preparing cinematic assets...
        </p>
      </div>
    </div>
  );
}
