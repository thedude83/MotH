// Named SVG bits — creation phase diagrams (creation.html Part One)
// All stroke/fill use var(--gold) for theme-awareness

// phase0a: vesica / infinity alone — The Creator (unlabelled card)
export const svgPhase0a = {
  render() {
    return `<div class="svg-art"><svg width="140" height="70" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <path d="M 60 30 C 52 18 38 10 25 10 C 8 10 8 50 25 50 C 38 50 52 42 60 30 C 68 18 82 10 95 10 C 112 10 112 50 95 50 C 82 50 68 42 60 30 Z" fill="none" stroke="var(--gold)" stroke-width="3"/>
</svg></div>`;
  }
};

// phase0b: vesica + thick down arrow — step O (vessel brought into being)
export const svgPhase0b = {
  render() {
    return `<div class="svg-art"><svg width="140" height="140" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img">
  <path d="M 60 30 C 52 18 38 10 25 10 C 8 10 8 50 25 50 C 38 50 52 42 60 30 C 68 18 82 10 95 10 C 112 10 112 50 95 50 C 82 50 68 42 60 30 Z" fill="none" stroke="var(--gold)" stroke-width="3"/>
  <line x1="60" y1="35" x2="60" y2="110" stroke="var(--gold)" stroke-width="9" stroke-linecap="round"/>
  <polyline points="45,93 60,112 75,93" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
</svg></div>`;
  }
};

// phase1: cup + thin down arrow — step I (vessel receiving)
export const svgPhase1 = {
  render() {
    return `<div class="svg-art"><svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <line x1="60" y1="32" x2="60" y2="107" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
  <polyline points="45,90 60,109 75,90" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M 20 60 L 20 95 Q 20 145 60 145 Q 100 145 100 95 L 100 60 Z" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round"/>
</svg></div>`;
  }
};

// phase2: cup + thin up arrow — step II (vessel returning)
export const svgPhase2 = {
  render() {
    return `<div class="svg-art"><svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <line x1="60" y1="32" x2="60" y2="107" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
  <polyline points="45,49 60,30 75,49" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M 20 60 L 20 95 Q 20 145 60 145 Q 100 145 100 95 L 100 60 Z" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round"/>
</svg></div>`;
  }
};

// phase3: cup + thin up + thin down arrows — step III (inner life / circuit)
export const svgPhase3 = {
  render() {
    return `<div class="svg-art"><svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <path d="M 20 60 L 20 95 Q 20 145 60 145 Q 100 145 100 95 L 100 60 Z" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round"/>
  <line x1="44" y1="32" x2="44" y2="107" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
  <polyline points="29,49 44,30 59,49" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  <line x1="76" y1="32" x2="76" y2="107" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/>
  <polyline points="61,90 76,109 91,90" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
</svg></div>`;
  }
};

// phase4: cup + thick down arrow — step IV (desire at maximum; also reused for Birth)
export const svgPhase4 = {
  render() {
    return `<div class="svg-art"><svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <line x1="60" y1="32" x2="60" y2="107" stroke="var(--gold)" stroke-width="9" stroke-linecap="round"/>
  <polyline points="45,90 60,109 75,90" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M 20 60 L 20 95 Q 20 145 60 145 Q 100 145 100 95 L 100 60 Z" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round"/>
</svg></div>`;
  }
};

// phase5: cup + thick down arrow (left) + thick up arrow (right) — corrected vessel
export const svgPhase5 = {
  render() {
    return `<div class="svg-art"><svg width="120" height="150" viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <path d="M 20 60 L 20 95 Q 20 145 60 145 Q 100 145 100 95 L 100 60 Z" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linejoin="round"/>
  <line x1="47" y1="32" x2="47" y2="107" stroke="var(--gold)" stroke-width="9" stroke-linecap="round"/>
  <polyline points="32,90 47,109 62,90" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
  <line x1="79" y1="32" x2="79" y2="107" stroke="var(--gold)" stroke-width="9" stroke-linecap="round"/>
  <polyline points="64,49 79,30 94,49" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>
</svg></div>`;
  }
};
