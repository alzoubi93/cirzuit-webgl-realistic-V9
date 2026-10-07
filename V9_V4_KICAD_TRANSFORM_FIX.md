# V9 V4 — Single KiCad Transform Contract

This revision removes a remaining geometry split between the normalized KiCad core and the WebGL pin-label pass.

## Fixed

- Native KiCad pin-name/number positions now use `transformKiCadLibraryPoint()` from `kicadSchematicCore.ts`.
- The previous Canvas helper mixed raw KiCad millimetres with CirZuit world units when calculating `dx/dy`; this could move pin text by large amounts, especially on rotated or mirrored symbols.
- Core pin connectivity points now apply `mirrorX` / `mirrorY` before schematic rotation, matching the renderer's symbol transform contract.
- Body, pin connectivity, and pin text now share the same origin/transform assumptions.

## KiCad reference

The KiCad schematic format stores symbol instances with library identifier, position, unit, rotation and instance data; the embedded `lib_symbols` section stores the library geometry. See:
https://dev-docs.kicad.org/en/file-formats/sexpr-schematic/
