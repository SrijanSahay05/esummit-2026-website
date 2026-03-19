'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface LogoRevealProps {
  onComplete: () => void;
}

/**
 * E-Summit 2026 logo reveal animation using anime.js.
 *
 * Sequence:
 * 1. Screen flickers (CRT power-on effect)
 * 2. Pixelated noise clears to reveal logo
 * 3. Logo scales in with retro "power-up" feel
 * 4. Tagline types in character by character
 */
export function LogoReveal({ onComplete }: LogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'flicker' | 'reveal' | 'done'>('flicker');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const runAnimation = useCallback(() => {
    if (!containerRef.current || !logoRef.current || !glitchRef.current) return;

    const logo = logoRef.current;
    const glitch = glitchRef.current;

    // Timeline: flicker → logo reveal → complete
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // Phase 1: CRT flicker effect (rapid opacity changes on glitch overlay)
    tl.add({
      targets: glitch,
      opacity: [1, 0.8, 1, 0.3, 1, 0.5, 0],
      duration: 800,
      easing: 'steps(7)',
      complete: () => setPhase('reveal'),
    });

    // Phase 2: Logo scales in with bounce
    tl.add(
      {
        targets: logo,
        scale: [0, 1.15, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, 0.5)',
      },
      '-=200',
    );

    // Phase 3: Logo settles with subtle glow pulse
    tl.add({
      targets: logo,
      filter: [
        'brightness(1) drop-shadow(0 0 0px rgba(26,91,196,0))',
        'brightness(1.3) drop-shadow(0 0 20px rgba(26,91,196,0.8))',
        'brightness(1) drop-shadow(0 0 8px rgba(26,91,196,0.3))',
      ],
      duration: 600,
      easing: 'easeInOutQuad',
      complete: () => {
        setPhase('done');
        onCompleteRef.current();
      },
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase('done');
      onCompleteRef.current();
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(runAnimation, 200);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, runAnimation]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* CRT flicker / noise overlay */}
      <div
        ref={glitchRef}
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            phase === 'flicker'
              ? 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(0,0,0,0.1) 1px, transparent 2px, transparent 3px)'
              : 'transparent',
          opacity: phase === 'flicker' ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Logo image */}
      <div
        ref={logoRef}
        className="relative"
        style={{
          opacity: prefersReducedMotion ? 1 : 0,
          transform: prefersReducedMotion ? 'scale(1)' : 'scale(0)',
        }}
      >
        <Image
          src="/images/logo/esummit-logo.png"
          alt="E-Summit 2026 — BITS Pilani's Entrepreneurship Summit"
          width={612}
          height={260}
          className="pixel-art h-auto w-[280px] sm:w-[380px] md:w-[480px] lg:w-[560px]"
          priority
        />
        {/* Screen reader accessible heading */}
        <h1 className="sr-only">
          E-Summit 2026 — BITS Pilani&apos;s Entrepreneurship Summit
        </h1>
      </div>
    </div>
  );
}
