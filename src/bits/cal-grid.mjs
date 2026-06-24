// cal-grid — monthly calendar scaffold; JS populates all cells and modal on page load
export const calGrid = {
  slots: ['month'],
  render({ slots }) {
    const days    = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const headers = days.map(d => `<div class="cal-header-cell">${d}</div>`).join('');
    const cells   = Array.from({ length: 42 }, (_, i) =>
      `<div class="cal-cell empty" data-cal-index="${i}"><span class="cal-cell-num"></span><span class="cal-cell-pct"></span></div>`
    ).join('');
    return `<p class="section-sub" id="cal-month-label">${slots.month || ''}</p>
<div class="cal-grid" id="cal-grid">
  ${headers}
  ${cells}
</div>
<div id="cal-overlay" class="cal-overlay" style="display:none"></div>
<div id="cal-modal"   class="cal-modal"   style="display:none">
  <span class="cal-modal-close" id="cal-modal-close">✕</span>
  <div id="cal-modal-body"></div>
</div>`;
  }
};
