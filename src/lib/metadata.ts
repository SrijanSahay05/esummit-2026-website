import type { Metadata, Viewport } from 'next';
import { SITE } from './constants';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${SITE.name}`
    : SITE.name;
  const description =
    (overrides.description as string) ??
    `${SITE.tagline} Join ${SITE.organizer} at BITS Pilani for India's premier college entrepreneurship summit — workshops, 10+ startup competitions, networking with founders & investors.`;

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    keywords: [
      'E-Summit',
      'BITS Pilani',
      'entrepreneurship summit',
      'startup competition',
      'college fest',
      'PIEDS',
      'E-Summit 2026',
      'startup expo',
      'hackathon',
      'networking',
    ],
    openGraph: {
      title: title as string,
      description,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_IN',
      url: SITE.url,
    },
    twitter: {
      card: 'summary_large_image',
      title: title as string,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: SITE.url,
    },
    ...overrides,
  };
}
