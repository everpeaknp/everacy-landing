# Dynamic Service Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Django-managed categories and services browseable from the homepage, Services mega menu, category pages, and dedicated service pages.

**Architecture:** Extend the existing `ArchSectionCard` service records with a category relation, slug, and mega-menu feature flag. A separate ordered category model supplies editable category content. Django exposes the catalog through the current service APIs; Next.js renders all service and category experiences from those APIs.

**Tech Stack:** Django, Django REST Framework, Django admin, Next.js App Router, React, TypeScript, Tailwind CSS.

**Spec:** `docs/superpowers/specs/2026-09-25-dynamic-service-catalog-and-cookie-consent-design.md`

## Global Constraints

- Homepage displays all active services in backend order without category tabs.
- Existing services without a category remain on the homepage until staff assign them.
- Mega menu shows up to four active, flagged services for the selected category and stays open while categories change.
- Category and service pages use backend content and SEO data.
- Keep current service endpoints and response fields compatible where possible.
- Admin write endpoints remain staff-only.
- Do not add a parallel service model or static category assignments.

## Review Focus

- Old records with a null category still appear in the home grid and never break serialization.
- Categories with zero, one, four, or more than four featured active services render correctly.
- Inactive categories and services do not leak into public catalog endpoints or routes.
- Slugs with punctuation, Unicode, and duplicate titles resolve to unique canonical routes.
- Missing API records produce not-found UI and metadata rather than an exception or stale content.

---

### Task 1: Add category and route data to Django

**Files:**
- Modify: `everacy-landing-django/apps/core/models.py`
- Create: generated migration in `everacy-landing-django/apps/core/migrations/`
- Test: no automated test file; review migration and use Django migration checks.

**Interfaces:**
- Produces `ServiceCategory` with `title`, unique `slug`, `description`, optional `image`, `order`, `is_active`, and `SEOMixin` fields.
- Extends `ArchSectionCard` with nullable `category`, unique `slug`, `featured_in_menu`, and `SEOMixin` fields.
- Existing service detail JSON fields remain the source for detail pages.

- [ ] **Step 1: Define category model and nullable service fields.** Keep category deletion protected while assigned services exist. Generate slugs from titles for new records, while retaining editable slug values. Add `SEOMixin` to both category and service records so each route has backend metadata.
- [ ] **Step 2: Generate and inspect the migration.** Add Development and Marketing through a data migration using `get_or_create`; do not assign existing services automatically.
- [ ] **Step 3: Check migration safety.** Confirm the schema migration preserves every current `ArchSectionCard` and that seeded categories are ordered and active.
- [ ] **Step 4: Run Django migration checks.** Run `python manage.py makemigrations --check` and `python manage.py check` from the backend repository; resolve only catalog-related issues.

### Task 2: Expose categories and service detail in Django admin

**Files:**
- Modify: `everacy-landing-django/apps/admin_home/models.py`
- Modify: `everacy-landing-django/apps/admin_home/admin.py`
- Modify: `everacy-landing-django/apps/core/admin.py`

**Interfaces:**
- Admin exposes category editing and service category assignment, slug, order, active state, and `featured_in_menu`.
- Existing admin proxy registration conventions remain intact.

- [ ] **Step 1: Register category with ordering and active columns.** Add a focused admin class and searchable title/slug fields.
- [ ] **Step 2: Extend service admin.** Add category, slug, and featured flag to fieldsets/list display and filters. Make unassigned active services easy to find.
- [ ] **Step 3: Inspect both admin registrations.** Verify proxy models do not double-register the same concrete category model and existing service editing remains available.

### Task 3: Publish the category catalog through the REST API

**Files:**
- Modify: `everacy-landing-django/apps/core/serializers.py`
- Modify: `everacy-landing-django/apps/core/views.py`
- Modify: `everacy-landing-django/apps/core/urls.py`

**Interfaces:**
- Public `GET /services/` continues returning active services and adds nullable category identity and canonical service slug/path.
- Public `GET /service-categories/` returns active categories ordered by `order`, each with active services and at most four flagged services in order.
- Public `GET /service-categories/<slug>/` returns one active category and its active services.
- Public `GET /services/<slug>/` returns one active service with its existing detail fields and category identity.
- Create/update/delete endpoints remain staff-only.

- [ ] **Step 1: Add category read serializers.** Include category title, slug, description, order, SEO values, and nested active services; keep the featured list capped with queryset ordering/slicing.
- [ ] **Step 2: Extend existing service read/write serializers.** Accept category assignment, slug, and SEO values through staff write serializers and serialize category identity and SEO on public reads.
- [ ] **Step 3: Add detail/list views and routes.** Return 404 for missing or inactive records; use `select_related`/`prefetch_related` for category and featured services.
- [ ] **Step 4: Update home response schema.** Ensure the homepage service serializer includes the new nullable category identity without changing existing keys.
- [ ] **Step 5: Inspect permissions and route matching.** Confirm `/services/<slug>/` does not shadow existing create/update/delete routes; reorder URL patterns if needed.

### Task 4: Update frontend service types and homepage grid

**Files:**
- Modify: `everacy-landing/src/lib/api.ts`
- Modify: `everacy-landing/src/components/sections/ArchSection.tsx`
- Modify: `everacy-landing/src/app/(marketing)/page.tsx`

**Interfaces:**
- `ServiceCardData` includes nullable category identity and canonical service path.
- `ServiceCategoryData` represents public category summaries and nested service lists.
- Homepage grid links to `/services/{categorySlug}/{serviceSlug}` only when category data exists; unassigned records link to `/services`.

- [ ] **Step 1: Define typed category and service route fields.** Match the Django JSON keys exactly and retain compatibility with absent fields during rollout.
- [ ] **Step 2: Replace the interactive active-card section with a responsive service grid.** Render all `data` in received order, remove active-index state and tab buttons, use service links, and preserve the backend title.
- [ ] **Step 3: Refine card layout.** Use consistent icon/image space, readable descriptions, visible hover/focus treatment, and one-column small screens with balanced multi-column desktop cards.
- [ ] **Step 4: Confirm empty API behavior.** Keep the existing fallback content only if it remains intentional; never fabricate categories for fallback services.

### Task 5: Build the category-aware Services mega menu

**Files:**
- Modify: `everacy-landing/src/lib/api.ts`
- Modify: `everacy-landing/src/app/(marketing)/layout.tsx`
- Modify: `everacy-landing/src/components/common/Navbar.tsx`

**Interfaces:**
- `fetchServiceCategories(): Promise<ServiceCategoryData[]>` fetches category data server-side.
- `Navbar` receives categories and tracks a selected category slug locally.

- [ ] **Step 1: Add the category fetcher and pass its result into `Navbar`.** Keep fetch failure behavior consistent with `fetchServices`.
- [ ] **Step 2: Replace the flat service list in the desktop mega menu.** Render editable category buttons; clicking or keyboard-activating a category updates the featured services in place without closing the menu.
- [ ] **Step 3: Render up to four featured service links.** Each category also links to `/services/{categorySlug}`; if none are featured, show a short empty state and retain that category link.
- [ ] **Step 4: Mirror the hierarchy in mobile navigation.** Ensure category selection and service links work with touch, focus, and keyboard activation.

### Task 6: Add catalog, category, and service routes

**Files:**
- Modify: `everacy-landing/src/app/(marketing)/services/page.tsx`
- Modify: `everacy-landing/src/app/(marketing)/services/ServicesClient.tsx`
- Create: `everacy-landing/src/app/(marketing)/services/[categorySlug]/page.tsx`
- Create: `everacy-landing/src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx`
- Modify: `everacy-landing/src/lib/api.ts`
- Modify: `everacy-landing/src/lib/seo.ts` only if an existing helper cannot represent returned SEO fields

**Interfaces:**
- Category fetchers resolve active category data by slug.
- Service detail fetchers resolve active service data by slug.
- Page metadata uses the existing `generateMetadata` pattern and backend SEO values from `SEOMixin` when available.

- [ ] **Step 1: Replace the drawer catalog with category groups.** `/services` keeps its backend hero and lists categories and service links.
- [ ] **Step 2: Add the category listing route.** Show category title/description and all active assigned service cards; handle missing slug with `notFound()`.
- [ ] **Step 3: Add the service detail route.** Render backend tagline, description, capabilities, tech stack, pipeline, image, and CTA; handle missing/inactive service with `notFound()`.
- [ ] **Step 4: Add page metadata.** Use service/category title and description plus canonical path; merge backend SEO consistently with existing metadata helpers.
- [ ] **Step 5: Search for stale drawer/hash links.** Update generated links to canonical paths while preserving explicit custom/external links.

### Task 7: Catalog integration review

**Files:**
- Review modified files in both repositories.

- [ ] **Step 1: Run Django system and migration checks.** `python manage.py check` and `python manage.py makemigrations --check`.
- [ ] **Step 2: Run frontend type check and production build.** `npm run type-check` and `npm run build`.
- [ ] **Step 3: Manually inspect rendered homepage and navigation.** Check desktop and mobile, category switching without menu closure, four-feature cap, unassigned services, category pages, service details, and missing/inactive routes.
- [ ] **Step 4: Review git diffs in both repositories.** Confirm no unrelated changes and verify API paths/types line up.
