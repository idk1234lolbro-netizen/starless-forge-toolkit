# Starless Forge Toolkit

**An AI-first 3D character generation toolkit for Nova AI.**

Starless Forge is intended to turn Nova's structured character plans into reusable 3D assets. Nova handles creative interpretation and orchestration; the toolkit provides predictable geometry-generation, assembly, validation, and export capabilities.

This is an internal toolkit, not a manual 3D editor. The intended workflow does not require the user to sculpt models or operate Blender.

## Current status

This repository is in its architecture and planning phase. The initial documentation is in place, but generator modules and runtime code have not yet been implemented or tested.

## Design principles

- AI-directed generation with structured inputs
- Modular systems for body, face, hair, clothing, and accessories
- Shared geometry conventions and reusable utilities
- Validation and diagnostics rather than silent failure
- Reproducible procedural operations where practical
- No mandatory Blender or desktop DCC dependency
- Clear handling of uncertainty in image references

## Documentation

- [Architecture](docs/ARCHITECTURE.md): system boundaries, pipeline, and design decisions
- [Module contract](docs/MODULE_CONTRACT.md): expected inputs, outputs, diagnostics, and tests
- [Roadmap](ROADMAP.md): staged implementation plan and current progress

## Planned generation flow

```text
Prompt and reference images
        -> Nova interpretation
        -> CharacterSpec
        -> generation modules
        -> assembly and validation
        -> GLB/glTF export + report
```

## Development approach

We will inspect the existing Nova project and runtime before selecting dependencies or implementing modules. The first feature module will be chosen based on that inspection, so existing capabilities are reused rather than duplicated.

No module should be described as complete until it has working code, automated tests, and a representative example.
