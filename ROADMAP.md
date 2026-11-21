# Starless Forge Toolkit Roadmap

The roadmap is ordered to reduce rework. A stage is complete only when its code, tests, and documentation exist and the result has been checked.

## Stage 0: Understand the project

- [x] Confirm repository access.
- [x] Record the AI-first purpose and architecture.
- [ ] Inspect the Perchance website's actual Forge and embedded-AI implementation.
- [ ] Confirm runtime, script-loading method, and existing Three.js version.
- [ ] Confirm coordinate system, units, and export target.

## Stage 1: Core foundation

- [x] Add a JavaScript ES-module package scaffold.
- [x] Define shared material and geometry helpers.
- [x] Define structured module results and diagnostics.
- [x] Add basic mesh integrity validation.
- [x] Add a first end-to-end character assembly API.
- [ ] Run automated tests in CI and fix any failures.
- [ ] Verify a generated example visually in a real Three.js viewport.

## Stage 2: Procedural character blockout MVP

- [x] Body and limb blockout
- [x] Basic face and facial features
- [x] Curve-based layered hair
- [x] Simple clothing shapes
- [x] Basic accessories
- [x] Structured warnings for unsupported options
- [ ] Improve proportions and attachment alignment
- [ ] Add visual regression fixtures and quality metrics

## Stage 3: High-quality character construction

- [ ] Better body topology and stylized anatomy
- [ ] More expressive face shapes and configurable facial features
- [ ] Hairstyle library: bangs, curls, braids, ponytails, twin tails, layered cuts
- [ ] Clothing construction with garment-specific geometry
- [ ] Detailed accessories and equipment
- [ ] UV generation and texture/material authoring

## Stage 4: Quality and export

- [ ] Self-intersection and gap checks where practical
- [ ] Explicit repair operations with before/after diagnostics
- [ ] GLB/glTF export and round-trip checks
- [ ] Rigging and animation support after static meshes are reliable

## Stage 5: Nova integration

- [ ] Confirm how the Perchance site loads external JavaScript modules.
- [ ] Connect the embedded AI's structured character specification to `generateCharacter`.
- [ ] Add an AI refinement loop driven by diagnostics.
- [ ] Reuse the host application's Three.js instance and scene conventions.
- [ ] Test generation, editing, and export inside the actual website.

## Working rules

- Inspect before adding dependencies or replacing code.
- Prefer small, testable commits.
- Do not add large model weights to this repository.
- Do not claim a module works until it has been run and tested.
- Keep the workflow AI-first. Manual modelling is not a required user step.
