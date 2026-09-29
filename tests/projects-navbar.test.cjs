const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const navbar = fs.readFileSync('src/components/common/Navbar.tsx', 'utf8');

test('projects page shares the homepage transparent hero navbar state', () => {
  assert.match(navbar, /const isProjects = pathname === "\/projects";/);
  assert.match(navbar, /const isHeroOverlayPage = isHome \|\| isProjects;/);
  assert.match(navbar, /!isHeroOverlayPage && !scrolled/);
  assert.match(navbar, /if \(isHeroOverlayPage \|\| isCareers \|\| isAbout \|\| isBlogs \|\| isBlogDetail \|\| isContact\)/);
});

test('services mega menu renders every service featured by the CMS category', () => {
  assert.doesNotMatch(navbar, /selectedCategory\.featured_services\.slice\(0,\s*4\)/);
});
