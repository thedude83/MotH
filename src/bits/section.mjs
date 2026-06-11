// [fo] — section header + rule; args = anchor ID; title = h2 display; children below
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const section = {
  slots: ['title', 'subtitle', 'num'],
  render({ args, slots, children }) {
    const id = args || slug(slots.title || '');
    const heading = slots.num
      ? `<div class="section-label"><span class="section-num">${slots.num}</span><h2>${slots.title || ''}</h2></div>`
      : `<h2>${slots.title || ''}</h2>`;
    return `<div class="section-head" id="${id}">
  ${heading}
</div>
<div class="section-rule"></div>
${slots.subtitle ? `<p class="section-sub">${slots.subtitle}</p>` : ''}
${children.join('\n')}`;
  }
};
