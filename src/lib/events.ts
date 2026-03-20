import type { Event } from '@/types/event'

export const EVENTS: Event[] = [
  {
    slug: 'dropshipping-challenge',
    level: '— LEVEL 01 —',
    title: 'DROP-SHIPPING CHALLENGE',
    titleLines: ['DROP-', 'SHIPPING'],
    titleSub: 'CHALLENGE',
    taglineLines: [
      'SELL SMART.\u00a0\u00a0MARKET HARD.',
      'OUTRUN THE COMPETITION.',
    ],
    tagline: 'Build. Sell. Scale. In 48 hours.',
    accentColor: '#FFD700',
    marqueeText:
      '✦ PIEDS × E-SUMMIT \u201926 PRESENTS ✦ BITS PILANI CAMPUS ✦ APRIL 11–14, 2026 ✦',
    hudStats: [
      { label: '1UP', value: 'PIEDS', colorVariant: 'gold' },
      { label: 'HI-SCORE', value: '₹20,000', colorVariant: 'cyan' },
      { label: 'REG CLOSES', value: 'MAR 31', colorVariant: 'red' },
      { label: 'ENTRY', value: 'FREE', colorVariant: 'gold' },
    ],
    mazeGhosts: [
      { name: 'RISK', color: '#FF2222' },
      { name: 'DOUBT', color: '#FFB840' },
      { name: 'RIVALS', color: '#00CCFF' },
      { name: 'FEAR', color: '#FF66BB' },
    ],
    stats: [
      { value: 'APR\n11–14', label: 'EVENT DAYS', color: 'gold', icon: '🗓' },
      { value: '₹20K\nPRIZE', label: 'PRIZE POOL', color: 'green', icon: '🏆' },
      { value: 'ALL\nBITS', label: 'CAMPUSES', color: 'cyan', icon: '🎓' },
      { value: 'FREE\nENTRY', label: 'NO COST', color: 'red', icon: '🪙' },
    ],
    timeline: [
      { step: '▶', label: 'REGISTRATION OPEN', date: 'MAR 23 – MAR 31 · UNSTOP', active: true },
      { step: 2, label: 'TEAM SHORTLIST', date: 'APR 1 – APR 2' },
      { step: 3, label: 'PRODUCT AUCTION', date: 'APR 3 – APR 4' },
      { step: 4, label: 'BUILD & PREP WEEK', date: 'APR 5 – APR 10' },
      { step: '★', label: 'E-SUMMIT: SELL!', date: 'APR 11 – APR 14' },
    ],
    scoringCriteria: [
      { label: 'GROSS REVENUE', weight: 35, color: '#00FF88' },
      { label: 'PROFIT MARGIN', weight: 25, color: '#00FFCC' },
      { label: 'MARKETING', weight: 20, color: '#FFD700' },
      { label: 'CUSTOMER EXP.', weight: 10, color: '#FF9900' },
      { label: 'FINAL PITCH', weight: 10, color: '#FF4444' },
    ],
    itemList: {
      heading: 'SELL THESE',
      items: [
        'LED STRIP LIGHTS · FAIRY LIGHTS',
        'WALL TAPESTRIES · POSTERS',
        'DESK ORGANISERS · STATIONERY',
        'SCENTED CANDLES · DIFFUSERS',
        'PHOTO FRAMES · POLAROID SETS',
        'CUSTOM KEYCHAINS · BADGES',
      ],
    },
    registerUrl: 'https://unstop.com',
    registerDeadline: 'MARCH 31',
    registerPlatformUrl: 'unstop.com / pieds-esummit26',
    registerPlatformHint: 'SEARCH "DROPSHIPPING CHALLENGE" ON UNSTOP',
    description:
      'Build, launch, and sell a product at E-Summit 2026. The Drop-Shipping Challenge tests your ability to source a product, market it, and generate real revenue at BITS Pilani.',
    category: 'competition',
  },
]

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find(e => e.slug === slug)
}

export function getAllEventSlugs(): string[] {
  return EVENTS.map(e => e.slug)
}
