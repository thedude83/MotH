// checklist — labelled checkbox group; body lines: "field-id: Display label"
export const checklist = {
  slots: ['label', 'domain'],
  render({ slots, body }) {
    const lines = body ? body.split('\n').filter(Boolean) : [];
    const legend = slots.label
      ? `<legend class="checklist-label">${slots.label}</legend>`
      : '';
    const domainAttr = slots.domain ? ` data-domain="${slots.domain}"` : '';
    const items = lines.map(l => {
      const colon = l.indexOf(':');
      const id    = colon >= 0 ? l.slice(0, colon).trim() : l.trim();
      const label = colon >= 0 ? l.slice(colon + 1).trim() : l.trim();
      return `<label class="checklist-item"><input type="checkbox" name="${id}" value="1"> ${label}</label>`;
    });
    return `<fieldset class="checklist"${domainAttr}>\n  ${legend}\n  ${items.join('\n  ')}\n</fieldset>`;
  }
};
