// [fo] — principle face card. Slots: cmd, let, op, path. Body = description paragraph.
const makeFace = (side) => ({
  slots: ['cmd', 'let', 'op', 'path', 'width'],
  render({ slots, body }) {
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<div class="face-body">${l}</div>`).join('') : '';
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `<div class="card face ${side}"${w}>
  <div class="face-header">
    <span class="face-cmd">${slots.cmd || ''}</span>
    <span class="face-letter">${slots.let || ''}</span>
    <span class="face-op">${slots.op || ''}</span>
  </div>
  <div class="face-path">${slots.path || ''}</div>
  ${paras}
</div>`;
  }
});

export const cardFaceRight = makeFace('right');
export const cardFaceLeft  = makeFace('left');
