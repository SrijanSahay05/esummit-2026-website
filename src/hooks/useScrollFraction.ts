'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Ref-based scroll fraction that updates every scroll event (no React state delay).
 * Exported so useVideoScrub can read it directly for low-latency seeking.
 */
export const scrollFractionRef = { current: 0 };

/**
 * Returns the current scroll fraction (0-1) of the entire page.
 * Uses a requestAnimationFrame-throttled scroll listener for React state,
 * plus a direct ref update for high-frequency consumers like video scrubbing.
 */
export function useScrollFraction(): number {
  const [frac, setFrac] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    function getScrollFraction(): number {
      const scrollH =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollH <= 0) return 0;
      return Math.max(0, Math.min(1, window.scrollY / scrollH));
    }

    function onScroll() {
      // Always update the ref immediately (no throttle)
      scrollFractionRef.current = getScrollFraction();

      // Throttle React state updates to RAF
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setFrac(scrollFractionRef.current);
          ticking.current = false;
        });
      }
    }

    // Set initial value
    const initial = getScrollFraction();
    scrollFractionRef.current = initial;
    setFrac(initial);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return frac;
}
