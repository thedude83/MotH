// [fo] — callout block: gold left border, italic body prose
export const note = {
  render({ body }) {
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('') : '';
    return `<div class="note">${paras}</div>`;
  }
};
