# Starless Forge Toolkit

**An AI-first procedural 3D character generation toolkit for the AI inside Starless Forge.**

The toolkit provides reusable character-building systems. Nova, the website-building AI, integrates it into the existing website. The AI embedded in Starless Forge turns user requests into structured specifications and calls the toolkit. This is not a replacement editor and does not require users to manually model characters.

## Current status

The procedural MVP assembles a stylized blockout character from body, face, hair, clothing, and accessory geometry, then validates basic mesh integrity.

**This is not a finished anime character modeller.** It does not yet provide production-quality anatomy, detailed topology, UVs, painted textures, garment simulation, rigging, animation, or a GLB exporter.

## Three.js compatibility

The toolkit does not import or bundle Three.js. Pass the host application's own namespace:

```js
import { generateCharacter } from "./src/index.js";
const result = generateCharacter(spec, { THREE: ctx.THREE });
ctx.scene.add(result.object);
```

This avoids a duplicate Three.js instance and supports Forge's existing Three.js 0.160.0 setup.

## Development

Requires Node.js 20 or newer.

```sh
npm install
npm test
```

See [the integration guide](docs/INTEGRATION.md).