// mode-tabs — mode selector tabs with time-based auto-detect. Works with mode-section bit.
export const modeTabs = {
  render() {
    return `<div class="mode-tabs" id="mode-tabs" role="tablist">
  <button class="btn" data-mode="morning"  role="tab">Morning</button>
  <button class="btn" data-mode="nightly"  role="tab">Nightly</button>
  <button class="btn" data-mode="weekly"   role="tab">Weekly</button>
</div>
<script>
(function(){
  function autoMode() {
    var d = new Date(), h = d.getHours(), dow = d.getDay();
    if (dow === 0 && h < 12) return 'weekly';
    if (h >= 19)             return 'nightly';
    return 'morning';
  }
  function setMode(m) {
    document.querySelectorAll('.mode-section').forEach(function(s) {
      s.style.display = s.dataset.mode === m ? '' : 'none';
    });
    document.querySelectorAll('#mode-tabs [data-mode]').forEach(function(b) {
      b.dataset.active = b.dataset.mode === m ? 'true' : 'false';
    });
  }
  document.querySelectorAll('#mode-tabs [data-mode]').forEach(function(b) {
    b.addEventListener('click', function(){ setMode(b.dataset.mode); });
  });
  setMode(autoMode());
})();
</script>`;
  }
};
