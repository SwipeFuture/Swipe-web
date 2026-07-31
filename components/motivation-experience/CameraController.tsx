"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getCameraState } from "./keyframes";

type CameraControllerProps = {
  progressRef: React.RefObject<number>;
};

// Reads the scroll progress ref directly every frame (no React state) so the camera stays
// buttery smooth at 60fps — a state-driven re-render per scroll tick would be far too slow.
// The raw target position is additionally damped toward the previous frame's value so even
// a jumpy scroll input still reads as a slow, cinematic glide.
export default function CameraController({ progressRef }: CameraControllerProps) {
  const { camera } = useThree();
  const smoothedPos = useRef(new THREE.Vector3());
  const smoothedTarget = useRef(new THREE.Vector3());
  const smoothedFov = useRef(34);
  const initialized = useRef(false);

  // useFrame runs on R3F's own render-loop (rAF), outside React's render phase — mutating the
  // three.js camera object here is the standard, required way to drive it every frame.
  /* eslint-disable react-hooks/immutability */
  useFrame((_, delta) => {
    const progress = progressRef.current ?? 0;
    const state = getCameraState(progress);

    const targetPos = new THREE.Vector3(...state.position);
    const targetLook = new THREE.Vector3(...state.target);

    if (!initialized.current) {
      smoothedPos.current.copy(targetPos);
      smoothedTarget.current.copy(targetLook);
      initialized.current = true;
    }

    // A gentler decay constant than a typical damp (0.02 vs. the more common 0.001) — combined
    // with the Hermite-spline path in keyframes.ts, this keeps the orbit reading as a slow,
    // continuous glide instead of snapping toward each new scroll position.
    const damp = 1 - Math.pow(0.02, delta);
    smoothedPos.current.lerp(targetPos, damp);
    smoothedTarget.current.lerp(targetLook, damp);

    camera.position.copy(smoothedPos.current);
    camera.lookAt(smoothedTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      smoothedFov.current += (state.fov - smoothedFov.current) * damp;
      camera.fov = smoothedFov.current;
      camera.updateProjectionMatrix();
    }
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}
