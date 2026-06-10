// [fo] — middle pillar SVG for three-gates. No slots; renders inline SVG + scroll-spy.
// Gate IDs gate-the-mark, gate-the-head, gate-the-door match card-gate's auto-ID logic.
export const svgThreeGates = {
  render() {
    return `<div class="pillar-wrap">
  <svg width="200" height="420" viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Middle Pillar">
    <line x1="100" y1="370" x2="100" y2="58"  stroke="var(--gold)" stroke-width="0.5" opacity="0.1"/>
    <line x1="100" y1="370" x2="100" y2="275" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" opacity="0.35" id="path-tav"/>
    <line x1="100" y1="255" x2="100" y2="165" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" opacity="0.35" id="path-resh"/>
    <line x1="100" y1="145" x2="100" y2="58"  stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" opacity="0.35" id="path-dalet"/>
    <text x="115" y="330" font-family="var(--fh)" font-size="15" fill="var(--gold)" opacity="0.9"  text-anchor="middle">ת</text>
    <text x="115" y="218" font-family="var(--fh)" font-size="15" fill="var(--gold)" opacity="0.9"  text-anchor="middle">ר</text>
    <text x="115" y="108" font-family="var(--fh)" font-size="15" fill="var(--gold)" opacity="0.9"  text-anchor="middle">ד</text>
    <circle cx="100" cy="386" r="22" fill="var(--bg1)" stroke="var(--gold)" stroke-width="1"   opacity="0.55"/>
    <text   x="100" y="391" font-family="var(--fh)" font-size="11" fill="var(--text)" text-anchor="middle" opacity="0.75">מלכות</text>
    <circle cx="100" cy="260" r="22" fill="var(--bg1)" stroke="var(--gold)" stroke-width="1"   opacity="0.6"/>
    <text   x="100" y="265" font-family="var(--fh)" font-size="11" fill="var(--text)" text-anchor="middle" opacity="0.8">יסוד</text>
    <circle cx="100" cy="153" r="22" fill="var(--bg1)" stroke="var(--gold)" stroke-width="1.5" opacity="0.75"/>
    <text   x="100" y="158" font-family="var(--fh)" font-size="9.5" fill="var(--text)" text-anchor="middle" opacity="0.9">תפארת</text>
    <circle cx="100" cy="42"  r="22" fill="var(--bg1)" stroke="var(--gold)" stroke-width="2"   opacity="1"/>
    <text   x="100" y="47"  font-family="var(--fh)" font-size="11" fill="var(--gold)" text-anchor="middle" opacity="0.95">כתר</text>
  </svg>
</div>
<script>
document.addEventListener('DOMContentLoaded',function(){
  var gates=[
    {id:'gate-the-mark', path:'path-tav'},
    {id:'gate-the-head', path:'path-resh'},
    {id:'gate-the-door', path:'path-dalet'}
  ];
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){
    var g=gates.find(function(x){return x.id===e.target.id;});if(!g)return;
    var line=document.getElementById(g.path);if(line)line.setAttribute('opacity',e.isIntersecting?'0.95':'0.35');
  });},{rootMargin:'-20% 0px -50% 0px'});
  gates.forEach(function(g){var el=document.getElementById(g.id);if(el)obs.observe(el);});
});
</script>`;
  }
};
