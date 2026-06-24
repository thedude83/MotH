// BUILD ORCHESTRATOR — walks content roots, calls render(), writes dist.
// render.mjs is a pure module; all file I/O and target config lives here.
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse         } from './parse.mjs';
import { gatherRecords } from './relate.mjs';
import { render        } from './render.mjs';

const here = p => new URL(p, import.meta.url);

// ── helpers ───────────────────────────────────────────────────────────────────

export function walkMd(dir, root) {
  root = root || dir;
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMd(full, root));
    else if (e.name.endsWith('.md')) {
      const name = path.relative(root, full).replace(/\.md$/, '').replace(/\\/g, '/');
      out.push({ name, src: fs.readFileSync(full, 'utf8') });
    }
  }
  return out;
}

// Read header.md from a content directory and return headerData or null.
// records must already be gathered (for title resolution).
export function resolveHeader(contentDir, records) {
  const headerPath = path.join(fileURLToPath(contentDir), 'header.md');
  if (!fs.existsSync(headerPath)) return null;
  const hNodes = parse(fs.readFileSync(headerPath, 'utf8'));
  const hNode  = hNodes.find(n => n.name === 'site-header');
  if (!hNode) return null;
  const resolve = slug => {
    const rec = records[slug];
    return { title: rec?.title || slug, href: slug ? `/${slug}.html` : '/index.html' };
  };
  const slot = name => hNode.children.find(c => c.name === name)?.rest || null;
  return {
    left:  hNode.children.filter(c => c.name === 'left').map(c => resolve(c.rest)),
    right: hNode.children.filter(c => c.name === 'right').map(c => resolve(c.rest)),
    brand: slot('brand'),
    icon:  slot('icon'),
    theme: slot('theme'),
  };
}

// ── buildTarget ───────────────────────────────────────────────────────────────

// contentDir, outDir: URL objects (or string paths)
// imgDir:             URL object — copied to outDir/img/ if provided
// cssPath:            URL object — defaults to src/styles.css
// parentHeaderData:   headerData from a parent build, used if this root has no header.md
export function buildTarget({ contentDir, outDir, imgDir, cssPath, parentHeaderData }) {
  const css = fs.readFileSync(cssPath ?? here('./styles.css'), 'utf8');
  fs.mkdirSync(fileURLToPath(outDir), { recursive: true });

  const allFiles = walkMd(fileURLToPath(contentDir));
  const files    = allFiles.filter(f => f.name !== 'header');
  const records  = gatherRecords(files);

  // Resolve header for a given file: walk up from the file's directory toward
  // contentDir, returning the first header.md found, then parentHeaderData, then null.
  const contentDirPath = fileURLToPath(contentDir);
  const headerCache = new Map();
  const resolveHeaderFor = (filePath) => {
    let dir = path.dirname(filePath);
    while (true) {
      if (!headerCache.has(dir)) {
        headerCache.set(dir, resolveHeader(new URL('file://' + dir + '/'), records) ?? null);
      }
      const h = headerCache.get(dir);
      if (h !== null) return h;
      if (dir === contentDirPath) break;
      const parent = path.dirname(dir);
      if (parent === dir) break; // filesystem root guard
      dir = parent;
    }
    return parentHeaderData ?? null;
  };

  for (const { name, src } of files) {
    const outPath  = path.join(fileURLToPath(outDir), name + '.html');
    const srcPath  = path.join(contentDirPath, name + '.md');
    const hData    = resolveHeaderFor(srcPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, render(src, css, records, hData));
    console.log(`built ${path.relative(process.cwd(), outPath)}`);
  }

  if (imgDir) {
    try {
      fs.cpSync(fileURLToPath(imgDir), path.join(fileURLToPath(outDir), 'img'), { recursive: true });
    } catch {}
  }
}

// ── default targets (runs when invoked directly as a script) ──────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = here('../');

  // Public site: content/ → dist/
  const publicContentDir = new URL('content/', root);
  buildTarget({
    contentDir: publicContentDir,
    outDir:     new URL('dist/', root),
    imgDir:     new URL('img/', root),
  });

  // Local tools: tools/ → local/  (only if the folder exists)
  const toolsDir = new URL('tools/', root);
  if (fs.existsSync(fileURLToPath(toolsDir))) {
    // Resolve public headerData so tools can inherit it if they have no header.md
    const publicAllFiles  = walkMd(fileURLToPath(publicContentDir));
    const publicRecords   = gatherRecords(publicAllFiles.filter(f => f.name !== 'header'));
    const publicHeader    = resolveHeader(publicContentDir, publicRecords);

    buildTarget({
      contentDir:       toolsDir,
      outDir:           new URL('local/', root),
      parentHeaderData: publicHeader,
    });
  }
}
