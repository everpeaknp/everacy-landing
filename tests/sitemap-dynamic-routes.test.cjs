const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const sitemap = fs.readFileSync('src/app/sitemap.ts', 'utf8');

test('sitemap includes CMS service categories, service details, and career details', () => {
  assert.match(sitemap, /fetchServiceCategories/);
  assert.match(sitemap, /fetchServices/);
  assert.match(sitemap, /fetchCareers/);
  assert.match(sitemap, /\/services\/\$\{category\.slug\}/);
  assert.match(sitemap, /service\.category\?\.slug/);
  assert.match(sitemap, /\/services\/\$\{service\.category\.slug\}\/\$\{service\.slug\}/);
  assert.match(sitemap, /\/careers\/\$\{job\.slug\}/);
});
