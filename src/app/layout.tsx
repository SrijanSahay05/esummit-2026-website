import type { Metadata } from 'next';
import { pixelFont, bodyFont } from '@/lib/fonts';
import { createMetadata } from '@/lib/metadata';
import '@/styles/globals.css';

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-bg-primary font-body text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
