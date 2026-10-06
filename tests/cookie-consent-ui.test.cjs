const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

const component = fs.readFileSync('src/components/common/CookieConsent.tsx', 'utf8');
const styles = fs.readFileSync('src/app/globals.css', 'utf8');

test('cookie banner uses a square mobile layout with full-width safe-area positioning', () => {
  assert.match(component, /cookie-consent-banner/);
  assert.match(component, /cookie-consent-actions/);
  assert.match(component, /grid-cols-2/);
  assert.doesNotMatch(component, /rounded-2xl/);
  assert.match(styles, /\.cookie-consent-banner\s*\{\s*bottom:\s*max\([^;]*safe-area-inset-bottom/);
});

test('cookie preferences dialog remains square and scrollable on short mobile screens', () => {
  assert.match(component, /cookie-preferences-sheet/);
  assert.match(component, /max-h-\[calc\(100dvh-2rem\)\]/);
});
