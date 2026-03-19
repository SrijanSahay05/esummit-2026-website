# Architecture Preferences

## Framework
- Next.js with App Router (not Pages Router)
- Tailwind CSS for styling (utility-first, no CSS modules unless necessary)
- Framer Motion for animations
- TypeScript throughout

## Rendering Strategy
- Static generation (SSG) for content pages that don't change often
- Server-side rendering (SSR) only where dynamic data is needed
- Prefer static where possible for performance

## Component Architecture
- Hybrid site structure: scroll-based landing page + separate detail pages
- Components should be composable and reusable
- Separate presentational components from data-fetching logic
- Keep components focused — one responsibility per component

## State Management
- Prefer React Server Components where possible
- Client components only when interactivity is needed
- Minimal client-side state — use URL params and server state
- No global state library unless complexity demands it

## File Organization
- Co-locate components with their pages when page-specific
- Shared components in `src/components/`
- Utilities in `src/lib/`
- Types in relevant files or `src/types/` if shared widely
