// Named SVG bits — five stages of desire icons (creation.html Part Three)
// All stroke/fill use var(--gold) for theme-awareness

// desire1: flame — Bodily (גופניות)
export const svgDesire1 = {
  render() {
    return `<div class="svg-art"><svg width="24" height="32" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M 16 38 C 6 30 4 20 10 12 C 11 18 14 16 14 10 C 18 16 22 12 20 6 C 28 14 28 28 16 38 Z" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linejoin="round"/>
</svg></div>`;
  }
};

// desire2: bar chart — Wealth (עושר)
export const svgDesire2 = {
  render() {
    return `<div class="svg-art"><svg width="36" height="28" viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="24" width="8" height="10" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
  <rect x="16" y="16" width="8" height="18" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
  <rect x="28" y="6" width="8" height="28" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
</svg></div>`;
  }
};

// desire3: mountain graph — Honor (כבוד)
export const svgDesire3 = {
  render() {
    return `<div class="svg-art"><svg width="36" height="28" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg">
  <polyline points="2,28 2,10 12,20 20,4 28,20 38,10 38,28 2,28" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linejoin="round"/>
</svg></div>`;
  }
};

// desire4: eye / lens — Knowledge (דעת)
export const svgDesire4 = {
  render() {
    return `<div class="svg-art"><svg width="40" height="24" viewBox="0 0 44 28" xmlns="http://www.w3.org/2000/svg">
  <path d="M 2 14 C 10 4 34 4 42 14 C 34 24 10 24 2 14 Z" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
  <circle cx="22" cy="14" r="5" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
</svg></div>`;
  }
};

// desire5: circle with filled center point — Point in the Heart (נקודה שבלב)
export const svgDesire5 = {
  render() {
    return `<div class="svg-art"><svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="13" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
  <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
</svg></div>`;
  }
};
