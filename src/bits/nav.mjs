// [fo] + /fu/ — fixed top bar: brand + section links + scroll-spy
export function nav({ brand, sections }) {
  const links = [{ id: 'top', label: 'Overview' }, ...sections]
    .map(s => `<a href="#${s.id}">${s.label}</a>`)
    .join('\n  ');
  return `<nav class="site-nav">
  <a class="nav-brand" href="#top">${brand}</a>
  ${links}
</nav>
<script>
document.addEventListener('DOMContentLoaded',function(){
  var as=[].slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;
    as.forEach(function(a){a.classList.toggle('active',a.getAttribute('href').slice(1)===e.target.id);});
  });},{rootMargin:'-30% 0px -60% 0px'});
  as.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));}).filter(Boolean).forEach(function(t){obs.observe(t);});
});
</script>`;
}
