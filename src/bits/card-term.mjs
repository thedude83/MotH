// [fo] — term card: optional icon SVG child + label pair + body prose
export const cardTerm = {
  slots: ['term', 'label', 'width'],
  render({ slots, body, children }) {
    const icon = children.join('');
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('') : '';
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `<div class="card card-term"${w}>
  <div class="term-header">
    ${icon}
    <div class="term-labels">
      ${slots.term  ? `<span class="term-hebrew">${slots.term}</span>`   : ''}
      ${slots.label ? `<span class="term-english">${slots.label}</span>` : ''}
    </div>
  </div>
  ${paras}
</div>`;
  }
};
