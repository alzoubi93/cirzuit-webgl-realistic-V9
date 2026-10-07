# V8.14 — KiCad nodeColor root-cause fix

Root cause found after tracing the exact Canvas.tsx scope:

- `webglComponentLabelInstances` already had a local KiCad text color and was not the remaining failure.
- `webglPinLabelInstances` contained two references to `nodeColor` for KiCad pin names/numbers, but that useMemo never declared `nodeColor`.
- This produced the runtime `ReferenceError: nodeColor is not defined` during rendering of imported KiCad symbols.
- Earlier V8.11/V8.13 fixes changed the other KiCad label path but missed these two references.

V8.14 removes the free variable entirely from that path and computes `pinLabelColor` locally from the node color/default element color before both pin-name and pin-number labels are emitted.
