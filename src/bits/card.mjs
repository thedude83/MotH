// [fo] — base atom. Knows nothing about what goes inside it.
export const card = {
  slots: ['step', 'title', 'echo'],
  render({ slots, body, children }) {
    const paras = body
      ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('')
      : '';
    return `<div class="card">
  ${slots.step  ? `<span class="step">${slots.step}</span>`              : ''}
  ${slots.title ? `<span class="card-inner-title">${slots.title}</span>` : ''}
  ${slots.echo  ? `<span class="echo">${slots.echo}</span>`              : ''}
  ${children.join('')}
  ${paras}
</div>`;
  }
};
