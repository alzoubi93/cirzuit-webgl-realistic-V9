# CirZuit V8.9 — Unified KiCad WebGL Match Pass

This update consolidates the next KiCad rendering improvements into one pass instead of splitting them into small phases.

## Changes

- Native KiCad symbol body graphics remain GPU geometry: fills, outlines, arcs, bezier curves and pins.
- Native KiCad symbol text and properties now have a dedicated WebGL SDF text pass immediately above native symbol geometry.
- Text anchors use the same KiCad-mm/Y-up -> CirZuit-world/Y-down coordinate contract as symbol geometry.
- Text rotation is composed with the schematic instance rotation instead of being rendered as an independent SVG transform.
- KiCad horizontal/vertical justification and mirrored text are forwarded to the SDF layout engine.
- Hidden KiCad text/properties are skipped.
- KiCad font size and thickness are converted from mm to world units.
- Text rendering is ordered at pass 55, between native symbol geometry (50) and selection (60), avoiding label/selection z-order artifacts.
- WebGL2 shader conversion is kept compatible with the existing WebGL1/ANGLE-instanced path.

## Reference

The implementation follows KiCad's documented schematic structure: embedded `lib_symbols`, symbol instances with `at`, `unit`, `mirror`, properties, and graphics; text objects use `at` plus `effects` including justification and visibility. See the official KiCad schematic file format documentation.
