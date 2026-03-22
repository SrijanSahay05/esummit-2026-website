export interface DialogSlide {
  speaker: string;
  heading: string;
  icon: string;
  text: string;
}

export const dialogSlides: DialogSlide[] = [
  {
    speaker: '???',
    heading: 'THE LEGEND',
    icon: '\u{1F3F0}',
    text: 'Welcome to BITS Pilani, Adventurer. You stand before a place where legends are forged.',
  },
  {
    speaker: 'THE\nWATCHER',
    heading: 'THE ARENA',
    icon: '\u2694\uFE0F',
    text: 'E-Summit 2026 is the largest entrepreneurship festival in Rajasthan. 20+ events. 3 epic days.',
  },
  {
    speaker: 'THE\nWATCHER',
    heading: 'YOUR QUEST',
    icon: '\u{1F5FA}\uFE0F',
    text: 'Prizes. Speakers. Founders. All waiting below. Scroll down to begin your quest.',
  },
];
