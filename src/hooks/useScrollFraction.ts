'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Returns the current scroll fraction (0-1) of the entire page.
 * Uses a requestAnimationFrame-throttled scroll listener for performance.
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
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setFrac(getScrollFraction());
          ticking.current = false;
        });
      }
    }

    // Set initial value
    setFrac(getScrollFraction());

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return frac;
}
