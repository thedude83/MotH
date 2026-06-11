// [fo] — navigation link card; relate.mjs fills glyph/title/subtitle/body from linked page
// img slot = image left; img-right slot = image right; child SVG bits also land on the right
export const cardLink = {
  slots: ['link', 'glyph', 'label', 'title', 'img', 'img-right', 'width'],
  render({ slots, body, children }) {
    const href = slots.link ? `/${slots.link}.html` : '#';
    const hasLeft  = !!slots.img;
    const hasRight = !!slots['img-right'] || children.length > 0;
    const hasAny   = hasLeft || hasRight;
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';

    const imgLeft = hasLeft
      ? `<img class="card-img" src="img/${slots.img}" alt="" loading="lazy">`
      : '';

    const visualRight = slots['img-right']
      ? `<img class="card-img card-img-right" src="img/${slots['img-right']}" alt="" loading="lazy">`
      : children.length > 0
        ? `<div class="card-visual-right">${children.join('')}</div>`
        : '';

    return `<div class="card card-link${hasAny ? ' has-image' : ''}${hasRight ? ' has-visual-right' : ''}"${w}>
  ${imgLeft}
  <div class="card-body">
    ${slots.glyph ? `<span class="card-glyph">${slots.glyph}</span>`      : ''}
    ${slots.label ? `<span class="card-label">${slots.label}</span>`      : ''}
    ${slots.title ? `<span class="card-title-text">${slots.title}</span>` : ''}
    ${body        ? `<p class="card-desc">${body}</p>`                    : ''}
  </div>
  ${visualRight}
  <a class="card-cover" href="${href}" aria-label="${slots.title || ''}"></a>
  <span class="card-arrow">Open →</span>
</div>`;
  }
};
