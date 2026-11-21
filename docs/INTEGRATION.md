# Integration with the in-website AI

The toolkit does not import or bundle Three.js. The host passes the exact Three.js namespace used by its viewport. Vendor the toolkit's src directory into the website, preserving folder structure; all toolkit imports are relative.

```js
const toolkit = await import("./vendor/starless-forge-toolkit/src/index.js");
const result = toolkit.generateCharacter(validatedSpec, { THREE: ctx.THREE });
if (!result.ok) {
  // Return result.diagnostics to the existing repair/critic pipeline.
} else {
  // result.object is a THREE.Group made with the viewport's Three.js instance.
  ctx.scene.add(result.object);
}
```

Do not add another Three.js import inside the toolkit. Pass the same THREE namespace used by Forge.

## API

`generateCharacter(spec, { THREE })` returns `{ ok, object, parts, diagnostics, metrics, dispose }`. Generation is synchronous. `object` is a THREE.Group. `dispose()` releases generated geometries and materials when discarded.

## Conventions

- Y-up, character stands near Y = 0, default nominal height 1.7 units.
- Character faces positive Z.
- No external AI, GPU compute, WASM, Python, or native binaries are required.

## AI responsibility

The embedded AI converts natural language into a structured specification. Do not pass raw prompts directly to geometry functions. Unsupported details should be surfaced as diagnostics.

## Current limits

This is a procedural blockout foundation, not a finished anime character modeller. It does not yet provide production anatomy, sculpted facial topology, realistic garment patterns, UVs, painted textures, hair physics, rigging, animation, or GLB export.