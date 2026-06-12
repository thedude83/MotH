// [fo] — centered card: title + subtitle. No body prose.
export const cardTitle = {
  slots: ['title', 'subtitle', 'width', 'align'],
  render({ slots }) {
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    const a = slots.align ? ` ct-${slots.align}` : '';
    return `<div class="card card-title${a}"${w}>
  ${slots.title    ? `<span class="ct-title">${slots.title}</span>`       : ''}
  ${slots.subtitle ? `<span class="ct-subtitle">${slots.subtitle}</span>` : ''}
</div>`;
  }
};
