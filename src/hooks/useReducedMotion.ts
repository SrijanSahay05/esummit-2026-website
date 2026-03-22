'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true if the user prefers reduced motion.
 * Reads from window.matchMedia on mount and listens for changes.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
