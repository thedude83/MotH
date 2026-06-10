// [fo] — navigation link card; relate.mjs fills glyph/title/subtitle/body from linked page
// img slot is optional: when present, card lays out as a row (image left, content right)
export const cardLink = {
  slots: ['link', 'glyph', 'label', 'title', 'img'],
  render({ slots, body }) {
    const href = slots.link ? `${slots.link}.html` : '#';
    const hasImage = !!slots.img;
    return `<div class="card card-link${hasImage ? ' has-image' : ''}">
  ${hasImage ? `<img class="card-img" src="img/${slots.img}" alt="" loading="lazy">` : ''}
  <div class="card-body">
    ${slots.glyph ? `<span class="card-glyph">${slots.glyph}</span>`      : ''}
    ${slots.label ? `<span class="card-label">${slots.label}</span>`      : ''}
    ${slots.title ? `<span class="card-title-text">${slots.title}</span>` : ''}
    ${body        ? `<p class="card-desc">${body}</p>`                    : ''}
  </div>
  <a class="card-cover" href="${href}" aria-label="${slots.title || ''}"></a>
  <span class="card-arrow">Open →</span>
</div>`;
  }
};
