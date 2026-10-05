const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function loadComponent(file) {
  const source = fs.readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (id) => id === 'react' ? React : require(id),
    React,
  }, { filename: file });
  return exports;
}

test('PageSkeleton provides a labeled busy region and route-shaped placeholders', () => {
  const { PageSkeleton } = loadComponent('src/components/ui/PageSkeleton.tsx');
  const html = renderToStaticMarkup(React.createElement(PageSkeleton, { variant: 'editorial' }));
  const styles = fs.readFileSync('src/app/globals.css', 'utf8');
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /aria-label="Loading page content"/);
  assert.match(html, /skeleton/);
  assert.match(styles, /\.page-skeleton\s*\{[^}]*background:\s*#fff/s);
  assert.doesNotMatch(html, /Navbar|Everacy/);
});

test('homepage loading stays on an isolated light canvas while the site is in dark mode', () => {
  const loader = fs.readFileSync('src/app/(marketing)/loading.tsx', 'utf8');
  const styles = fs.readFileSync('src/app/globals.css', 'utf8');

  assert.match(loader, /PageSkeleton variant="home"/);
  assert.match(styles, /\.dark\s+\.page-skeleton--home\s*\{[^}]*background:\s*#fff/s);
  assert.match(styles, /\.page-skeleton--home\s*\{[^}]*isolation:\s*isolate/s);
});

test('service detail loading uses its own light, page-shaped skeleton', () => {
  const loader = fs.readFileSync('src/app/(marketing)/services/[categorySlug]/[serviceSlug]/loading.tsx', 'utf8');
  const styles = fs.readFileSync('src/app/globals.css', 'utf8');

  assert.match(loader, /ServiceDetailSkeleton/);
  assert.match(styles, /\.service-detail-skeleton\s*\{[^}]*background:\s*#fff/s);
  assert.match(styles, /\.service-detail-skeleton__grid/);
});

test('EmptyState identifies the empty collection accessibly', () => {
  const { EmptyState } = loadComponent('src/components/ui/EmptyState.tsx');
  const html = renderToStaticMarkup(React.createElement(EmptyState, { title: 'No projects published yet' }));
  assert.match(html, /No projects published yet/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /button/);
});

test('ContentUnavailable offers retry and does not describe an outage as empty', () => {
  const { ContentUnavailable } = loadComponent('src/components/ui/ContentUnavailable.tsx');
  const html = renderToStaticMarkup(React.createElement(ContentUnavailable, { onRetry: () => {} }));
  assert.match(html, /Unable to load content/);
  assert.match(html, /Try again/);
  assert.doesNotMatch(html, /nothing found/i);
});
