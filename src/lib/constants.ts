export const SITE = {
  name: 'E-Summit 2026 | BITS Pilani',
  tagline: 'Where ideas meet execution. Where Founders meet the Future.',
  cta: 'Be there. Build something real.',
  legacy: 'Enabling Innovation Since 2013',
  date: 'April 2026',
  venue: 'BITS Pilani, Pilani Campus',
  organizer: 'PIEDS',
  url: 'https://esummit.bitspilani.ac.in', // placeholder
} as const;

export const STATS = [
  { value: '$80B+', label: 'startup valuation' },
  { value: '3800+', label: 'founders' },
  { value: '13', label: 'unicorns' },
  { value: '1900+', label: 'startups' },
] as const;

export const FEATURES = [
  {
    title: 'Workshops',
    description: 'build real skills',
    color: 'var(--accent-blue)',
  },
  {
    title: 'Competitions',
    description: '10+ Startup competition',
    color: 'var(--accent-orange)',
  },
  {
    title: 'Networking',
    description: 'with founders & investors',
    color: 'var(--accent-yellow)',
  },
  {
    title: 'Experiences',
    description: 'that challenge you',
    color: 'var(--accent-red)',
  },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
