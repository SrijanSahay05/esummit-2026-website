'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface LogoRevealProps {
  onComplete: () => void;
}

/**
 * E-Summit 2026 logo reveal animation.
 *
 * Phase 2 will replace this with a full anime.js pixel assembly animation.
 * Current implementation: CSS-based fade + scale with pixel aesthetic.
 */
export function LogoReveal({ onComplete }: LogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      onComplete();
      return;
    }

    // Staggered reveal: diamond shapes → "BITS PILANI'S" → "E-SUMMIT" → "2026"
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 300);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* Diamond shapes behind logo */}
      <div className="relative mb-2">
        <div
          className={`absolute inset-0 -z-10 flex items-center justify-center transition-all duration-700 ${
            revealed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          <div
            className="h-24 w-32 rotate-12 bg-accent-red sm:h-32 sm:w-44 md:h-40 md:w-56"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </div>
        <div
          className={`absolute inset-0 -z-10 flex items-center justify-center transition-all duration-700 ${
            revealed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <div
            className="-translate-x-2 h-20 w-28 -rotate-6 bg-accent-orange sm:h-28 sm:w-40 md:h-36 md:w-48"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </div>

        {/* Logo text */}
        <div className="relative flex flex-col items-center py-8 sm:py-12">
          <span
            className={`font-pixel text-[8px] tracking-[0.2em] text-accent-blue-light transition-all duration-500 sm:text-[10px] md:text-xs ${
              revealed
                ? 'translate-y-0 opacity-100'
                : '-translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            BITS PILANI&apos;S
          </span>

          <h1
            className={`font-pixel mt-1 text-2xl font-bold tracking-tight text-accent-blue transition-all duration-700 sm:mt-2 sm:text-4xl md:text-5xl lg:text-6xl ${
              revealed ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            E-SUMMIT
          </h1>

          <span
            className={`font-pixel mt-1 text-xl font-bold tracking-wider text-accent-orange transition-all duration-700 sm:text-3xl md:text-4xl lg:text-5xl ${
              revealed ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            2026
          </span>
        </div>
      </div>
    </div>
  );
}
