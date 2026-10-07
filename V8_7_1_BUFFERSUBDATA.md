# V8.7.1 — GPU partial upload (bufferSubData) for native footprints

## What
After an incremental CPU patch (V8.7), the GL upload path no longer always re-uploads the
entire body / pad / stroke buffers.

## How
1. `NativeStaticSceneCache` records `lastDirtyBody` / `lastDirtyPad` / `lastDirtyStroke`
   as merged byte ranges for every patched footprint.
2. `uploadNativePackedArray()` in `PcbWebGLFootprints.tsx`:
   - **Full** `bufferData` on first upload, full rebuild, or new array reference
   - **Partial** `bufferSubData` when the same array was patched and dirty ranges exist
   - Falls back to full upload if dirty bytes exceed ~50% of the buffer (cheaper)

## Not partial
- Selection/net **halos** — still a fresh array each selection change (full upload)
- Legacy non-KiCad SDF pads/silk — unchanged

## Pipeline
```
move footprint
  → scene graph matrix O(1)
  → buildNativeStaticSceneCached → patch CPU ranges only
  → contentVersion++
  → draw: bufferSubData(dirty ranges only)
```
