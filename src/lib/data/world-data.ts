export const WORLD_PHRASES = [
  'LEVEL UP YOUR ENTREPRENEURIAL GAME',
  'WHERE STARTUPS BEGIN THEIR QUEST',
  'APRIL 2026 \u00B7 BITS PILANI',
  'THE ULTIMATE STARTUP ARENA',
  'PRESS START TO BEGIN YOUR JOURNEY',
] as const;

export const WORLD_STATS = [
  { target: 50, label: '+ EVENTS' },
  { target: 5000, label: '+ ATTENDEES' },
  { target: 100, label: '+ SPEAKERS' },
] as const;

export const WORLD_ABOUT_CARDS = [
  {
    icon: '\u{1F3F0}',
    title: 'THE QUEST',
    description: 'E-Summit 2026 is the flagship entrepreneurial extravaganza hosted at BITS Pilani in April 2026. This summit serves as the premier nexus for students, founders, and investors.',
    hpPercent: 100,
  },
  {
    icon: '\u2694\uFE0F',
    title: 'THE MISSION',
    description: 'Offering a comprehensive array of workshops, high-stakes competitions, and interactive events designed to cultivate, challenge, and propel entrepreneurial aspirations into tangible reality.',
    hpPercent: 85,
  },
  {
    icon: '\u{1F3C6}',
    title: 'THE REWARD',
    description: "Connect with industry leaders, pitch your ideas, and transform your entrepreneurial dreams into actionable ventures at India's premier student-run entrepreneurship summit.",
    hpPercent: 70,
  },
] as const;

export const WORLD_EVENTS = [
  {
    icon: '\u{1F4E6}',
    name: 'DROPSHIPPING',
    type: 'STRATEGY QUEST',
    description: 'Master the art of e-commerce! Build your dropshipping empire from scratch and compete to generate the highest revenue.',
    duration: '48 HRS',
    team: 'TEAM',
    difficulty: 3,
    barPercent: 60,
    legendary: false,
  },
  {
    icon: '\u{1F9E9}',
    name: 'SOLVE FOR PILANI',
    type: 'PUZZLE QUEST',
    description: 'Tackle real-world challenges faced by the Pilani community. Design innovative solutions and present to a panel of judges.',
    duration: '24 HRS',
    team: 'TEAM',
    difficulty: 4,
    barPercent: 80,
    legendary: false,
  },
  {
    icon: '\u{1F680}',
    name: 'STUDENTPRENEUR',
    type: 'BOSS BATTLE',
    description: 'The ultimate entrepreneurship showdown! Pitch your startup idea to real investors and industry veterans for funding.',
    duration: '3 DAYS',
    team: 'SOLO/TEAM',
    difficulty: 5,
    barPercent: 100,
    legendary: true,
  },
  {
    icon: '\u{1F3AA}',
    name: 'STARTUP EXPO',
    type: 'EXPLORATION ZONE',
    description: 'Discover groundbreaking startups, network with founders, and explore the latest innovations in the startup ecosystem.',
    duration: '1 DAY',
    team: 'OPEN',
    difficulty: 2,
    barPercent: 35,
    legendary: false,
  },
] as const;

export const WORLD_PIEDS_FEATURES = [
  { icon: '\u{1F4B0}', label: 'FUNDING' },
  { icon: '\u{1F9ED}', label: 'MENTORSHIP' },
  { icon: '\u{1F52C}', label: 'ADVANCED LABS' },
  { icon: '\u{1F3E2}', label: 'WORKSPACE' },
] as const;

export const WORLD_NAV_ITEMS = [
  { href: '#home', icon: '\u{1F3E0}', label: 'HOME' },
  { href: '#about', icon: '\u{1F4D6}', label: 'ABOUT' },
  { href: '#events', icon: '\u{1F3AE}', label: 'EVENTS' },
  { href: '#pieds', icon: '\u{1F3D7}\uFE0F', label: 'PIEDS' },
  { href: '#contact', icon: '\u{1F4EC}', label: 'CONTACT' },
] as const;

export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
] as const;

export const STAR_LAYERS = [
  { id: 'starsDeep', count: 200, sizeRange: [1, 1] as const, colorChance: 0, speed: 0.1 },
  { id: 'starsMid', count: 120, sizeRange: [1, 2] as const, colorChance: 0.05, speed: 0.3 },
  { id: 'starsNear', count: 60, sizeRange: [2, 3] as const, colorChance: 0.1, speed: 0.6 },
  { id: 'starsColored', count: 25, sizeRange: [2, 4] as const, colorChance: 1, speed: 0.4 },
] as const;

export const SPRITE_TYPES = [
  { char: '\u{1F47E}', type: 'invader', count: 6 },
  { char: '\u{1F680}', type: 'rocket', count: 3 },
  { char: '\u2604', type: 'asteroid', count: 4 },
  { char: '\u{1F6F8}', type: 'ufo', count: 2 },
  { char: '\u2B50', type: 'rocket', count: 3 },
  { char: '\u{1F344}', type: 'invader', count: 2 },
  { char: '\u{1F3AE}', type: 'ufo', count: 2 },
  { char: '\u{1FA99}', type: 'invader', count: 4 },
] as const;

export const SPRITE_SIZE_CLASSES = [
  'size-huge','size-huge','size-big','size-big','size-big','size-big',
  'size-med','size-med','size-med','size-med','size-med','size-med','size-med','size-med',
  'size-sm','size-sm','size-sm','size-sm','size-sm','size-sm',
] as const;

export const STAR_COLORS = ['star-blue', 'star-red', 'star-green', 'star-yellow'] as const;
