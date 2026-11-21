import * as THREE from "three";
import { makePalette } from "./core/materials.js";
import { createBody } from "./modules/body.js";
import { createFace } from "./modules/face.js";
import { createHair } from "./modules/hair.js";
import { createClothing } from "./modules/clothing.js";
import { createAccessories } from "./modules/accessories.js";
import { validateObject3D } from "./core/validate.js";

export { createBody } from "./modules/body.js";
export { createFace } from "./modules/face.js";
export { createHair } from "./modules/hair.js";
export { createClothing } from "./modules/clothing.js";
export { createAccessories } from "./modules/accessories.js";
export { validateObject3D } from "./core/validate.js";

/**
 * Build a stylized base character from a normalized specification.
 * The caller owns rendering, lighting, controls, and export.
 */
export function generateCharacter(spec = {}) {
  const root = new THREE.Group();
  root.name = spec.name ?? "GeneratedCharacter";
  const palette = makePalette(spec);
  const parts = [
    createBody(spec, palette),
    createClothing(spec, palette),
    createFace(spec, palette),
    createHair(spec, palette),
    createAccessories(spec, palette)
  ];
  for (const part of parts) root.add(part.object);
  const validation = validateObject3D(root);
  return {
    ok: validation.ok && parts.every(part => part.ok),
    object: root,
    parts: parts.map(({ module, diagnostics, metrics }) => ({ module, diagnostics, metrics })),
    diagnostics: [...parts.flatMap(part => part.diagnostics), ...validation.diagnostics],
    metrics: validation.metrics,
    dispose() {
      root.traverse(object => {
        if (!object.isMesh) return;
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) object.material.forEach(m => m.dispose?.());
        else object.material?.dispose?.();
      });
    }
  };
}
