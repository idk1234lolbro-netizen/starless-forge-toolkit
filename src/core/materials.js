import * as THREE from "three";

export function makeMaterial(color = "#b8a0a0", options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.78,
    metalness: options.metalness ?? 0,
    ...(options.transparent ? { transparent: true, opacity: options.opacity ?? 1 } : {})
  });
}

export function makePalette(spec = {}) {
  const p = spec.palette ?? {};
  return {
    skin: makeMaterial(p.skin ?? "#f0c6ad"),
    hair: makeMaterial(p.hair ?? "#342b42"),
    hairAccent: makeMaterial(p.hairAccent ?? p.hair ?? "#342b42"),
    eyes: makeMaterial(p.eyes ?? "#477da8", { roughness: 0.35 }),
    eyeDark: makeMaterial("#17151b", { roughness: 0.35 }),
    clothes: makeMaterial(p.clothes ?? "#303342"),
    clothesAccent: makeMaterial(p.clothesAccent ?? "#a9a5bd"),
    shoes: makeMaterial(p.shoes ?? "#25232a"),
    metal: makeMaterial(p.metal ?? "#c6b7a0", { metalness: 0.72, roughness: 0.28 }),
    mouth: makeMaterial("#985e61")
  };
}
