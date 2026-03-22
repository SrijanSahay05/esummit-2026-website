'use client';

import { useEffect } from 'react';

/**
 * Sets a `--vh` CSS custom property on the document root that equals 1% of the
 * actual visible viewport height. This fixes the iOS Safari 100vh issue.
 *
 * Usage in CSS: `height: calc(var(--vh, 1vh) * 100);`
 */
export function useIOSViewportFix(): void {
  useEffect(() => {
    function setVH() {
      document.documentElement.style.setProperty(
        '--vh',
        window.innerHeight * 0.01 + 'px',
      );
    }

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);
}
