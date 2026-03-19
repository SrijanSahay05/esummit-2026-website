'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoReveal } from '@/components/animations/LogoReveal';
import { GameMenu } from '@/components/ui/GameMenu';
import { Scanlines } from '@/components/ui/Scanlines';
import { SITE } from '@/lib/constants';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'logo' | 'menu' | 'ready'>('logo');

  useEffect(() => {
    // Prevent scrolling during intro animation
    if (phase !== 'ready') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  const handleLogoComplete = () => {
    setPhase('menu');
  };

  const handleStart = () => {
    setPhase('ready');
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="E-Summit 2026 Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-primary" />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 text-center">
        {/* Logo */}
        <LogoReveal onComplete={handleLogoComplete} />

        {/* Tagline — appears after logo */}
        <p
          className={`font-pixel mt-8 text-xs leading-relaxed text-text-primary transition-opacity duration-1000 sm:text-sm md:text-base ${
            phase === 'logo' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {SITE.tagline}
        </p>

        {/* Game Menu — appears after tagline */}
        <div
          className={`mt-12 transition-opacity duration-700 ${
            phase === 'menu' || phase === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <GameMenu onStart={handleStart} />
        </div>

        {/* Footer text */}
        <p
          className={`font-pixel mt-16 text-[10px] tracking-wider text-text-muted transition-opacity duration-700 sm:text-xs ${
            phase === 'menu' || phase === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          &copy; {SITE.date} {SITE.organizer}&trade;
          <br />
          {SITE.venue}
        </p>
      </div>

      {/* CRT scanline overlay */}
      <Scanlines />
    </section>
  );
}
