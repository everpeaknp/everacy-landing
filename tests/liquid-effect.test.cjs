const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

test('mobile keeps WebGL active and overlays the animated brand gradient on the hero', () => {
  const component = fs.readFileSync('src/components/ui/liquid-effect-animation.tsx', 'utf8');
  const hero = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');
  const styles = fs.readFileSync('src/app/globals.css', 'utf8');
  assert.match(component, /liquid-effect__fallback/);
  assert.match(component, /mobileOverlay\?: boolean/);
  assert.match(hero, /LiquidEffectAnimation fill="absolute" zIndex=\{0\} mobileOverlay/);
  assert.match(component, /const isMobile = window\.matchMedia\("\(max-width: 767px\), \(pointer: coarse\)"\)\.matches/);
  assert.match(component, /Math\.min\(window\.devicePixelRatio, isMobile \? 1 : 1\.5\)/);
  assert.doesNotMatch(component, /canvas\.style\.display = "none"/);
  assert.match(styles, /\.liquid-effect__fallback/);
  assert.match(styles, /liquid-effect__fallback--mobile-overlay/);
  assert.match(styles, /mix-blend-mode:\s*screen/);
  assert.match(styles, /@keyframes liquid-effect-drift/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});
