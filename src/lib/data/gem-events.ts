export interface GemEvent {
  name: string;
  category: string;
  color: string;
  prize: string;
  difficulty: number;
  duration: string;
  description: string;
  announced: boolean;
}

export const gemEvents: GemEvent[] = [
  {
    name: 'STUDENTPRENEUR',
    category: 'Flagship',
    color: '#ff4444',
    prize: 'TBA',
    difficulty: 5,
    duration: 'Multi-Day',
    description:
      'The ultimate entrepreneurship competition. Build, pitch, and scale your startup idea from concept to reality. Compete against the brightest student founders for funding and mentorship.',
    announced: true,
  },
  {
    name: 'DROPSHIPPING',
    category: 'Flagship',
    color: '#3366ff',
    prize: 'TBA',
    difficulty: 4,
    duration: 'Multi-Day',
    description:
      'Launch and run a real e-commerce dropshipping business in a time-bound challenge. Source products, build your store, drive sales, and prove your business acumen.',
    announced: true,
  },
  {
    name: 'STARTUP EXPO',
    category: 'Flagship',
    color: '#33cc66',
    prize: 'TBA',
    difficulty: 3,
    duration: 'Multi-Day',
    description:
      'A grand showcase of the most promising student-led startups. Demo your product, connect with investors, and gain visibility in the startup ecosystem.',
    announced: true,
  },
  {
    name: 'SOLVE FOR PILANI',
    category: 'Flagship',
    color: '#ffaa00',
    prize: 'TBA',
    difficulty: 4,
    duration: 'Multi-Day',
    description:
      'Tackle real-world problems facing the city of Pilani and its community. Design innovative, sustainable solutions that create lasting impact beyond the campus.',
    announced: true,
  },
];
