# V8.7.2 — Shared engine naming: GLStageCore

## Why
The stage core was already shared by PCB and Schematic, but every type was prefixed
`PcbGL*`, which suggested the schematic was “using the PCB engine” rather than a
shared neutral core.

## Preferred names
| New | Legacy alias (still exported) |
|-----|-------------------------------|
| `GLStageCore` | `PcbGLStageCore` |
| `GLContext` | `PcbGL` |
| `GLFrame` | `PcbGLFrame` |
| `GLInstancing` | `PcbGLInstancing` |
| `GLPass` | `PcbGLPass` |

## Files
- `pcbGLStageCore.ts` — implementation + aliases (filename kept for git history)
- `glStageCore.ts` — preferred re-export entry point
- `PcbGLStage.tsx` / `SchematicGLStage.tsx` — construct `new GLStageCore()`

## Compatibility
Existing layer files that `import type { PcbGL, PcbGLFrame } from "./pcbGLStageCore"`
continue to type-check unchanged.
