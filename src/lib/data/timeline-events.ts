export interface TimelineEvent {
  name: string;
  icon: string;
  date: string;
  t: number;
  x: number;
  y: number;
  desc: string;
  category: string;
  color: string;
  tba: boolean;
  prize?: string;
}

export const tlEvents: TimelineEvent[] = [
  {
    name: 'SOLVE FOR PILANI',
    icon: '\u{1F9E9}',
    date: 'DAY 1',
    t: 0.04,
    x: 42,
    y: 32,
    desc: 'Solve for Pilani is a live market challenge built around real local businesses in Pilani. Selected teams will partner with local shops, take charge of their stalls during E-Summit x APOGEE, interact with real customers, and drive actual sales \u2014 with real money on the line.',
    category: 'CHALLENGE',
    color: '#E74C3C',
    tba: false,
    prize: '\u20B940,000',
  },
  {
    name: 'DROPSHIPPING',
    icon: '\u{1F4E6}',
    date: 'DAY 1',
    t: 0.14,
    x: 55,
    y: 38,
    desc: 'A business simulation challenge where participants build and pitch a dropshipping venture, testing their e-commerce, marketing, and supply chain skills.',
    category: 'CHALLENGE',
    color: '#3498DB',
    tba: false,
    prize: '\u20B940,000',
  },
  {
    name: 'STARTUP EXPO',
    icon: '\u{1F3AA}',
    date: 'DAY 1',
    t: 0.25,
    x: 41,
    y: 45,
    desc: 'A showcase platform where early-stage startups display their products/services to investors, mentors, secret judges, and peers in an exhibition-style format.',
    category: 'SHOWCASE',
    color: '#F39C12',
    tba: false,
  },
  {
    name: 'SPEED NETWORKING',
    icon: '\u{1F91D}',
    date: 'DAY 1',
    t: 0.37,
    x: 57,
    y: 50,
    desc: 'A fast-paced, structured networking session connecting entrepreneurs, students, investors, and professionals through quick one-on-one interactions.',
    category: 'NETWORKING',
    color: '#2ECC71',
    tba: false,
  },
  {
    name: 'INVENTION ENGINE',
    icon: '\u{1F4A1}',
    date: 'DAY 2',
    t: 0.48,
    x: 44,
    y: 56,
    desc: 'A high-stakes demo day where inventors and innovators present their breakthrough ideas or products to a panel of investors and experts.',
    category: 'DEMO DAY',
    color: '#E67E22',
    tba: false,
    prize: '\u20B92,00,000',
  },
  {
    name: '23 VENTURES HACKATHON',
    icon: '\u{1F4BB}',
    date: 'DAY 2',
    t: 0.58,
    x: 57,
    y: 63,
    desc: 'An intensive build-a-thon where teams compete to develop working prototypes or business solutions within a tight timeframe.',
    category: 'COMP',
    color: '#9B59B6',
    tba: false,
    prize: '\u20B930,000',
  },
  {
    name: 'NODEVBUILD IDEATHON',
    icon: '\u{1F680}',
    date: 'DAY 2',
    t: 0.7,
    x: 44,
    y: 71,
    desc: 'A no-code/low-code ideathon where participants build MVPs without traditional development, with the prize being in-kind support to build the product.',
    category: 'IDEATHON',
    color: '#1ABC9C',
    tba: false,
    prize: '\u20B910,00,000',
  },
  {
    name: 'MIXER MEET',
    icon: '\u{1F4AC}',
    date: 'DAY 3',
    t: 0.85,
    x: 50,
    y: 82,
    desc: 'An introspective mentorship-style event where participants engage in guided conversations with experienced founders and industry leaders.',
    category: 'MENTORSHIP',
    color: '#E056A0',
    tba: false,
  },
];

/** Desktop SVG path for the winding timeline */
export const TL_PATH_DESKTOP =
  'M 499,306 C 500,309 509,317 507,323 C 505,329 484,336 485,344 C 486,352 512,358 511,369 C 510,380 483,398 480,412 C 478,426 488,443 496,454 C 504,465 520,468 530,477 C 540,486 555,494 555,506 C 555,518 540,533 532,548 C 524,563 510,577 509,594 C 508,611 518,631 525,648 C 532,666 551,681 550,699 C 549,717 531,734 520,755 C 509,776 490,798 482,823 C 474,848 472,885 472,906 C 472,928 480,944 482,952';

/** Mobile SVG path — aesthetic centered snake */
export const TL_PATH_MOBILE =
  'M 500,50 C 500,70 620,80 650,120 S 580,180 500,200 S 380,230 350,280 S 420,340 500,370 S 620,400 650,450 S 580,510 500,540 S 380,570 350,620 S 420,680 500,710 S 620,740 650,790 S 580,840 500,870 S 420,910 450,950';
