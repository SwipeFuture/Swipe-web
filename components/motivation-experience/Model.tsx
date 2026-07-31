"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { rangeOpacity, type Vec3 } from "./keyframes";

type ModelProps = {
  path: string;
  targetSize: number;
  position: Vec3;
  rotation: Vec3;
  progressRef: React.RefObject<number>;
  range: [number, number];
  fadeIn: number;
  fadeOut: number;
};

// The real GLB files' internal scale/pivot are unknown, so every model is auto-fit: measure
// its bounding box once, derive a uniform scale from the target size, and re-center it on
// its own pivot group — this way every scene composes the same way regardless of how the
// source file was originally modeled/exported.
//
// Opacity is driven imperatively via useFrame (not React state/props) so 60fps fades never
// trigger a re-render — only the mesh materials and group visibility are touched directly.
export default function Model({ path, targetSize, position, rotation, progressRef, range, fadeIn, fadeOut }: ModelProps) {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);
  const materials = useRef<(THREE.Material & { opacity: number })[]>([]);

  const { fitted, scale, center, mats } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 0.0001);
    const s = targetSize / maxDim;
    const boxCenter = new THREE.Vector3();
    box.getCenter(boxCenter);

    const materialList: (THREE.Material & { opacity: number })[] = [];
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        const list = Array.isArray(child.material) ? child.material : [child.material];
        list.forEach((mat) => {
          if (!mat) return;
          mat.transparent = true;
          materialList.push(mat as THREE.Material & { opacity: number });
        });
      }
    });

    return { fitted: cloned, scale: s, center: boxCenter, mats: materialList };
  }, [scene, targetSize]);

  useEffect(() => {
    materials.current = mats;
  }, [mats]);

  useFrame(() => {
    const p = progressRef.current ?? 0;
    const opacity = rangeOpacity(p, range[0], range[1], fadeIn, fadeOut);
    if (groupRef.current) groupRef.current.visible = opacity > 0.001;
    materials.current.forEach((mat) => {
      mat.opacity = opacity;
      mat.depthWrite = opacity > 0.9;
    });
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group scale={scale} position={[-center.x * scale, -center.y * scale, -center.z * scale]}>
        <primitive object={fitted} />
      </group>
    </group>
  );
}
