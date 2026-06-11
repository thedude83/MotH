const cite = slots => (slots.source || slots.author)
  ? `<cite>${slots.source ? `<strong>${slots.source}</strong>` : ''}${slots.source && slots.author ? '<br>' : ''}${slots.author ? `<em>${slots.author}</em>` : ''}</cite>`
  : '';

const paras = body => body ? body.split('\n').filter(Boolean).map(l => `<p>${l}</p>`).join('') : '';

export const quote = {
  slots: ['source', 'author'],
  render({ args, body, slots }) {
    const cls = args === 'big' ? ' big' : '';
    return `<figure class="pullquote${cls}"><blockquote>${paras(body)}${cite(slots)}</blockquote></figure>`;
  }
};

export const quoteBig = {
  slots: ['source', 'author'],
  render({ body, slots }) {
    return `<figure class="pullquote big"><blockquote>${paras(body)}${cite(slots)}</blockquote></figure>`;
  }
};
