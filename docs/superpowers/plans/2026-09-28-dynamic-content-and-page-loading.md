# Dynamic CMS Content and Page Loading Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to execute this plan task-by-task. Use checkbox (`- [x]`) syntax to track progress.

**Goal:** Make every public route reflect Django CMS data, provide route-specific loading feedback, remove fabricated records, and present useful empty/error states.

**Architecture:** Keep Django as the content source. Harden the Next.js API client so successful empty responses remain distinguishable from unavailable APIs. Build shared skeleton, empty-state, and retry components; use them from App Router `loading.tsx` files and page render paths. Add the missing legal-page CMS model/API and project detail route using the existing model/API structures. Extend the existing service catalog implementation rather than replacing it.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind/CSS, Django REST Framework, Django admin, Django migrations, Python unittest.

**Spec:** `docs/superpowers/specs/2026-09-28-dynamic-content-and-page-loading-design.md`

## Global Constraints

- Preserve all pre-existing worktree edits. Frontend and backend repositories already contain unrelated uncommitted changes; do not reset, reformat, or stage them wholesale.
- Reuse the dynamic service catalog already present in `src/app/(marketing)/services/[categorySlug]`, `src/app/(marketing)/services/[categorySlug]/[serviceSlug]`, and the Django service-category API/model work. Do not reimplement these routes.
- Use only Django CMS data for editable page content and records. Do not add demo/sample records or substitute hardcoded examples when a CMS collection is empty.
- Treat an HTTP success with an empty list as a real empty state. Treat network/5xx failures as unavailable content with a retry action. Treat detail 404s as not found.
- Keep empty-state animation subtle, interactive on hover/tap, keyboard accessible, and disabled or reduced for `prefers-reduced-motion`.
- Do not add frontend testing packages: the repository has no configured frontend test runner. Use TypeScript/build checks plus focused route/API verification in the browser.
- Maintain existing design tokens, responsive behavior, route SEO, and current legal wording when migrating it into CMS.

## Review Focus

- Confirm empty content never reveals fabricated testimonials, team members, projects, blogs, jobs, or process items.
- Confirm API outages are visually and semantically distinct from valid empty CMS data.
- Confirm legal text survives migration verbatim and remains editable in Django admin.
- Confirm each route has a relevant skeleton and project detail routes resolve from CMS slugs.
- Confirm changes preserve the existing in-progress service catalog and unrelated dirty files.

## Implementation Tasks

### Task 1: Define explicit CMS fetch outcomes

**Files:**
- Modify: `src/lib/api.ts`
- Modify: `src/types/index.ts` only if shared outcome types belong there
- Add: focused Django tests under `../everacy-landing-django/apps/core/tests/` for endpoint response semantics where relevant

- [x] Add a typed API failure representation so the fetch layer distinguishes valid JSON/empty arrays, detail 404s, and network/5xx failures instead of returning `null` for every case.
- [x] Update collection and detail fetchers to preserve empty arrays and propagate or return explicit unavailable/not-found outcomes.
- [x] Make CMS reads use `cache: "no-store"` (including page data and SEO content) so admin edits appear on the next request.
- [x] Add focused tests for success with empty data, server error, and missing detail behavior using existing backend test conventions where endpoints can be tested there.
- [x] Run focused backend tests and `npx tsc --noEmit`; verify failure behavior with a mocked/unavailable API locally.

### Task 2: Build shared loading, empty, and unavailable UI

**Files:**
- Add: `src/components/ui/PageSkeleton.tsx`
- Add: `src/components/ui/EmptyState.tsx`
- Add: `src/components/ui/ContentUnavailable.tsx`
- Modify: `src/app/globals.css`

- [x] Create skeleton primitives for hero, text blocks, media, cards, grids, and editorial lists, with accessible loading labels and stable dimensions to reduce layout shift.
- [x] Create a reusable empty-state graphic that responds gently to hover, keyboard focus, or tap and provides a reduced-motion/static presentation when requested.
- [x] Create a clear API-unavailable state with a retry callback; never label an outage as “nothing found.”
- [x] Add responsive styling using existing site colors and spacing; do not introduce a new visual system or dependencies.
- [x] Verify keyboard interaction, focus indication, reduced motion, and mobile sizing in the browser.

### Task 3: Add route-specific loading skeletons

**Files:**
- Add `loading.tsx` for `/`, `/about`, `/services`, `/services/[categorySlug]`, `/services/[categorySlug]/[serviceSlug]`, `/projects`, `/projects/[slug]`, `/blogs`, `/blogs/[slug]`, `/careers`, `/careers/[slug]`, `/contact`, `/privacy`, `/terms`, and `/cookies` under `src/app/(marketing)/`.
- Add or adjust shared skeleton variants in `src/components/ui/PageSkeleton.tsx` as needed.

- [x] Add a loading boundary for every public route, using the matching skeleton shape rather than a generic spinner.
- [x] Keep the skeletons aligned with the actual page sections and responsive breakpoints.
- [x] Verify each route renders its loading boundary during a deliberately delayed API response and that content replaces it without layout collapse.

### Task 4: Remove fabricated page content and handle CMS states

**Files:**
- Modify: `src/app/(marketing)/page.tsx`
- Modify: `src/app/(marketing)/about/page.tsx`
- Modify: `src/app/(marketing)/services/page.tsx` and current dynamic service route files only where state handling is incomplete
- Modify: `src/app/(marketing)/projects/page.tsx`, `ProjectsClient.tsx`
- Modify: `src/app/(marketing)/blogs/page.tsx`, `BlogsClient.tsx`, `blogs/[slug]/page.tsx`
- Modify: `src/app/(marketing)/careers/page.tsx`, `careers/[slug]/page.tsx`
- Modify: `src/app/(marketing)/contact/page.tsx` and related sections
- Modify: `src/lib/site-theme.ts` only if it supplies fabricated page content
- [x] Remove fallback arrays and sample records for projects, blogs, jobs, team, testimonials, careers values/perks/process, and service process steps.
- [x] Remove hardcoded hero/body copy fallbacks where the CMS is the declared source; omit optional sections when corresponding CMS fields/records are absent.
- [x] Render the shared interactive empty state for valid empty collections and unavailable UI for fetch failures.
- [x] Keep valid editorial shell/navigation/CTA behavior while ensuring editable content comes from CMS.
- [x] Ensure detail pages call `notFound()` for CMS 404s and show a retry/error state for API outages.
- [x] Verify no sample content strings or fallback arrays remain in the route/component files; manually test populated, empty, and unavailable responses.

### Task 5: Add CMS-backed legal pages

**Backend files:**
- Add model(s) in `../everacy-landing-django/apps/admin_global/models.py` (or a dedicated legal app only if current project organization requires it)
- Add a migration under the owning Django app
- Modify its `admin.py`, serializers, views, and URLs
- Add tests under `../everacy-landing-django/apps/core/tests/` or the owning app's established test directory

**Frontend files:**
- Modify `src/lib/api.ts` with legal-page response types/fetcher
- Add a shared legal page renderer under `src/components/sections/`
- Modify `src/app/(marketing)/privacy/page.tsx`, `terms/page.tsx`, and `cookies/page.tsx`

- [x] Model a legal page with a stable key/slug, editable title/eyebrow/subtitle/effective date, publication state, and ordered child content sections.
- [x] Register the page and ordered sections in Django admin.
- [x] Create a data migration that seeds current Privacy, Terms, and Cookies wording verbatim and preserves section order.
- [x] Expose published legal page data through a read-only public API and test ordering, unpublished behavior, and seeded copy.
- [x] Render all three frontend legal routes from API data; use an explicit empty/unavailable/not-found state rather than inline substitute policy text.
- [x] Verify the migrated page text against the existing rendered/source wording before calling this task complete.

### Task 6: Add the CMS-backed project detail route

**Files:**
- Add: `src/app/(marketing)/projects/[slug]/page.tsx`
- Add: `src/app/(marketing)/projects/[slug]/loading.tsx`
- Modify: `src/lib/api.ts` only if an existing project detail fetcher needs typed outcomes
- Modify: `src/app/sitemap.ts`

- [x] Use the existing Django Project API and frontend `fetchProject(slug)` / project types where available; do not invent new project fields or sample details.
- [x] Render the existing CMS project hero, summary, tags, and ordered detail sections with SEO metadata.
- [x] Use not-found for unknown slugs and the unavailable state for backend failures.
- [x] Ensure the project list links to the new route and sitemap slugs match resolvable project routes.
- [x] Verify a published project, unknown slug, empty collection, and API outage.

### Task 7: Close remaining CMS editability gaps

**Files:**
- Modify the relevant existing Django models/admin/serializers/views/URLs and migrations under `../everacy-landing-django/apps/`
- Modify matching frontend API types/fetchers and route/components under `src/`
- [x] Compare each public route's visible non-global copy and content to its CMS models/API and record any still-hardcoded content.
- [x] Add CMS fields/admin/API support only for user-facing page copy/content that lacks an existing CMS field; avoid adding duplicate fields where existing settings already cover it.
- [x] Remove corresponding frontend constants and read those values from CMS, omitting optional content when unset.
- [x] Add tests for new API fields and admin/model validation following the owning app's test conventions.
- [x] Re-run the hardcoded-content audit and confirm every page-specific content item is either CMS-backed, a structural label, or intentionally static infrastructure text.

### Task 8: Integration and regression verification

**Files:**
- No new files unless verification uncovers defects.

- [x] Run backend Django checks and focused/full tests appropriate to the changed apps.
- [x] Run frontend `npx tsc --noEmit` and `npm run build`.
- [x] In browser, verify all public routes at desktop and mobile widths in populated, valid-empty, and API-unavailable states where applicable.
- [x] Verify skeleton handoff, empty-state interaction/reduced motion, admin-edited copy freshness, legal text parity, project detail links, SEO metadata, and sitemap entries.
- [x] Inspect `git status` in both repositories and preserve all unrelated user changes; do not create a broad commit containing pre-existing dirty files.

## Completion Criteria

- Every listed route has a route-appropriate loading skeleton.
- Every content collection/detail uses CMS data and handles empty, missing, and unavailable states correctly.
- No fabricated/sample fallback content remains on public pages.
- Legal pages and project details are CMS-backed and editable/routable.
- Remaining page content gaps are documented and addressed.
- Backend checks/tests and frontend type/build checks pass, and desktop/mobile browser checks are complete.
