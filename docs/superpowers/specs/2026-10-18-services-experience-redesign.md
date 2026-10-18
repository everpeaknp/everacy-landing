# Services experience redesign — design specification

**Date:** 2026-10-18  
**Status:** Awaiting review  
**Scope:** Everacy public services index, service-category pages, and individual service-detail pages.

## User goal

Make service pages feel engaging, clear, and professional enough that visitors want to explore them. Pages should be easy to scan, show the kind of work Everacy does, and help a prospective customer decide what to do next. New visuals or interface pieces may be static in this preview; the work must remain local and must not be pushed to GitHub.

## Design direction

Keep the existing Everacy brand (navy, teal, neutral backgrounds and type), but give each route a deliberate editorial rhythm. Use stronger content hierarchy, concise summaries, varied section compositions, and meaningful product/work visuals. Do not fill whitespace just to fill it, repeat the same card grid in every section, or place a generic illustration in a section where it does not explain the content.

### Services index

- Retain the current CMS-driven hero and service-category data.
- Make the category/service choice clearer and faster to scan, with visible hierarchy between the category and its services.
- Add a compact “where to start” or proof-oriented visual module only if it can use existing real project/service content; any new mock visual must be labeled as a static preview and must not imply a real client result.
- Bring a clear contact/project action into the early page flow.

### Category page

- Lead with the buyer problem/outcome expressed by existing CMS copy.
- Present the category's child services as scannable choices with clear descriptions and a useful interaction or visual state, not a wall of undifferentiated links.
- Include a relevant project/proof route when actual project data supports it; do not invent client facts or outcomes.
- Make the path into each service and to contact obvious on desktop and mobile.

### Service detail page

- Keep the current CMS-driven page content and order where it is meaningful, while improving hierarchy and visual variation across the hero, capabilities, delivery process, technology, benefits, FAQ, related work, and CTA sections.
- Use real product imagery/screens where the CMS already provides it. For missing visuals, use clean static UI/diagram compositions that communicate the relevant workflow or deliverable; do not force one image into every section or add a background behind transparent imagery.
- Keep capability interactions accessible and useful: selection must visibly update supporting content, and the interaction must remain usable by keyboard and touch.
- Reduce repeated decorative cards and large dead zones; use timelines, editorial split layouts, compact evidence panels, or numbered steps only where the content suits them.
- Keep technology stacks contextual and compact rather than an isolated icon wall.
- Provide clear next steps and connect claims to real project evidence where available.

## Data and content constraints

- Use published CMS data for existing page copy, links, project data, technology records, and media.
- New visual preview content can be static/local for this iteration; it is not a new CMS schema or production seed request.
- Do not overwrite, migrate, or seed CMS data. Do not invent clients, testimonials, metrics, staff claims, or shipped product screenshots.
- If existing media is absent, the static design must be obviously illustrative and safe to remove or replace later.
- Preserve service slugs, URLs, SEO metadata behavior, and existing API contracts.

## Responsive and accessible behavior

- The experience must be readable and navigable at mobile, tablet, and desktop widths without horizontal overflow.
- Interactive controls must have semantic roles/names, visible focus, keyboard support, and touch-sized targets.
- Respect reduced-motion preferences and ensure animation is not required to understand content.
- Use image alt text appropriate to the information conveyed; decorative media must be hidden from assistive technology.

## Out of scope

- Backend/Django changes, CMS schema changes, production content edits/seeding, production deployment, GitHub push, a full copywriting campaign, and changes outside the services routes.
- Claiming or measuring improvements to conversions, Core Web Vitals, or accessibility conformance without the corresponding tests.

## Acceptance criteria

1. `/services`, `/services/[categorySlug]`, and `/services/[categorySlug]/[serviceSlug]` share a coherent visual system but have distinct layouts suited to each page's purpose.
2. The first viewport gives visitors a clear service context and an obvious next action.
3. Page sections are scannable and visually varied; imagery or diagrams clarify actual work rather than decorate unrelated text.
4. CMS-provided content remains the source of truth; static preview visuals are local-only and do not alter production seed data.
5. Navigation and capability interactions work with keyboard and touch, honor reduced motion, and remain responsive at mobile widths.
6. Existing links, route slugs, metadata, and valid CMS content continue to render.
7. Relevant tests and a production build pass; no GitHub push or deployment occurs.
