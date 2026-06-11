// [fo] — section header + rule; args = anchor ID; title = h2 display; children below
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const section = {
  slots: ['title', 'subtitle', 'num', 'stamp', 'image', 'imgsize', 'imgopacity', 'width'],
  render({ args, slots, children }) {
    const id = args || slug(slots.title || '');
    const stamp = slots.stamp ? `<span class="section-stamp">${slots.stamp}</span>` : '';
    const heading = slots.num
      ? `<div class="section-label"><span class="section-num">${slots.num}</span><h2>${slots.title || ''}</h2>${stamp}</div>`
      : `<div class="section-label"><h2>${slots.title || ''}</h2>${stamp}</div>`;
    const imgW = slots.imgsize ? `${slots.imgsize}%` : '33%';
    const imgO = slots.imgopacity != null ? slots.imgopacity / 100 : 0.5;
    const img = slots.image ? `<figure class="section-image"><img src="img/${slots.image}" alt="" style="width:${imgW};opacity:${imgO}" loading="lazy"></figure>` : '';
    const style = slots.width ? ` style="max-width:${slots.width}"` : '';
    return `${img}<div class="section-head" id="${id}"${style}>
  ${heading}
</div>
<div class="section-rule"${style}></div>
${slots.subtitle ? `<p class="section-sub">${slots.subtitle}</p>` : ''}
${children.join('\n')}`;
  }
};
