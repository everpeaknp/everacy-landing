const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

test('liquid animation has a visible CSS fallback and respects reduced motion', () => {
  const component = fs.readFileSync('src/components/ui/liquid-effect-animation.tsx', 'utf8');
  const styles = fs.readFileSync('src/app/globals.css', 'utf8');
  assert.match(component, /liquid-effect__fallback/);
  assert.match(component, /max-width:\s*767px.*pointer:\s*coarse/);
  assert.match(component, /canvas\.style\.display = "none"/);
  assert.match(styles, /\.liquid-effect__fallback/);
  assert.match(styles, /@keyframes liquid-effect-drift/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});
