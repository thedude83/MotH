// form-field — labelled text input or textarea; type slot: "text" (default) or "textarea"
export const formField = {
  slots: ['label', 'name', 'type', 'placeholder'],
  render({ slots }) {
    const type = slots.type || 'text';
    const name = slots.name || 'field';
    const ph   = slots.placeholder ? ` placeholder="${slots.placeholder}"` : '';
    const input = type === 'textarea'
      ? `<textarea class="field-textarea" name="${name}"${ph}></textarea>`
      : `<input type="text" class="field-input" name="${name}"${ph}>`;
    return `<label class="form-field">
  <span class="field-label">${slots.label || ''}</span>
  ${input}
</label>`;
  }
};
