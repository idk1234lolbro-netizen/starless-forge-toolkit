import * as THREE from "three";
import { addSphere, addTube } from "../core/geometry.js";
import { createResult, diagnostic } from "../core/diagnostics.js";

export function createAccessories(spec = {}, palette) {
  const group = new THREE.Group();
  group.name = "CharacterAccessories";
  const accessories = Array.isArray(spec.accessories) ? spec.accessories : [];
  const warnings = [];
  for (const item of accessories) {
    switch (item.type) {
      case "earrings":
        for (const side of [-1, 1]) addSphere(group, palette.metal, [side * 0.47, 1.49, 0.035], [0.035, 0.055, 0.035], 12);
        break;
      case "hair_clip":
        addSphere(group, palette.clothesAccent, [Number(item.x) || 0.29, 2.02, 0.27], [0.12, 0.035, 0.035], 16);
        break;
      case "necklace":
        addTube(group, [[-0.17, 1.29, 0.17], [-0.12, 1.20, 0.22], [0, 1.16, 0.23], [0.12, 1.20, 0.22], [0.17, 1.29, 0.17]], palette.metal, 0.012, 24);
        break;
      case "glasses":
        for (const side of [-1, 1]) {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.012, 8, 20), palette.metal);
          ring.position.set(side * 0.19, 1.58, 0.35);
          group.add(ring);
        }
        addTube(group, [[-0.1, 1.58, 0.35], [0, 1.59, 0.37], [0.1, 1.58, 0.35]], palette.metal, 0.009, 8);
        break;
      default:
        warnings.push(diagnostic("warning", "ACCESSORY_UNSUPPORTED", "Accessory type is not implemented and was skipped.", { type: item.type ?? "unknown" }));
    }
  }
  return createResult("accessories", group, warnings, { requested: accessories.length, generated: accessories.length - warnings.length });
}
