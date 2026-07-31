"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { BACKGROUNDS, rangeOpacity } from "./keyframes";

type BackgroundPlanesProps = {
  progressRef: React.RefObject<number>;
};

const DISTANCE = 80;
const OVERSCAN = 1.05;

// Renders every background photo as a camera-facing plane *inside* the WebGL scene, instead
// of compositing a transparent <canvas> over a DOM layer behind it. The DOM-compositing
// approach is the more common R3F pattern, but WebGL's `alpha: true` context attribute is
// only a request — some browser/GPU/driver combinations silently ignore it and paint an
// opaque backbuffer regardless (confirmed here: the canvas clear stayed solid black even
// with alpha enabled and clearAlpha set to 0). Doing it in-scene sidesteps that entirely.
export default function BackgroundPlanes({ progressRef }: BackgroundPlanesProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const textures = useTexture(BACKGROUNDS.map((b) => encodeURI(b.src)));

  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });
  }, [textures]);

  useFrame(({ clock }) => {
    const p = progressRef.current ?? 0;
    const group = groupRef.current;
    if (!group) return;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    group.position.copy(camera.position).addScaledVector(forward, DISTANCE);
    group.quaternion.copy(camera.quaternion);

    const persp = camera as THREE.PerspectiveCamera;
    const fovRad = (persp.fov ?? 34) * (Math.PI / 180);
    const height = 2 * DISTANCE * Math.tan(fovRad / 2) * OVERSCAN;
    const width = height * (persp.aspect || 16 / 9);
    group.scale.set(width, height, 1);

    const t = clock.elapsedTime;

    BACKGROUNDS.forEach((bg, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const opacity = rangeOpacity(p, bg.range[0], bg.range[1], bg.fadeIn, bg.fadeOut);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity;
      mesh.visible = opacity > 0.001;

      // Slow autonomous "Ken Burns" drift, independent of scroll — each plate gets its own
      // period/phase so they never visibly sync up during a crossfade.
      const period = 26 + i * 3;
      const phase = i * 1.7;
      const wobble = Math.sin((t / period) * Math.PI * 2 + phase);
      mesh.scale.setScalar(1.1 + wobble * 0.04);
      mesh.position.set(Math.cos(phase) * wobble * 0.015, Math.sin(phase) * wobble * 0.01, 0);
    });
  });

  return (
    <group ref={groupRef}>
      {BACKGROUNDS.map((bg, i) => (
        <mesh
          key={bg.key}
          ref={(el) => { meshRefs.current[i] = el; }}
          // Transparent objects sort by renderOrder *before* distance — since these planes
          // use depthTest={false}, a plane with a renderOrder >= a model's (default 0) would
          // draw on top of it unconditionally once its fade-in crossed any nonzero opacity,
          // hiding the model behind an unoccluded background (this actually happened: models
          // only flickered through at the very edges of a crossfade, when the plane's opacity
          // was near 0). Keeping every plane's renderOrder well below any model's fixes it —
          // backgrounds always draw first, models always draw over them, regardless of the
          // camera-relative distances either happens to be at that frame.
          renderOrder={i - 100}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
