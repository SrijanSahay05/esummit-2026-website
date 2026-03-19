'use client';

import { useState } from 'react';
import { ScrollZoomSequence } from '@/components/animations/ScrollZoomSequence';
import { Scanlines } from '@/components/ui/Scanlines';

/**
 * Campus reveal section — scroll-driven zoom-out from clock face to full campus.
 * Content sections will overlay on top of specific zoom levels in Phase 4.
 */
export function CampusRevealSection() {
  const [, setProgress] = useState(0);

  return (
    <section className="relative" aria-label="Explore BITS Pilani Campus">
      <ScrollZoomSequence onScrollProgress={setProgress} />

      {/* Scanline overlay for consistent retro feel */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <Scanlines />
      </div>

      {/* Vignette edges */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
