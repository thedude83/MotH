// [fo] — auto-rendered from [page] data; listing vs content differ
export function hero({ type, glyph, title, subtitle, flavor, sections = [] }) {
  const isContent = type !== 'listing';
  const topics = sections.map(s => s.label).join(' · ');
  return `<div class="hero" id="top">
  ${isContent && glyph ? `<span class="hero-glyph">${glyph}</span>` : ''}
  <h1>${title}</h1>
  ${subtitle ? `<h2 class="subtitle">${subtitle}</h2>` : ''}
  ${isContent && topics ? `<span class="hero-topics">${topics}</span>` : ''}
  ${flavor ? `<p class="intro">${flavor}</p>` : ''}
</div>`;
}
