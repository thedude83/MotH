// [fo] — callout block: gold left border, italic body prose
export const note = {
  slots: ['color'],
  render({ body, slots }) {
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('') : '';
    const cls = slots.color ? ` ${slots.color}` : '';
    return `<div class="note${cls}">${paras}</div>`;
  }
};
