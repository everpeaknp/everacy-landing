const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

const source = fs.readFileSync('src/lib/api.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

async function loadApi(fetchImpl) {
  const exports = {};
  const context = { exports, process: { env: { NEXT_PUBLIC_API_URL: 'https://cms.test' } }, fetch: fetchImpl, console };
  vm.runInNewContext(compiled, context, { filename: 'api.js' });
  return exports;
}

test('a successful empty collection remains an empty collection', async () => {
  const api = await loadApi(async () => new Response('[]', { status: 200 }));
  assert.deepEqual(await api.fetchServices(), []);
});

test('CMS server failures are reported as typed unavailable errors', async () => {
  const api = await loadApi(async () => new Response('', { status: 503 }));
  await assert.rejects(api.fetchServices(), (error) => error.name === 'CmsApiError' && error.status === 503);
});

test('a missing detail is distinct from an unavailable API', async () => {
  const api = await loadApi(async () => new Response('', { status: 404 }));
  assert.equal(await api.fetchProject('missing'), null);
});

test('an unpublished optional footer does not fail the marketing layout', async () => {
  const api = await loadApi(async () => new Response('', { status: 404 }));
  assert.equal(await api.fetchFooter(), null);
});

test('CMS reads bypass stale Next.js fetch caching', async () => {
  let options;
  const api = await loadApi(async (_url, requestOptions) => {
    options = requestOptions;
    return new Response('[]', { status: 200 });
  });
  await api.fetchServices();
  assert.equal(options.cache, 'no-store');
});

test('legal page requests use the public CMS endpoint and preserve section payloads', async () => {
  let requestedUrl;
  const api = await loadApi(async (url) => {
    requestedUrl = url;
    return new Response(JSON.stringify({ key: 'privacy', sections: [{ order: 1, heading: 'Scope', body: 'CMS copy' }] }), { status: 200 });
  });
  const page = await api.fetchLegalPage('privacy');
  assert.equal(requestedUrl, 'https://cms.test/api/v1/legal/privacy/');
  assert.equal(page.sections[0].body, 'CMS copy');
});
