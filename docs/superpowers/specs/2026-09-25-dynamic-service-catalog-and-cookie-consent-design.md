# Dynamic service catalog and cookie consent

## Goal

Replace the current service selector and drawer with a browsable, backend-managed catalog. The homepage should show every active service in backend order. Visitors can browse services by editable category, discover four featured services from each category in the Services mega menu, and open dedicated category and service pages. Add a consent banner that lets visitors accept all cookies, reject optional cookies, or customize optional analytics consent.

## Current state

The Django backend exposes `ArchSectionCard` records as services. These records already contain descriptions, images, CTA text, capabilities, technology lists, and pipeline steps, but no category or public slug. The home API and service API return active cards. The Django admin exposes these models through the `admin_home` proxy app. The Next.js homepage passes the records to `ArchSection`, which presents a single selected card. `/services` renders a drawer-based catalog. The navbar mega menu lists every service directly. A cookie information page exists, but no consent banner or preference storage is present. Global SEO settings include analytics identifiers, so optional tracking must respect consent.

## Approach

There are two service-data paths: keep `ArchSectionCard` as the existing CMS service record and add a category relation and slug, or create a separate service model and migrate all current card content into it. Keep the existing model: its descriptions, imagery, rich detail fields, homepage API, and admin workflows already represent the service catalog, so adding category and route identity avoids duplicating content and breaking existing consumers. Category records remain separate so the admin can add and reorder categories without code changes.

For cookies, use a focused first-party consent banner that gates the existing analytics integration. A full consent-management vendor would add a new dependency and workflow without a current need for multiple advertising vendors or server-side consent records.

## Data and backend

Add an ordered, active service category model with a unique slug, title, description, optional icon/image, and SEO fields. Seed Development and Marketing as initial categories without overwriting later admin edits. Add a category relation, unique public slug, and SEO fields to each service. The relation must permit existing service records to migrate without guessing their category; expose unassigned active services clearly in admin until staff assign them. Unassigned services remain visible on the all-services homepage but are omitted from category pages and the mega menu. Add an explicit `featured_in_menu` flag; the menu selects at most four active flagged services per category in service order. Admins can create, edit, reorder, activate, and remove categories and assign/reorder services. Protect category deletion when services are assigned, with a clear admin-facing error or a reassignment workflow rather than silently deleting services.

Expose active categories with their active services and menu-featured services through the existing service APIs. Keep home service records backend ordered and include category identity and the canonical service URL. Add read endpoints for category and service detail, returning existing capability, tech-stack, pipeline, image, CTA, and SEO data. Preserve existing service endpoints and response fields where possible; update frontend types and consumers together. Admin write endpoints remain staff-only and follow current multipart handling for image fields. Add schema migrations and Django admin registration.

## Frontend behavior and routes

The homepage shows all active backend services in one responsive card grid, with no category tabs. Cards link to their dedicated service page and keep the current visual identity while improving spacing, alignment, readable text lengths, and mobile layout. The section title remains backend controlled.

The Services mega menu has one selectable item per active category. Selecting an item updates the featured-service area in place without navigating or closing the menu. Show up to four featured cards, with a category link to its listing page. Support keyboard focus, activation, and touch-sized targets. On smaller screens, expose the same category-to-featured-services hierarchy in the mobile navigation.

Add `/services/[categorySlug]` category listings and `/services/[categorySlug]/[serviceSlug]` detail pages. Both resolve data from backend APIs, render useful not-found states for missing/inactive records, and use backend SEO fields with existing metadata conventions. Service details use the existing dynamic fields; no new static service-copy map is introduced. `/services` remains the catalog landing page, grouped by category and linking to category and service pages. Update service links generated from existing backend records to canonical URLs; retain explicit admin-provided links where they are intentionally external or custom.

## Cookie consent

Show a first-visit banner with Accept all, Reject optional, and Customize actions. Essential storage is always on. Customize opens a small accessible preferences panel with optional analytics consent and a save action. Persist versioned consent and timestamp in a first-party cookie with a documented expiry; initialize to essential-only until a decision is made. Provide a persistent footer entry to reopen settings and change the choice. The backend already exposes a Google Analytics ID, but the frontend does not currently load an analytics script; add that integration only behind granted analytics consent. Do not add marketing tracking without a corresponding implementation and preference. Consent UI must work with keyboard and screen readers and respect reduced motion.

## Failure handling and accessibility

If category/service API data is unavailable, preserve existing empty/error handling rather than presenting invented category assignments. A service without a category remains visible in the homepage grid and admin, but is excluded from category routes and mega-menu grouping until assigned. Use semantic headings and links, visible focus, sufficient contrast, responsive grids, and reduced-motion-safe transitions. Consent controls must remain usable if local storage APIs are unavailable; the first-party cookie is the canonical preference store.

## Verification

Backend: run Django system checks and migration checks; verify category ordering, feature cap, staff-only writes, and API serialization. Frontend: run type-check and production build; inspect homepage, mega menu, category and service routes, mobile navigation, and consent states at desktop and mobile sizes. Confirm analytics requests do not occur before consent and do occur only after analytics consent. Exercise missing and inactive route states. Do not alter unrelated SEO, navigation, or CMS data.

## Delivery scope

The service catalog is a coordinated change across `everacy-landing-django` and `everacy-landing`. Implement the backend contract before or alongside its frontend consumers. Keep this design as the shared review artifact in the frontend repository. Cookie preferences remain client-side; no personal-consent analytics database or consent-management vendor is introduced.
