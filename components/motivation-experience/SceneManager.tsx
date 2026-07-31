"use client";

import Model from "./Model";
import CameraController from "./CameraController";
import BackgroundPlanes from "./BackgroundPlanes";
import { SCENES } from "./keyframes";

type SceneManagerProps = {
  progressRef: React.RefObject<number>;
};

function Lights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[8, 12, 6]} intensity={1.4} color="#fff6e8" />
      <directionalLight position={[-10, 4, -8]} intensity={0.35} color="#a8c8ff" />
      <hemisphereLight args={["#ffffff", "#33322f", 0.5]} />
    </>
  );
}

// Every model stays mounted for the whole experience — only its opacity (driven per-frame
// inside Model itself) changes — so there's never a mount/unmount pop as the camera glides
// from one scene into the next.
export default function SceneManager({ progressRef }: SceneManagerProps) {
  return (
    <>
      <Lights />
      <CameraController progressRef={progressRef} />
      <BackgroundPlanes progressRef={progressRef} />
      {SCENES.map((scene) => (
        <Model
          key={scene.id}
          path={scene.modelPath}
          targetSize={scene.targetSize}
          position={scene.modelPosition}
          rotation={scene.modelRotation}
          progressRef={progressRef}
          range={scene.range}
          fadeIn={scene.fadeIn}
          fadeOut={scene.fadeOut}
        />
      ))}
    </>
  );
}
