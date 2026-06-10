# Authoring content (`content/*.md`)

Indentation is significant — it defines the node tree. Use spaces consistently;
a child must be indented more than its parent.

- Every page begins with a `page` block. Common slots: `type`, `title`,
  `title2`, `glyph`, `subtitle`, `flavor`. `type listing` omits the top nav.
- A line's **first word** is the bit name; the rest is its `args`. Indented
  lines beneath it are children (slots or body).
- To link between pages use a `card-link` with `link <filename-stem>` (no
  `.html`). `relate.mjs` auto-fills `glyph`/`title`/`subtitle`/flavor from the
  target page's `page` block — **only type those slots by hand to override.**
- `grid` arrangement args: `2` (N columns) · `2.1.2` (rows of those sizes) ·
  `1|3|1` (column stacks of those sizes).
- `section title …` auto-generates an `id` from the title (used for nav anchors).
- After editing content, rebuild: `node src/render.mjs`, and confirm the page
  appears in `dist/` with no errors.
