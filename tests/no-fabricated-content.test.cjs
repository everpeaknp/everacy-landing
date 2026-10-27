const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const files = [
  'src/app/(marketing)/projects/ProjectsClient.tsx',
  'src/app/(marketing)/blogs/page.tsx',
  'src/app/(marketing)/careers/page.tsx',
  'src/components/sections/TestimonialsSection.tsx',
  'src/components/sections/ProcessSection.tsx',
  'src/components/sections/ArchSection.tsx',
  'src/components/sections/FeaturedBlogs.tsx',
  'src/components/sections/TeamSection.tsx',
  'src/components/sections/ContactForm.tsx',
  'src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx',
  'src/components/sections/ServiceDetailHero.tsx',
  'src/app/(marketing)/privacy/page.tsx',
  'src/app/(marketing)/terms/page.tsx',
  'src/app/(marketing)/cookies/page.tsx',
  'src/app/(marketing)/page.tsx',
  'src/app/(marketing)/contact/page.tsx',
  'src/app/(marketing)/careers/page.tsx',
  'src/app/(marketing)/careers/[slug]/page.tsx',
  'src/components/common/Footer.tsx',
];

test('public content renderers do not define sample-record fallback collections', () => {
  const source = files.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  for (const marker of ['FALLBACK_ITEMS', 'const BLOGS =', 'STATIC_VACANCIES', 'STATIC_VALUES', 'STATIC_PERKS', 'STATIC_TESTIMONIALS', 'STATIC_PROCESS', 'staticTestimonials', 'processConfig.steps', 'archSectionCards', 'const WORK_TYPES =', 'const SERVICES =', '+1 (555) 123-4567', 'fallbackArticleCovers', 'A stack chosen for your project', 'Details that hold up in use', 'Why teams choose Everacy', 'Typical scope', 'solution areas', 'delivery stages', 'tools & platforms', 'We collect information you provide directly to us', 'By accessing and using this website, you accept', 'Cookies are small text files', 'elite IT engineering firm delivering cloud, AI', 'Get in touch with Everacy. Let\'s build what matters.', 'Join our elite team to build scalable and robust digital infrastructure.', 'Join us and help build the future of elite engineering.', 'Engineering Tomorrow', 'High-performance IT solutions engineered for the future', 'Everacy Insight']) {
    assert.ok(!source.includes(marker), 'unexpected fabricated content source: ' + marker);
  }
});

test('homepage delivery process has no hardcoded phase or marketing content fallbacks', () => {
  const source = fs.readFileSync('src/components/sections/ProcessSection.tsx', 'utf8');
  for (const marker of [
    'PHASE_DETAILS',
    'STEP_METAS',
    'How We Turn Your Vision Into World-Class Infrastructure',
    'automated delivery pipeline in motion',
    'SPRINT VELOCITY: COMMITTED',
    'GUARANTEED SLAs',
    '98.2%',
    'Zero-Downtime Scale',
  ]) {
    assert.ok(!source.includes(marker), 'unexpected hardcoded delivery-process content: ' + marker);
  }
  assert.match(source, /if \(!steps\.length\) return null/);
});

test('homepage delivery process renders its optional CMS icon without a static fallback', () => {
  const api = fs.readFileSync('src/lib/api.ts', 'utf8');
  const source = fs.readFileSync('src/components/sections/ProcessSection.tsx', 'utf8');
  const processStep = api.match(/export interface ProcessStepData \{([\s\S]*?)\n\}/)?.[1] ?? '';

  assert.match(processStep, /icon\?: string \| null/);
  assert.match(source, /icon:\s*step\.icon\?\.trim\(\)\s*\?\?\s*""/);
  assert.match(source, /item\.icon &&/);
  assert.match(source, /src=\{item\.icon\}/);
  assert.doesNotMatch(source, /fallback.*icon|default.*icon/i);
});
