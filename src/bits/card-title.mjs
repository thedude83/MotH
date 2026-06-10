// [fo] — centered card: title + subtitle. No body prose.
export const cardTitle = {
  slots: ['title', 'subtitle'],
  render({ slots }) {
    return `<div class="card card-title">
  ${slots.title    ? `<span class="ct-title">${slots.title}</span>`       : ''}
  ${slots.subtitle ? `<span class="ct-subtitle">${slots.subtitle}</span>` : ''}
</div>`;
  }
};
