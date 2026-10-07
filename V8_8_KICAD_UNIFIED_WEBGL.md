# V8.8 — Unified KiCad WebGL rendering

This release consolidates the previous KiCad rendering phases instead of adding another phase-specific pipeline.

## Rendering contract

- Embedded `.kicad_sch` `lib_symbols` remain the authoritative symbol source.
- Unit/body-style resolution and X/Y mirror are materialized before rendering.
- KiCad coordinates are converted once through `kicadPointToWorld`.
- Symbol geometry, pin graphics and schematic text are rendered through the shared WebGL passes.
- Native KiCad stroke types use WebGL tessellation with butt/square/round caps and miter/bevel/round joins.
- Concave fills continue to use Earcut.
- KiCad properties, pin names/numbers, visibility and justification remain in the WebGL text pass.
- SVG is retained only as a compatibility/hit-test fallback, not as the native visual path.

## Source alignment

The implementation follows the documented KiCad schematic model: symbol instances reference embedded library symbols; pins have explicit connection coordinates, length, angle, name/number effects; and graphical objects carry stroke definitions and text effects.
