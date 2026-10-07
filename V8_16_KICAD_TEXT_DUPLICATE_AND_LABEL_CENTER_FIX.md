# V8.16 — KiCad duplicate text + net-label centering fix

- Stops native KiCad library `Reference`/`Value` defaults from being rendered on top of placed-instance fields.
  - Removes duplicates such as `GND`.
  - Removes library symbol-name text such as `C_Small` when the placed capacitor has value `0.1uF`.
- Keeps the actual placed instance reference/value rendering already used by Canvas.
- Centers imported net-label text inside its flag/port outline while preserving label rotation and mirror behavior.

KiCad documents Reference/Value as symbol fields and notes that power-symbol references are normally hidden; power-symbol Value is the visible net name.
