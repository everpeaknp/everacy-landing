# Shared Technology Catalog Design

## Goal

Make technology labels, categories, and logos centrally manageable in Django admin and reuse the same dynamic catalog on project and service pages.

## Current behavior

Projects and services store technology names as JSON string lists. Project categories are grouped in the project route and service categories are grouped in a separate client component. Logos come from a frontend-only Simple Icons map; unknown names receive a generic icon.

## Design

Add global `TechnologyCategory` and `Technology` records. Categories have a unique slug, editable label, order, and active state. Technologies have a unique slug, display name, optional aliases, category, optional uploaded logo file (SVG or raster), order, and active state. Admin can manage categories and technologies from a shared catalog area, including logo uploads.

Keep existing project/service string lists unchanged for backward compatibility. API serializers resolve each stack name against the active catalog by normalized display name, slug, or alias and include a `tech_stack_items` array containing display label, category label/slug/order, and optional absolute logo URL. Unknown names remain visible under `Other tools` with no uploaded logo URL. Existing known Simple Icons stay as the frontend fallback until an admin uploads a catalog logo. Seed catalog entries/categories for technologies already supported by current frontend stacks; include Go under Backend & APIs.

Use one shared frontend technology stack component for project and service pages. It groups returned items by API category ordering, renders only non-empty categories as tabs, and displays uploaded catalog logos when present, then the existing Simple Icons fallback, then a generic mark. New technologies/categories become available without frontend edits after their catalog entry and optional logo are saved.

## Compatibility and constraints

- Do not rewrite or delete current `tech_stack` values.
- Keep old API fields and add enriched fields so existing consumers remain compatible.
- Do not use a third-party runtime logo CDN.
- Uploaded logo assets are served by the configured Django media storage.
- User requested local implementation only; do not commit or push.

## Verification

Test alias/case normalization, category resolution and ordering, custom logo URL serialization, unknown-name fallback, and both project and service API payloads. Run Django checks/tests plus frontend type-check/tests/build as appropriate. Confirm the local project and service routes render with the shared stack component.
