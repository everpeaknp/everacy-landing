# Dynamic content and route loading design

## Goal

Make every public marketing route feel intentional while it loads, and make published page content come from the existing Django admin/CMS instead of silently substituting invented examples. When a CMS collection is truly empty, show a small interactive empty-state illustration. When the API is unavailable, show an unavailable/error state rather than claiming there is no content.

## Agreed direction

- Extend the existing Django content models and API; do not replace them with a new generic page-builder.
- Add route-specific loading skeletons for every public page family, including dynamic detail routes.
- Remove sample fallbacks for projects, blogs, jobs, team members, testimonials, process steps, and related content. Render actual CMS content, a deliberate empty state, or an API-unavailable state.
- Keep current legal copy, but migrate it into admin-editable content rather than rewriting it.
- Add a project detail route backed by the existing project model and fields.
- Make CMS reads fresh on the next request so edits in admin appear after a refresh.
- Keep layout, styling, and accessibility-only labels in code; substantive page copy and content remain admin-controlled.

## Current implementation context

The frontend already uses Django endpoints for the home, about, services, service categories/details, projects, blogs, careers, contact, navbar, footer, and SEO. Several endpoints have a 60-second cache, while others use `no-store`. A shared fetch helper currently converts network and HTTP errors to `null`, which makes a failed backend look like a legitimately empty page.

Sample fallback content remains in the home sections, About team display, Projects client, Blogs index, and Careers index. The privacy, terms, and cookie policy bodies are hard-coded in Next.js. Project models and API detail fetchers exist, but the frontend has no `/projects/[slug]` route even though project slugs are emitted by the sitemap.

The frontend and backend repositories already contain unrelated uncommitted work. Implementation must preserve those changes and touch only files required for this design.

## Design

### Route loading skeletons

Create small shared skeleton primitives and page-shaped compositions. Keep them neutral and aligned to existing page layouts so they read as loading content, not as a second design. Each route family gets a `loading.tsx` at its route segment; nested dynamic routes get their own composition. Cover:

- Home, About, Services index, service category, and service detail.
- Projects index and project detail.
- Blogs index and blog detail.
- Careers index and job detail.
- Contact, Privacy, Terms, and Cookies.

Skeletons are temporary loading UI only; they do not replace the existing page content or remain after a route resolves.

### CMS content and fallback behavior

Keep the current model/API ownership for each page. Remove invented sample records from frontend fallbacks. For editorial collections, use a reusable `EmptyState` with a small inline illustration that responds to hover/tap and respects `prefers-reduced-motion`. Use it when an endpoint succeeds with an empty collection. Do not show it when the API is down.

Update the API boundary to preserve the distinction between:

1. A successful response with no records, which renders the empty state or omits an optional section.
2. A missing detail record, which renders the route's not-found state.
3. A network/server failure, which renders a clear retryable unavailable state and never substitutes fabricated content.

Use uncached server fetches for editable CMS content so updates are visible on the next request. Keep static route structure and UI/accessibility labels in the frontend.

The content audit to resolve is:

- Home: keep CMS hero, services, testimonials, process, featured blogs, and CTA; remove mock section records/copy and expose any currently missing editorial section copy through the existing Home page model/API.
- About: keep API title, description, and team records; remove the hard-coded leadership/team fallback.
- Services and service routes: keep existing CMS categories, services, and detail fields; remove any fabricated page content and ensure empty collections use the empty state.
- Projects: keep existing API list/detail data; remove `FALLBACK_ITEMS`, add `/projects/[slug]`, and connect list links/sitemap entries to the detail route.
- Blogs: keep API hero/posts/detail; remove the static `BLOGS` list and featured mock posts; use CMS-owned page copy where the page model supports it.
- Careers: keep API hero/settings/jobs/values/perks/testimonials/process; remove all `STATIC_*` data arrays and show empty states for empty collections.
- Contact: keep API contact fields, work types, and services list; remove sample phone/contact values and make any remaining substantive page copy editable through the existing contact model.
- Legal: add admin-editable records for Privacy, Terms, and Cookies, with page title, subtitle, last-updated date, and ordered sections. Preserve the current wording in a data migration as the initial CMS values. Expose a public read endpoint and render those records through one shared legal-page template.
- Navbar/footer: continue using existing admin records. Keep only minimal structural behavior needed for a usable shell if records are missing; do not inject fake marketing content.

### Project detail route

Build `/projects/[slug]` from the existing project API shape: project title, description, hero/tagline, ordered detail fields, technology, platforms, challenges, features, team, and visit links. Resolve missing/inactive slugs with `notFound()`, and use project SEO data for metadata. Update sitemap generation to include valid project routes; do not advertise a route before its frontend page exists.

### Legal content model

Add a `LegalPage` record keyed by a unique slug (`privacy`, `terms`, `cookies`) with title, subtitle, eyebrow, and last-updated date. Add ordered child sections with a heading and plain-text body so editors can safely manage content without raw HTML. Use a data migration to copy the existing frontend policy wording verbatim into the records. Register both models in Django admin with inline section editing, expose a public read-only serializer/view/URL, and consume it in Next.js.

## Error and accessibility behavior

- Loading skeletons are decorative and hidden from assistive technology; route content retains semantic heading structure once loaded.
- Empty-state copy is explicit (for example, “No projects published yet”), and its illustration is decorative. Any action offered is a real action such as retrying a failed request or returning to the catalog.
- API failure must not be represented as an empty collection. Provide an accessible retry action and avoid logging secrets or response bodies.
- Empty-state motion responds to hover/tap but is disabled or reduced for reduced-motion preferences.
- Not-found detail routes remain distinct from API-unavailable states.

## Acceptance criteria

1. Every listed public route family has a route-appropriate loading skeleton, including dynamic category, service, blog, job, and project detail routes.
2. No fabricated project/blog/job/team/testimonial/process record is displayed when its CMS data is empty or unavailable.
3. Empty CMS collections render the interactive, reduced-motion-safe empty graphic; API outages render an unavailable state instead.
4. Privacy, Terms, and Cookies content is editable in Django admin, starts with the current wording, and renders from the new public API.
5. Every active project slug resolves to a CMS-driven detail page and is represented correctly in the sitemap.
6. Existing admin-authored content continues to render on Home, About, Services, Blogs, Careers, Contact, Navbar, and Footer.
7. Admin changes to CMS-managed content appear after the next page request without waiting for a stale 60-second Next.js data cache.
8. Frontend type-check/build and Django checks/migration tests pass; route behavior is manually checked on desktop and mobile.

## Out of scope

- Rebuilding the existing admin or introducing a block-based content builder.
- Redesigning page layouts beyond what is needed for skeleton alignment, real empty states, and project detail.
- Rewriting or legally revising policy copy; the current copy is transferred verbatim.
- Adding new unrelated marketing copy or sample/demo records.
