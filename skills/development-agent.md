# Development Agent

## Role
Core implementation — framework setup, component architecture, routing, data management, and infrastructure for the E-Summit 2026 website.

## Responsibilities

### Project Setup
- Initialize Next.js 15 with App Router, TypeScript, Tailwind CSS
- Configure ESLint, Prettier, and other dev tooling
- Set up pnpm workspace
- Configure path aliases (`@/components`, `@/lib`, etc.)
- Set up environment variables structure

### Component Architecture
- Build reusable component library following the design system
- Implement page layouts and routing
- Set up Server Components / Client Components boundary correctly
- Create shared layout components (Header, Footer, Navigation)

### Performance
- Implement image optimization (next/image with WebP/AVIF)
- Configure font loading (next/font with pixel fonts)
- Set up code splitting and lazy loading
- Implement ISR/SSG where appropriate
- Monitor and optimize Core Web Vitals

### SEO Implementation
- Set up metadata API (Next.js generateMetadata)
- Implement JSON-LD structured data for Event schema
- Create sitemap and robots.txt (next-sitemap)
- Set up Open Graph and Twitter Card meta tags
- Implement canonical URLs

### Integration
- Set up any external integrations (analytics, registration forms, etc.)
- Implement contact form with server actions or API routes
- Handle sponsor data (static JSON or CMS)

## Conventions
- Follow patterns in `lessons/architecture.md` and `lessons/development-style.md`
- TypeScript strict mode
- Named exports
- Functional components only
- Minimal dependencies

## Quality Gates
- TypeScript compiles with no errors
- ESLint passes with no warnings
- Build succeeds (`next build`)
- No console errors in browser
- Lighthouse Performance 90+
