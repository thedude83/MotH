// [fo] — commandment pair card. .pole = large end column; .mini = compact triad row.
const pairSlots = ['cmds', 'g', 'r', 'name', 'tag'];

export const cardPairPole = {
  slots: pairSlots,
  render({ slots }) {
    return `<div class="card pair pole">
  <span class="pair-cmds">${slots.cmds || ''}</span>
  <div class="pair-letters"><span class="pg">${slots.g || ''}</span><span class="pr">${slots.r || ''}</span></div>
  <span class="pair-name">${slots.name || ''}</span>
  <span class="pair-tag">${slots.tag || ''}</span>
</div>`;
  }
};

export const cardPairMini = {
  slots: pairSlots,
  render({ slots }) {
    return `<div class="card pair mini">
  <div class="pair-letters"><span class="pg">${slots.g || ''}</span><span class="pr">${slots.r || ''}</span></div>
  <div class="pair-info">
    <span class="pair-cmds">${slots.cmds || ''}</span>
    <span class="pair-name">${slots.name || ''}</span>
    <span class="pair-tag">${slots.tag || ''}</span>
  </div>
</div>`;
  }
};
