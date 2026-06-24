// [fo] — like section but excluded from TOC; title renders as h3 (or h4 via level slot)
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const subsection = {
  slots: ['title', 'subtitle', 'num', 'stamp', 'image', 'imgsize', 'imgopacity', 'width', 'level'],
  render({ args, slots, children }) {
    const id = args || slug(slots.title || '');
    const tag = slots.level === '4' ? 'h4' : 'h3';
    const stamp = slots.stamp ? `<span class="section-stamp">${slots.stamp}</span>` : '';
    const heading = slots.num
      ? `<div class="section-label"><span class="section-num">${slots.num}</span><${tag}>${slots.title || ''}</${tag}>${stamp}</div>`
      : `<div class="section-label"><${tag}>${slots.title || ''}</${tag}>${stamp}</div>`;
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
