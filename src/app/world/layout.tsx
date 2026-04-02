import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';

// world/page.tsx is a 'use client' component and therefore cannot export metadata.
// This layout (a server component) is the correct Next.js App Router pattern for
// attaching route-level SEO metadata to a client page.
export const metadata: Metadata = createMetadata({
  title: 'Explore the World',
  description:
    "Explore E-Summit 2026's immersive world — browse startup competitions, workshops, and networking events at BITS Pilani's Apogee. 50+ events, 5000+ attendees, 100+ speakers. Discover India's premier college entrepreneurship ecosystem, organized by PIEDS.",
  alternates: {
    canonical: `${SITE.url}/world`,
  },
  openGraph: {
    url: `${SITE.url}/world`,
    type: 'website',
  },
});

export default function WorldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
