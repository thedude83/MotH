// scene-row — nightly key moment: text description + B/T radio (exclusive per row)
export const sceneRow = {
  slots: ['index', 'placeholder'],
  render({ slots }) {
    const i  = slots.index || '1';
    const ph = slots.placeholder ? ` placeholder="${slots.placeholder}"` : '';
    return `<div class="scene-row">
  <input type="text" class="field-input" name="key_scene_${i}"${ph}>
  <div class="bt-toggle">
    <label><input type="radio" name="key_scene_${i}_type" value="B"> B</label>
    <label><input type="radio" name="key_scene_${i}_type" value="T"> T</label>
  </div>
</div>`;
  }
};
