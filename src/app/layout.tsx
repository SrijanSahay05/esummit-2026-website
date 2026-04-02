import type { Metadata } from 'next';
import {
  pixelFont,
  bodyFont,
  orbitronFont,
  bungeeFont,
  blackOpsFont,
  vt323Font,
} from '@/lib/fonts';
import { createMetadata, viewport as viewportConfig } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import CloudTransitionProvider from '@/components/CloudTransitionProvider';
import '@/styles/globals.css';

export const metadata: Metadata = createMetadata();
export const viewport = viewportConfig;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'E-Summit 2026',
  description: SITE.tagline,
  startDate: '2026-04-10',
  endDate: '2026-04-12',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'BITS Pilani',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vidya Vihar',
      addressLocality: 'Pilani',
      addressRegion: 'Rajasthan',
      postalCode: '333031',
      addressCountry: 'IN',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'PIEDS - BITS Pilani',
    url: SITE.url,
  },
  url: SITE.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${bodyFont.variable} ${orbitronFont.variable} ${bungeeFont.variable} ${blackOpsFont.variable} ${vt323Font.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CloudTransitionProvider>
          {children}
        </CloudTransitionProvider>
      </body>
    </html>
  );
}
