# MotH Content Syntax Reference

Indentation is the grammar. A line's **first word** is the bit name; everything after
it on the same line is `args`. Indented lines beneath are children — either named
**slots** (consumed by name) or free **body** text (paragraph content).

```
bitname  args go here
  slot-name  slot value
  Another line becomes a body paragraph.
  child-bit  nested child
    slot  value
```

Rules:
- Children must be indented more than their parent. Consistency within a block matters; the engine reads relative depth.
- A line whose first word is registered as a bit → rendered child.
- A line whose first word matches a slot name listed by the bit → slot.
- Everything else → body text (joined with newlines, then split into `<p>` tags).

**Content files** live anywhere inside `content/` — subdirectories are fine and mirror into `dist/`.
`content/books/trivium/the-liberal-arts.md` → `dist/books/trivium/the-liberal-arts.html`.

**Stems** are always written without a leading slash and without `.html`. For a top-level file the stem is just the filename; for a subdirectory file it includes the path from `content/`:

```
link three-gates                        → dist/three-gates.html
link books/trivium/the-liberal-arts     → dist/books/trivium/the-liberal-arts.html
next books/trivium/the-liberal-arts     → same, for splash pages
```

---

## page

Every file begins with one `page` block. It is never rendered directly — the engine
reads it to build the hero, nav, and document head.

```
page
  type     content
  title    The Three Gates
  title2   השערים
  glyph    ד · ר · ת
  subtitle Architecture of the Soul
  flavor   The commandments are not the starting point…
```

| slot | effect |
|---|---|
| `type` | `content` (default, shows nav) · `listing` (no nav, centered layout) · `splash` (hero only, enter link) |
| `title` | Document `<title>` + hero h1 |
| `title2` | Nav brand label — replaces `title` in the nav if present |
| `glyph` | Large decorative letter(s) above the hero title |
| `subtitle` | Large italic h2 below the hero title |
| `flavor` | Smaller italic intro paragraph in hero |
| `link.flavor` | Auto-filled as body text on any `card-link` that points to this page |
| `next` | `splash` only — stem of the next page; renders a gold "Enter" button below the hero |
| `width` | Constrains the content body below the hero — hero always spans the full container |

---

## section

Section header with anchor, rule, and optional subtitle. Children render below.
`args` sets the anchor `id`; if omitted, the id is slugged from the title.

```
section creation
  title The Act of Creation
  subtitle How the Creator brought something other than itself into being

  grid 1
    card
      …
```

```
section
  title    The Method
  num      01
  stamp    See also: Part II
  subtitle The starting point
```

```
section
  title     The Structure
  image     tol-spirit.png
  imgsize   50
  imgopacity 70
  subtitle  The ten sefirot
```

| slot | effect |
|---|---|
| `title` | H2 display text |
| `num` | Small gold label to the left of the h2 |
| `stamp` | Right-aligned gold monospace text in the same row as the h2 |
| `subtitle` | Italic centered line below the rule |
| `image` | Filename from `img/` — renders as a centered figure **above** the section head |
| `imgsize` | Width of the image as a number (percent, no `%`) — default `33` |
| `imgopacity` | Opacity as a number 0–100 — default `50` |
| `width` | Max-width override for the section head and rule |

`args` (inline, after `section`): becomes the anchor `id`. Omit to auto-slug from title.

---

## width slot (universal)

All card bits and `grid` accept a `width` slot that applies `max-width` inline.

**On a grid** — constrains the whole container. Cards inside fill it edge-to-edge:
```
grid 1
  width 560px
  card
    …
  card
    …
```

**On a card** — constrains only that card. The surrounding container stays full-width.
Use sparingly; a mis-sized card inside a grid breaks the collapse:
```
card
  width 400px
  step Label
  Body text.
```

---

## Inline markup

Processed inside any body text. Works in cards, notes, paras — anywhere body prose appears.

| syntax | output |
|---|---|
| `[em]text[/em]` | italic gold |
| `[em.right]text[/em]` | italic green |
| `[em.left]text[/em]` | italic rose |
| `[em.red]text[/em]` | italic bright red |
| `[i]text[/i]` | italic, no color |

```
By turning the intention from [em.left]receiving for yourself[/em] to [em]receiving for the sake of giving.[/em]
```

---

## card

Base content block. Optional label, heading, echo label, any number of body paragraphs,
and optional registered children (e.g. SVG bits) rendered before the paragraphs.

```
card
  step The Starting Point
  The first paragraph of prose goes here.
  A second paragraph is another body line.
```

```
card
  step IV
  svg.phase4
  The desire reaches its maximum…
```

```
card
  step Domem · The Inanimate
  title Rock. Water. Soil.
  echo Echoes Phase I — pure receiving
  The faintest expression of the will to receive…
```

| slot | effect |
|---|---|
| `step` | Small gold all-caps label |
| `title` | Serif inner heading below the step |
| `echo` | Dim secondary label (very small, below echo) |
| `width` | Max-width override (see width slot) |

Registered child bits → rendered inside the card **before** body paragraphs.
Body lines (not slots, not registered bits) → each becomes a `<p>`.

`card-mirror` is an alias for `card` with identical behavior.

---

## card-term

Term card with Hebrew label, English label, optional SVG icon, and body prose.
Left-aligned layout.

```
card-term
  svg.desire1
  term  גופניות
  label Bodily
  Food, warmth, safety, sex, family…
```

| slot | effect |
|---|---|
| `term` | Hebrew label (small gold mono) |
| `label` | English label (small dim mono, all-caps) |
| `width` | Max-width override |

SVG child (if present) renders inside the header row alongside the labels.

---

## card-title

Centered title + subtitle. No body. Used as a column header inside grids.

```
card-title
  title    Introduction
  subtitle An optional italic line
```

| slot | effect |
|---|---|
| `title` | Main centered text |
| `subtitle` | Smaller italic text below |
| `width` | Max-width override |

---

## card-link

Navigational card that links to another page. The relation layer auto-fills `glyph`,
`title`, and body text from the target page's `page` block — only write them to override.

```
card-link
  link  three-gates
```

```
card-link
  link   three-gates
  label  ESSAY
  title  Override title
  A short description overrides the auto-filled body.
```

| slot | effect |
|---|---|
| `link` | Page stem — no `.html`. Use path-from-content for subdirectory pages |
| `glyph` | Auto-filled from target `page.glyph` |
| `title` | Auto-filled from target `page.title` |
| `label` | Small all-caps label above the title — never auto-filled |
| `img` | Filename from `img/` — adds image-left layout |
| `width` | Max-width override |

---

## para

Standalone prose paragraph. Sits between grids or cards inside a section.
Each body line becomes one `<p class="prose">` — dim, smaller text.

```
para
  The desire to receive was not built to stay still.
```

Multiple lines → multiple paragraphs:
```
para
  First paragraph.
  Second paragraph.
```

---

## note

Left-border callout block. Italic body text. Default gold; `color` slot changes the border and background.

```
note
  The fifth desire was always the destination.
```

```
note
  color red
  This is a warning or critical aside.
```

| slot | effect |
|---|---|
| `color` | `left` (rose) · `right` (green) · `red` (bright red) · default gold |

---

## quote

Centered pullquote with optional attribution. Body text renders as large italic serif.

```
quote
  source Talmud Eser HaSefirot
  author Baal HaSulam
  There is no coercion in spirituality.
```

```
quote
  The desire to receive is the vessel. The light is the pleasure.
```

| slot | effect |
|---|---|
| `source` | Work title — renders bold small-caps gold above the author |
| `author` | Person name — renders italic below the source |

Body lines → large italic paragraphs. `source` and `author` are both optional.

Pass `big` as args (or use `quote.big`) for the large dramatic pullquote variant:

```
quote big
  source The Trivium
  author Sister Miriam Joseph
  Those who first perfect their own faculties are better prepared to serve others.
```

---

## important

Gold-bordered callout box with an optional bold label line and body prose.

```
important
  label Note on Free Will
  This is not freedom over what you desire.
  It is freedom over which force corrects you.
```

| slot | effect |
|---|---|
| `label` | Bold bright header inside the box |
| `color` | `left` (rose border) · `right` (green border) · `red` (bright red border) · default gold |

Body lines → prose paragraphs inside the box.

---

## list

Bulleted list. Body lines are `<li>` items. Nest a child `list` inside to create
a sub-list — it attaches to the last item of the parent.

```
list
  First item
  Second item
  Third item
```

Nested:
```
list
  The Trivium
  list
    Logic: art of thinking
    Grammar: art of inventing and combining symbols
    Rhetoric: art of communication
```

Each level uses a different bullet style (disc → circle → square). Nesting can go
as deep as needed by continuing to indent `list` inside `list`.

---

## grid

Layout container. Knows nothing about its children — pure arrangement.
Accepts a `width` slot to constrain the container.

**N columns (simple)**
```
grid 2
  card …
  card …
```

**Rows of N (dot syntax)**
```
grid 2.1.2
  card …
  card …
  card …
  card …
  card …
```

**Column stacks (pipe syntax)**
```
grid 1|3|1
  card-pair.pole …
  card-pair.mini …
  card-pair.mini …
  card-pair.mini …
  card-pair.pole …
```

**With width**
```
grid 1
  width 560px
  card …
  card …
```

| args | layout |
|---|---|
| `2` | 2-column grid |
| `3` | 3-column grid |
| `2.1.2` | row of 2, row of 1, row of 2 |
| `1|3|1` | left col: 1 child · center: 3 · right: 1 |

---

## image

Centered figure. `src` is the filename only — `img/` is prepended automatically.

```
image
  src  tol-spirit.png
```

```
image 50
  src  tol-spirit.png
  alt  Tree of Life diagram
```

| | |
|---|---|
| `args` | Width percentage (default `33%`) |
| `src` slot | Filename inside `img/` |
| `alt` slot | Alt text — omit if decorative |

---

## card-gate

Ascent gate card. `id` is auto-derived from `name` (text before ` · `) for SVG scroll-spy.

```
card-gate
  let   ת
  name  The Mark · מלכות → יסוד
  step  The First Gate
  The soul begins in מלכות…
```

| slot | effect |
|---|---|
| `let` | Large Hebrew letter |
| `name` | Gate name + path — text before ` · ` becomes the anchor id |
| `step` | Small gold label |
| `width` | Max-width override |

---

## card-title.right / card-title.left

Tablet column headers.

```
card-title.right
  title     Right Tablet
  subtitle  Light descends

card-title.left
  title     Left Tablet
  subtitle  Corruption ascends
```

---

## card-tablet.right / card-tablet.left

Individual commandment cards for the two-tablet grid.

```
card-tablet.right
  num   I
  let   ה
  op    Ventilation
  path  כתר → חכמה
  gloss Acknowledge the Source. The window must remain open.
```

| slot | effect |
|---|---|
| `num` | Roman numeral |
| `let` | Hebrew letter |
| `op` | Operation name |
| `path` | Sefirot path |
| `gloss` | Short explanatory line |
| `width` | Max-width override |

---

## card-face.right / card-face.left

Principle face cards. Used inside `principle` as the aligned/corrupted pair.

```
card-face.right
  cmd   Commandment I
  let   ה
  op    Ventilation
  path  כתר ↔ חכמה · Heh · The Window
  Heh is a window…
```

| slot | effect |
|---|---|
| `cmd` | Small colored label |
| `let` | Hebrew letter |
| `op` | Operation name |
| `path` | Full path string |
| `width` | Max-width override |

---

## principle

Container for one principle: header, right face, left face, closing card.

```
principle
  num   Principle 1
  name  Source / Existence

  card-face.right
    …
  card-face.left
    …
  card
    The right face opens the window…
```

| slot | effect |
|---|---|
| `num` | Small gold label in header |
| `name` | Principle name |

---

## sequence

Gold-bordered panel with a label, optional prose before and after an inner grid.

```
sequence
  label   A Sequence, Not a List
  before  The five principles carry load-bearing dependencies…
  after   One principle to establish the guidepost…

  grid 1|3|1
    …
```

| slot | effect |
|---|---|
| `label` | Small all-caps heading in the gold header bar |
| `before` | Paragraph above the inner grid |
| `after` | Paragraph below the inner grid |

---

## card-pair.pole / card-pair.mini

Sequence grid cards. `.pole` = large end columns; `.mini` = compact inner rows.

```
card-pair.pole
  cmds  I · VI
  g     ה
  r     ו
  name  Source / Existence
  tag   The Guidepost

card-pair.mini
  g     ח
  r     ע
  cmds  II · VII
  name  Boundary / Desire
  tag   Heart
```

| slot | effect |
|---|---|
| `cmds` | Commandment numbers |
| `g` | Green (right-pillar) letter |
| `r` | Rose (left-pillar) letter |
| `name` | Principle name |
| `tag` | Small dim label |
| `width` | Max-width override |

---

## svg.threegates

Middle-pillar SVG. No slots. Drop it anywhere on the three-gates page.

```
svg.threegates
```

Scroll-spy watches gate IDs: `gate-the-mark`, `gate-the-head`, `gate-the-door`.

---

## Named SVG bits — creation page

No slots, no args. Drop inside a `card` as a child — renders before body prose.

```
card
  step I
  svg.phase1
  The vessel is filled with the Creator's light…
```

| bit | renders |
|---|---|
| `svg.phase0a` | Vesica / infinity — The Creator |
| `svg.phase0b` | Vesica + thick down arrow |
| `svg.phase1` | Cup + thin down arrow |
| `svg.phase2` | Cup + thin up arrow |
| `svg.phase3` | Cup + thin up + down arrows |
| `svg.phase4` | Cup + thick down arrow |
| `svg.phase5` | Cup + thick down + thick up arrows |
| `svg.desire1` | Flame — Bodily (גופניות) |
| `svg.desire2` | Bar chart — Wealth (עושר) |
| `svg.desire3` | Mountain graph — Honor (כבוד) |
| `svg.desire4` | Eye / lens — Knowledge (דעת) |
| `svg.desire5` | Circle + point — Point in the Heart (נקודה שבלב) |

---

## Quick lookup

| word | slots | args | body |
|---|---|---|---|
| `page` | type · title · title2 · glyph · subtitle · flavor · link.flavor · next · **width** | — | — |
| `section` | title · num · stamp · subtitle · image · imgsize · imgopacity · **width** | anchor id | — |
| `card` | step · title · echo · **width** | — | ✓ paragraphs |
| `card-mirror` | _(alias for `card`)_ | — | ✓ paragraphs |
| `card-term` | term · label · **width** | — | ✓ paragraphs |
| `card-title` | title · subtitle · **width** | — | — |
| `card-link` | link · glyph · label · title · img · **width** | — | ✓ overrides auto-fill |
| `para` | — | — | ✓ paragraphs |
| `note` | color | — | ✓ italic paragraphs |
| `quote` | source · author | — · `big` | ✓ italic paragraphs |
| `quote.big` | source · author | — | ✓ large italic paragraphs |
| `important` | label · color | — | ✓ paragraphs |
| `list` | — | — | ✓ `<li>` items; nest `list` children for sub-lists |
| `grid` | **width** | 2 · 2.1.2 · 1\|3\|1 | — |
| `image` | src · alt | width % | — |
| `card-gate` | let · name · step · **width** | — | ✓ paragraphs |
| `card-title.right` | title · subtitle · **width** | — | — |
| `card-title.left` | title · subtitle · **width** | — | — |
| `card-tablet.right` | num · let · op · path · gloss · **width** | — | — |
| `card-tablet.left` | num · let · op · path · gloss · **width** | — | — |
| `card-face.right` | cmd · let · op · path · **width** | — | ✓ paragraphs |
| `card-face.left` | cmd · let · op · path · **width** | — | ✓ paragraphs |
| `principle` | num · name | — | — |
| `sequence` | label · before · after | — | — |
| `card-pair.pole` | cmds · g · r · name · tag · **width** | — | — |
| `card-pair.mini` | cmds · g · r · name · tag · **width** | — | — |
| `svg.phase0a–phase5` | — | — | — |
| `svg.desire1–desire5` | — | — | — |
| `svg.threegates` | — | — | — |
