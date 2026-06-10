// [fo] — gold-bordered sequence panel: label · before prose · grid · after prose.
export const sequence = {
  slots: ['label', 'before', 'after'],
  render({ slots, children }) {
    return `<div class="sequence">
  <div class="sequence-head"><span>${slots.label || ''}</span></div>
  <div class="sequence-body">
    ${slots.before ? `<p class="prose">${slots.before}</p>` : ''}
    ${children.join('')}
    ${slots.after  ? `<p class="prose">${slots.after}</p>`  : ''}
  </div>
</div>`;
  }
};
