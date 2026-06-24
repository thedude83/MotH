// form-submit — self-contained submit button with per-day file write
// target slot: path pattern using {date} or {week} placeholder
// e.g. target: data/tools/ethics-tracker/daily/{date}.md
let _uid = 0;
export const formSubmit = {
  slots: ['label', 'target', 'mode'],
  render({ slots }) {
    const id     = `fsub-${++_uid}`;
    const label  = slots.label  || 'Log';
    const target = slots.target || '';
    const mode   = slots.mode   || '';
    return `<div class="form-submit-wrap">
  <button id="${id}" class="btn btn-submit" data-mode="${mode}">${label}</button>
  <span id="${id}-st" class="submit-status"></span>
</div>
<script>
(function(){
  var btn = document.getElementById('${id}');
  var st  = document.getElementById('${id}-st');

  function resolvePath() {
    var d   = new Date();
    var pad = function(n){ return n < 10 ? '0'+n : ''+n; };
    var date = d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
    var dow  = d.getDay() || 7; // 1=Mon..7=Sun
    var mon  = new Date(d); mon.setDate(d.getDate() - (dow - 1));
    var week = mon.getFullYear()+'-'+pad(mon.getMonth()+1)+'-'+pad(mon.getDate());
    return '${target}'.replace('{date}', date).replace('{week}', week);
  }

  function collectData() {
    var section = btn.closest('.mode-section') || document.body;
    var inputs  = section.querySelectorAll('input[name], textarea[name]');
    var data    = {};
    inputs.forEach(function(el) {
      if (!el.name) return;
      if      (el.type === 'checkbox') data[el.name] = el.checked ? 'true' : 'false';
      else if (el.type === 'radio')    { if (el.checked) data[el.name] = el.value; }
      else                             data[el.name] = el.value;
    });
    return data;
  }

  function serialize(existing, incoming) {
    var current = {};
    if (existing && existing.trim()) {
      existing.trim().split('\\n').forEach(function(l) {
        var c = l.indexOf(': ');
        if (c > 0) current[l.slice(0, c).trim()] = l.slice(c + 2);
      });
    }
    Object.assign(current, incoming);
    return Object.entries(current).map(function(e){ return e[0]+': '+e[1]; }).join('\\n');
  }

  btn.addEventListener('click', function(e) {
    e.preventDefault();
    st.textContent = 'Saving…';
    st.className   = 'submit-status';
    var path     = resolvePath();
    var formData = collectData();
    fetch('/' + path)
      .then(function(r){ return r.ok ? r.text() : ''; })
      .then(function(existing) {
        var body = serialize(existing, formData);
        return fetch('/' + path, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: body });
      })
      .then(function(r) {
        st.textContent = r.ok ? 'Saved ✓' : 'Error — could not save';
        st.className   = 'submit-status ' + (r.ok ? 'ok' : 'err');
      })
      .catch(function() {
        st.textContent = 'Network error — is the dev server running?';
        st.className   = 'submit-status err';
      });
  });
})();
</script>`;
  }
};
