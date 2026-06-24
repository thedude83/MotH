// mode-section — mode-switchable content wrapper; args = mode name (morning|nightly|weekly)
export const modeSection = {
  render({ args, children }) {
    return `<div class="mode-section" data-mode="${args}" style="display:none">
${children.join('\n')}
</div>`;
  }
};
