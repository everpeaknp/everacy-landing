
• Perfect, understood.
  I extracted the static fallback content from frontend code so you can re-enter it in live Django
  admin later.

  Source used:

  - /home/ramon/projects/everacy/everacy-landing/src/app/(marketing)/services/page.tsx
  - /home/ramon/projects/everacy/everacy-landing/src/lib/site-theme.ts
  - /home/ramon/projects/everacy/everacy-landing/src/app/(marketing)/services/ServicesClient.tsx

  ## Services Hero (top of /services)

  - Title: Solutions for the Future.
  - Subtitle: Everacy provides cutting-edge digital infrastructure and engineering services tailored to
    your needs.

  ## Our Services Cards (static)

  1. Cloud Infrastructure

  - Description: Resilient, auto-scaling cloud architectures built on AWS, Azure, and GCP. Zero-
    downtime deployments, IaC pipelines, and 99.99% uptime SLAs — engineered for growth.
  - Button label: Explore Cloud
  - Link: /services#cloud
  - Accent color: #7DD6FF
  - Image: /images/cloudcomputing.jpg
  - Image alt: Cloud Infrastructure

  2. Mobile App Development

  - Description: Bespoke iOS and Android applications engineered for performance and engagement. We
    build native and cross-platform mobile experiences that bridge the gap between user needs and
    business goals.
  - Button label: Explore Apps
  - Link: /services#mobile
  - Accent color: #8dd4dd
  - Image: /images/appdevelopment.png
  - Image alt: Mobile App Development

  3. Web Engineering

  - Description: Pixel-perfect, performance-first web platforms. We architect fullstack systems with
    Next.js, TypeScript, and modern APIs — built to scale and optimized for every device.
  - Button label: Explore Web
  - Link: /services#web
  - Accent color: #b4e3fa
  - Image: /images/webdevelopment.jpg
  - Image alt: Web Engineering

  4. SaaS Product Innovations

  - Description: Transforming vision into market-leading software. From multi-tenant architectures to
    scalable subscription engines, we build and iterate on SaaS products that drive recurring revenue
    and industry disruption.
  - Button label: Explore SaaS
  - Link: /services#saas
  - Accent color: #118ec6
  - Image: /images/saas.jpg
  - Image alt: SaaS Product Innovations

  ## Section Background Colors (per active card)

  1. #e8f6fc
  2. #eaf9f9
  3. #f0f4ff
  4. #e6f3fa

  ## Drawer Static Content Map (used when backend fields are empty)

  ### Cloud Infrastructure

  - Tagline: High-uptime, secure, and auto-scaling cloud architectures built for enterprise
    reliability.
  - CTA label: Consult Cloud Architects
  - Capabilities:
      1. Infrastructure as Code (IaC) | Provisioning consistent and highly repeatable environments
         using Terraform and AWS CloudFormation templates. | Code
      2. Container Orchestration | Deploying high-availability production clusters via Kubernetes (EKS,
         GKE) and light AWS ECS modules. | Server
      3. CI/CD & GitOps Systems | Designing automated workflow pipelines using GitHub Actions for fast,
         safe, and zero-downtime rollouts. | GitBranch
      4. Site Reliability (SRE) | Continuous telemetry modeling, cost tracking, alert setups, and
         99.99% system availability targets. | Activity
  - Tech stack: AWS, Google Cloud, Terraform, Docker, Kubernetes, Ansible, GitHub Actions, Prometheus,
    Grafana
  - Pipeline:
      1. 01 Infrastructure Audit | Comprehensive analysis of your current systems, costs, and key
         vulnerabilities.
      2. 02 Architecture Design | Formulating multi-account secure cloud blueprints tailored to your
         workloads.
      3. 03 Migration & Provisioning | Safe migration of databases and virtual machines with automated
         deployment scripts.
      4. 04 Continuous Hardening | Periodic patch updates, firewall configurations, cost tuning, and
         scale reviews.

  ### Mobile App Development

  - Tagline: Sleek, fluid, and native-grade iOS & Android applications tailored for user conversion.
  - CTA label: Develop Mobile App
  - Capabilities:
      1. Cross-Platform Fidelity | Building responsive cross-platform architectures with React Native
         and Flutter for fast product delivery. | Layout
      2. Native Code Performance | Writing high-efficiency custom bridges and features using modern
         Swift and robust Kotlin configurations. | Cpu
      3. Offline Sync Pipelines | Syncing data gracefully between device caches and web servers using
         WatermelonDB and custom local SQLite layers. | Database
      4. Secure Device Auth | Enabling smooth biometrics (FaceID/TouchID) and hardware-level keychain
         encryption. | Shield
  - Tech stack: React Native, Flutter, Swift, Kotlin, TypeScript, Zustand, SQLite, Firebase, App Store
    Connect
  - Pipeline:
      1. 01 UX Journey Mapping | Outlining wireframes, interactive transitions, and typography targets.
      2. 02 Modular Sprints | Developing iterative increments of functional modules with robust unit
         tests.
      3. 03 Automated Device Runs | Validating interfaces and API calls on virtual arrays of actual
         mobile handsets.
      4. 04 Store Management | Navigating store review cycles, certificate provisioning, and public
         releases.

  ### Web Engineering

  - Tagline: Speed-optimized, SEO-first, and highly engaging modern web portals.
  - CTA label: Launch Web System
  - Capabilities:
      1. Next.js Architecture | Leveraging Server Components, SSR caching, and Incremental Static
         Regeneration for lightning-fast loads. | Layers
      2. Immersive Interactions | Polishing interfaces with elegant, performance-oriented Framer Motion
         and GSAP scroll reveals. | MousePointerClick
      3. API Layer Development | Creating clean REST and type-safe GraphQL schemas for highly
         structured client data integration. | Terminal
      4. Lighthouse Optimization | Tuning image compressions, tag injections, metadata, and Core Web
         Vitals targets. | Zap
  - Tech stack: Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion, GraphQL, PostgreSQL,
    Prisma, Vercel
  - Pipeline:
      1. 01 System Specifications | Defining data schemas, layout blueprints, and page hierarchy
         models.
      2. 02 Frontend Layout Build | Coding pixel-perfect, responsive responsive views matching all
         screen sizes.
      3. 03 API & Data Wiring | Binding secure database channels, payment checkouts, and state logic
         hooks.
      4. 04 SEO & Lighthouse Audit | Running schema generators, metatag configurations, and server
         deployments.

  ### SaaS Product Innovations

  - Tagline: Scalable multi-tenant subscription products engineered for automated growth.
  - CTA label: Partner on SaaS Innovation
  - Capabilities:
      1. Tenant Isolation Security | Isolating workspace data strictly using logical database schemas
         and secure access filters. | Shield
      2. Stripe Subscription Engines | Configuring robust recurring billing pipelines, active coupon
         layers, and client subscription panels. | Zap
      3. Granular Team Access | Setting up secure workspace invitations, role hierarchies, and audit
         logging features. | Lock
      4. Live Dashboard Analytics | Rendering high-performance interactive usage charts and secure
         real-time notification streams. | Activity
  - Tech stack: Next.js, Django, Stripe API, PostgreSQL, Redis, WebSockets, Docker, Chart.js, Tailwind
    CSS
  - Pipeline:
      1. 01 Product Mapping | Defining billing intervals, user team schemas, and database model
         frameworks.
      2. 02 Tenant Core Build | Engineering system databases, authentication keys, and tenancy routers.
      3. 03 Payment Orchestration | Integrating Stripe payment webhooks, checkout portals, and invoice
         systems.
      4. 04 Telemetry & Scaling | Launching telemetry loggers, real-time alert grids, and autoscaling
         metrics.

  If you want, next I can generate this in CSV format matching your Django admin fields (title,
  description, link_label, link_href, accent_color, background_color, tagline, cta_label,
  capabilities_json, tech_stack_json, pipeline_json).
