# CirZuit V8.7.9 — KiCad WebGL Phase 5

## Goal
Bring native KiCad schematic symbol rendering closer to KiCad's own graphical semantics while keeping the entire symbol body on the WebGL path.

## Changes
- Native KiCad strokes now retain the KiCad stroke type (`solid/default`, `dash`, `dash_dot`, `dash_dot_dot`, `dot`).
- WebGL stroke tessellation now supports butt/square/round caps and miter/round join modes.
- Dashed native polylines are split into GPU-ready stroke paths rather than being rendered as continuous lines.
- Pin graphic styles are now represented as WebGL geometry for the KiCad styles:
  - line
  - inverted
  - clock
  - inverted_clock
  - input_low
  - clock_low
  - output_low
  - edge_clock_high
  - non_logic
- Pin connection points remain based on KiCad's `pin (at ...)` coordinates; the body end is derived from pin length and angle.
- Native symbol fill/stroke ordering remains deterministic: fills are emitted before their corresponding outlines, then pins, while text is rendered in the later WebGL text pass.
- Existing Earcut triangulation is retained for concave KiCad filled polygons.
- No SVG rendering is introduced for native KiCad symbol bodies.

## KiCad reference
The implementation follows the public KiCad S-expression specification: stroke width/type, fill modes, symbol properties, pin position/length/angle, and the documented pin graphic styles.

## Validation
- TypeScript parser check completed for `SchematicWebGLSymbols.tsx`; only expected missing dependency/module diagnostics occur because this source archive has no installed `node_modules`.
- Full Vite build was not claimed because dependencies are not installed in the supplied archive.
