// [fo] — standalone prose paragraph
export const para = {
  render({ body }) {
    const paras = body ? body.split('\n').filter(Boolean).map(l => `<p class="prose">${l}</p>`).join('') : '';
    return paras;
  }
};
