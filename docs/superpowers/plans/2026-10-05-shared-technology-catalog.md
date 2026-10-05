# Shared Technology Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide a shared Django-managed technology catalog whose categories and uploaded logos appear consistently on project and service pages.

**Architecture:** Add category and technology catalog models, seed categories and known names with a data migration, resolve legacy string lists in existing serializers, and render the enriched API data through one shared frontend component. Keep legacy stack fields and logo fallbacks during transition.

**Tech Stack:** Django, Django REST Framework, PostgreSQL/SQLite migrations, Next.js/React/TypeScript, existing Simple Icons package.

**Spec:** `docs/superpowers/specs/2026-10-05-shared-technology-catalog.md`

## Global Constraints

- Keep all existing `tech_stack` arrays and API fields intact.
- Enriched catalog data must be added as `tech_stack_items`.
- Category ordering comes from Django; empty groups do not create tabs.
- Custom uploaded logo takes precedence over the existing known-logo fallback.
- Unknown stack strings remain visible under `Other tools`.
- No CDN logo requests, commits, or pushes.

## Review Focus

- Case and punctuation variants such as `GO`, `Go`, `Next Js`, and `Next.js` resolve consistently.
- Inactive catalog entries do not supply categories or logos.
- Unknown technology labels stay visible and do not crash serialization or rendering.
- SVG and raster uploaded logos both render from Django media URLs.
- Services with several stacks do not issue one catalog query per technology or card.

---

### Task 1: Add catalog model, admin, resolver, and API contract

**Files:**
- Modify: `../everacy-landing-django/apps/core/models.py`
- Modify: `../everacy-landing-django/apps/core/admin.py`
- Modify: `../everacy-landing-django/apps/core/serializers.py`
- Modify: `../everacy-landing-django/apps/core/views.py` only if serializer context requires request/media information
- Create: `../everacy-landing-django/apps/core/technology_stack.py`
- Create: `../everacy-landing-django/apps/core/tests/test_technology_catalog.py`

**Interface:** Serializer output appends `tech_stack_items: [{name, category: {name, slug, order}, logo_url}]` to both project and service objects. Catalog lookup normalizes names/aliases and emits unknown names under `Other tools`.

- [x] Write Django API tests for project and service resolution, aliases/case normalization, uploaded logo URL, inactive entries, and unknown stack strings.
- [x] Add category and technology models, admin registration/inlines, and a bounded catalog lookup per serializer context.
- [x] Add enriched serializer fields without changing legacy stack fields.
- [x] Run the new tests and verify all pass.

### Task 2: Seed catalog entries and verify admin/API integration

**Files:**
- Create: `../everacy-landing-django/apps/core/migrations/<generated>_seed_technology_catalog.py`
- Modify: `../everacy-landing-django/apps/core/tests/test_technology_catalog.py`

- [x] Add test expectations for seeded categories and common technology mappings including Go.
- [x] Add a data migration for existing supported names and categories; create missing entries idempotently.
- [x] Run migration on the local SQLite database; legacy `tech_stack` fields remain unchanged.
- [x] Run focused tests, `manage.py check`, and `makemigrations --check --dry-run`.

### Task 3: Unify project and service technology UI

**Files:**
- Create: `src/components/sections/TechnologyStack.tsx`
- Modify: `src/components/sections/ProjectTechnologyStack.tsx`
- Modify: `src/components/sections/ServiceTechnologyStack.tsx`
- Modify: `src/components/sections/ServiceContentIcon.tsx`
- Modify: `src/lib/api.ts`
- Modify: `src/app/(marketing)/projects/[slug]/page.tsx`
- Modify: `src/app/(marketing)/services/[categorySlug]/[serviceSlug]/page.tsx`
- Modify: `tests/project-detail.test.cjs` and service tests as needed

- [x] Update API types with `TechnologyStackItemData` and optional `tech_stack_items` fields on projects/services.
- [x] Add frontend tests for the shared component contract, category-driven tabs, and uploaded-logo preference over fallback marks.
- [x] Replace per-page category grouping with the shared component, retaining fallback categorization only when enriched fields are absent.
- [x] Render API categories in catalog order, omit empty tabs, prefer uploaded logos, and provide known/generic fallbacks.
- [x] Run frontend tests, type-check, and production build.

### Task 4: Local data and end-to-end verification

**Files:**
- Modify: local Django SQLite database/media only; no production data.

- [x] Apply migrations locally and confirm Go appears in the global Django technology catalog under Backend & APIs.
- [x] Verify project and service API payloads include resolved categories while legacy arrays remain unchanged.
- [x] Verify `/projects/yummyever` and a service detail route locally on port 3003.
- [x] Run the relevant frontend and backend checks. Leave all changes local and unpushed.
