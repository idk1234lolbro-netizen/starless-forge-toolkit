# Starless Forge Toolkit

**An AI-first procedural 3D character generation toolkit for Nova AI.**

Starless Forge Toolkit is a JavaScript/Three.js library intended to give the AI inside Starless Forge reusable character-building capabilities. Nova interprets a user's request and produces a structured character specification; the toolkit turns that specification into scene objects and reports what it could and could not generate.

This is an internal generation library, not a manual 3D editor. The intended workflow does not require the user to sculpt models or operate Blender.

## Current status

The first procedural MVP is now implemented in `src/`. It can assemble a stylized blockout character from procedural body, face, hair, clothing, and accessory geometry, then validate basic mesh integrity.

**Important:** this is an early blockout generator, not a finished anime character modeller. It does not yet provide production-quality anatomy, detailed sculpted topology, UVs, painted textures, garment pattern simulation, rigging, animation, or a GLB exporter. Automated tests are included but have not yet been executed in this environment.

## Quick start

The package expects the host application to provide Three.js:

```sh
npm install
npm test
```

```js
import { generateCharacter } from "@starless/forge-toolkit";

const result = generateCharacter({
  name: "Mira",
  hair: { style: "long", length: 1.1, strands: 18 },
  clothing: { kind: "uniform" },
  accessories: [{ type: "hair_clip" }, { type: "earrings" }],
  palette: {
    hair: "#28243b",
    eyes: "#548ec0",
    clothes: "#30364b"
  }
});

if (result.ok) {
  forgeScene.add(result.object);
} else {
  console.warn(result.diagnostics);
}
```

See [the integration guide](docs/INTEGRATION.md) before connecting it to the in-website AI. The exact import method depends on how the Perchance website loads scripts and which Three.js instance it uses.

## Included modules

- Body proportions and basic limb construction
- Stylized face with eyes, brows, ears, nose, and mouth
- Layered curve-based hair with basic length/style options
- Simple clothing blockout
- A small accessory set
- Character assembly and mesh validation
- Structured warnings and generation metrics

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Module contract](docs/MODULE_CONTRACT.md)
- [Integration with the in-website AI](docs/INTEGRATION.md)
- [Roadmap](ROADMAP.md)

## Design principles

- AI-directed generation with structured inputs
- Modular systems for body, face, hair, clothing, and accessories
- Shared geometry conventions and reusable utilities
- Validation and diagnostics rather than silent failure
- Reproducible procedural operations where practical
- No mandatory Blender, Python, CUDA, or native binary dependency

## Development approach

Inspect the host application's existing Three.js setup before integration. Reuse its Three.js instance where possible. Do not claim a feature is production-ready until it has working code, automated tests, and representative visual examples.
