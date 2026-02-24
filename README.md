# Next.js IT Portfolio — Everacy

## Overview

A production-grade, SEO-friendly portfolio website built with the Next.js App Router.

## Tech Stack

- **Next.js 15** — App Router, Server Components by default
- **TypeScript** — Strict mode
- **Tailwind CSS** — CSS variables + ShadCN design tokens
- **ShadCN UI** — Headless, accessible component library
- **React Three Fiber / Three.js** — 3D graphics (lazy-loaded, no SSR)
- **Framer Motion** — Animation library
- **Zustand** — Lightweight global state management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run type-check

# Production build
npm run build
```

## Folder Structure

```
src/
├── app/
│   ├── (marketing)/          # Route group — no URL segment
│   │   ├── page.tsx          # /
│   │   ├── about/page.tsx    # /about
│   │   ├── services/page.tsx # /services
│   │   ├── projects/page.tsx # /projects
│   │   └── contact/page.tsx  # /contact
│   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   ├── globals.css           # Tailwind + design tokens
│   ├── sitemap.ts            # Auto-generated /sitemap.xml
│   └── robots.ts             # Auto-generated /robots.txt
├── components/
│   ├── ui/                   # ShadCN components
│   ├── common/               # Navbar, Footer, Container, Providers
│   ├── sections/             # Page sections (Hero, etc.)
│   ├── three/                # Three.js canvas (always lazy-loaded, no SSR)
│   └── animations/           # Framer Motion wrappers
├── lib/
│   ├── utils.ts              # cn(), helpers
│   ├── constants.ts          # Static config & data
│   └── seo.ts                # Metadata helpers + JSON-LD
├── hooks/                    # Custom React hooks
├── store/                    # Zustand stores
├── styles/                   # Additional modular styles
└── types/                    # Global TypeScript interfaces
```

## Adding ShadCN Components

Run the ShadCN CLI to install any component:

```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add badge
```

## Adding 3D Scenes

1. Create your scene in `src/components/three/`
2. Import it **only** inside `ThreeCanvas.tsx`
3. Always import `ThreeCanvas` with `dynamic(..., { ssr: false })`

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL used for SEO/sitemap |
