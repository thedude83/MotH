// RELATION  /fu/  — the relational layer. Each page declares itself once in its
// `page` block; any card that links to it inherits that data automatically.
// Edit the page, every card pointing to it updates. Author-typed slots always win.
import { parse } from './parse.mjs';

const LINK_SLOTS = ['glyph', 'title', 'subtitle'];

const slotChild = (name, rest) => ({ name, rest, text: `${name} ${rest}`, children: [] });
const bodyChild = (text) => ({ name: '·body', rest: '', text, children: [] });

// filename-stem -> the slots of its `page` block
export function gatherRecords(files) {
  const records = {};
  for (const { name, src } of files) {
    const p = parse(src).find(n => n.name === 'page');
    if (!p) continue;
    records[name] = Object.fromEntries(p.children.map(c => [c.name, c.rest]));
  }
  return records;
}

// Fill any `card` or `card-link` that has a `link` slot from that page's record,
// without overwriting anything the author typed by hand.
export function relate(nodes, records) {
  for (const node of nodes) {
    if (node.name === 'card' || node.name === 'card-link') {
      const linkSlot = node.children.find(c => c.name === 'link');
      if (linkSlot) {
        const rec = records[linkSlot.rest];
        if (rec) {
          const missing = n => !node.children.some(c => c.name === n);
          const hasBody = node.children.some(c => !LINK_SLOTS.includes(c.name) && c.name !== 'link');
          if (rec.glyph    && missing('glyph'))    node.children.push(slotChild('glyph',    rec.glyph));
          if (rec.title    && missing('title'))    node.children.push(slotChild('title',    rec.title));
          if (rec.subtitle && missing('subtitle')) node.children.push(slotChild('subtitle', rec.subtitle));
          if (rec['link.flavor'] && !hasBody) node.children.push(bodyChild(rec['link.flavor']));
        }
      }
    }
    if (node.children?.length) relate(node.children, records);
  }
}
