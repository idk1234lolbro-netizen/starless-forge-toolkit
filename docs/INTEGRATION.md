# Integration with the in-website AI

The toolkit is designed to be called by the AI embedded in Starless Forge. It does not include a language model or make network requests.

## Basic call

```js
import { generateCharacter } from "@starless/forge-toolkit";

const result = generateCharacter({
  name: "Mira",
  proportions: { height: 1.68 },
  hair: { style: "long", length: 1.1, strands: 16 },
  clothing: { kind: "uniform" },
  accessories: [{ type: "hair_clip" }]
});

if (!result.ok) {
  // Show result.diagnostics to the AI so it can revise the specification.
} else {
  forgeScene.add(result.object);
}
```

The exact integration depends on the website's actual module system and Three.js instance. If the website already bundles Three.js, configure the toolkit to share that same Three.js dependency rather than loading a second copy.

## AI responsibility

The embedded AI should translate a user's natural-language request into a structured specification. It should not send raw prompt text directly to geometry functions.

For example, "long silver hair" becomes `hair: { style: "long", length: 1.1 }` and a hair colour in `palette.hair`. Unsupported details should be surfaced as diagnostics, not silently claimed as complete.

## Current implementation limits

The first procedural generator is a blockout-quality foundation. It uses primitive and curve-based geometry. It does not yet provide production anime anatomy, sculpted facial topology, realistic garment patterns, UV unwrapping, texture painting, hair physics, rigging, animation, or a GLB exporter. Those require dedicated, separately tested systems.

## Browser compatibility

The package uses Three.js geometry APIs and has no server, Python, CUDA, or native binary requirement. The host application remains responsible for scene rendering, controls, and asset export.
