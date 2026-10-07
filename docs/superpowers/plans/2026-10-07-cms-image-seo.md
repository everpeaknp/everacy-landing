# CMS Image SEO Implementation Plan

> **For agentic workers:** Execute natively in this session, task by task. Steps use checkbox syntax for tracking.

**Goal:** Make image SEO fields available throughout the CMS, generate contextual names for new image uploads, and expose accurate metadata in CKEditor, public pages, and social previews without changing existing media URLs or visual layouts.

**Architecture:** Keep each CMS image attached to its current model and storage path. Add contextual title/alt fields, a shared deconstructible upload-path helper, a CKEditor upload endpoint that receives current article context, and additive API/frontend metadata support. Treat decorative assets explicitly and leave existing uploads untouched.

**Tech Stack:** Django 6, Django REST Framework, django-ckeditor-5, Pillow, Next.js 15, TypeScript, Node built-in tests.

**Spec:** [../specs/2026-10-07-cms-image-seo-design.md](../specs/2026-10-07-cms-image-seo-design.md)

## Global Constraints

- Keep existing media files and URLs unchanged; contextual filenames apply only to new uploads.
- Keep current upload directories, extensions, storage backend, image dimensions, crops, and rendered layouts unchanged.
- Add only blank/nullable CMS metadata fields; do not block saves or publishing.
- Use the record slug/title, image title/alt when available, and a bounded number of configured SEO keywords for new upload filenames.
- Use image title then alt for the HTML `title` attribute; never replace an authored title.
- Use descriptive alt text for meaningful images and empty alt text for decorative images.
- Add no external image service or runtime dependency.

## Review Focus

- Unsafe or excessively long titles/keywords: test slug normalization, path-length limits, extension preservation, and storage collision behavior.
- New objects without a generated slug yet: test fallback to title/name before first save.
- Decorative images and deliberately empty CKEditor alt: test they do not produce false missing-alt warnings.
- Existing images and legacy API consumers: test old file URLs and serializer fields remain unchanged.
- CKEditor uploads without context or without a usable CSRF token: test a safe filename fallback and permission/error behavior.

---

### Task 1: Contextual filenames for CMS image uploads

**Files:**
- Create: `everacy-landing-django/apps/core/image_seo.py`
- Modify: `everacy-landing-django/apps/core/models.py`
- Create: `everacy-landing-django/apps/core/tests/test_image_seo_uploads.py`
- Create: `everacy-landing-django/apps/core/tests/__init__.py` (enable Django discovery of the existing CMS test modules)
- Create: Django migration for additive image title/alt fields and `upload_to` callables

**Interfaces:**
- Produce `SEOImageUploadTo(directory, title_field=None, alt_field=None).__call__(instance, filename) -> str` as a migration-serializable callable.
- Produce `build_seo_image_filename(filename, *, slug="", title="", image_title="", image_alt="", keywords=(), directory="") -> str` for CMS and CKEditor reuse.
- Preserve each field's current directory and uploaded extension; derive a bounded basename from context, image metadata, and up to two configured keywords.

- [x] Write failing tests for contextual blog filenames, title/name fallback, sanitized long text, extension preservation, empty values, and collision-safe storage usage.
- [x] Run `./venv/bin/python manage.py test apps.core.tests.test_image_seo_uploads -v 2` and confirm the new behavior fails.
- [x] Implement the deconstructible filename helper and apply it to all CMS `ImageField`s without changing directories.
- [x] Add model-level title/alt fields for meaningful image roles; reuse existing alt fields and keep purely decorative assets marked as such.
- [x] Use this field map: `SEOMixin.og_image`; global `default_og_image` and `organization_logo`; `PageSEO.og_image`; navbar `logo`/`scrolled_logo`; hero `logo`; `ServiceCategory.image`; `ArchSectionCard.image` (existing `image_alt`); testimonial `image`/`company_logo`; `TeamMember.image`; `ContactPage.hero_image`; footer `logo`; projects page hero `logo` (existing `logo_alt`); `Project.logo`; `ProjectScreenshot.image` (existing `alt_text`); career testimonial/job `image`; and `BlogPost.cover_image`. Add title/alt names matching each field, preserving existing alt field names as the serialized compatibility keys. Keep backgrounds, favicon, icons, decorative footer art, and image fields whose adjacent text fully duplicates their meaning decorative.
- [x] Resolve fallback semantics as follows: explicit alt wins; an explicit decorative choice yields `alt=""`; otherwise use image title; if absent use record title plus the first configured SEO keyword. Do not persist generated fallback text into the CMS field.
- [x] Use this field map: `SEOMixin.og_image`; global `default_og_image` and `organization_logo`; `PageSEO.og_image`; navbar `logo`/`scrolled_logo`; hero `logo`; `ServiceCategory.image`; `ArchSectionCard.image` (existing `image_alt`); testimonial `image`/`company_logo`; `TeamMember.image`; `ContactPage.hero_image`; footer `logo`; projects page hero `logo` (existing `logo_alt`); `Project.logo`; `ProjectScreenshot.image` (existing `alt_text`); career testimonial/job `image`; and `BlogPost.cover_image`. Add title/alt names matching each field, preserving existing alt field names as the serialized compatibility keys. Keep backgrounds, favicon, icons, decorative footer art, and image fields whose adjacent text fully duplicates their meaning decorative.
- [x] Generate and inspect the migration; confirm no existing media files are renamed and no image field becomes required.
- [x] Re-run the focused tests and `./venv/bin/python manage.py makemigrations --check --dry-run`.

### Task 2: CMS image SEO controls and legacy-safe feedback

**Files:**
- Create: `everacy-landing-django/apps/core/admin.py (ImageSEOAdminMixin)`
- Modify: `everacy-landing-django/apps/core/admin.py`
- Modify: `everacy-landing-django/apps/admin_global/admin.py`
- Modify: image-bearing proxy admin registrations in `everacy-landing-django/apps/admin_{home,services,about,projects,careers,contact,blogs}/admin.py`
- Create: `everacy-landing-django/apps/core/tests/test_image_seo_admin.py`

**Interfaces:**
- Add a reusable `ImageSEOAdminMixin` that places each image's matching title/alt controls beside its upload field and identifies decorative-only fields.
- Preserve existing explicit fieldsets, custom forms, previews, and proxy admin navigation.

- [x] Write failing tests that inspect admin form fields/fieldsets for each registered image-bearing model, including SEO and proxy models.
- [x] Run focused admin tests and confirm meaningful image fields lack the new controls.
- [x] Apply the mixin across CMS image upload screens; ensure controls appear adjacent to upload inputs without changing the existing page form layout.
- [x] Add preview/help text and non-blocking feedback for missing image descriptions. Existing and new records must still save.
- [x] Re-run focused admin tests and Django system checks.

### Task 3: CKEditor contextual upload and image-title behavior

**Files:**
- Create: `everacy-landing-django/apps/core/views.py`
- Modify: `everacy-landing-django/config/urls.py`
- Modify: `everacy-landing-django/apps/core/admin.py`
- Create: `everacy-landing-django/static/admin/js/blog_image_seo.js`
- Create: `everacy-landing-django/apps/core/tests/test_blog_image_upload.py`

**Interfaces:**
- Add a permission-checked CKEditor image endpoint accepting `upload`, `post_title`, `post_slug`, and `keywords`, returning the existing `{"url": ...}` success shape.
- Add a CKEditor upload adapter that sends current BlogPost form context and CSRF token.
- For rendered CKEditor content, add `title` from the image-specific title or alt text only when the stored image has no authored title.

- [x] Write failing tests for upload naming from form context, missing-context fallback, invalid image rejection, permission handling, and preservation of existing upload response format.
- [x] Run focused tests and confirm expected missing endpoint/metadata failures.
- [x] Implement the upload view with the package's file validation and configured Django storage; preserve CSRF and existing upload permissions.
- [x] Register the adapter for the BlogPost editor and surface a non-blocking warning for `<img>` tags missing an `alt` attribute; accept `alt=""` as intentionally decorative.
- [x] Keep CKEditor's existing text alternative control and add image `title` attributes to public article HTML from explicit title or alt without overwriting authored values.
- [x] Run editor configuration and upload tests.

### Task 4: API and public-page image metadata

**Files:**
- Modify: `everacy-landing-django/apps/core/serializers.py`
- Modify: `everacy-landing-django/apps/core/tests/` serializer coverage
- Modify: `everacy-landing/src/lib/api.ts`
- Modify: `everacy-landing/src/lib/seo.ts`
- Modify: `everacy-landing/src/app/layout.tsx`
- Modify: public image renderers in `everacy-landing/src/app/(marketing)/` and `everacy-landing/src/components/sections/`
- Create: `everacy-landing/tests/image-seo.test.cjs`

**Interfaces:**
- Add response fields for image title/alt without removing or renaming current API fields.
- Resolve a missing image alt from the image title, then the record title plus configured SEO keyword target; keep decorative images empty-alt.
- Emit Open Graph image `alt` from CMS metadata while preserving current URL fallback order.

- [x] Add failing serializer and Node contract tests for preserved URLs, new metadata fields, image-title then record-title/keyword fallback when no image-specific alt exists, CKEditor title injection, and Open Graph image alt.
- [x] Run the focused tests and confirm they fail for missing metadata propagation.
- [x] Expose model fields through Django serializers and typed frontend API definitions.
- [x] Update public meaningful images to consume CMS alt/title values; preserve decorative rendering and existing layouts.
- [x] Add CMS Open Graph image alt to root and page-level Next metadata, retaining fallback behavior for legacy records.
- [x] Run the focused Django and Node tests.

### Task 5: End-to-end verification

**Files:**
- Review changes in both repositories; no additional file changes unless a verification failure requires a fix.

- [x] Re-read this plan and check every spec requirement against its implementation task.
- [x] Run full Django tests: `./venv/bin/python manage.py test`.
- [x] Run Django checks and migration drift check: `./venv/bin/python manage.py check` and `./venv/bin/python manage.py makemigrations --check --dry-run`.
- [x] Run frontend tests: `node --test tests/*.test.cjs`.
- [x] Run frontend type check and production build: `npm run type-check` and `npm run build`.
- [x] Inspect diffs in both repositories and confirm unrelated working-tree changes are untouched.
- [ ] Commit or push only when the user requests integration/deployment.
