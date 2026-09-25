# Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors accept all cookies, reject optional cookies, or choose analytics consent, and remember or change that preference.

**Architecture:** Add a small client-side consent component in the marketing layout. Store a versioned preference and timestamp in a first-party cookie with essential-only as the default. Load the Google Analytics script from the backend-configured ID only after analytics consent; no marketing trackers or consent vendor are added.

**Tech Stack:** Next.js App Router, React, TypeScript, `next/script`, browser cookies, Tailwind CSS.

**Spec:** `docs/superpowers/specs/2026-09-25-dynamic-service-catalog-and-cookie-consent-design.md`

## Global Constraints

- Essential storage is always enabled.
- Optional analytics must remain off until the visitor grants consent.
- Provide Accept all, Reject optional, Customize, Save, and a persistent way to reopen settings.
- Consent preference is versioned and records a timestamp in a first-party cookie with a documented expiry.
- Do not add marketing tracking, a consent vendor, or a backend consent database.
- Keep controls keyboard and screen-reader accessible and respect reduced motion.

## Review Focus

- No preference cookie means essential-only and the banner appears.
- Malformed or old-version consent is treated as no optional consent.
- Accept all, reject, and customized analytics values persist through reload.
- Reopening settings lets the visitor replace a prior preference.
- Missing analytics ID or blocked cookie access does not crash rendering or enable analytics.

---

### Task 1: Add consent storage and decision helpers

**Files:**
- Create: `everacy-landing/src/lib/cookie-consent.ts`
- Modify: `everacy-landing/src/lib/api.ts` if an existing global SEO fetcher does not expose `google_analytics_id`

**Interfaces:**
- `CookieConsent = { version: 1; analytics: boolean; updatedAt: string }`.
- `readCookieConsent(): CookieConsent | null` parses the `everacy_consent` first-party cookie and rejects invalid schema/version.
- `writeCookieConsent(consent: CookieConsent): void` sets `Path=/; SameSite=Lax; Max-Age=15552000` (180 days) and `Secure` on HTTPS.

- [ ] **Step 1: Implement typed parsing and serialization.** URI-encode JSON, safely handle malformed cookies and unavailable `document`, and never infer analytics consent from missing data.
- [ ] **Step 2: Define action constructors.** Accept all yields analytics true, reject optional yields analytics false, customized save uses the selected analytics boolean; all store an ISO timestamp.
- [ ] **Step 3: Review cookie scope and expiry.** Confirm root path, SameSite=Lax, 180-day expiry, and HTTPS-only Secure attribute.

### Task 2: Build accessible banner and preferences panel

**Files:**
- Create: `everacy-landing/src/components/common/CookieConsent.tsx`
- Modify: `everacy-landing/src/app/(marketing)/layout.tsx`
- Modify: `everacy-landing/src/components/common/Footer.tsx`

**Interfaces:**
- `CookieConsent({ analyticsId }: { analyticsId?: string | null })` reads stored consent after mount, displays the banner when undecided, and exposes a global settings event for the footer.
- Footer settings control dispatches `everacy:open-cookie-settings` and does not navigate away.

- [ ] **Step 1: Add banner state and actions.** Provide Accept all, Reject optional, and Customize; hide the banner after a valid choice and persist through the helper.
- [ ] **Step 2: Add customization UI.** Expose essential as always-on text and an analytics toggle with a Save preferences action; initialize from stored consent when editing.
- [ ] **Step 3: Add accessible behavior.** Use a labelled region/dialog, semantic buttons, visible focus, keyboard-operable toggle, appropriate focus handling, and reduced-motion-safe transitions.
- [ ] **Step 4: Mount in marketing layout and add footer reopen control.** Preserve the footer Cookies information link and add a separate change-preferences control.
- [ ] **Step 5: Handle unavailable cookie APIs.** Keep the current page functional; a choice should update in-memory state and no optional tracker should load unless the cookie write/read state confirms consent.

### Task 3: Gate Google Analytics on consent

**Files:**
- Modify: `everacy-landing/src/components/common/CookieConsent.tsx`
- Modify: `everacy-landing/src/app/(marketing)/layout.tsx`

**Interfaces:**
- Backend global SEO already exposes optional `google_analytics_id`; obtain it through the existing global SEO fetcher.
- Add `next/script` only when `analyticsId` exists and consent is version 1 with `analytics: true`.

- [ ] **Step 1: Pass the backend analytics ID to the consent component.** Keep page rendering functional when the API is unavailable.
- [ ] **Step 2: Render GA script only on analytics consent.** Use the ID to initialize Google tag; ensure accept/reject changes immediately add or remove analytics script and clear GA cookies when analytics is withdrawn.
- [ ] **Step 3: Review all tracking references.** Confirm there are no other script injection paths that load analytics before consent.

### Task 4: Consent integration review

**Files:**
- Review `cookie-consent.ts`, `CookieConsent.tsx`, marketing layout, and footer.

- [ ] **Step 1: Run frontend type check and production build.** `npm run type-check` and `npm run build`.
- [ ] **Step 2: Manually inspect first visit and each decision.** Confirm banner states, customize/save, settings reopen, reload persistence, and mobile/keyboard usability.
- [ ] **Step 3: Inspect network behavior.** With a configured GA ID, verify there are no Google Analytics requests before analytics acceptance, requests begin after acceptance, and are disabled after withdrawal.
