// [fo] — standalone prose paragraph
export const para = {
  slots: ['align', 'width'],
  render({ slots, body }) {
    const cls   = slots.align ? ` ${slots.align}` : '';
    const style = slots.width ? ` style="max-width:${slots.width}"` : '';
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p class="prose${cls}"${style}>${l}</p>`).join('') : '';
    return paras;
  }
};
