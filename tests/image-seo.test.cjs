const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const ts = require("typescript");

const sourcePath = path.join(__dirname, "../src/lib/image-seo.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const moduleBox = { exports: {} };
vm.runInNewContext(compiled, { module: moduleBox, exports: moduleBox.exports });
const { addImageSeoAttributes, resolveImageAlt } = moduleBox.exports;

test("image alt fallback combines the CMS record title and first target keyword", () => {
  assert.equal(
    resolveImageAlt({ recordTitle: "Smart POS for Cafes", keywords: "restaurant POS, Nepal" }),
    "Smart POS for Cafes — restaurant POS",
  );
});

test("rich text images receive fallback alt and matching title without altering authored metadata", () => {
  const html = '<p><img src="/media/blogs/content/order.png"><img src="/media/screen.png" alt="Kitchen order screen" /></p>';
  assert.equal(
    addImageSeoAttributes(html, { recordTitle: "Smart POS", keywords: "restaurant POS" }),
    '<p><img src="/media/blogs/content/order.png" alt="Smart POS — restaurant POS" title="Smart POS — restaurant POS"><img src="/media/screen.png" alt="Kitchen order screen" title="Kitchen order screen" /></p>',
  );
});

test("authored titles and explicitly decorative empty alt text are preserved", () => {
  const html = '<img src="/a.png" alt="A &amp; B" title="Specific title"><img src="/decoration.svg" alt="">';
  assert.equal(
    addImageSeoAttributes(html, { recordTitle: "Article title" }),
    html,
  );
});

test("CMS decorative choice returns empty alt instead of generated fallback text", () => {
  assert.equal(
    resolveImageAlt({ recordTitle: "Article title", keywords: "restaurant POS", decorative: true }),
    "",
  );
});

test("fallback metadata is escaped before insertion into HTML attributes", () => {
  assert.equal(
    addImageSeoAttributes("<img src=x>", { recordTitle: 'A "quoted" <title>' }),
    '<img src=x alt="A &quot;quoted&quot; &lt;title&gt;" title="A &quot;quoted&quot; &lt;title&gt;">',
  );
});
