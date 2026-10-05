const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('homepage technology section uses the shared CMS-driven stack tabs', () => {
  const route = fs.readFileSync('src/app/(marketing)/page.tsx', 'utf8');
  const section = fs.readFileSync('src/components/sections/HomeTechnologySection.tsx', 'utf8');

  assert.ok(route.includes('HomeTechnologySection'));
  assert.ok(section.includes('TechnologyStack'));
  assert.ok(section.includes('tech_stack_items'));
  assert.ok(section.includes('tech_stack'));
  assert.ok(section.includes('Set('), 'technology entries should be de-duplicated');
});

test('homepage technology section copy and visibility come from Home CMS data', () => {
  const route = fs.readFileSync('src/app/(marketing)/page.tsx', 'utf8');
  const section = fs.readFileSync('src/components/sections/HomeTechnologySection.tsx', 'utf8');
  const types = fs.readFileSync('src/lib/api.ts', 'utf8');

  assert.match(route, /technologySection=\{homeData\?\.technology_section\}/);
  assert.match(section, /technologySection\?: HomeTechnologySectionData/);
  assert.match(section, /technologySection\?\.title/);
  assert.match(section, /technologySection\?\.layers/);
  assert.match(section, /technologySection\.technologies/);
  assert.match(types, /technology_section\?: HomeTechnologySectionData/);
  assert.match(types, /export interface HomeTechnologySectionData/);
});

test('technology panel keeps section height stable across tab changes', () => {
  const stack = fs.readFileSync('src/components/sections/TechnologyStack.tsx', 'utf8');
  const marks = fs.readFileSync('src/components/sections/ServiceContentIcon.tsx', 'utf8');
  assert.match(stack, /role="tabpanel"[^\n]*h-\[/);
  assert.match(stack, /compact \? "" : "min-h-\[23rem\]"/);
  assert.match(stack, /flex \$\{compact \? "" : "min-h-\[23rem\]"\} flex-wrap content-start justify-center/);
  assert.match(stack, /pt-8/);
  assert.match(stack, /sm:pt-10/);
  assert.match(stack, /basis-\[calc\(33\.333%/);
  assert.match(stack, /sm:basis-\[calc\(25%/);
  assert.match(stack, /xl:basis-\[calc\(20%/);
  assert.match(stack, /groups\.reduce\(\(maximum, group\) => Math\.max\(maximum, group\.technologies\.length\)/);
  assert.doesNotMatch(stack, /role="tabpanel"[^\n]*overflow-y-auto/);
  assert.match(marks, /flutter: siFlutter/);
  assert.match(marks, /go: siGo/);
  assert.match(marks, /rust: siRust/);
});
