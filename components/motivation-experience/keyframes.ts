// All shared timing/data constants for the Motivation Experience. Progress is a single
// number 0..1 driven by scroll (see ScrollController) — every other file (camera, scenes,
// backgrounds, text) is just a pure function of that one number, so nothing ever falls out
// of sync no matter how fast or slow the user scrolls.

export type Vec3 = [number, number, number];

export type CameraKeyframe = {
  t: number; // global progress 0..1
  position: Vec3;
  target: Vec3;
  fov: number;
};

// One continuous path for the whole journey — jet, ocean, yacht, villa, finale — so the
// camera never has to "jump" between independent per-scene coordinate spaces.
export const MASTER_CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { t: 0.0, position: [0, 1.4, 16], target: [0, 0.3, 0], fov: 34 },
  { t: 0.08, position: [2, 1.6, 9], target: [0, 0.4, 0], fov: 31 },
  { t: 0.14, position: [4.5, 2, 4], target: [0, 0.4, 0], fov: 29 },
  { t: 0.2, position: [1, 2.4, -4.5], target: [0, 0.5, 0], fov: 28 },
  { t: 0.26, position: [-4, 3.2, -2], target: [0, 0.6, 0], fov: 29 },
  { t: 0.3, position: [-2, 5, 10], target: [0, 1, 0], fov: 32 },
  { t: 0.34, position: [0, 3, 18], target: [0, 0.5, 0], fov: 36 },
  { t: 0.4, position: [3, 2, 10], target: [0, 0.6, 0], fov: 31 },
  { t: 0.46, position: [6, 2.6, 4], target: [0, 0.8, 0], fov: 28 },
  { t: 0.52, position: [2, 3.4, -6], target: [0, 1, 0], fov: 27 },
  { t: 0.58, position: [-5, 4, -2], target: [0, 1.2, 0], fov: 28 },
  { t: 0.62, position: [-2, 7, 14], target: [0, 1.5, 0], fov: 34 },
  { t: 0.66, position: [0, 4, 22], target: [0, 1, 0], fov: 38 },
  { t: 0.72, position: [5, 3, 12], target: [0, 1.5, 0], fov: 30 },
  { t: 0.78, position: [10, 3.6, 4], target: [1, 1.6, 0], fov: 27 },
  { t: 0.84, position: [2, 4.2, -8], target: [0, 1.8, 0], fov: 27 },
  { t: 0.9, position: [-6, 6, -4], target: [0, 2, 0], fov: 29 },
  { t: 0.95, position: [0, 14, 20], target: [0, 2, 0], fov: 36 },
  { t: 1.0, position: [0, 26, 34], target: [0, 3, 0], fov: 40 },
];

export type SceneConfig = {
  id: string;
  modelPath: string;
  targetSize: number;
  modelPosition: Vec3;
  modelRotation: Vec3;
  range: [number, number];
  fadeIn: number;
  fadeOut: number;
};

export const SCENES: SceneConfig[] = [
  {
    id: "jet",
    modelPath: "/uploads_files_2139909_private_jet_black.glb",
    targetSize: 6,
    modelPosition: [0, -0.4, 0],
    modelRotation: [0, Math.PI * 0.15, 0],
    range: [0, 0.28],
    fadeIn: 0.0,
    fadeOut: 0.04,
  },
  {
    id: "yacht",
    modelPath: "/frickies_yacht.glb",
    targetSize: 8,
    modelPosition: [0, -0.6, 0],
    modelRotation: [0, -Math.PI * 0.1, 0],
    range: [0.28, 0.64],
    fadeIn: 0.04,
    fadeOut: 0.04,
  },
  {
    id: "villa",
    modelPath: "/modern_coastal_hillside_villa.glb",
    targetSize: 10,
    modelPosition: [0, -0.8, 0],
    modelRotation: [0, Math.PI * 0.08, 0],
    range: [0.62, 1.0],
    fadeIn: 0.06,
    fadeOut: 0.0,
  },
];

export const MODEL_PATHS = SCENES.map((s) => s.modelPath);

export type BackgroundConfig = {
  key: string;
  src: string;
  range: [number, number];
  fadeIn: number;
  fadeOut: number;
};

export const BACKGROUNDS: BackgroundConfig[] = [
  { key: "sunrise", src: "/sonnenuntergang.png", range: [0, 0.16], fadeIn: 0.0, fadeOut: 0.07 },
  { key: "clouds", src: "/wolken.png", range: [0.1, 0.34], fadeIn: 0.06, fadeOut: 0.07 },
  { key: "ocean", src: "/ozean.png", range: [0.27, 0.6], fadeIn: 0.07, fadeOut: 0.07 },
  { key: "mountains", src: "/berglandschaft.png", range: [0.53, 0.72], fadeIn: 0.07, fadeOut: 0.07 },
  { key: "skyline", src: "/city skyline.png", range: [0.65, 1.0], fadeIn: 0.07, fadeOut: 0.0 },
];

export type TextBeat = {
  id: string;
  start: number;
  end: number;
  fade: number;
  title: string;
  body?: string;
  final?: boolean;
};

export const TEXT_BEATS: TextBeat[] = [
  {
    id: "jet-approach",
    start: 0.02,
    end: 0.11,
    fade: 0.025,
    title: "Every dream begins with a decision.",
  },
  {
    id: "jet-orbit",
    start: 0.15,
    end: 0.25,
    fade: 0.03,
    title: "Nobody starts here.",
    body: "The freedom you see was never given. It was built — one decision at a time — by people who started with nothing but the will to move forward.",
  },
  {
    id: "yacht-orbit",
    start: 0.44,
    end: 0.56,
    fade: 0.03,
    title: "Freedom isn't bought overnight.",
    body: "It's earned through discipline, patience, and the courage to keep going when no one is watching.",
  },
  {
    id: "villa-flyby",
    start: 0.74,
    end: 0.87,
    fade: 0.03,
    title: "The work happens here.",
    body: "Behind every success story are countless hours of focus, learning, and growth that no one ever sees.",
  },
  {
    id: "finale",
    start: 0.94,
    end: 1.0,
    fade: 0.04,
    title: "Build Skills. Build Freedom. Build Your Future.",
    final: true,
  },
];

export const WHITE_FLASH = { start: 0.55, peak: 0.6, end: 0.65 };
export const FINALE_FADE_START = 0.93;

export const TOTAL_SCROLL_VH = 700;

export function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x < edge0 ? 0 : 1;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

// Fade in over `fadeIn`, hold, fade out over `fadeOut` before `end` — used for text beats and
// scene/background opacity so every appearance/disappearance is a soft cross-fade. `fadeIn`/
// `fadeOut` are taken independently (previously a single shared value fell back from fadeIn
// to fadeOut via `||`, which meant an intentional `fadeIn: 0` — "be fully visible right at
// the start of the range" — silently used the *fadeOut* window instead, so the very first
// scene/background stayed invisible until progress crept past that unrelated duration).
export function rangeOpacity(progress: number, start: number, end: number, fadeIn: number, fadeOut: number = fadeIn): number {
  if (progress < start || progress > end) return 0;
  const inOp = smoothstep(start, start + fadeIn, progress);
  const outOp = 1 - smoothstep(end - fadeOut, end, progress);
  return Math.min(inOp, outOp);
}

export function bumpOpacity(progress: number, start: number, peak: number, end: number): number {
  if (progress <= start || progress >= end) return 0;
  if (progress <= peak) return smoothstep(start, peak, progress);
  return 1 - smoothstep(peak, end, progress);
}

// Soft white flash between the yacht and villa scenes only — the finale fades to black
// instead (see getFinaleOverlayOpacity), so it isn't folded in here anymore.
export function getWhiteOverlayOpacity(progress: number): number {
  return bumpOpacity(progress, WHITE_FLASH.start, WHITE_FLASH.peak, WHITE_FLASH.end);
}

export function getFinaleOverlayOpacity(progress: number): number {
  return progress >= FINALE_FADE_START ? smoothstep(FINALE_FADE_START, 1.0, progress) : 0;
}

// Cubic Hermite spline through every keyframe (Catmull-Rom style tangents, but computed from
// the keyframes' *actual* non-uniform t-spacing instead of assuming even spacing). Unlike a
// simple per-segment lerp, this keeps velocity continuous across keyframe boundaries — no
// sudden speed-up/slow-down snaps — which is what made the camera orbit feel fast/jerky before.
function buildTangents(values: number[], ts: number[]): number[] {
  const n = values.length;
  const tangents = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      tangents[i] = (values[1] - values[0]) / (ts[1] - ts[0]);
    } else if (i === n - 1) {
      tangents[i] = (values[i] - values[i - 1]) / (ts[i] - ts[i - 1]);
    } else {
      tangents[i] = (values[i + 1] - values[i - 1]) / (ts[i + 1] - ts[i - 1]);
    }
  }
  return tangents;
}

function hermite(p0: number, p1: number, m0: number, m1: number, dt: number, s: number): number {
  const s2 = s * s;
  const s3 = s2 * s;
  const h00 = 2 * s3 - 3 * s2 + 1;
  const h10 = s3 - 2 * s2 + s;
  const h01 = -2 * s3 + 3 * s2;
  const h11 = s3 - s2;
  return h00 * p0 + h10 * dt * m0 + h01 * p1 + h11 * dt * m1;
}

const KF_TS = MASTER_CAMERA_KEYFRAMES.map((k) => k.t);
const KF_CHANNELS = {
  px: MASTER_CAMERA_KEYFRAMES.map((k) => k.position[0]),
  py: MASTER_CAMERA_KEYFRAMES.map((k) => k.position[1]),
  pz: MASTER_CAMERA_KEYFRAMES.map((k) => k.position[2]),
  tx: MASTER_CAMERA_KEYFRAMES.map((k) => k.target[0]),
  ty: MASTER_CAMERA_KEYFRAMES.map((k) => k.target[1]),
  tz: MASTER_CAMERA_KEYFRAMES.map((k) => k.target[2]),
  fov: MASTER_CAMERA_KEYFRAMES.map((k) => k.fov),
};
const KF_TANGENTS = {
  px: buildTangents(KF_CHANNELS.px, KF_TS),
  py: buildTangents(KF_CHANNELS.py, KF_TS),
  pz: buildTangents(KF_CHANNELS.pz, KF_TS),
  tx: buildTangents(KF_CHANNELS.tx, KF_TS),
  ty: buildTangents(KF_CHANNELS.ty, KF_TS),
  tz: buildTangents(KF_CHANNELS.tz, KF_TS),
  fov: buildTangents(KF_CHANNELS.fov, KF_TS),
};

export type CameraState = { position: Vec3; target: Vec3; fov: number };

export function getCameraState(progress: number): CameraState {
  const p = clamp01(progress);
  const n = KF_TS.length;

  if (p <= KF_TS[0]) {
    const k = MASTER_CAMERA_KEYFRAMES[0];
    return { position: k.position, target: k.target, fov: k.fov };
  }
  if (p >= KF_TS[n - 1]) {
    const k = MASTER_CAMERA_KEYFRAMES[n - 1];
    return { position: k.position, target: k.target, fov: k.fov };
  }

  let i = 0;
  while (i < n - 2 && KF_TS[i + 1] < p) i++;

  const dt = KF_TS[i + 1] - KF_TS[i];
  const s = dt > 0 ? (p - KF_TS[i]) / dt : 0;

  const sample = (channel: keyof typeof KF_CHANNELS) =>
    hermite(KF_CHANNELS[channel][i], KF_CHANNELS[channel][i + 1], KF_TANGENTS[channel][i], KF_TANGENTS[channel][i + 1], dt, s);

  return {
    position: [sample("px"), sample("py"), sample("pz")],
    target: [sample("tx"), sample("ty"), sample("tz")],
    fov: sample("fov"),
  };
}
