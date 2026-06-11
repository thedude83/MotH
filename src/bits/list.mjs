// [fo] — bulleted list; nest [list] children under the last item for sub-lists
export const list = {
  render({ body, children }) {
    const lines = body ? body.split('\n').filter(Boolean) : [];
    if (!lines.length) {
      return `<ul class="list">${children.join('')}</ul>`;
    }
    const items = lines.map((l, i) => {
      const isLast = i === lines.length - 1;
      return `<li>${l}${isLast && children.length ? children.join('') : ''}</li>`;
    });
    return `<ul class="list">${items.join('')}</ul>`;
  }
};
