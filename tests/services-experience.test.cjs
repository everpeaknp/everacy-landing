const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const servicesPage = read("src/app/(marketing)/services/page.tsx");
const categoryPage = read("src/app/(marketing)/services/[categorySlug]/page.tsx");
const detailPage = read("src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx");
const detailHero = read("src/components/sections/ServiceDetailHero.tsx");
const capabilityExplorer = read("src/components/sections/ServiceCapabilityExplorer.tsx");
const detailNav = read("src/components/sections/ServiceSectionNav.tsx");
const illustrations = read("src/lib/service-illustrations.ts");

const includes = (source, expected, message) => assert.equal(source.includes(expected), true, message);

test("services index keeps its original CMS-driven landing layout", () => {
  includes(servicesPage, "ServicePageHero", "The existing services landing hero should remain in place.");
  includes(servicesPage, "category.services.map", "The service list remains driven by CMS categories.");
});

test("category landing has a contact action and distinct service choices", () => {
  includes(categoryPage, "ServiceCategoryHero", "A category should not reuse the centered services-index hero.");
  includes(categoryPage, 'href="/contact"', "Category visitors need a direct next step.");
  includes(categoryPage, "category.services.map", "Service choices must remain driven by category CMS data.");
});

test("missing service imagery uses an illustrative CSS preview while real CMS media remains optional", () => {
  includes(detailHero, "ServiceConceptPreview", "A missing or unmatched hero image should get a designed concept preview.");
  includes(detailHero, "service.image || seoServiceImage", "CMS image and SEO media should take precedence.");
  includes(detailHero, "getServiceHeroIllustration", "Known service types should use the best-fit transparent illustration.");
  includes(detailHero, 'lg:grid-cols-[1.02fr_0.98fr]', "The hero visual should stay in its own right-hand column on desktop.");
  includes(illustrations, "service-previews/responsive-platforms.png", "Website development should use its matching transparent artwork when CMS media is absent.");
});

test("concept previews avoid decorative UI icons", () => {
  const preview = read("src/components/sections/ServiceConceptPreview.tsx");
  assert.equal(preview.includes("lucide-react"), false, "Concept art should use interface shapes instead of unrelated iconography.");
  assert.equal(preview.includes("VisualIcon"), false, "The preview header should not show a decorative service icon.");
});

test("service section navigation highlights the section currently in view", () => {
  includes(detailNav, "IntersectionObserver", "Active section follows the viewport while scrolling.");
  includes(detailNav, "aria-current", "The selected section is exposed accessibly.");
  includes(detailNav, "items.map", "Only the CMS-backed sections passed by the page are listed.");
  includes(detailNav, "setPointerCapture", "Users can drag the horizontal section strip with a mouse.");
  includes(detailNav, "cursor-grab", "The cursor signals that the strip can be dragged.");
  includes(detailNav, 'dragging ? "cursor-grabbing" : "cursor-grab"', "Section links must preserve the grab cursor while hovered.");
});

test("capability selection still exposes the selected copy and has a visual fallback only when CMS media is absent", () => {
  includes(capabilityExplorer, 'role="tablist"', "Capability tabs must remain accessible.");
  includes(capabilityExplorer, 'role="tabpanel"', "Each tab must label its content panel.");
  includes(capabilityExplorer, "ServiceConceptPreview", "No CMS capability image should not leave a blank visual column.");
  includes(capabilityExplorer, "getCapabilityIllustration", "Selecting a capability should update its matching illustrative visual.");
  includes(capabilityExplorer, "capability.description", "Selecting a capability must reveal its CMS description.");
});

test("service details provide compact section navigation and varied process presentation", () => {
  includes(detailPage, "ServiceSectionNav", "Long service pages need direct section navigation.");
  includes(detailPage, 'id="service-process"', "The delivery section must be a navigation target.");
  includes(detailPage, "<ServiceProcessSteps steps={service.pipeline}", "Delivery steps should stay driven by CMS data.");
});

test("service delivery grid keeps each description with its step and avoids a duplicate active panel", () => {
  const processSteps = read("src/components/sections/ServiceProcessSteps.tsx");
  includes(processSteps, "steps.map", "Every CMS delivery step should appear in the sequence.");
  includes(processSteps, "step.detail", "Every step should show its description in place.");
  includes(processSteps, "<ol", "The steps should have ordered list semantics.");
  includes(processSteps, "xl:grid-cols-3", "The sequence should use a balanced three-column desktop grid.");
  assert.doesNotMatch(processSteps, /role="tablist"|role="tabpanel"|activeStep/);
});
