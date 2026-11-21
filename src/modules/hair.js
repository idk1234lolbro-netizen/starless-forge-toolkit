import * as THREE from "three";
import { addSphere, addTube } from "../core/geometry.js";
import { createResult, diagnostic } from "../core/diagnostics.js";

export function createHair(spec = {}, palette) {
  const group = new THREE.Group();
  group.name = "CharacterHair";
  const hair = spec.hair ?? {};
  const style = hair.style ?? "long";
  const length = Math.max(0.35, Math.min(1.8, Number(hair.length) || (style === "short" ? 0.45 : 1.05)));
  const strands = Math.max(6, Math.min(32, Math.floor(Number(hair.strands) || 16)));
  addSphere(group, palette.hair, [0, 1.91, -0.015], [0.445, 0.29, 0.37], 32);

  const sideLength = style === "short" ? 0.48 : length;
  for (const side of [-1, 1]) {
    for (let i = 0; i < Math.ceil(strands / 2); i++) {
      const t = i / Math.max(1, Math.ceil(strands / 2) - 1);
      const x = side * (0.12 + t * 0.29);
      const z = 0.06 - t * 0.17;
      const endY = 1.82 - sideLength;
      addTube(group, [[x * 0.72, 2.08, z], [x, 1.94, z + 0.025], [x * 1.08, 1.68, z], [x * 1.03, endY, z - 0.035]], i % 4 === 0 ? palette.hairAccent : palette.hair, 0.045 + (1 - t) * 0.018, 20);
    }
  }

  const fringeCount = Math.max(3, Math.floor(strands / 3));
  for (let i = 0; i < fringeCount; i++) {
    const x = (i / (fringeCount - 1) - 0.5) * 0.66;
    addTube(group, [[x * 0.72, 2.12, 0.13], [x, 2.0, 0.29], [x * 0.92, 1.82, 0.34], [x * 0.82, 1.68 + (i % 2) * 0.055, 0.31]], palette.hair, 0.052, 18);
  }

  const diagnostics = [];
  if (!["long", "short", "medium", "twin_tails", "ponytail"].includes(style)) {
    diagnostics.push(diagnostic("warning", "HAIR_STYLE_APPROXIMATED", "Unknown hairstyle was approximated with the default layered style.", { requestedStyle: style }));
  }
  if (["twin_tails", "ponytail"].includes(style)) {
    for (const side of (style === "twin_tails" ? [-1, 1] : [1])) {
      addTube(group, [[side * 0.34, 1.96, -0.12], [side * 0.52, 1.72, -0.18], [side * 0.63, 1.35, -0.2], [side * 0.55, 1.12 - length * 0.35, -0.18]], palette.hair, 0.09, 24);
    }
  }
  return createResult("hair", group, diagnostics, { style, length, strandGroups: strands });
}
