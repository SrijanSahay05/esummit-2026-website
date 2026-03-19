'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoReveal } from '@/components/animations/LogoReveal';
import { GameMenu } from '@/components/ui/GameMenu';
import { Scanlines } from '@/components/ui/Scanlines';
import { TopBar } from '@/components/layout/TopBar';
import { SITE } from '@/lib/constants';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<'logo' | 'menu' | 'ready'>('logo');

  useEffect(() => {
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
    // Smooth scroll to the next section
    const nextSection = sectionRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      aria-label="E-Summit 2026 Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-primary" />

      {/* Orange top bar with "REGISTRATIONS OPEN NOW" */}
      <TopBar
        visible={phase === 'menu' || phase === 'ready'}
      />

      {/* Main content — centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        {/* Logo */}
        <LogoReveal onComplete={handleLogoComplete} />

        {/* Tagline — appears after logo */}
        <p
          className={`font-pixel mt-6 max-w-xl text-center text-[8px] leading-relaxed text-text-primary transition-opacity duration-1000 sm:mt-8 sm:text-[10px] md:text-xs ${
            phase === 'logo' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {SITE.tagline}
        </p>

        {/* Game Menu */}
        <div
          className={`mt-8 transition-all duration-700 sm:mt-12 ${
            phase === 'menu' || phase === 'ready'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <GameMenu onStart={handleStart} />
        </div>
      </div>

      {/* Mascots at bottom */}
      <div
        className={`relative z-10 flex justify-center gap-2 pb-6 transition-all duration-700 sm:gap-4 sm:pb-8 ${
          phase === 'menu' || phase === 'ready'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <MascotRow />
      </div>

      {/* Footer text */}
      <div
        className={`relative z-10 pb-4 text-center transition-opacity duration-700 sm:pb-6 ${
          phase === 'menu' || phase === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-pixel text-[7px] tracking-wider text-text-muted sm:text-[8px]">
          &copy; {SITE.date} {SITE.organizer}&trade;
          <span className="mx-2">|</span>
          {SITE.venue}
        </p>
      </div>

      {/* CRT scanline overlay */}
      <Scanlines />
    </section>
  );
}

function MascotRow() {
  return (
    <div className="flex items-end gap-1 sm:gap-3">
      {/* 5 pixel art mascots from the design */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="pixel-art h-8 w-8 animate-pulse sm:h-12 sm:w-12 md:h-14 md:w-14"
          style={{
            animationDelay: `${i * 200}ms`,
            animationDuration: '2s',
          }}
        >
          {/* Individual mascot sprites will be cropped from pixel-art-8.png */}
          {/* For now using a colored placeholder that matches the mascot colors */}
          <div
            className="h-full w-full rounded-sm"
            style={{
              backgroundColor: [
                '#2563eb',
                '#16a34a',
                '#d97706',
                '#7c3aed',
                '#ec4899',
              ][i - 1],
              opacity: 0.7,
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
