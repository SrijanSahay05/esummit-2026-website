import { Press_Start_2P, Space_Grotesk } from 'next/font/google';

export const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
});

export const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});
