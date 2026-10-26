const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");

const source = fs.readFileSync(path.join(__dirname, "../src/lib/seo.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function loadSeo() {
  const moduleBox = { exports: {} };
  vm.runInNewContext(compiled, {
    module: moduleBox,
    exports: moduleBox.exports,
    process: { env: { NEXT_PUBLIC_API_URL: "https://cms.everacy.com" } },
    URL,
    require: (specifier) => {
      if (specifier === "@/lib/image-seo") return { resolveImageAlt: ({ alt }) => alt || "Page image" };
      throw new Error(`Unexpected dependency: ${specifier}`);
    },
  });
  return moduleBox.exports;
}

test("service OG images stored as CMS-relative media paths use the public CMS host", () => {
  const { generateMetadata } = loadSeo();
  const metadata = generateMetadata({
    title: "Website Design",
    seoData: { og_image: "/media/seo/og_images/service-share.png", is_indexed: true },
    globalSeo: { canonical_domain: "https://www.everacy.com" },
  });

  assert.equal(metadata.openGraph.images[0].url, "https://cms.everacy.com/media/seo/og_images/service-share.png");
  assert.equal(metadata.twitter.images[0].url, "https://cms.everacy.com/media/seo/og_images/service-share.png");
});

test("the CMS global OG image is used when a page has no specific image", () => {
  const { generateMetadata } = loadSeo();
  const metadata = generateMetadata({
    title: "Services",
    globalSeo: { canonical_domain: "https://www.everacy.com", default_og_image: "https://cms.everacy.com/media/seo/default.png" },
  });

  assert.equal(metadata.openGraph.images[0].url, "https://cms.everacy.com/media/seo/default.png");
});

test("website-relative image paths stay on the canonical website host", () => {
  const { resolveMetadataImageUrl } = loadSeo();
  assert.equal(
    resolveMetadataImageUrl("/brand/share.png", "https://www.everacy.com"),
    "https://www.everacy.com/brand/share.png",
  );
});
