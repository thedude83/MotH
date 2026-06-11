// [fo] — sticky bottom bar with zoom + theme toggles
export function footer() {
  return `<footer class="site-footer">
  <button class="footer-toggle" id="zoom-toggle" aria-label="Toggle zoom"></button>
  <div class="footer-brand">
    <span class="footer-he">הגיון לבי</span>
    <span class="footer-line">given freely, for you, that you might live</span>
  </div>
  <button class="footer-toggle" id="theme-toggle" aria-label="Toggle theme"></button>
</footer>`;
}
