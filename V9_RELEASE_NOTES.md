# V9.0-alpha — KiCad Import Core

This is the first architectural V9 build. It replaces incremental KiCad rendering patches with a persisted normalized KiCad schematic model while retaining the existing renderer for compatibility.

Known limitation: the final WebGL renderer migration is intentionally staged. The core model is now available to rendering/connectivity code, but not every schematic primitive (sheets, text boxes, bitmaps, tables, buses and rule areas) has yet been promoted to first-class CirZuit editing objects.
