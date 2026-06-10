// LOGIC  /fu/  — walk the grammar tree, look up each word in the registry,
// ask its bit to build html. Knows no vocabulary of its own.
import fs from 'node:fs';
import { parse    } from './parse.mjs';
import { registry } from './registry.mjs';
import { gatherRecords, relate } from './relate.mjs';
import { nav    } from './bits/nav.mjs';
import { footer } from './bits/footer.mjs';
import { hero   } from './bits/hero.mjs';

const slug   = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slotOf = (node, name) => node?.children.find(c => c.name === name)?.rest ?? '';

function renderNode(node) {
  const bit = registry[node.name];
  if (!bit) return '';
  const slots = {}, body = [], children = [];
  for (const child of node.children) {
    if (registry[child.name])          children.push(renderNode(child));
    else if (bit.slots?.includes(child.name)) slots[child.name] = child.rest;
    else                               body.push(child.text);
  }
  return bit.render({ args: node.rest, slots, body: body.join('\n'), children });
}

export function render(src, css, records = {}) {
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
  };

  // collect section titles → nav links + hero-topics
  const sections = nodes
    .filter(n => n.name === 'section')
    .map(n => ({ id: slug(slotOf(n, 'title')), label: slotOf(n, 'title') }))
    .filter(s => s.id);

  const body = nodes
    .filter(n => n.name !== 'page')
    .map(renderNode)
    .join('\n');

  return shell({ pd, sections, css, body });
}

function shell({ pd, sections, css, body }) {
  const isContent = pd.type !== 'listing';
  const brand = pd.title2 || pd.title;
  return `<!DOCTYPE html>
<html lang="en" data-type="${pd.type}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pd.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>${css}</style>
<script>document.documentElement.dataset.theme=localStorage.getItem('moth-theme')||'dark';</script>
</head>
<body>
${isContent ? nav({ brand, sections }) : ''}
<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme"></button>
<div class="container">
${hero({ ...pd, sections })}
${body}
</div>
${footer()}
<script>
(function(){
  var r=document.documentElement,b=document.getElementById('theme-toggle');
  function a(t){r.dataset.theme=t;b.textContent=t==='dark'?'☀ light':'☾ dark';}
  a(localStorage.getItem('moth-theme')||'dark');
  b.addEventListener('click',function(){var n=r.dataset.theme==='dark'?'light':'dark';localStorage.setItem('moth-theme',n);a(n);});
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
const files   = fs.readdirSync(contentDir)
  .filter(f => f.endsWith('.md'))
  .map(f => ({ name: f.replace(/\.md$/, ''), src: fs.readFileSync(new URL(f, contentDir), 'utf8') }));
const records = gatherRecords(files);
for (const { name, src } of files) {
  fs.writeFileSync(here(`../dist/${name}.html`), render(src, css, records));
  console.log(`built dist/${name}.html`);
}
try { fs.cpSync(here('../img/'), here('../dist/img/'), { recursive: true }); } catch {}
