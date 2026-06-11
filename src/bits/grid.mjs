// [fo] — arrangement only. Knows nothing about its children.
// args: "2" = 2-col · "2.1.2" = rows of 2,1,2 · "1|3|1" = col-stacks of 1,3,1
export const grid = {
  slots: ['width'],
  render({ args, slots, children }) {
    const w = slots.width ? ` style="max-width:${slots.width}"` : '';
    if (args.includes('|')) {
      const cols = args.split('|').map(Number);
      let i = 0;
      const colHtml = cols.map(count => {
        const slice = children.slice(i, i + count);
        i += count;
        return `<div class="grid-col">${slice.join('')}</div>`;
      }).join('');
      return `<div class="grid-wrap"${w}><div class="grid-row g${cols.length}">${colHtml}</div></div>`;
    }
    if (args.includes('.')) {
      const rows = args.split('.').map(Number);
      let i = 0;
      const rowHtml = rows.map(cols => {
        const slice = children.slice(i, i + cols);
        i += cols;
        return `<div class="grid-row g${cols}">${slice.join('')}</div>`;
      }).join('');
      return `<div class="grid-wrap"${w}>${rowHtml}</div>`;
    }
    const cols = parseInt(args) || 1;
    return `<div class="grid-wrap g${cols}"${w}>${children.join('')}</div>`;
  }
};
