"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import BackgroundLayer from "./BackgroundLayer";
import SceneManager from "./SceneManager";
import TextOverlay from "./TextOverlay";
import LoadingScreen from "./LoadingScreen";
import ScrollController from "./ScrollController";
import BackButton from "./BackButton";

// Top-level orchestrator. `progress` (0..1) lives in a ref, not React state — it's written
// every scroll frame by ScrollController and read every render frame by CameraController /
// BackgroundLayer / TextOverlay, so the entire cinematic never depends on a React re-render.
// Until LoadingScreen reports every asset is ready, the page stays scroll-locked and static.
export default function MotivationExperience() {
  const progressRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [loaded]);

  return (
    <div className="relative w-full bg-black">
      <BackgroundLayer progressRef={progressRef} />

      <div className="fixed inset-0 z-0">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 1.4, 16], fov: 34, near: 0.1, far: 200 }}
          onCreated={({ gl }) => {
            // `alpha: true` alone isn't enough — WebGLRenderer's clear alpha still defaults
            // to 1 (opaque), so without this the canvas paints solid black over the whole
            // viewport and hides BackgroundLayer sitting behind it.
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <SceneManager progressRef={progressRef} />
          </Suspense>
        </Canvas>
      </div>

      <TextOverlay progressRef={progressRef} />

      <BackButton />

      <ScrollController progressRef={progressRef} enabled={loaded} />

      <LoadingScreen onDone={() => setLoaded(true)} />
    </div>
  );
}
