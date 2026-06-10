# MotH

A static site built by a custom indentation-DSL generator. No framework, no
`package.json`, no dependencies — plain Node ESM reading Markdown-ish content
files and emitting HTML into `dist/`.

## Commands

- **Build:** `node src/render.mjs` (or `./build.command`) — renders every
  `content/*.md` to `dist/*.html` and copies `img/` → `dist/img/`.
- **Preview / dev:** `node src/dev.mjs` (or `./preview.command`) — local server.
- Node lives at `~/.local/node/bin` (the `.command` scripts add it to PATH).
  Requires Node ≥ 18 (uses `fs.cpSync`, `import.meta.url`).
- There is no test runner or linter. **Verification = run `node src/render.mjs`
  and confirm it prints `built dist/<page>.html` for each page with no errors.**

## Architecture — four layers, strictly separated

The whole system is "a tiny language." Each layer knows nothing about the ones
around it. Preserve this separation; do not let vocabulary leak between layers.

1. **GRAMMAR — `src/parse.mjs`.** Turns raw text + indentation into a nested
   node tree. Each line → `{ name, rest, text, children }` where `name` is the
   first word and `rest` is the remainder. Knows zero vocabulary. Rarely needs
   to change.
2. **LANGUAGE — `src/registry.mjs`.** Maps a word → a "bit" (builder). This is
   the vocabulary. To add a new element type, write a bit in `src/bits/` and
   register it here. Aliases are fine (e.g. `card-mirror` → `card`).
3. **LOGIC — `src/render.mjs`.** Walks the tree, looks each node up in the
   registry, and asks its bit to build HTML. Also defines the page `shell`
   (head, fonts, theme toggle, nav/footer). Knows no vocabulary of its own.
4. **RELATION — `src/relate.mjs`.** A `card`/`card-link` with a `link <stem>`
   slot inherits `glyph`/`title`/`subtitle`/flavor from that page's `page`
   block. **Author-typed slots always win** over inherited ones. Edit a page
   once; every card pointing to it updates.

## The bit contract

A bit is an object: `{ slots?: string[], render({ args, slots, body, children }) }`.

- `args` = the node's `rest` (text after the word).
- `slots` = named child lines listed in `bit.slots` (value is that child's `rest`).
- `children` = already-rendered HTML for child nodes that are themselves
  registered bits.
- `body` = remaining child lines (free text), newline-joined.

In `render.mjs`'s `renderNode`, each child is sorted: registered name →
`children`; name in `bit.slots` → `slots`; otherwise → `body`.

## Content format (`content/*.md`)

Indentation-significant. First word names the bit; nesting = children. Every
page starts with a `page` block declaring `type`, `title`, `subtitle`, etc.
`type listing` pages skip the nav; anything else gets it. See `content/index.md`
and `content/three-gates.md` for working examples.

`grid` args: `2` = 2 columns · `2.1.2` = rows of 2,1,2 · `1|3|1` = column-stacks.

## Conventions

- Pure ESM (`.mjs`), no build step, no external deps — keep it dependency-free.
- Filename stems are the link targets (`link three-gates` → `three-gates.html`).
- Hebrew glyphs appear in `glyph` slots; the shell loads the matching web font.
- Output is fully self-contained HTML with inlined CSS from `src/styles.css`.
- After any change to `src/` or `content/`, rebuild and check `dist/` output.
