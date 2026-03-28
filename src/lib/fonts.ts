import {
  Press_Start_2P,
  Inter,
  Orbitron,
  Bungee,
  Black_Ops_One,
  VT323,
} from 'next/font/google';

export const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
});

export const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const orbitronFont = Orbitron({
  subsets: ['latin'],
  weight: ['700', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const bungeeFont = Bungee({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee',
});

export const blackOpsFont = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-blackops',
});

export const vt323Font = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vt323',
});
