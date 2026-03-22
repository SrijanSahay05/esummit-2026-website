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
}

export const tlEvents: TimelineEvent[] = [
  {
    name: 'MAKE 48',
    icon: '\u26A1',
    date: 'DAY 1',
    t: 0.04,
    x: 42,
    y: 32,
    desc: 'A high-intensity, 48-hour challenge where participants must build a functional product prototype or business solution from scratch.',
    category: 'CHALLENGE',
    color: '#E74C3C',
    tba: false,
  },
  {
    name: 'MARKET SIMULATOR',
    icon: '\uD83D\uDCC8',
    date: 'DAY 1',
    t: 0.14,
    x: 55,
    y: 38,
    desc: 'A dynamic game where participants make strategic investment and trading decisions in a simulated stock or financial market environment.',
    category: 'GAME',
    color: '#3498DB',
    tba: false,
  },
  {
    name: 'SPEED NETWORKING',
    icon: '\uD83E\uDD1D',
    date: 'DAY 1',
    t: 0.25,
    x: 41,
    y: 45,
    desc: 'High-tempo, structured session designed for students, founders, and VCs to exchange elevator pitches and make maximum professional contacts in minimum time.',
    category: 'NETWORKING',
    color: '#2ECC71',
    tba: false,
  },
  {
    name: 'HACKATHON',
    icon: '\uD83D\uDCBB',
    date: 'DAY 2',
    t: 0.37,
    x: 57,
    y: 50,
    desc: 'An intensive, time-bound innovation sprint where students and developers collaborate in teams to ideate, build, and prototype technology-driven solutions to real-world problem statements.',
    category: 'COMP',
    color: '#9B59B6',
    tba: false,
  },
  {
    name: '??? MYSTERY ???',
    icon: '\uD83D\uDD2E',
    date: 'DAY 2',
    t: 0.48,
    x: 44,
    y: 56,
    desc: 'Something big is coming. Stay tuned for the reveal...',
    category: '???',
    color: '#666',
    tba: true,
  },
  {
    name: '??? MYSTERY ???',
    icon: '\uD83C\uDFAD',
    date: 'DAY 2',
    t: 0.58,
    x: 57,
    y: 63,
    desc: 'This event is still under wraps. Check back soon...',
    category: '???',
    color: '#666',
    tba: true,
  },
  {
    name: '??? MYSTERY ???',
    icon: '\u2694',
    date: 'DAY 3',
    t: 0.7,
    x: 44,
    y: 71,
    desc: 'A secret challenge awaits. Are you ready?',
    category: '???',
    color: '#666',
    tba: true,
  },
  {
    name: '??? MYSTERY ???',
    icon: '\uD83D\uDDDD',
    date: 'DAY 3',
    t: 0.82,
    x: 56,
    y: 80,
    desc: 'Unlock this event when the time comes...',
    category: '???',
    color: '#666',
    tba: true,
  },
  {
    name: '??? MYSTERY ???',
    icon: '\u2753',
    date: 'DAY 3',
    t: 0.95,
    x: 41,
    y: 92,
    desc: 'The final surprise. All will be revealed at E-Summit 2026.',
    category: '???',
    color: '#666',
    tba: true,
  },
];

/** Desktop SVG path for the winding timeline */
export const TL_PATH_DESKTOP =
  'M 499,306 C 500,309 509,317 507,323 C 505,329 484,336 485,344 C 486,352 512,358 511,369 C 510,380 483,398 480,412 C 478,426 488,443 496,454 C 504,465 520,468 530,477 C 540,486 555,494 555,506 C 555,518 540,533 532,548 C 524,563 510,577 509,594 C 508,611 518,631 525,648 C 532,666 551,681 550,699 C 549,717 531,734 520,755 C 509,776 490,798 482,823 C 474,848 472,885 472,906 C 472,928 480,944 482,952';

/** Mobile SVG path — aesthetic centered snake */
export const TL_PATH_MOBILE =
  'M 500,50 C 500,70 620,80 650,120 S 580,180 500,200 S 380,230 350,280 S 420,340 500,370 S 620,400 650,450 S 580,510 500,540 S 380,570 350,620 S 420,680 500,710 S 620,740 650,790 S 580,840 500,870 S 420,910 450,950';
