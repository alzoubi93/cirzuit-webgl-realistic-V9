# V8.6 — Schematic Selection & Pins → WebGL

## What moved to WebGL
- **Selection outlines** (dashed blue rectangles around selected symbols)
- **Pin markers** (normal / selected / net-highlighted / floating)

New file:
- `src/components/editor/webgl/SchematicWebGLSelection.tsx`

## Canvas changes
- Selection `<rect>` removed from the per-node SVG loop.
- Pin `<circle>` visuals replaced by invisible hit-target circles (pointer events preserved).
- New instances built in `webglSelectionRects` + `webglPinMarkers` and drawn by the unified SchematicGLStage.

## Pass order
`SCHEMATIC_GL_PASS_ORDER.selection = 60` (above symbols, below badges).

## Notes / follow-ups
- Floating pin orange ring is a simple stroked circle (old `FloatingNodeIndicator` animation not yet ported).
- Selection rect rotation + non-uniform scale is approximate; refine if needed for 90°/270° heavy use.
- Next logical steps: hover-pin indicator while wiring, capacitor breathing, text nodes, and further SVG reduction.
