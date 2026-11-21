# Starless Forge Toolkit

**An AI-first procedural 3D character generation toolkit for the AI inside Starless Forge.**

The toolkit provides reusable character-building systems. Nova, the website-building AI, integrates it into the existing website. The AI embedded in Starless Forge turns user requests into structured specifications and calls the toolkit. This is not a replacement editor and does not require users to manually model characters.

## Current branch capabilities

This Phase 2 branch improves the first procedural blockout across the major visual systems:

- **Body:** a continuous elliptical torso loft, shaped limb segments, joint volumes, hands and feet.
- **Face:** anime-inspired layered eyes with eye whites, irises, pupils and highlights, plus brows, nose, mouth and four expressions.
- **Hair:** volumetric tapered locks, layered rear hair, face-framing locks and fringe, with long, medium, short, ponytail and twin-tail styles.
- **Clothing:** fitted torso garments, tapered sleeves, flared skirts, coat tails and trousers, with uniform, dress, coat, pants and casual outfit choices.

The existing `generateCharacter(spec, { THREE })` API remains unchanged. The example below shows the new options available to a structured character specification:

```js
const spec = {
  proportions: { height: 1.7, shoulderWidth: 0.42, hipWidth: 0.36 },
  palette: {
    skin: "#f0c6ad",
    hair: "#342b42",
    eyes: "#477da8",
    clothes: "#303342"
  },
  face: {
    expression: "happy", // neutral, happy, serious, surprised
    eyeSize: 1.05,
    eyeSpacing: 1.0
  },
  hair: {
    style: "twin_tails", // long, medium, short, ponytail, twin_tails
    length: 1.05,
    strands: 16
  },
  clothing: {
    kind: "uniform", // uniform, dress, coat, pants, casual
    sleeves: "short" // long, short, sleeveless
  }
};
```

These are procedural shape-building improvements, not finished hand-authored anime assets. The branch still lacks production-quality continuous body topology, sculpted facial topology, UVs, painted textures, cloth simulation, rigging, animation and GLB export. A visual check in the real Forge viewport is still required.

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
