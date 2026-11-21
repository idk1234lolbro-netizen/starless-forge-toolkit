import * as THREE from "three";
import { addSphere, addCylinderBetween } from "../core/geometry.js";
import { createResult, diagnostic } from "../core/diagnostics.js";

export function createBody(spec = {}, palette) {
  const group = new THREE.Group();
  group.name = "CharacterBody";
  const proportions = spec.proportions ?? {};
  const height = Math.max(1, Number(proportions.height) || 1.7);
  const shoulder = Math.max(0.28, Math.min(0.7, Number(proportions.shoulderWidth) || 0.42));
  const hip = Math.max(0.25, Math.min(0.65, Number(proportions.hipWidth) || 0.36));
  const skin = palette.skin;
  const clothes = palette.clothes;
  const unit = height / 1.7;

  addSphere(group, clothes, [0, 1.02 * unit, 0], [shoulder * 0.94, 0.34 * unit, 0.19 * unit]);
  addSphere(group, clothes, [0, 0.72 * unit, 0], [hip * 0.88, 0.22 * unit, 0.17 * unit]);
  addSphere(group, skin, [0, 1.35 * unit, 0], [0.105 * unit, 0.12 * unit, 0.105 * unit]);

  const armSpread = shoulder * 1.05;
  for (const side of [-1, 1]) {
    addSphere(group, clothes, [side * armSpread, 1.04 * unit, 0], [0.13 * unit, 0.23 * unit, 0.13 * unit]);
    addCylinderBetween(group, skin, [side * (armSpread + 0.02 * unit), 0.9 * unit, 0], [side * (armSpread + 0.06 * unit), 0.61 * unit, 0], 0.075 * unit, 0.09 * unit);
    addSphere(group, skin, [side * (armSpread + 0.06 * unit), 0.58 * unit, 0], [0.075 * unit, 0.09 * unit, 0.065 * unit]);
    const legX = side * hip * 0.43;
    addCylinderBetween(group, clothes, [legX, 0.68 * unit, 0], [legX, 0.27 * unit, 0], 0.12 * unit, 0.085 * unit);
    addCylinderBetween(group, skin, [legX, 0.28 * unit, 0], [legX, 0.09 * unit, 0], 0.078 * unit, 0.07 * unit);
    addSphere(group, palette.shoes, [legX, 0.055 * unit, 0.045 * unit], [0.105 * unit, 0.055 * unit, 0.17 * unit]);
  }

  const issues = [];
  if (height < 1.2 || height > 2.4) issues.push(diagnostic("warning", "BODY_HEIGHT_UNUSUAL", "Requested height is outside the usual stylized character range.", { height }));
  return createResult("body", group, issues, { height, shoulderWidth: shoulder, hipWidth: hip });
}
