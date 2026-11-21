import test from "node:test";
import assert from "node:assert/strict";
import { generateCharacter } from "../src/index.js";

test("generates a non-empty character with finite geometry", () => {
  const result = generateCharacter({
    hair: { style: "long", length: 1.1, strands: 12 },
    clothing: { kind: "uniform" },
    accessories: [{ type: "glasses" }]
  });
  assert.equal(result.ok, true);
  assert.ok(result.metrics.meshCount > 0);
  assert.ok(result.metrics.vertexCount > 0);
  assert.ok(result.metrics.bounds.height > 1);
  assert.equal(result.diagnostics.some(d => d.severity === "error"), false);
  result.dispose();
});

test("reports unsupported options without crashing", () => {
  const result = generateCharacter({
    hair: { style: "dragon-wings" },
    clothing: { kind: "spacesuit" },
    accessories: [{ type: "unknown-item" }]
  });
  assert.equal(result.ok, true);
  assert.ok(result.diagnostics.some(d => d.code === "HAIR_STYLE_APPROXIMATED"));
  assert.ok(result.diagnostics.some(d => d.code === "CLOTHING_KIND_APPROXIMATED"));
  assert.ok(result.diagnostics.some(d => d.code === "ACCESSORY_UNSUPPORTED"));
  result.dispose();
});
