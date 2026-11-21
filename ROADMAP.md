# Starless Forge Toolkit Roadmap

The roadmap is ordered to reduce rework. A stage is complete only when its code, tests, and documentation exist and the result has been checked.

## Stage 0: Understand the project

- [x] Confirm repository access.
- [x] Record the AI-first purpose and architecture.
- [ ] Inspect the complete repository and any existing Nova integration.
- [ ] Confirm runtime, language, dependencies, and current code conventions.
- [ ] Record the coordinate system, units, and export target.

## Stage 1: Core foundation

- [ ] Add the package/runtime scaffold after the existing project has been inspected.
- [ ] Define the versioned CharacterSpec schema.
- [ ] Define shared generation context and structured diagnostics.
- [ ] Add geometry integrity utilities and small automated tests.
- [ ] Add a minimal end-to-end example that exports a simple test asset.

## Stage 2: First character feature module

- [ ] Choose the first module based on project inspection and the largest useful gap.
- [ ] Implement a small, reliable vertical slice.
- [ ] Add deterministic tests, a visual example, and known limitations.
- [ ] Connect the module to the CharacterSpec and generation report.

Hair construction is a candidate because it can be built from reusable curves, locks, and layered forms. It is not selected until existing code is checked.

## Stage 3: Character construction

- [ ] Body proportions and silhouette
- [ ] Face structure and facial features
- [ ] Clothing layers and garment construction
- [ ] Accessories and equipment
- [ ] Shared material and texture workflows

Each item should be delivered as a tested module, not an empty folder or placeholder API.

## Stage 4: Quality and export

- [ ] Mesh validation and useful diagnostics
- [ ] Explicit, testable repair operations
- [ ] GLB/glTF export and round-trip checks
- [ ] Rigging/animation support only after static characters are reliable

## Stage 5: Nova integration

- [ ] Document the callable module interfaces.
- [ ] Add a small adapter or example showing Nova's structured request/response flow.
- [ ] Support generation reports so Nova can decide what to refine.
- [ ] Add compatibility/version checks.

## Working rules

- Inspect before adding dependencies or replacing code.
- Prefer small, testable commits.
- Do not add large model weights to this repository.
- Do not claim a module works until it has been run and tested.
- Keep the workflow AI-first. Manual modelling is not a required user step.
