// [fo] — bordered callout box with optional bold label + body prose
export const important = {
  slots: ['label', 'color'],
  render({ body, slots }) {
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('') : '';
    const label = slots.label ? `<strong class="important-label">${slots.label}</strong>` : '';
    const cls = slots.color ? ` ${slots.color}` : '';
    return `<div class="important${cls}">${label}${paras}</div>`;
  }
};
