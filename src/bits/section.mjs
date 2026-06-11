// [fo] — section header + rule; args = anchor ID; title = h2 display; children below
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const section = {
  slots: ['title', 'subtitle'],
  render({ args, slots, children }) {
    const id = args || slug(slots.title || '');
    return `<div class="section-head" id="${id}">
  <h2>${slots.title || ''}</h2>
  ${slots.subtitle ? `<p>${slots.subtitle}</p>` : ''}
</div>
<div class="section-rule"></div>
${children.join('\n')}`;
  }
};
