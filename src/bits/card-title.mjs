// [fo] — centered card: title + subtitle. No body prose.
export const cardTitle = {
  slots: ['title', 'subtitle', 'width'],
  render({ slots }) {
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `<div class="card card-title"${w}>
  ${slots.title    ? `<span class="ct-title">${slots.title}</span>`       : ''}
  ${slots.subtitle ? `<span class="ct-subtitle">${slots.subtitle}</span>` : ''}
</div>`;
  }
};
