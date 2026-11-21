import * as THREE from "three";
import { addSphere, addTube } from "../core/geometry.js";
import { createResult, diagnostic } from "../core/diagnostics.js";

export function createFace(spec = {}, palette) {
  const group = new THREE.Group();
  group.name = "CharacterFace";
  const face = spec.face ?? {};
  const width = Math.max(0.34, Math.min(0.62, Number(face.width) || 0.43));
  const height = Math.max(0.42, Math.min(0.72, Number(face.height) || 0.53));
  addSphere(group, palette.skin, [0, 1.52, 0], [width, height, 0.34], 32);

  const eyeY = 1.57;
  const eyeX = width * 0.43;
  for (const side of [-1, 1]) {
    addSphere(group, palette.eyeDark, [side * eyeX, eyeY, 0.305], [0.082, 0.105, 0.045], 20);
    addSphere(group, palette.eyes, [side * eyeX, eyeY - 0.005, 0.342], [0.056, 0.078, 0.025], 20);
    addSphere(group, palette.eyeDark, [side * eyeX, eyeY - 0.004, 0.363], [0.026, 0.052, 0.014], 16);
    addSphere(group, palette.skin, [side * (width + 0.015), 1.52, 0], [0.075, 0.115, 0.075], 16);
    addTube(group, [[side * (eyeX - 0.075), 1.70, 0.31], [side * eyeX, 1.73, 0.33], [side * (eyeX + 0.075), 1.70, 0.31]], palette.hair, 0.018, 12);
  }
  addSphere(group, palette.skin, [0, 1.48, 0.34], [0.035, 0.07, 0.045], 16);
  addTube(group, [[-0.055, 1.34, 0.325], [0, 1.325, 0.34], [0.055, 1.34, 0.325]], palette.mouth, 0.012, 10);

  const diagnostics = [];
  if (face.expression && !["neutral", "happy", "serious", "surprised"].includes(face.expression)) {
    diagnostics.push(diagnostic("warning", "FACE_EXPRESSION_UNSUPPORTED", "Expression is not implemented yet; a neutral face was generated.", { expression: face.expression }));
  }
  return createResult("face", group, diagnostics, { width, height, style: "stylized" });
}
