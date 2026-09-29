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
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /aria-label="Loading page content"/);
  assert.match(html, /skeleton/);
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
