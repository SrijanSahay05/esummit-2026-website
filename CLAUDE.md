# E-Summit 2026 Website — BITS Pilani

## Project Overview

**Event**: Apogee X E-Summit 2026
**Organizer**: PIEDS (Pilani Innovation & Entrepreneurship Development Society)
**Date**: April 2026
**Venue**: BITS Pilani Campus, Rajasthan, India
**Tagline**: "Where ideas meet execution. Where Founders meet the Future."
**Secondary CTA**: "Be there. Build something real."
**Legacy**: "Enabling Innovation Since 2013"

### Key Stats (from brochure)
- $80B+ startup valuation from BITS alumni
- 3800+ founders
- 13 unicorns
- 1900+ startups

### Event Features
- Workshops — build real skills
- 10+ Startup Competitions
- Networking — with founders & investors
- Experiences — that challenge you

### Target Audience
1. **College students** — participants from BITS and other campuses (primary)
2. **Sponsors & partners** — corporates, VCs, startup ecosystem players (secondary)

### Website Goals
- Drive registrations and ticket sales
- Showcase event scale and credibility (stats, past speakers, alumni success)
- Attract sponsors with professional presentation
- SEO-optimized for organic traction

---

## Design System

### Theme: Pixelated Retro Games (8-bit/16-bit)
The visual identity draws from classic arcade and console games. The landing page mimics a game start screen with `► START` / `CONTINUE` menu options. The BITS Pilani clock tower is rendered as pixel art and is a recurring visual element.

### Color Palette
| Token            | Hex       | Usage                                      |
|------------------|-----------|---------------------------------------------|
| `--bg-primary`   | `#000000` | Page backgrounds                            |
| `--bg-overlay`   | `#000000` at 50% opacity | Overlay cards, modals      |
| `--text-primary` | `#FFFFFF` | Body text, menu items                       |
| `--accent-blue`  | `#1A5BC4` | Logo "E-SUMMIT" text, headings              |
| `--accent-blue-light` | `#4A90D9` | Blue highlights, hover states         |
| `--accent-orange`| `#E87A20` | Logo "2026", accent highlights              |
| `--accent-yellow`| `#F5C842` | Clock tower highlights, stat numbers        |
| `--accent-red`   | `#C43030` | Logo diamond shapes, alerts                 |
| `--text-muted`   | `#A0A0A0` | Footer text, secondary info                 |
| `--pixel-purple` | `#6B3FA0` | Lightning effects, decorative accents       |

### Typography
- **Headings / UI**: Pixel/bitmap font (e.g., Press Start 2P, Silkscreen, or similar pixel font from Google Fonts)
- **Body text**: Clean sans-serif for readability (e.g., Inter, Space Grotesk)
- **Stats/numbers**: Pixel font, large and bold
- All text should feel like it belongs in a retro game UI

### Visual Elements
- Pixel art BITS Pilani clock tower (right side, recurring across screens)
- Lightning bolt effects (purple/white, animated)
- Retro game menu UI (arrow selector `►`, START/CONTINUE)
- PIEDS logo (top-left) and BITS Pilani crest (top-right)
- Grid/scanline overlays for retro CRT feel (subtle)
- Diamond/geometric shapes behind logo (red, orange, blue layers)

### Animation Architecture

#### Act 1: Logo Reveal (viewport-locked, before scroll)
1. Black screen → E-Summit 2026 logo materializes pixel-by-pixel (anime.js SVG path animation)
2. Diamond shapes assemble behind logo (staggered, retro power-up feel)
3. Tagline types in: "Where ideas meet execution. Where Founders meet the Future."
4. Retro game menu fades in: `► START` / `CONTINUE`
5. Clicking START or scrolling triggers transition to Act 2

#### Act 2: Clock Tower Zoom-Out (scroll-driven, GSAP ScrollTrigger)
- Camera starts **tight on the clock face** of the pixel art clock tower
- As user scrolls, camera smoothly **zooms out / pans back**:
  1. Clock face close-up → Full clock tower
  2. Full clock tower → Surrounding campus buildings
  3. Campus buildings → Wide panorama with content sections
- **Implementation**: Pre-rendered frame sequence encoded as WebM, played frame-by-frame synced to scroll position
- Content sections (stats, features, events) overlay as specific campus areas are revealed
- Mobile: Vertical pan variant with optimized frame sequence

#### Asset Requirements for Act 2
The pixel art zoom-out sequence needs to be provided as:
- 60-120 PNG frames (1920x1080) showing the progressive zoom-out
- OR a high-quality MP4/MOV animation that will be converted to WebM + frame extraction
- Mobile variant at 1080x1920 (portrait) or simplified version

#### General Animation Rules
- GSAP for scroll-driven and complex timeline animations
- anime.js for SVG path animations and pixel assembly effects
- Framer Motion for component enter/exit and layout animations
- Typewriter effects for text reveals
- Glitch/flicker effects (subtle, not distracting)
- Lightning strike animations on scroll triggers
- All animations MUST respect `prefers-reduced-motion`
- Keep animations performant — prefer `transform` and `opacity`, use `will-change` sparingly
- Mobile: Reduce frame count, simplify particle effects, skip non-essential animations

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**:
  - **GSAP + ScrollTrigger**: Scroll-driven animations, timeline sequencing, scroll-synced video playback
  - **anime.js**: SVG path animations, pixel assembly effects, logo reveal
  - **Three.js** (optional): If 3D pixel effects or WebGL shaders are needed for the campus reveal
  - **Framer Motion**: Component-level enter/exit animations, layout transitions
- **Rendering**: SSR/SSG hybrid (static where possible, SSR for dynamic content)
- **Data Layer**: Supabase (future phase — for dynamic content like events, speakers, sponsors)
- **Deployment**: Vercel (assumed)
- **Package Manager**: pnpm

### Responsive-First Design
The majority of the audience will be on mobile devices. Every feature must be designed mobile-first:
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Touch-friendly interactions (no hover-only states)
- Scroll animations must be performant on mobile (use `will-change`, GPU compositing)
- Video frame sequences need mobile-optimized versions (lower resolution, fewer frames)
- Test on real devices, not just browser resize

---

## Site Structure

### Hybrid Architecture
Main landing page with scroll-based sections + separate detail pages.

#### Landing Page Sections (scroll-based)
1. Hero — Game start screen (logo, tagline, START/CONTINUE, clock tower)
2. Stats — $80B+, 3800+ founders, 13 unicorns, 1900+ startups
3. Features — Workshops, Competitions, Networking, Experiences
4. Timeline — Event schedule overview
5. Speakers/Guests — Past and confirmed speakers
6. Sponsors — Sponsor logos and tiers
7. FAQ — Expandable questions
8. Footer — Links, social media, copyright

#### Separate Pages
- `/events` — Full event listings with details
- `/sponsors` — Sponsor information and partnership tiers
- `/register` — Registration/ticket purchase
- `/about` — About PIEDS, E-Summit history
- `/contact` — Contact form

---

## SEO Requirements

### Technical SEO
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- Proper heading hierarchy (single `<h1>` per page)
- Meta title and description on every page
- Open Graph and Twitter Card meta tags
- Canonical URLs
- XML sitemap generation (via next-sitemap or similar)
- robots.txt
- Structured data (JSON-LD) for Event schema

### Performance Targets
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- LCP < 2.5s, FID < 100ms, CLS < 0.1
- Images: WebP/AVIF with proper `alt` text, lazy loading below fold
- Font loading: `font-display: swap`, preload critical fonts

### Content SEO
- Target keywords: "E-Summit BITS Pilani 2026", "startup summit India", "college entrepreneurship event"
- Alt text on all images (descriptive, keyword-aware)
- Internal linking between pages
- Mobile-first responsive design

---

## Sub-Agent Workflow

This project uses specialized agents for different aspects of development. Each agent has its own skill file in `skills/`.

### Agents
| Agent | Skill File | Responsibility |
|-------|-----------|----------------|
| Research | `skills/research-agent.md` | Competitive analysis, SEO research, accessibility standards |
| Design | `skills/design-agent.md` | UI/UX, pixel art components, animations (uses `frontend-design` skill) |
| Development | `skills/development-agent.md` | Core implementation, framework setup, component architecture |
| Writing | `skills/writing-agent.md` | Copy, meta descriptions, alt text, SEO content |
| QA | `skills/qa-agent.md` | Linting, testing, Lighthouse audits, cross-browser checks |

### Workflow Rules
1. **Plan before implementing**: For any major feature or change, create a plan and get alignment before writing code
2. **Phase-based commits**: Group related changes into logical commits per phase
3. **Branch-based development**: All work happens on feature branches, merged via PRs to `main`
4. **Agent handoffs**: Agents should leave clear context for the next agent (comments, TODO markers, documentation)

---

## Git Conventions

### Branch Naming
- `feature/<name>` — New features (e.g., `feature/hero-section`)
- `fix/<name>` — Bug fixes (e.g., `fix/mobile-nav-overflow`)
- `design/<name>` — Design/styling changes (e.g., `design/pixel-font-integration`)
- `chore/<name>` — Tooling, config, infrastructure (e.g., `chore/eslint-setup`)
- `content/<name>` — Copy/content changes (e.g., `content/speaker-bios`)

### Commit Messages
- Use conventional commits: `type: description`
- Types: `feat`, `fix`, `design`, `chore`, `content`, `docs`, `test`, `perf`
- Keep subject line under 72 characters
- Use imperative mood ("add hero section" not "added hero section")
- Do NOT include AI co-author mentions in commits

### PR Guidelines
- PRs should target `main`
- Include a summary of changes and screenshots for visual changes
- Run linting and tests before creating PR

---

## Directory Structure

```
esummit-website/
├── CLAUDE.md                 # This file
├── inspo/                    # Design inspiration assets (gitignored, local only)
├── lessons/                  # User preference ledger
├── skills/                   # Agent skill definitions
├── src/
│   ├── app/                  # App Router pages & layouts
│   │   ├── layout.tsx        # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx          # Landing page (scroll sections)
│   │   ├── events/
│   │   ├── sponsors/
│   │   ├── register/
│   │   ├── about/
│   │   └── contact/
│   ├── components/
│   │   ├── ui/               # Reusable primitives (PixelButton, RetroCard, etc.)
│   │   ├── sections/         # Landing page scroll sections
│   │   ├── animations/       # Animation wrappers (ScrollSequence, PixelReveal, etc.)
│   │   └── layout/           # Header, Footer, Navigation
│   ├── hooks/                # Custom React hooks (useScrollProgress, useMediaQuery, etc.)
│   ├── lib/                  # Utilities, constants, helpers
│   │   ├── constants.ts      # Site-wide constants, color tokens
│   │   ├── fonts.ts          # Font loading config
│   │   ├── metadata.ts       # SEO metadata helpers
│   │   └── supabase.ts       # Supabase client (future)
│   ├── styles/
│   │   └── globals.css       # Tailwind directives, custom properties, base styles
│   └── types/                # Shared TypeScript types
├── public/
│   ├── fonts/                # Self-hosted pixel fonts
│   ├── images/               # Optimized static images
│   └── videos/               # WebM frame sequences for scroll animations
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── eslint.config.mjs
```

---

## Phased Development Plan

### Phase 1: Project Foundation ✅
- Next.js 15 + TypeScript + Tailwind CSS v4 setup
- ESLint + Prettier configuration
- Font loading (pixel font + body font)
- Global styles, CSS custom properties (color palette)
- Base layout (root layout, responsive container)
- Directory structure scaffolding

### Phase 2: Hero & Logo Animation
- E-Summit logo pixel reveal animation (anime.js)
- Retro game menu (START/CONTINUE) with keyboard + click interaction
- CRT scanline overlay effect
- Black screen → logo → menu flow
- Responsive: works on all viewport sizes
- `prefers-reduced-motion` fallback

### Phase 3: Scroll-Driven Campus Reveal
- Scroll-synced video/frame sequence player (GSAP ScrollTrigger)
- Clock tower zoom-out animation integration (once assets provided)
- Placeholder/dev mode with CSS-based zoom for development
- Section pinning and content reveal triggers
- Mobile-optimized variant

### Phase 4: Content Sections
- Stats counter section (animated numbers)
- Features section (Workshops, Competitions, Networking, Experiences)
- Timeline / schedule section
- Speakers/guests section
- Sponsors section with tier layout
- FAQ accordion
- Footer

### Phase 5: Subpages & Navigation
- Navigation component (retro game menu style)
- `/events` — event listings
- `/sponsors` — sponsor details and tiers
- `/register` — registration flow
- `/about` — PIEDS history, E-Summit legacy
- `/contact` — contact form

### Phase 6: Data Layer (Supabase)
- Supabase project setup and client integration
- Events data model and queries
- Speakers data model and queries
- Sponsors data model and queries
- Admin-friendly data updates

### Phase 7: SEO & Performance
- Meta tags, Open Graph, Twitter Cards on all pages
- JSON-LD structured data (Event, Organization)
- Sitemap + robots.txt
- Image optimization audit
- Lighthouse score optimization
- Core Web Vitals tuning

### Phase 8: Polish & Launch
- Cross-browser testing
- Mobile device testing
- Animation performance profiling
- Accessibility audit (WCAG AA)
- Final content review
- Production deployment

---

## Quick Reference

- **Inspo files**: Check `inspo/` for SVGs and PDFs with visual references
- **Lessons**: Check `lessons/` for user preferences on architecture and code style
- **Skills**: Check `skills/` for agent-specific instructions
- **Font**: Pixel font for headings, clean sans-serif for body
- **Colors**: Black bg, blue/orange/yellow accents, white text
- **Vibe**: Retro arcade game meets professional startup event
