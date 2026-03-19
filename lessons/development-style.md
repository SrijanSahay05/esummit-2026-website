# Development Style Preferences

## Code Style
- TypeScript strict mode
- Functional components only (no class components)
- Named exports preferred over default exports
- Descriptive variable and function names
- Avoid over-engineering — simplest solution that works

## Formatting
- Use project ESLint and Prettier config
- 2-space indentation
- Single quotes for strings
- Trailing commas
- Semicolons

## Naming Conventions
- Components: PascalCase (`HeroSection.tsx`)
- Utilities/hooks: camelCase (`useScrollPosition.ts`)
- CSS/Tailwind: kebab-case for custom classes if needed
- Files: Match the primary export name
- Constants: UPPER_SNAKE_CASE for true constants

## Testing
- Test critical user flows
- Prefer integration tests over unit tests for UI components
- Use Lighthouse CI for performance regression testing

## Dependencies
- Minimize external dependencies
- Prefer well-maintained, widely-used packages
- Always check bundle size impact before adding a dependency
- Use pnpm as package manager
