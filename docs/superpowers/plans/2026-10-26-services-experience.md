# Services experience redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the services index, category landings, and service detail pages easier to scan and more persuasive through varied, relevant visuals and useful interaction.

**Architecture:** Keep existing Next.js routes and CMS/API contracts. Add small presentational components where they clarify layouts; derive visible choices from existing service/category/project data, and use a CSS-built concept preview only when a service has no CMS image.

**Tech Stack:** Next.js 15 App Router, React, TypeScript, Tailwind CSS, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-10-18-services-experience-redesign.md`

## Global Constraints

- Keep the current Everacy navy, teal, neutral palette and type.
- Use published CMS data for page copy and existing records.
- Do not seed or modify CMS data, add a backend schema, invent client results, or push/deploy.
- Keep service URLs, SEO behavior, API contracts, and current preview workspace intact.
- New preview visuals must be clearly illustrative, responsive, and optional where CMS media exists.
- Interactive controls need semantic roles/names, visible focus, keyboard/touch operation, and reduced-motion support.

## Review Focus

- Empty category/service collections: the current empty state remains understandable and does not leave decorative empty layout.
- Long CMS titles/descriptions and many items: layouts wrap without overflow or excessively tall duplicate panels.
- Missing hero/capability imagery: present an illustrative fallback only where it fits; supplied CMS media must take precedence.
- Keyboard use of capability/category selectors: active state, focus, and revealed copy stay synchronized.
- Mobile reduced-motion or narrow viewport: content remains visible, operable, and free of horizontal scroll.

---

### Task 1: Reframe the services index and category pages

**Files:**
- Modify: `src/app/(marketing)/services/page.tsx`
- Modify: `src/app/(marketing)/services/[categorySlug]/page.tsx`
- Modify: `src/components/sections/ServicePageHero.tsx` or add focused services-hero component(s)
- Test: `tests/services-experience.test.cjs`

**Interfaces:**
- Consumes existing `ServiceCategoryData`, `ServiceCardData`, and CMS page hero data from `src/lib/api.ts`.
- Produces route-preserving service/category navigation and a clear contact route.

- [ ] Add failing structural checks for a buyer-facing index action, category CTA, and visible category/service hierarchy.
- [ ] Run `node --test tests/services-experience.test.cjs`; confirm the checks fail on the current markup.
- [ ] Implement a compact index hero with an on-brand CSS service-map visual generated from CMS category names, plus scannable category/service groups and an early contact action.
- [ ] Implement a distinct category hero and varied service-choice layout with clear links to each detail page and contact.
- [ ] Re-run the focused test and `npm run type-check`.

### Task 2: Improve service detail storytelling and interaction

**Files:**
- Modify: `src/components/sections/ServiceDetailHero.tsx`
- Modify: `src/components/sections/ServiceCapabilityExplorer.tsx`
- Modify: `src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx`
- Add if useful: `src/components/sections/ServiceConceptPreview.tsx`
- Test: `tests/services-experience.test.cjs`
- Update only stale assertions in: `tests/service-detail-visuals.test.cjs`

**Interfaces:**
- Consumes existing service images, capabilities, process, technology, feature, benefit, FAQ, and related content.
- Produces an optional CSS concept visual for missing hero media; actual CMS imagery always wins.

- [ ] Add failing checks for optional hero imagery, a safe illustrative fallback, a scan-friendly process layout, and varied feature/benefit presentation.
- [ ] Run the focused tests and confirm expected failures.
- [ ] Implement the optional media behavior and service-specific CSS preview; retain appropriate section images only when supplied by CMS.
- [ ] Tighten section spacing and vary the process/feature/benefit compositions while retaining CMS content and existing links.
- [ ] Keep capability selection accessible and improve its selected-content feedback without adding a forced duplicate panel.
- [ ] Run `node --test tests/services-experience.test.cjs tests/service-detail-visuals.test.cjs` and `npm run type-check`.

### Task 3: Verify routes and local preview build

**Files:**
- Verify changed service routes/components and tests.

- [ ] Run the complete existing Node test set with `node --test tests/*.test.cjs`; record any pre-existing failure separately and fix only failures relevant to this change.
- [ ] Run `npm run build`.
- [ ] Check the current localhost preview at desktop and mobile widths when the existing server is available; verify no horizontal overflow, dead links, or empty space caused by missing CMS values.
- [ ] Inspect `git diff` and `git status`; ensure no unrelated files are staged or committed and nothing is pushed.

## Workspace ruling

Ruling: implement on the current feature branch/workspace — the user explicitly wants to review through the existing local preview, and this checkout is already on `codex/dynamic-content-page-loading`, not `main`; a separate checkout would disconnect the running preview and omit ignored local configuration. Keep all changes unstaged except the approved design spec already committed; do not push.
