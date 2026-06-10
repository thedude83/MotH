# Adding or editing bits (`src/bits/*.mjs`)

A bit is the unit of vocabulary. Keep each one small and ignorant of the rest.

- Shape: `export const name = { slots?: [...], render({ args, slots, body, children }) { return html } }`.
- A bit must **not** know about its parent, its siblings, or specific child
  types. `grid` arranges children without knowing what they are; `card` holds
  content without knowing what's inside. Preserve this.
- `slots` lists the named child lines the bit consumes by name. Anything not a
  slot and not a registered bit becomes `body` (free text). Registered children
  arrive pre-rendered in `children`.
- Register every new bit in `src/registry.mjs` (word → builder). Aliases are
  allowed by pointing two keys at the same bit.
- Do not add dependencies or a build step. Plain ESM, string templates only.
- Page-level chrome (head, fonts, nav, footer, theme toggle) lives in the
  `shell` function in `src/render.mjs`, not in bits.
- After any change, rebuild with `node src/render.mjs` and check `dist/` output.
