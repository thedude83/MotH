// [fo] — tablet commandment card and tablet column header. Factory pattern for .right/.left.
const makeTablet = (color) => ({
  slots: ['num', 'let', 'op', 'path', 'gloss', 'width'],
  render({ slots }) {
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `<div class="card tablet ${color}"${w}>
  <div class="t-top">
    <span class="t-num">${slots.num || ''}</span>
    <span class="t-let">${slots.let || ''}</span>
    <span class="t-op">${slots.op || ''}</span>
  </div>
  <div class="t-path">${slots.path || ''}</div>
  <div class="t-gloss">${slots.gloss || ''}</div>
</div>`;
  }
});

const makeTitlePillar = (color) => ({
  slots: ['title', 'subtitle', 'width'],
  render({ slots }) {
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `<div class="card tablet-head ${color}"${w}>
  <span class="t-label">${slots.title || ''}</span>
  <span class="t-dir">${slots.subtitle || ''}</span>
</div>`;
  }
});

export const cardTabletRight = makeTablet('right');
export const cardTabletLeft  = makeTablet('left');
export const cardTitleRight  = makeTitlePillar('right');
export const cardTitleLeft   = makeTitlePillar('left');
