// [fo] — principle container: header (num + name) + face-right + face-left + card.
export const principle = {
  slots: ['num', 'name'],
  render({ slots, children }) {
    return `<div class="principle">
  <div class="principle-head">
    <div class="principle-num">${slots.num || ''}</div>
    <div class="principle-name">${slots.name || ''}</div>
  </div>
  ${children.join('')}
</div>`;
  }
};
