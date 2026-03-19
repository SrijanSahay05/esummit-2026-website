import type { Metadata } from 'next';
import { SITE } from './constants';

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
    openGraph: {
      title: title as string,
      description,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_IN',
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
    ...overrides,
  };
}
