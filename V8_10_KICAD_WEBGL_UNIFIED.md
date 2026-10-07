# V8.10 — Unified KiCad WebGL

- Unified KiCad text anchors with the same bbox/origin/instance transform used by native symbol geometry.
- Applied instance scale to KiCad text size.
- Removed the previous text placement path that added instance X/Y directly to local bbox coordinates.
- Kept KiCad geometry, pins, text, mirrors and rotation on one WebGL coordinate contract.
