'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Track scroll progress within a container element.
 * Returns a value between 0 and 1 representing how far through the element the viewport has scrolled.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const elementHeight = ref.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    // 0 when element top hits viewport bottom, 1 when element bottom hits viewport top
    const totalDistance = elementHeight + viewportHeight;
    const traveled = viewportHeight - rect.top;
    const rawProgress = traveled / totalDistance;

    setProgress(Math.min(1, Math.max(0, rawProgress)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ref, progress };
}
