# Miscellaneous Preferences

## Communication
- Be concise — skip unnecessary explanations
- Show, don't tell — prefer code examples over long descriptions
- When in doubt, ask rather than assume

## Git Workflow
- Small, focused commits
- Meaningful commit messages (conventional commits format)
- Feature branches for all work
- No force-pushing to shared branches
- Do not include AI co-author lines in commit messages

## Asset Handling
- Optimize all images before committing (WebP/AVIF preferred)
- SVGs for icons and simple graphics
- Pixel art assets should maintain crisp edges (no anti-aliasing, use `image-rendering: pixelated`)
- Lazy load images below the fold

## Accessibility
- Semantic HTML always
- Proper ARIA labels where needed
- Keyboard navigable
- Color contrast meeting WCAG AA minimum
- Reduced motion support (`prefers-reduced-motion` media query)
