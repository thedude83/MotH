// [fo] — ascent gate card. Slots: let, name, step. Body = description paragraph(s).
// ID auto-derived from name slot (text before " · ") for SVG scroll-spy wiring.
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const cardGate = {
  slots: ['let', 'name', 'step', 'width'],
  render({ slots, body }) {
    const gateName = (slots.name || '').split(' · ')[0].trim();
    const id = 'gate-' + slug(gateName);
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('') : '';
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `<div class="card gate" id="${id}"${w}>
  <span class="gate-letter">${slots.let || ''}</span>
  <span class="gate-name">${slots.name || ''}</span>
  ${slots.step ? `<span class="step">${slots.step}</span>` : ''}
  ${paras}
</div>`;
  }
};
