import * as THREE from "three";
import { addSphere, addCylinderBetween } from "../core/geometry.js";
import { createResult, diagnostic } from "../core/diagnostics.js";

export function createClothing(spec = {}, palette) {
  const group = new THREE.Group();
  group.name = "CharacterClothing";
  const clothing = spec.clothing ?? {};
  const kind = clothing.kind ?? "uniform";
  addSphere(group, palette.clothes, [0, 1.02, 0], [0.405, 0.35, 0.205], 28);
  addSphere(group, palette.clothesAccent, [0, 1.25, 0.015], [0.19, 0.12, 0.215], 20);
  addCylinderBetween(group, palette.clothesAccent, [0, 1.17, 0.205], [0, 0.93, 0.205], 0.012, 0.012, 8);

  if (kind === "dress" || kind === "uniform" || kind === "coat") {
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.52, 0.42, 32, 1, false), palette.clothes);
    skirt.position.y = 0.72;
    skirt.castShadow = true;
    group.add(skirt);
    if (kind === "coat") {
      addSphere(group, palette.clothesAccent, [0, 0.98, 0.205], [0.045, 0.28, 0.025], 16);
    }
  } else if (kind === "pants") {
    for (const side of [-1, 1]) {
      addCylinderBetween(group, palette.clothes, [side * 0.15, 0.78, 0], [side * 0.15, 0.28, 0], 0.13, 0.09, 20);
    }
  }

  const diagnostics = [];
  if (!["dress", "uniform", "coat", "pants", "casual"].includes(kind)) {
    diagnostics.push(diagnostic("warning", "CLOTHING_KIND_APPROXIMATED", "Unknown clothing kind was approximated with a simple outfit.", { kind }));
  }
  return createResult("clothing", group, diagnostics, { kind });
}
