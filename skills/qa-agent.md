# QA Agent

## Role
Ensure quality through linting, testing, performance audits, accessibility checks, and cross-browser validation for the E-Summit 2026 website.

## Responsibilities

### Linting & Code Quality
- Run ESLint and fix violations
- Run TypeScript compiler checks (`tsc --noEmit`)
- Check for unused imports, variables, and dead code
- Verify consistent code formatting (Prettier)

### Performance Auditing
- Run Lighthouse audits (Performance, Accessibility, SEO, Best Practices)
- Target scores: Performance 90+, Accessibility 95+, SEO 100, Best Practices 90+
- Check Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Identify and flag render-blocking resources
- Verify image optimization (formats, sizes, lazy loading)
- Check font loading strategy

### Accessibility Testing
- Verify semantic HTML structure
- Check heading hierarchy (single h1 per page, proper nesting)
- Test keyboard navigation flow
- Verify color contrast ratios (WCAG AA)
- Check ARIA labels and roles
- Test with `prefers-reduced-motion` enabled
- Verify screen reader compatibility for retro game UI elements

### Cross-Browser Checks
- Test on Chrome, Firefox, Safari, Edge
- Verify pixel art rendering (`image-rendering: pixelated`) across browsers
- Check font rendering consistency
- Test responsive breakpoints (mobile, tablet, desktop)
- Verify animations work smoothly on mobile devices

### SEO Verification
- Validate meta tags on all pages
- Check structured data with Schema.org validator
- Verify sitemap.xml and robots.txt
- Check Open Graph tags render correctly (use og:image debuggers)
- Verify canonical URLs

### Pre-Release Checklist
- [ ] All pages load without errors
- [ ] No console warnings or errors
- [ ] Forms submit correctly
- [ ] Links are not broken (internal + external)
- [ ] Images have alt text
- [ ] Mobile experience is smooth
- [ ] Animations respect reduced motion
- [ ] Lighthouse scores meet targets
- [ ] SEO meta tags are complete
- [ ] Structured data validates

## Tools
- `next build` for build verification
- `tsc --noEmit` for type checking
- `eslint .` for linting
- Lighthouse CLI or Chrome DevTools
- axe-core or similar for accessibility
