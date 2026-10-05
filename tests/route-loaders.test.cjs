const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = 'src/app/(marketing)';
const routes = [
  ['', 'home'], ['about', 'editorial'], ['services', 'listing'],
  ['services/[categorySlug]', 'listing'], ['services/[categorySlug]/[serviceSlug]', 'service'],
  ['projects', 'listing'], ['projects/[slug]', 'detail'], ['blogs', 'listing'],
  ['blogs/[slug]', 'detail'], ['careers', 'listing'], ['careers/[slug]', 'detail'],
  ['contact', 'contact'], ['privacy', 'legal'], ['terms', 'legal'], ['cookies', 'legal'],
];

test('every public page family has a matching route loading boundary', () => {
  for (const [route, variant] of routes) {
    const file = path.join(root, route, 'loading.tsx');
    assert.ok(fs.existsSync(file), 'missing route loading boundary: ' + file);
    const source = fs.readFileSync(file, 'utf8');
    const expected = variant === 'service' ? 'ServiceDetailSkeleton'
      : route === 'projects/[slug]' ? 'ProjectDetailSkeleton'
      : 'variant="' + variant + '"';
    assert.ok(source.includes(expected), file + ' should use ' + variant + ' skeleton');
  }
});
