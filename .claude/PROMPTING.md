# Driving Claude Code in this project

The config loads automatically. `CLAUDE.md` and `.claude/rules/*.md` are read at
the start of every session, so Claude Code already knows the build command
(`node src/render.mjs`), the four-layer architecture, and how to author content
and bits. You don't prompt for any of that — it's just context.

What you DO drive is the workflow: Explore → Plan → Implement → Commit.

---

## Plan Mode

Plan Mode is the one mode you toggle. Press **Shift+Tab** to cycle modes until
you see "plan mode" at the bottom. In plan mode Claude reads and proposes but
will NOT edit files. Press Shift+Tab again to leave it and let it make changes.

Use Plan Mode for anything touching multiple files or a part of the generator
you're unsure about (new bits, `relate.mjs`, the render `shell`).
SKIP it for typos, copy tweaks, one-line CSS — just ask directly.

---

## The four phases

### 1 + 2 — Explore & Plan  (Plan Mode ON)

    Read src/render.mjs, src/registry.mjs, and src/bits/card.mjs so you
    understand the bit contract. Then give me a plan for adding a new
    "quote" bit that renders a styled blockquote. Don't write anything yet.

Read the plan, push back, iterate. Nothing is changed yet.

### 3 — Implement  (Plan Mode OFF — Shift+Tab)

    Implement that plan. Then run `node src/render.mjs` and show me the
    output — confirm it prints "built dist/..." for every page with no errors.

The second sentence is the important habit: tell it to run the build and show
the output. That closes the loop so it doesn't stop at "looks done."

### 4 — Commit

    Commit with a descriptive message.

---

## The two habits that matter most

1. **Point at specific files.** "Look at src/bits/card-link.mjs to understand
   the slot pattern, then follow it for a new card-video bit" beats "add a video
   card."

2. **Always end an implement prompt with a runnable check.** For this project
   that is `node src/render.mjs` (or `./build.command`). It's the difference
   between "stops when it looks finished" and "verifies before claiming done."

---

## Ready-to-paste prompts

Add a bit:

    Look at src/bits/card.mjs and src/registry.mjs to understand the bit
    contract and how bits are registered. Plan a new "<name>" bit that
    <does X>. Keep it ignorant of its parent and siblings, per
    .claude/rules/bits.md. Don't write yet.

Edit content:

    Add a new card-link to content/index.md pointing to <stem>. Let relate.mjs
    auto-fill glyph/title/subtitle from that page. Rebuild and show the output.

Small fix (no plan mode):

    Fix the subtitle on the index page to read "<new text>" and rebuild.

Debug a build error:

    `node src/render.mjs` fails with <paste error>. Read the relevant file in
    src/, write the fix, rerun the build, and show me it passes.
