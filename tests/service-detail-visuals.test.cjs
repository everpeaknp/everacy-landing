const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const heroSource = fs.readFileSync(path.join(root, "src/components/sections/ServiceDetailHero.tsx"), "utf8");
const explorerSource = fs.readFileSync(path.join(root, "src/components/sections/ServiceCapabilityExplorer.tsx"), "utf8");
const pageSource = fs.readFileSync(path.join(root, "src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx"), "utf8");
const technologyStackSource = fs.readFileSync(path.join(root, "src/components/sections/TechnologyStack.tsx"), "utf8");

test("service detail hero prioritizes CMS media, then uses a service-matched illustration or concept preview", () => {
  assert.match(heroSource, /service\.image\s*\|\|\s*seoServiceImage\s*\|\|\s*null/);
  assert.match(heroSource, /getServiceHeroIllustration\(service\.title\)/);
  assert.match(heroSource, /<ServiceConceptPreview title=\{service\.title\}/);
  const illustrationSource = fs.readFileSync(path.join(root, "src/lib/service-illustrations.ts"), "utf8");
  assert.match(illustrationSource, /service-previews\/responsive-platforms\.png/);
  assert.doesNotMatch(heroSource, /bg-\[#dce9ec\]|Visual preview/);
});

test("service capability explorer is data-driven, keyboard accessible, and only uses CMS media when supplied", () => {
  assert.match(explorerSource, /capabilities\.map\(\(capability, index\)/);
  assert.match(explorerSource, /role="tablist"/);
  assert.match(explorerSource, /ArrowRight/);
  assert.match(explorerSource, /ArrowLeft/);
  assert.match(explorerSource, /role="tabpanel"/);
  assert.match(explorerSource, /image\s*\?\s*\(/);
  assert.match(explorerSource, /<ServiceConceptPreview title=\{capabilities\[activeIndex\]/);
  assert.doesNotMatch(explorerSource, /bg-\[radial-gradient|bg-white\/90/);
});

test("selected capability description appears in its active row without a duplicate panel after the list", () => {
  assert.match(explorerSource, /const panelId = `service-capability-panel-\$\{index\}`/);
  assert.match(explorerSource, /hidden=\{!selected\}/);
  assert.match(explorerSource, /capability\.description/);
  assert.doesNotMatch(explorerSource, /selected \? "Selected capability"/);
  assert.doesNotMatch(explorerSource, /id="service-capability-panel" role="tabpanel"/);
});

test("process section keeps each explanation in its step and avoids a detached workflow illustration", () => {
  assert.doesNotMatch(pageSource, /service-workflow\.png/);
  assert.match(pageSource, /<ServiceProcessSteps steps=\{service\.pipeline\}/);
  assert.match(pageSource, /id="service-process"/);
  assert.match(pageSource, /<ServiceTechnologyStack/);
});

test("technology stack panel height follows its content instead of reserving a large empty block", () => {
  assert.doesNotMatch(technologyStackSource, /compact\s*\?\s*0\s*:\s*23\s*\*\s*16/);
  assert.doesNotMatch(technologyStackSource, /min-h-\[23rem\]/);
  assert.match(technologyStackSource, /--technology-panel-height-mobile/);
  assert.match(technologyStackSource, /Math\.ceil\(maxItemsInGroup \/ 3\) \* 80/);
  assert.match(technologyStackSource, /Math\.ceil\(maxItemsInGroup \/ 4\) \* 108/);
  assert.match(technologyStackSource, /Math\.ceil\(maxItemsInGroup \/ 5\) \* 108/);
});

test("feature and benefit sections accept optional CMS images in distinct compositions", () => {
  assert.match(pageSource, /lg:grid-cols-\[0\.78fr_1\.22fr\]/);
  assert.match(pageSource, /lg:grid-cols-\[1\.22fr_0\.78fr\]/);
  assert.match(pageSource, /order-2[^\n]*lg:order-1/);
  assert.match(pageSource, /order-1[^\n]*lg:order-2/);
  assert.match(pageSource, /service\.features_image && service\.features\.length <= 4/);
  assert.match(pageSource, /service\.benefits_image && service\.benefits\.length <= 4/);
});

test("CSS concept previews have clear illustrative labeling and never imply client metrics", () => {
  const previewSource = fs.readFileSync(path.join(root, "src/components/sections/ServiceConceptPreview.tsx"), "utf8");
  assert.match(previewSource, /Concept preview/);
  assert.match(previewSource, /not a client screenshot/);
  assert.match(previewSource, /no client metrics shown/);
});
