import * as THREE from "three";
import { generateCharacter } from "../src/index.js";

const result = generateCharacter({
  name: "Mira",
  proportions: { height: 1.68, shoulderWidth: 0.4, hipWidth: 0.37 },
  face: { width: 0.42, height: 0.53, expression: "neutral" },
  hair: { style: "long", length: 1.15, strands: 18 },
  clothing: { kind: "uniform" },
  accessories: [{ type: "hair_clip" }, { type: "earrings" }],
  palette: { skin: "#f2c9b4", hair: "#28243b", eyes: "#548ec0", clothes: "#30364b", clothesAccent: "#b7b2cf" }
}, { THREE });

const scene = new THREE.Scene();
scene.add(result.object);
console.log({ ok: result.ok, metrics: result.metrics, diagnostics: result.diagnostics });