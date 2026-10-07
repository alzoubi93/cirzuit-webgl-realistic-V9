# CirZuit V8.7.8 — KiCad WebGL Phase 4

## Goal

Make native KiCad schematic symbol geometry use the same WebGL schematic pipeline as the built-in symbols, while preserving the KiCad library coordinate contract.

## Changes

- Native `kicad:*` symbol instances now bypass the generic `SYMBOLS[id].draw()` vectorizer.
- `KiCadParsedSymbol.bodyGraphics` are converted directly into WebGL primitives.
- Supported native geometry in the WebGL pass:
  - polyline
  - rectangle
  - circle
  - arc
  - bezier
  - background fills
- Concave/background-filled polygons are triangulated with `earcut` instead of a triangle fan.
- Native KiCad pins are emitted as WebGL line geometry from the KiCad connection point (`pin.at`) toward the body by `pin.length`.
- Native symbol coordinates are converted with the shared `kicadPointToWorld()` contract; no renderer-local `1/2.54` coordinate origin or Y-flip is introduced.
- Native geometry continues to rotate around the schematic instance anchor because the importer materializes the KiCad bbox around the library origin.
- KiCad background fills receive the current schematic background color from the Canvas so dark/light themes do not force a white fill.
- Existing WebGL SDF text passes continue to handle native properties, references/values, pin names and pin numbers.
- Existing SVG fallback remains only for modes/nodes intentionally excluded from the WebGL symbol pass.

## Verification

- TypeScript/TSX syntax transpilation succeeded for the modified WebGL symbol pass and Canvas.
- A full project typecheck/build could not be executed because the supplied project archive does not contain installed dependencies (`node_modules`); dependency installation timed out in the isolated environment.

## KiCad reference

The implementation follows KiCad's documented schematic structure: embedded `lib_symbols`, symbol instances with `at`/`unit`/`mirror`, symbol properties/text effects, and native graphic/pin geometry. See:

- https://dev-docs.kicad.org/en/file-formats/sexpr-schematic/
- https://dev-docs.kicad.org/en/file-formats/sexpr-intro/
- https://github.com/KiCad/kicad-source-mirror/tree/master/eeschema
