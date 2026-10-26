# Everacy website UX, credibility, and conversion audit

**Prepared:** 18 October 2026  
**Scope:** Public marketing website and its CMS-driven routes, based on the current frontend implementation and a public-content crawl. This is an evidence-led audit, not a security assessment or a substitute for live usability testing.

## Executive assessment

Everacy has useful raw material: a broad service catalogue, named products/projects, a content system, service detail pages, a contact path, team and career pages, and a visual identity that can be recognized. The site has enough breadth to tell a credible story.

The main gap is **proof and clarity**. The site often asks prospects to trust broad claims before it shows a specific customer problem, the work Everacy did, and a verifiable result. The homepage opens with brand atmosphere rather than a clear offer and next step. Project descriptions and some service copy are generic or mismatched to the product. Public-facing details (social labels, spelling, dates, staff/role claims, and performance claims) need a single fact-check pass. Those small inconsistencies matter disproportionately when the website is the buyer's primary evidence that the company is dependable.

**Recommendation:** Position Everacy as a focused digital product and growth partner, then prove that position with real case studies, real people, clear delivery expectations, and current, accurate company information. Keep the visual identity, but make the first screen and every major landing page do a buyer's job: help them recognize their problem, understand the fit, evaluate evidence, and take a low-friction next step.

### Highest-priority findings

| Priority | Finding | Why it matters | First action |
|---|---|---|---|
| P0 | Public social label/link mismatch and visible copy errors | Creates an avoidable “is this maintained?” doubt | Correct every social URL and label; proofread the shared brand copy and footer |
| P0 | Homepage hero does not say what Everacy does or offer an action | A new visitor must scroll and infer the offer before they can engage | Lead with a buyer-facing value proposition, one primary CTA, and a case-study link |
| P1 | Portfolio cards do not consistently explain the products or Everacy's contribution | Project pages are the strongest evidence of delivery ability, yet the cards currently do little selling | Create a consistent, evidence-backed case-study standard; distinguish client work from owned products |
| P1 | Broad “elite”, “#1”, uptime, zero-downtime, and scale claims need evidence | Unsupported superlatives lower trust with enterprise buyers | Keep only claims with an owner, evidence, scope, and date; qualify or remove the rest |
| P1 | Contact form has accessibility and failure-state gaps | Friction or a silent failure can lose a qualified lead | Associate labels, use native controls, add autocomplete, catch request failures, and test the full submission journey |
| P1 | People, roles, careers, and company facts need a current, verified source of truth | Inconsistent or stale identity details are a high-risk trust signal | Verify every visible person, open job, location, contact method, and social account with the business owner |
| P2 | Pages lean on repeated grids and abstract/synthetic visuals | The design can feel polished but interchangeable, rather than showing real work | Use authentic product screens, annotated outcomes, and a smaller number of distinct layouts |
| P2 | Performance, accessibility, mobile behavior, and conversion are not yet backed by field data | We should not guess whether the experience works on users' devices | Run mobile, keyboard/screen-reader, Core Web Vitals, and analytics checks before declaring these areas healthy |

## What I reviewed and confidence limits

I reviewed the frontend route structure, shared components and key data paths, including homepage, service index/category/detail, project listing/detail, about, careers/listing/detail, blog/listing/detail, contact, legal routes, navigation, footer, SEO helpers, sitemap/robots, cookie consent, and contact form. I compared the public indexed content for the homepage, about, project listing, careers, and article search results with the implementation.

The public crawl is a snapshot and can lag the live CMS. I could not inspect the current local page visually in the in-app browser, inspect the production CMS records directly, submit a real contact form, test analytics, or run Lighthouse on representative devices. Accordingly:

- Public copy/link findings below are confirmed in the indexed public snapshot and should be rechecked in the live site before editing.
- Code findings are confirmed in the frontend source and describe implementation risk; they are not a claim that every user encounters a failure.
- Performance, device-specific rendering, contrast, keyboard operation, legal accuracy, and conversion impact require direct testing.
- No inference about whether a person, client, testimonial, or metric is false is intended. The audit recommends verifying those claims because the site itself cannot establish their truth.

## Trust and enterprise-readiness benchmark

The useful enterprise benchmark is not “look more corporate.” It is **make evaluation easier**. NN/g's B2B usability guidance stresses that buyers need credible information while researching, before they are ready to provide contact details; its trust guidance emphasizes design quality, current and comprehensive content, and transparent company information. [NN/g: B2B usability](https://www.nngroup.com/articles/b2b-usability/) · [NN/g: trustworthy design](https://www.nngroup.com/articles/trustworthy-design/)

Large consultancies make the evidence chain visible. IBM organizes capabilities around industry needs; Accenture's client stories expose the client situation, work, technology, and outcomes; Thoughtworks lets buyers explore services and stories through industry/topic context. Everacy can use the same **proof discipline** without copying their size or visual style: show who the work helped, what changed, what the team actually delivered, and what evidence supports the result. [IBM Consulting industries](https://www.ibm.com/consulting/industries) · [Accenture client stories](https://www.accenture.com/us-en/about/company/integrated-reporting-client-stories) · [Thoughtworks services](https://www.thoughtworks.com/what-we-do/managed-services)

## Route-by-route audit

### 1. Homepage `/`

**Current impression:** A full-screen identity/animation hero followed by services, technology stack, testimonials, process, insights, and a later CTA. The visual brand is memorable, but the first screen is not yet a sales conversation.

**Confirmed issue:** The hero component renders the logo, tagline, heading, subtext, and scroll cue; it does not render a primary CTA or explain the target customer, service, or business outcome. A visitor has to scroll and interpret the rest of the page. The current indexed hero copy also contains “ENGINEERING TOMMORROW”; older indexed variants have additional spelling differences. [Current public homepage snapshot](https://www.everacy.com/)

**Improve:**

- Replace the brand-only H1 with a clear promise such as “We design and build digital products that help [specific customer] achieve [specific outcome].” Choose the wording from Everacy's real customer mix, not from generic agency language.
- Put **Discuss a project** (or an equally specific action) and **View our work** in the first viewport. Keep one visually primary.
- Add one immediate proof point below the headline: a real product/project, a named client with permission, a verified metric, or a clear delivery specialization. Do not use unverified client logos or numbers.
- Explain whether YummyEver, TeamsEver, YummyDoors, and SajiloWork are Everacy-owned products, client work, or partner work. This distinction should be visible on cards and detail pages.
- Reorder the page around buyer questions: what you do → proof → fit/services → how engagement works → people/credibility → insight → contact. The current services breadth is a strength only if visitors can quickly identify their path.
- Keep the liquid effect as atmosphere, not as the message. Provide a strong static gradient fallback, honor reduced motion, and make the main text and CTA available immediately on mobile and low-power devices.
- Replace generic “cool articles” framing with useful editorial language and direct links to relevant case studies/services.

**Success signal:** A first-time visitor can state what Everacy does, for whom, and what to do next after seeing the first screen.

### 2. Services index `/services`

**Current impression:** Broad service coverage can signal capability, but it can also make Everacy look like a generalist without a clear specialization.

**Improve:**

- Start with a short positioning statement and a “Find the right service” route by buyer goal or problem (launch a product, modernize an existing platform, acquire customers, improve conversion), alongside the existing category taxonomy.
- Group services into a small number of understandable practices; explain how design, engineering, and growth fit together. Keep cross-links visible instead of asking a visitor to understand the internal org chart.
- For each category and service card, state a concrete outcome and a typical deliverable. Avoid multiple cards whose wording differs but whose promise is effectively “we build scalable solutions.”
- Add at least one relevant proof link per major practice. Clearly label capabilities that are new, partner-delivered, or not yet represented by a published case study.
- Check desktop mega-menu and mobile navigation for understandable category descriptions, focus behavior, and tap targets. The menu should help visitors choose, not be a second service catalogue.

### 3. Service category `/services/[category]`

**Improve:**

- Make the category page answer: who needs this, what business problems it addresses, what Everacy delivers, and how a project starts.
- Help visitors compare child services by fit, outputs, and common starting point; don't rely on title-only cards.
- Add one or two evidence-backed stories that match this category, plus a contextual CTA. If there is no suitable case study, use a transparent sample/demo and label it clearly.
- On mobile, keep category switching compact and persistent enough to orient the user without consuming the viewport.

### 4. Service detail `/services/[category]/[service]`

**Current impression:** The route has a useful CMS-driven structure (hero, capabilities, delivery steps, stack, benefits/features, FAQ, related work/content, CTA). That flexibility is a real asset. The risk is that every service page becomes a long series of similar text/card sections, even when the customer problem and evidence differ.

**Improve:**

- Put a specific audience/problem/outcome in the hero, then offer a low-friction next step and a relevant proof link.
- Present an actual artifact for each service: a product screen, prototype, architecture diagram, before/after, workflow, or annotated deliverable. Use different compositions where they serve different content; avoid forcing the same decorative PNG into every section.
- Explain boundaries and outputs: what is included, what the client provides, likely phases, handover/support, and factors that affect scope. If pricing cannot be standardized, provide a clear scoping path rather than implying that an unqualified “contact us” is the only next step.
- Use capability selectors only when they help a visitor explore. Make their selected state, keyboard operation, and mobile behavior clear; preserve the actual content when JavaScript or animation is unavailable.
- Keep technology stacks contextual: show why a technology suits this service/project, not just an icon wall.
- Use FAQs to answer genuine buying objections (ownership, ongoing support, integrations, discovery, revisions, security, team composition), and connect answers to evidence.
- Let each section image be optional in the CMS and provide image-specific alt text, crop/focal-point guidance, and a preview at desktop/mobile sizes. Never add a forced background to a transparent asset.
- Keep CMS helper text practical: explain what a good entry contains, its display location, recommended length, image dimensions/aspect ratio, and whether it is optional.

### 5. Projects listing `/projects`

**Current public snapshot:** The listing has YummyEver, TeamsEver, YummyDoors, and SajiloWork, but the cards do not consistently communicate each product's actual purpose and Everacy's role. One line describes YummyDoors in terms of design systems; another describes SajiloWork in terms of delivery for product teams. Those descriptions appear mismatched to the product names and need a CMS content check. [Public projects listing](https://www.everacy.com/projects)

**Improve:**

- Label each project **Client engagement**, **Everacy product**, or **Partner work**. Do not let a buyer guess whether a product is a client result.
- Give every card a consistent compact structure: audience/problem, Everacy's role, one outcome or scope fact, and a link to the story or live product.
- Add filters only if the portfolio is large enough to benefit from them; use industry/use case/platform as buyer-centered filters. Avoid decorative categories that return one or zero items.
- Use real product imagery and screenshots, not only wordmarks. Show responsive screens, workflow, or a short caption explaining what the buyer is seeing.
- Prioritize the strongest three to five evidence-backed stories rather than giving every project equal prominence.

### 6. Project detail `/projects/[slug]`

**Improve:** Make each page a real case study, not a product brochure. Use a repeatable evidence order:

1. Client/product and sector; label ownership/relationship.
2. The customer's situation and constraints.
3. Everacy's role and team contribution.
4. Important design/engineering decisions and integrations.
5. Shipped experience: screenshots, workflow, or demo.
6. Results with metric definition, time period, and source—or clearly stated qualitative outcomes if no metrics are available.
7. Technologies only where they explain a decision.
8. Client quote with permission and attribution, if available.
9. Related service and a contextual next step.

Include a “what we did” section that distinguishes Everacy's work from the client's existing product. Link to a public product only if it is current and safe to present. If data is confidential, say so and use an approved anonymized story rather than inventing metrics.

### 7. About `/about`

**Current public snapshot:** The page uses “Everything Starts with Elite Minds” and names leadership/team members. It includes technical superlatives such as “zero-latency architectures.” The public page should be checked against the actual, current team roster and role taxonomy before it is used as proof. The crawl also showed year/copyright inconsistencies between page header/footer output. [Public about page](https://www.everacy.com/about)

**Improve:**

- Tell the real company story: why Everacy exists, where it operates, who it serves, what it is unusually good at, and how clients work with the team.
- Verify every person, title, location, and biography. Use real portraits or clearly identify illustrations. Never publish placeholder names or generated people as employees.
- Separate disciplines accurately (e.g., Product & Design, Engineering, Growth/Marketing, Leadership) so designers are not presented as engineers by default.
- Replace claims such as “zero-latency” with measurable, contextual statements or plain explanations of the engineering approach.
- Show how work is governed: communication cadence, decision owners, QA/release process, documentation, and post-launch support.
- Use the same authoritative company name, year, address, email, phone, and legal entity across About, Contact, footer, metadata, and legal pages.

### 8. Careers `/careers` and `/careers/[slug]`

**Current public snapshot:** The page lists several internship roles across engineering, QA, Flutter, and marketing. Its “elite engineering” positioning and the mix of roles/testimonials should accurately reflect the real team and current hiring needs. [Public careers page](https://www.everacy.com/careers)

**Improve:**

- Show only open roles; include location, employment type, compensation range where legally/practically appropriate, expected experience, application deadline, and a realistic hiring process.
- Explain how the team works, what a new hire will own, mentorship/review practices, and what success looks like in the role.
- Use genuine team quotes with permission and attribution. Keep employee claims current.
- Make application forms accessible and explain data retention/contact expectations.
- Ensure structured job posting data is removed or expired when a role closes; stale jobs damage trust and search quality.

### 9. Blog `/blogs` and `/blogs/[slug]`

**Current public evidence:** Public search results show useful topics but also a self-ranking “Best IT Companies in Pokhara, Nepal – 2026” article that places Everacy first. A self-award is hard for a skeptical buyer to treat as independent unless the selection method, evidence, and editorial interest are made explicit. [Search result for the ranking article](https://www.google.com/search?q=site%3Aeveracy.com%2Fblogs+%22Best+IT+Companies+in+Pokhara%22)

**Improve:**

- Publish fewer, stronger articles based on actual work, lessons, and expertise. Add named author, relevant expertise, publication/update dates, references, and a clear editorial standard.
- For comparison/ranking content, publish transparent criteria, sources, date checked, and disclosure of Everacy's inclusion. Better still, turn it into a genuinely useful buyer's guide without ranking the publisher first.
- Audit every image for relevance, source/usage rights, caption, and descriptive alt text. Avoid unrelated external images and generic AI illustrations where a real product artifact would be more credible.
- Link each article to the relevant project/service naturally; avoid repeated generic “contact us” blocks.
- Review factual dates, statistics, and product references regularly. Add “last reviewed” only when a real review happened.

### 10. Contact `/contact`

**Confirmed implementation risks:** The contact form uses text labels without explicit `htmlFor`/input `id`, custom clickable `div` elements for work-type selection instead of native radio inputs, and no visible `name`/`autoComplete` attributes on the name/email inputs. The submit handler awaits the request without a `try/catch`; a rejected network promise can leave the form stuck in its submitting state. On successful submit, the selected work type resets to the literal `project`, even though the initial value comes from CMS data. These are source-level defects to verify and fix. See [`ContactForm.tsx`](../src/components/sections/ContactForm.tsx).

**Improve:**

- Use associated labels, `name`, `id`, `autoComplete`, and native radio/checkbox controls or fully accessible equivalents with correct roles, keyboard behavior, and focus states.
- Wrap submission in error handling, always clear loading state in `finally`, announce status/errors accessibly, prevent duplicate submissions, and reset to the first valid CMS work-type option.
- Test invalid email, server validation, timeout/offline, success, retry, and duplicate submit on mobile and keyboard-only.
- Tell prospects what happens next (response time, who responds, whether a discovery call is expected). Make phone optional unless it is essential; state how contact details are used.
- Offer direct email/phone with tap-to-call links and a clear company/location identity. Keep the form short and let the service/project context prefill where possible.

### 11. Privacy, terms, and cookies

**Positive:** The cookie component distinguishes “Accept all,” “Only essential,” and preferences, and does not appear to force analytics consent as a condition of browsing. This is a sound UX pattern.

**Improve:** Confirm the actual analytics/pixel scripts remain disabled until consent where required; make the settings dialog keyboard/screen-reader accessible; provide a persistent way to reopen preferences; and ensure policy text matches the tools and data actually in use. Keep version/date and legal entity details current. This is a product/legal check, not a legal opinion.

### 12. Global navigation and footer

**Confirmed public snapshot issue:** The footer shows “Linkedln” and a “Twitter” link that resolves to Instagram on indexed pages. This was visible on both About and Projects snapshots. Correct the CMS record and validate the rendered destination, label, and icon for every social platform. [About/footer snapshot](https://www.everacy.com/about) · [Projects/footer snapshot](https://www.everacy.com/projects)

**Improve:**

- Use one canonical set of navigation, social, contact, and legal data; verify it on every route and viewport.
- Keep “Services,” “Work,” “About,” and “Contact” easy to find. A visible contact action should not disappear into the mega-menu.
- Ensure all menus work with keyboard and touch, expose expanded state to assistive tech, close predictably, and return focus to the trigger.
- Use meaningful link labels and distinguish social account names from platform labels. No dead, misdirected, or duplicate links.
- Fix inconsistent copyright year and any inconsistent header/footer branding found in rendered output.

## Cross-site system recommendations

### Positioning and message

At the moment, the breadth of services can read as “we do everything.” Choose one top-level description that the company can prove, then organize adjacent capabilities underneath. For each service, use the pattern **customer → problem → work → outcome**. Use “scalable,” “world-class,” “elite,” and “innovative” sparingly; those words do not tell a buyer what they will receive.

### Trust evidence

Build a reusable proof system in the CMS. Each published case study should have required fields for relationship type, customer/sector, challenge, Everacy role, deliverables, approved media, outcomes, evidence/time period, permissions, and review date. Allow an outcome to be qualitative when there is no defensible metric. Do not invent or imply a metric. Keep testimonial consent and client logo permission recorded internally.

Verify all prominent claims before publication, especially “#1,” uptime/SLA, zero-downtime, security/compliance, scale, and client results. A claim needs a definition, evidence owner, scope, and date. If that evidence does not exist, rewrite it as a capability or intention, not a result.

### Content governance / CMS

- Add a preview checklist for published pages: title/description, spelling, CTA, alt text, mobile crop, links, owner, approval, date, and status.
- Distinguish required vs optional image fields and avoid placeholder imagery being published accidentally.
- Add stale-content reminders for team, testimonials, job posts, statistics, awards, and ranking articles.
- Make organization/contact/social data a single source of truth, and validate links/URLs when publishing.
- Provide real writing examples and length guidance in admin helper text so the front-end does not inherit vague or inconsistent copy.

### Accessibility and mobile

Run a WCAG 2.2 AA review for keyboard navigation, visible focus, accessible names, headings, contrast, error messaging, target size, reduced motion, zoom/reflow, and form labels. WCAG 2.2 is the current W3C Recommendation baseline. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

Test representative real devices, including the iPhone 13/Safari that has already been reported for the hero effect, plus a mid-range Android device. Check first paint, hero readability, menu open/close, consent preferences, form submission, sticky/fixed elements, image crop, and page length. The hero should remain legible and useful if WebGL fails, is delayed, or is disabled for reduced motion.

### Performance and reliability

The API client intentionally uses `cache: "no-store"` so new CMS edits appear on the next request, and it throws an error when the content service is unavailable. That keeps content fresh but makes the public route dependent on the CMS at render time. Review whether critical public content needs a safe last-known-good fallback or controlled revalidation, while preserving correct publishing behavior. Do not add caching blindly; confirm the hosting and invalidation model first. See [`api.ts`](../src/lib/api.ts).

Measure real-user Core Web Vitals and field distributions before optimizing. Use the current “good” thresholds at the 75th percentile: LCP ≤ 2.5 seconds, INP ≤ 200 ms, and CLS ≤ 0.1. [web.dev: Core Web Vitals](https://web.dev/articles/vitals)

Test image weight, font loading, animation cost, layout shifts, and mobile network behavior. The liquid hero is an area to measure, not assume: its aesthetic value should be weighed against load and battery cost. Retain an accessible static fallback.

### Search and metadata

The project includes route metadata, SEO data, sitemap, robots, and organization/article/job schema support. Keep one canonical hostname and confirm CMS `site_url`, canonical URLs, sitemap URLs, and Open Graph images agree. Verify generated metadata on every route in production, including uploaded OG images, image absolute URLs, descriptive alt/title, social previews, and `noindex`/sitemap settings. Use `sameAs` only for verified official profiles, and ensure structured data reflects visible, accurate content. The code's Organization schema currently initializes `sameAs` as an empty list; add actual verified profiles only if appropriate.

## Prioritized delivery plan

### First 1–2 days: credibility cleanup

1. Fix “Linkedln,” the Twitter→Instagram mismatch, homepage/footer spelling, copyright year, and every stale or inconsistent social/contact value.
2. Verify all names, roles, testimonials, open jobs, product ownership, service claims, and public metrics with a designated owner.
3. Correct project-card descriptions that do not explain the product or appear misaligned with the product name.
4. Remove or qualify claims without evidence, especially self-ranking, uptime/SLA, and zero-downtime language.

### Next 1–2 weeks: clarify the buyer journey

1. Rewrite the homepage first screen around one clear audience/outcome and add primary contact + secondary case-study actions.
2. Pick three strongest real projects and create evidence-backed stories; label client vs owned products.
3. Simplify Services navigation around buyer goals; ensure each detail route has a relevant proof item and clear engagement next step.
4. Fix the contact form semantics, exception handling, success/error announcement, CMS reset bug, and response-time expectations.
5. Add CMS publication validation and preview guidance for media, social links, and page-specific content.

### Next 30–60 days: prove quality in use

1. Conduct five short usability sessions with actual prospective buyers or client stakeholders. Ask them to find the right service, judge one case study, and contact the company; observe without coaching.
2. Run responsive/accessibility review on representative routes and devices; fix the highest-severity findings.
3. Capture real product screenshots, workflow diagrams, approved customer quotes, and measurable results with client consent.
4. Improve editorial standards, author attribution, references, image provenance/alt text, and stale-content ownership.
5. Add analytics events for service exploration, case-study engagement, CTA clicks, contact-start, validation errors, and successful submission, respecting user consent and applicable privacy rules.

### 60–90 days: optimize with evidence

Use observed funnel data and interview findings to tune page hierarchy, content, and CTA wording. Track qualified inquiries (not just form submissions), project-fit rate, response time, case-study engagement, organic landing-page quality, and mobile completion. Establish a monthly content/claims audit and a quarterly real-device/accessibility/performance review.

## Measurement checklist

- **Clarity:** In five-second tests, can target visitors say what Everacy does and who it is for?
- **Trust:** Can a prospect verify company identity, team, client/product relationship, and result evidence without contacting sales?
- **Work quality:** Do case studies show actual shipped product and Everacy's specific contribution?
- **Conversion:** Can visitors start and successfully submit an inquiry on keyboard and mobile, with useful feedback if it fails?
- **Accessibility:** Can all routes and controls be used with keyboard, screen reader, 200% zoom, and reduced motion?
- **Performance:** Are field Core Web Vitals in the good range at the 75th percentile on mobile and desktop?
- **Governance:** Does every claim, person, job, testimonial, link, and image have a current owner and review date?

## Sources

- Public Everacy pages: [Home](https://www.everacy.com/) · [Services](https://www.everacy.com/services) · [Projects](https://www.everacy.com/projects) · [About](https://www.everacy.com/about) · [Careers](https://www.everacy.com/careers)
- Nielsen Norman Group: [B2B usability](https://www.nngroup.com/articles/b2b-usability/) · [Trustworthy design](https://www.nngroup.com/articles/trustworthy-design/)
- Enterprise benchmarks: [IBM Consulting industries](https://www.ibm.com/consulting/industries) · [Accenture client stories](https://www.accenture.com/us-en/about/company/integrated-reporting-client-stories) · [Thoughtworks managed services](https://www.thoughtworks.com/what-we-do/managed-services)
- Technical baselines: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [web.dev Core Web Vitals](https://web.dev/articles/vitals)
