import type { Metadata, Viewport } from 'next';
import { SITE } from './constants';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

const DEFAULT_DESCRIPTION =
  "E-Summit 2026 — India's largest college entrepreneurship summit at BITS Pilani, part of Apogee. Where ideas meet execution. Where Founders meet the Future. Workshops, 10+ startup competitions, networking with founders & investors. $80B+ alumni startup valuations, 13 unicorns, 3800+ founders. Organized by PIEDS, BITS Pilani.";

const KEYWORDS = [
  'E-Summit 2026',
  'Apogee BITS Pilani',
  'E-Summit Apogee',
  'BITS Pilani entrepreneurship',
  'BITS Pilani startup summit',
  'PIEDS BITS Pilani',
  'college entrepreneurship India',
  'startup competition India',
  'entrepreneurship summit Rajasthan',
  'E-Summit BITS Pilani 2026',
  'BITS Pilani fest 2026',
  'India startup competition college',
  'founder networking India',
  'startup expo BITS Pilani',
  'Apogee 2026',
  'BITS Pilani Pilani campus',
  'BITS alumni startups unicorns',
  'hackathon BITS Pilani',
  'entrepreneurship workshop India',
  'college startup fest',
];

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  // Deep-merge structured sub-objects so callers can partially override them
  // without losing defaults like the OG image or canonical.
  const {
    openGraph: ogOverrides,
    twitter: twitterOverrides,
    alternates: alternatesOverrides,
    // robots is intentionally not deep-merged — callers rarely need to override it,
    // and its Metadata type is a union (string | object) that can't be safely spread.
    ...rest
  } = overrides;

  const hasTitle = !!rest.title;
  const description = (rest.description as string) ?? DEFAULT_DESCRIPTION;

  // Use Next.js title template at root; subpages just pass a plain string.
  const title = hasTitle
    ? rest.title
    : ({ default: SITE.name, template: `%s | E-Summit 2026` } as Metadata['title']);

  // OG/Twitter need a string title — derive it from the override or fall back to site name.
  const stringTitle = hasTitle ? `${rest.title as string} | E-Summit 2026` : SITE.name;

  return {
    // ── Core ─────────────────────────────────────────────────────────────────
    title,
    description,
    applicationName: 'E-Summit 2026',
    authors: [{ name: SITE.organizerFullName, url: SITE.url }],
    creator: SITE.organizerFullName,
    publisher: 'BITS Pilani',
    category: 'Entrepreneurship & Technology',
    keywords: KEYWORDS,
    metadataBase: new URL(SITE.url),

    // ── Social ───────────────────────────────────────────────────────────────
    openGraph: {
      title: stringTitle,
      description,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_IN',
      url: SITE.url,
      // og:image is injected automatically by the opengraph-image.tsx file.
      ...ogOverrides,
    },
    twitter: {
      card: 'summary_large_image',
      title: stringTitle,
      description,
      // twitter:image is injected automatically by the opengraph-image.tsx file.
      ...twitterOverrides,
    },

    // ── Crawl ────────────────────────────────────────────────────────────────
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },

    // ── Canonical ────────────────────────────────────────────────────────────
    alternates: {
      canonical: SITE.url,
      ...alternatesOverrides,
    },

    // ── Misc ─────────────────────────────────────────────────────────────────
    // Prevents iOS from auto-linking phone numbers, emails, addresses in content.
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Caller-specific overrides (title, description, etc.) applied last.
    ...rest,
  };
}
