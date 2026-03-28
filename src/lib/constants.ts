export const SITE = {
  name: 'E-Summit 2026 | BITS Pilani',
  tagline: 'Where ideas meet execution. Where Founders meet the Future.',
  cta: 'Be there. Build something real.',
  legacy: 'Enabling Innovation Since 2013',
  date: 'April 2026',
  venue: 'BITS Pilani, Pilani Campus',
  organizer: 'PIEDS',
  url: 'https://esummit.bitspilani.ac.in',
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

// Scroll-driven breakpoint fractions
export const BP = {
  TITLE_END: 0,
  CLOCK_START: 0,
  CLOCK_END: 0.20,
  // 0.20→0.85 = video scrub continues
  TIMELINE_START: 0.85,
  TIMELINE_END: 1.0,
} as const;

export const EVENT_DATE = new Date('2026-04-10T09:00:00+05:30');

/** Video time range (seconds) for the "Enter the World" dialog zone */
export const VIDEO_BREAKPOINT_START = 11.00;
export const VIDEO_BREAKPOINT_END = 13.80;


export const NAV_ITEMS = [
  { label: '▶ START', target: 0.0 },
  { label: '🗺 TIMELINE', target: 0.85 },
] as const;
