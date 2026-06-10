// [fo] — tablet commandment card and tablet column header. Factory pattern for .right/.left.
const makeTablet = (color) => ({
  slots: ['num', 'let', 'op', 'path', 'gloss'],
  render({ slots }) {
    return `<div class="card tablet ${color}">
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
  slots: ['title', 'subtitle'],
  render({ slots }) {
    return `<div class="card tablet-head ${color}">
  <span class="t-label">${slots.title || ''}</span>
  <span class="t-dir">${slots.subtitle || ''}</span>
</div>`;
  }
});

export const cardTabletRight = makeTablet('right');
export const cardTabletLeft  = makeTablet('left');
export const cardTitleRight  = makeTitlePillar('right');
export const cardTitleLeft   = makeTitlePillar('left');
