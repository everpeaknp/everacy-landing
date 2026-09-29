const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('project detail route renders CMS fields and uses not-found for missing projects', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  for (const field of ['fetchProject', 'project.hero', 'project.details', 'project.tech_stack', 'project.platforms', 'project.seo', 'notFound()']) {
    assert.ok(route.includes(field), 'project detail route must use ' + field);
  }
  assert.ok(fs.existsSync('src/app/(marketing)/projects/[slug]/loading.tsx'));
});

test('project list cards link to their resolvable slug routes', () => {
  const list = fs.readFileSync('src/app/(marketing)/projects/ProjectsClient.tsx', 'utf8');
  assert.ok(list.includes('href={`/projects/${project.slug}`}'));
});
