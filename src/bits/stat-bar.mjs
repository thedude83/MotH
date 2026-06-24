// stat-bar — labelled progress bar; JS fills width and text via [data-stat-key]
export const statBar = {
  slots: ['label', 'key'],
  render({ slots }) {
    const key = slots.key || '';
    return `<div class="stat-bar">
  <span class="stat-bar-label">${slots.label || ''}</span>
  <div class="bar-track">
    <div class="bar-fill" data-stat-key="${key}"></div>
  </div>
  <span class="bar-pct" data-stat-key="${key}">—</span>
</div>`;
  }
};
