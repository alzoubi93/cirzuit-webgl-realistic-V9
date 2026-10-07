# V8.7.4 — Schematic symbol/text rendering fix

## Fixes

- Corrected the signed-distance-field sign in `src/lib/webglTextSdf.ts`. The previous sign test inverted inside/outside, making glyph quads render as opaque cells instead of readable glyphs.
- Updated `SchematicWebGLSymbols.tsx` to parse CSS `rgb()/rgba()` colors emitted by the native KiCad renderer. This prevents KiCad `fill=background` values such as `rgba(148, 163, 184, 0.22)` from being misread as hexadecimal text.
- Hex colors continue to work, including 3-, 6-, and 8-digit forms.

## Result

KiCad-imported symbols now use the same authored fill semantics as the SVG preview while remaining compatible with the WebGL schematic body renderer.

- Switched all consumers of this atlas to its authoritative alpha SDF channel. The RGB channels are only directional hints in this custom atlas and are not a true MSDF; using their median could reintroduce glyph artifacts.
