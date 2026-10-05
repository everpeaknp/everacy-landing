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

test('project detail uses a restrained editorial case-study layout and CMS content', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  assert.ok(route.includes('project.tagline?.text'));
  assert.ok(route.includes('project.description'));
  assert.ok(route.includes('detail.answer'));
  assert.ok(route.includes('features.map'));
  assert.ok(route.includes('project.tech_stack_items'));
  assert.ok(route.includes('project.team_composition'));
  assert.ok(route.includes('project.background_image'));
  assert.ok(!route.includes('project-flow-grid'));
  assert.ok(!route.includes('project-ecosystem-connector'));
  assert.ok(!route.includes('project-technology--dark'));
  assert.ok(!route.includes('project-hero-composition'));
  assert.ok(!route.includes('project.tagline.background_image'));
});

test('project list cards link to their resolvable slug routes', () => {
  const list = fs.readFileSync('src/app/(marketing)/projects/ProjectsClient.tsx', 'utf8');
  assert.ok(list.includes('href={`/projects/${project.slug}`}'));
});

test('project loading state is light and follows the simpler project page structure', () => {
  const loading = fs.readFileSync('src/app/(marketing)/projects/[slug]/loading.tsx', 'utf8');
  const skeleton = fs.readFileSync('src/components/sections/ProjectDetailSkeleton.tsx', 'utf8');
  assert.ok(loading.includes('ProjectDetailSkeleton'));
  assert.ok(!loading.includes('PageSkeleton'));
  assert.ok(skeleton.includes('aria-busy="true"'));
  assert.ok(skeleton.includes('project-detail-skeleton__hero'));
  assert.ok(skeleton.includes('project-detail-skeleton__banner'));
  assert.ok(skeleton.includes('project-detail-skeleton__tagline'));
  assert.ok(skeleton.includes('project-detail-skeleton__preview'));
  assert.ok(!skeleton.includes('project-detail-skeleton__facts'));
  assert.ok(skeleton.includes('project-detail-skeleton__details'));
  assert.ok(skeleton.includes('project-detail-skeleton__team'));
  assert.ok(skeleton.includes('project-detail-skeleton__technology'));
  assert.ok(skeleton.includes('project-detail-skeleton__closing'));
  assert.ok(!skeleton.includes('project-detail-skeleton__workflow-grid'));
});

test('project details stay readable and mobile-friendly', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  assert.ok(route.includes('project-detail-list'));
  assert.ok(route.includes('project-detail-row'));
  assert.ok(route.includes('ProjectScreenshotPreview'));
  assert.ok(route.includes('grid-cols-1'));
  assert.ok(route.includes('grid-cols-1'));
  assert.ok(!route.includes('min-h-72'));
});

test('project CMS fields are organized into distinct sections', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  for (const section of ['project-team', 'project-technology', 'project-cta']) {
    assert.ok(route.includes(section), 'project detail should include the ' + section + ' section');
  }
  assert.ok(route.includes('platforms.map'));
  assert.ok(route.includes('team.map'));
  assert.ok(route.includes('<ProjectTechnologyStack items={technologyItems} technologies={technologies} />'));
});

test('case study avoids decorative feature icons and uses authentic technology logos', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  const iconLibrary = fs.readFileSync('src/components/sections/ServiceContentIcon.tsx', 'utf8');
  assert.ok(!route.includes('CapabilityIcon'));
  assert.ok(fs.readFileSync('src/components/sections/TechnologyStack.tsx', 'utf8').includes('TechnologyMark'));
  assert.ok(iconLibrary.includes('siFastapi'));
  assert.ok(iconLibrary.includes('siAndroid'));
  assert.ok(iconLibrary.includes('siApple'));
});

test('project detail keeps a single showcase image and calm editorial sections', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  assert.ok(route.includes('project-detail-hero'));
  assert.ok(route.includes('All projects'));
  assert.ok(route.includes('project.background_image'));
  assert.ok(route.includes('project-technology'));
  assert.ok(route.includes('Built around day-to-day restaurant operations'));
  assert.ok(route.includes('The tools behind the product'));
  assert.ok(!route.includes('project-impact-strip'));
  assert.ok(!route.includes('project-connected-ecosystem'));
  assert.ok(!route.includes('project-workflow-visual'));
});

test('project case study uses a CMS-managed scroll preview and grouped technology marks', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  const preview = fs.readFileSync('src/components/sections/ProjectScreenshotPreview.tsx', 'utf8');
  assert.ok(route.includes('ProjectScreenshotPreview'));
  assert.ok(route.includes('project.screenshots'));
  assert.ok(route.includes('project.tech_stack_items'));
  assert.ok(route.includes('project.tagline?.text'));
  assert.ok(route.includes('Platforms'));
  assert.ok(route.includes('Project team'));
  assert.ok(preview.includes('onPointerEnter'));
  assert.ok(preview.includes('screenshots.map'));
  assert.ok(fs.readFileSync('src/app/globals.css', 'utf8').includes('prefers-reduced-motion'));
  assert.ok(preview.includes('poster'));
});

test('project page shows technologies as centered selectable logo tabs and keeps the preview control below media', () => {
  const tech = fs.readFileSync('src/components/sections/TechnologyStack.tsx', 'utf8');
  const preview = fs.readFileSync('src/components/sections/ProjectScreenshotPreview.tsx', 'utf8');
  assert.ok(tech.includes('aria-selected'));
  assert.ok(tech.includes('TechnologyMark'));
  assert.ok(tech.includes('role="tablist"'));
  assert.ok(tech.includes('min-h-12'));
  assert.ok(tech.includes('bg-[#edf3f5]'));
  assert.ok(tech.includes('bg-[#008da4]'));
  assert.ok(preview.includes('project-screen-preview__control'));
  assert.ok(!preview.includes('project-screen-preview__toggle'));
});

test('project page renders CMS narrative sections for approach, solutions, and result', () => {
  const route = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  assert.ok(route.includes('project.story_sections'));
  assert.ok(route.includes('project-story-section__content'));
  assert.ok(!route.includes('md:grid-cols-[.8fr_1.2fr]'));
  for (const key of ['approach', 'solutions', 'result']) assert.ok(route.includes('section.section === "' + key + '"'));
});

test('projects and service details use catalog-provided categories and uploaded logo URLs', () => {
  const shared = fs.readFileSync('src/components/sections/TechnologyStack.tsx', 'utf8');
  const project = fs.readFileSync('src/app/(marketing)/projects/[slug]/page.tsx', 'utf8');
  const service = fs.readFileSync('src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx', 'utf8');
  const icon = fs.readFileSync('src/components/sections/ServiceContentIcon.tsx', 'utf8');
  assert.ok(project.includes('project.tech_stack_items'));
  assert.ok(service.includes('service.tech_stack_items'));
  assert.ok(shared.includes('item.category'));
  assert.ok(shared.includes('technology.logo_url'));
  assert.ok(icon.includes('logoUrl'));
  assert.ok(shared.includes('fallbackCategory'));
});
