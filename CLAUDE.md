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

### Animation Guidelines
- Use Framer Motion for all animations
- Typewriter effects for text reveals
- Pixel-by-pixel fade-ins for images
- Glitch/flicker effects (subtle, not distracting)
- Parallax scrolling on the clock tower
- Menu selection animations (arrow bounce, highlight glow)
- Lightning strike animations on scroll triggers
- Keep animations performant — prefer `transform` and `opacity`

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Rendering**: SSR/SSG hybrid (static where possible, SSR for dynamic content)
- **Deployment**: Vercel (assumed)
- **Package Manager**: pnpm

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
├── inspo/                    # Design inspiration assets (SVGs, PDFs)
├── lessons/                  # User preference ledger
│   ├── README.md
│   ├── architecture.md
│   ├── development-style.md
│   └── misc.md
├── skills/                   # Agent skill definitions
│   ├── research-agent.md
│   ├── design-agent.md
│   ├── development-agent.md
│   ├── writing-agent.md
│   └── qa-agent.md
├── src/                      # Next.js source (to be created)
│   ├── app/                  # App Router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities
│   └── styles/               # Global styles
├── public/                   # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Quick Reference

- **Inspo files**: Check `inspo/` for SVGs and PDFs with visual references
- **Lessons**: Check `lessons/` for user preferences on architecture and code style
- **Skills**: Check `skills/` for agent-specific instructions
- **Font**: Pixel font for headings, clean sans-serif for body
- **Colors**: Black bg, blue/orange/yellow accents, white text
- **Vibe**: Retro arcade game meets professional startup event
