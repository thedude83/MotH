// [fo] — centered image. args: width % (default 33). src is filename only, img/ prepended.
export const img = {
  slots: ['src', 'alt'],
  render({ args, slots }) {
    const width = args ? `${parseInt(args)}%` : '33%';
    return `<figure class="fig">
  <img src="img/${slots.src || ''}" alt="${slots.alt || ''}" style="width:${width}" loading="lazy">
</figure>`;
  }
};
