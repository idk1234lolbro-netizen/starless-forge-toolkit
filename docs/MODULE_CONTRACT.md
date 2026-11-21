# Generation Module Contract

This document defines the expected shape of a Starless Forge feature module. It is a design contract, not a claim that these interfaces have already been implemented.

## Responsibilities

A module must:
- own one clear modelling domain
- accept validated, normalized input
- return generated assets and structured diagnostics
- use shared coordinate, unit, and material conventions
- expose deterministic options such as a seed when randomness is used
- document unsupported cases and quality limitations

A module must not:
- parse raw natural-language prompts independently
- call an external AI service without an explicit adapter and configuration
- mutate unrelated modules' data
- hide failures or silently substitute unrelated geometry
- require a person to manually edit meshes in a desktop application

## Conceptual input

Each generation call should receive:
- a versioned module parameter object
- a shared generation context (units, coordinate system, seed, quality target)
- optional references to already-generated assets
- optional reference-image metadata prepared by Nova or an image-analysis component

Do not pass arbitrary prompt text as the only input to a geometry generator. Nova should first convert the request into structured parameters.

## Conceptual result

A successful module result should contain:
- generated geometry or a scene/object group
- material assignments or material requests
- a summary of what was generated
- warnings and quality measurements
- provenance for important inferred parameters
- module name and version

A failed result should contain a useful error code and explanation. It should not return a plausible-looking but unrelated fallback while claiming success.

## Shared conventions to decide before implementation

- Coordinate system and character forward direction
- World units and expected character height
- Origin and ground-plane convention
- Naming rules for generated objects
- Material and texture conventions
- Seed handling
- Error and warning format
- Supported runtime and export format

These conventions must be documented once and reused by every module.

## Quality levels

Quality targets should be explicit and testable. A higher setting may permit more geometry or refinement, but should not change the requested design.

Suggested broad levels:
- **Preview:** fast silhouette and proportion checks
- **Standard:** normal interactive generation quality
- **High:** additional geometry and refinement where supported

Avoid promising a quality level that a module cannot measure or deliver.

## Testing expectations

Every module should eventually include:
1. Input validation tests
2. A small deterministic fixture
3. Geometry integrity checks
4. A representative visual example
5. A documented list of known limitations

Visual tests should use fixed seeds and stable camera setups where practical. Test fixtures should remain small enough to run in ordinary development environments.
