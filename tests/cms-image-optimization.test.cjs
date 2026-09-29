const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const teamSection = fs.readFileSync('src/components/sections/TeamSection.tsx', 'utf8');

test('About team images bypass Next optimization for local Django media URLs', () => {
  assert.match(teamSection, /unoptimized=\{isLocalCmsMedia\(member\.image\)\}/);
  assert.match(teamSection, /function isLocalCmsMedia\(/);
  assert.match(teamSection, /hostname === "127\.0\.0\.1"/);
  assert.match(teamSection, /hostname === "localhost"/);
});
