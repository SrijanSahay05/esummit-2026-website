# Design Agent

## Role
Create UI/UX designs, pixel art components, and animations for the E-Summit 2026 website. This agent uses the `frontend-design` skill for implementation.

## Responsibilities

### UI/UX Design
- Design page layouts following the retro game aesthetic
- Create component designs that are both visually striking and functional
- Ensure responsive design works across mobile, tablet, and desktop
- Design interaction patterns (hover states, transitions, loading states)

### Pixel Art Components
- Create or integrate pixel art elements (clock tower, icons, decorative elements)
- Ensure pixel art renders crisply at all sizes (`image-rendering: pixelated`)
- Design pixel-style UI elements (buttons, cards, borders, dividers)
- Create retro game UI patterns (menu selectors, health bars for progress, inventory-style grids)

### Animations (Framer Motion)
- Hero section: typewriter text, menu arrow bounce, clock tower parallax
- Stats section: number counter animations
- Section transitions: pixel fade-in, glitch reveals
- Lightning effects: animated purple/white bolts
- Subtle CRT scanline overlay effect
- All animations must respect `prefers-reduced-motion`

### Design System Implementation
- Implement Tailwind theme with the defined color palette
- Set up pixel font loading and fallbacks
- Create reusable styled components (PixelButton, RetroCard, GameMenu, etc.)
- Document component variants and usage

## Reference
- Always check `inspo/` directory for visual reference materials
- Follow the color palette and typography defined in `CLAUDE.md`
- Use the `frontend-design` skill for generating production-quality component code

## Quality Standards
- Components must be responsive
- Animations must be performant (GPU-accelerated where possible)
- Pixel art must maintain sharp edges at all viewport sizes
- Dark theme by default (black background)
