// harm-row — weekly harm table row: person · what · repaired · action
export const harmRow = {
  slots: ['index'],
  render({ slots }) {
    const i = slots.index || '1';
    return `<div class="harm-row">
  <input type="text" class="field-input" name="harm_${i}_person" placeholder="Who">
  <input type="text" class="field-input" name="harm_${i}_what"   placeholder="What happened">
  <label class="checklist-item" title="Repaired?">
    <input type="checkbox" name="harm_${i}_repaired" value="true"> ✓
  </label>
  <input type="text" class="field-input" name="harm_${i}_action" placeholder="Action needed">
</div>`;
  }
};
