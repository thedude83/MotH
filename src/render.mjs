// LOGIC  /fu/  — walk the grammar tree, look up each word in the registry,
// ask its bit to build html. Knows no vocabulary of its own.
import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse    } from './parse.mjs';
import { registry } from './registry.mjs';
import { gatherRecords, relate } from './relate.mjs';
import { nav        } from './bits/nav.mjs';
import { footer     } from './bits/footer.mjs';
import { hero       } from './bits/hero.mjs';
import { siteHeader } from './bits/site-header.mjs';

const slug   = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slotOf = (node, name) => node?.children.find(c => c.name === name)?.rest ?? '';
const inline = s => s
  .replace(/\[em(\.[\w]+)?\](.*?)\[\/em\]/g, (_, v, t) => `<em${v ? ` class="${v.slice(1)}"` : ''}>${t}</em>`)
  .replace(/\[i\](.*?)\[\/i\]/g, '<i>$1</i>');

function renderNode(node) {
  const bit = registry[node.name];
  if (!bit) return '';
  const slots = {}, body = [], children = [];
  for (const child of node.children) {
    if (bit.slots?.includes(child.name)) slots[child.name] = child.rest;
    else if (registry[child.name])       children.push(renderNode(child));
    else                                 body.push(inline(child.text));
  }
  return bit.render({ args: node.rest, slots, body: body.join('\n'), children });
}

export function render(src, css, records = {}, headerData = null) {
  const nodes = parse(src);
  relate(nodes, records);

  const pageNode = nodes.find(n => n.name === 'page');
  const pd = {
    type:     slotOf(pageNode, 'type')     || 'content',
    title:    slotOf(pageNode, 'title')    || 'MotH',
    title2:   slotOf(pageNode, 'title2'),
    glyph:    slotOf(pageNode, 'glyph'),
    subtitle: slotOf(pageNode, 'subtitle'),
    flavor:   slotOf(pageNode, 'flavor'),
    next:     slotOf(pageNode, 'next'),
    width:    slotOf(pageNode, 'width'),
  };

  // collect section titles → nav links + hero-topics
  const sections = nodes
    .filter(n => n.name === 'section')
    .map(n => ({ id: n.rest || slug(slotOf(n, 'title')), label: slotOf(n, 'title') }))
    .filter(s => s.id);

  const body = nodes
    .filter(n => n.name !== 'page')
    .map(renderNode)
    .join('\n');

  return shell({ pd, sections, css, body, headerData });
}

function shell({ pd, sections, css, body, headerData }) {
  const isSplash  = pd.type === 'splash';
  const isContent = pd.type !== 'listing' && !isSplash;
  const brand = pd.title2 || pd.title;
  const enterLink = isSplash && pd.next
    ? `<a class="splash-enter" href="/${pd.next}.html">Enter</a>`
    : '';
  return `<!DOCTYPE html>
<html lang="en" data-type="${pd.type}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pd.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>${css}</style>
<script>
document.documentElement.dataset.theme=localStorage.getItem('moth-theme')||'dark';
document.documentElement.style.zoom=localStorage.getItem('moth-zoom')||'1';
</script>
</head>
<body>
${headerData ? siteHeader(headerData) : ''}
${isContent ? nav({ brand, sections }) : ''}
<div class="container">
${hero({ ...pd, sections })}
${enterLink}
<div class="content-body"${pd.width ? ` style="max-width:${pd.width}"` : ''}>
${body}
</div>
</div>
${footer()}
<script>
(function(){
  var r=document.documentElement;
  var tb=document.getElementById('theme-toggle');
  function applyTheme(t){r.dataset.theme=t;tb.textContent=t==='dark'?'☀ light':'☾ dark';}
  applyTheme(localStorage.getItem('moth-theme')||'dark');
  tb.addEventListener('click',function(){var n=r.dataset.theme==='dark'?'light':'dark';localStorage.setItem('moth-theme',n);applyTheme(n);});

  var zb=document.getElementById('zoom-toggle');
  function applyZoom(z){r.style.zoom=z;zb.textContent=z==='1.33'?'zoom out':'zoom in';zb.dataset.active=z==='1.33'?'true':'false';}
  applyZoom(localStorage.getItem('moth-zoom')||'1');
  zb.addEventListener('click',function(){var n=r.style.zoom==='1.33'?'1':'1.33';localStorage.setItem('moth-zoom',n);applyZoom(n);});
})();
</script>
</body>
</html>`;
}

// ── build ─────────────────────────────────────────────────────────────────────
const here       = p => new URL(p, import.meta.url);
const contentDir = here('../content/');
const css        = fs.readFileSync(here('./styles.css'), 'utf8');
fs.mkdirSync(here('../dist/'), { recursive: true });
function walkMd(dir, root) {
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
const allFiles = walkMd(fileURLToPath(contentDir));
const files   = allFiles.filter(f => f.name !== 'header');
const records = gatherRecords(files);

// resolve sitewide header config from content/header.md
const headerFile = allFiles.find(f => f.name === 'header');
let headerData = null;
if (headerFile) {
  const hNodes = parse(headerFile.src);
  const hNode  = hNodes.find(n => n.name === 'site-header');
  if (hNode) {
    const resolve = slug => {
      const rec = records[slug];
      return { title: rec?.title || slug, href: slug ? `/${slug}.html` : '/index.html' };
    };
    headerData = {
      left:  hNode.children.filter(c => c.name === 'left').map(c => resolve(c.rest)),
      right: hNode.children.filter(c => c.name === 'right').map(c => resolve(c.rest)),
    };
  }
}

for (const { name, src } of files) {
  const outPath = here(`../dist/${name}.html`);
  fs.mkdirSync(new URL('.', outPath), { recursive: true });
  fs.writeFileSync(outPath, render(src, css, records, headerData));
  console.log(`built dist/${name}.html`);
}
try { fs.cpSync(here('../img/'), here('../dist/img/'), { recursive: true }); } catch {}
