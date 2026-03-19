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

## Animation Architecture
- GSAP + ScrollTrigger for scroll-driven animations and complex timelines
- anime.js for SVG path animations, pixel assembly effects
- Framer Motion for component-level enter/exit animations
- Three.js only if WebGL effects are needed (keep optional)
- All animations must respect `prefers-reduced-motion`

## Data Layer
- Supabase for dynamic content (events, speakers, sponsors) — future phase
- Static JSON/TypeScript constants for initial development
- Design components to accept data as props so the source can change later

## State Management
- Prefer React Server Components where possible
- Client components only when interactivity is needed
- Minimal client-side state — use URL params and server state
- No global state library unless complexity demands it

## Responsive Strategy
- Mobile-first design — start with smallest viewport, scale up
- Breakpoints: sm (640), md (768), lg (1024), xl (1280), 2xl (1536)
- Scroll animations need mobile variants (lighter, fewer frames)
- Touch-friendly: no hover-only states, adequate tap targets (44px minimum)

## File Organization
- Co-locate components with their pages when page-specific
- Shared components in `src/components/`
- Animation components in `src/components/animations/`
- Custom hooks in `src/hooks/`
- Utilities in `src/lib/`
- Types in relevant files or `src/types/` if shared widely
