'use client';

import { useEffect, useRef, useCallback } from 'react';
import { WORLD_STATS } from '@/lib/data/world-data';
import { useCyclingTypewriter } from '@/hooks/useCyclingTypewriter';
import { WORLD_PHRASES } from '@/lib/data/world-data';

export default function HeroSection() {
  const displayText = useCyclingTypewriter(WORLD_PHRASES);
  const statsRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return;
    const container = statsRef.current;
    if (!container) return;
    container.querySelectorAll<HTMLElement>('.stat-number').forEach((counter) => {
      const target = parseInt(counter.dataset.target || '0');
      const duration = 2500;
      const start = performance.now();
      function update(now: number) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - p) * (1 - p);
        counter.textContent = Math.floor(eased * target).toString();
        if (p < 1) requestAnimationFrame(update);
        else counter.textContent = target.toString();
      }
      requestAnimationFrame(update);
    });
    animatedRef.current = true;
  }, []);

  useEffect(() => {
    function checkCounters() {
      const stats = statsRef.current;
      if (stats && stats.getBoundingClientRect().top < window.innerHeight * 0.9) {
        animateCounters();
      }
    }
    checkCounters();
    window.addEventListener('scroll', checkCounters, { passive: true });
    return () => window.removeEventListener('scroll', checkCounters);
  }, [animateCounters]);

  return (
    <section className="hero" id="home">
      <div className="hero-invaders">
        <div className="invader inv-1">{'\u25BC'}</div>
        <div className="invader inv-2">{'\u25C8'}</div>
        <div className="invader inv-3">{'\u25BC'}</div>
        <div className="invader inv-4">{'\u25C8'}</div>
        <div className="invader inv-5">{'\u25BC'}</div>
      </div>
      <div className="pixel-mario" id="pixelMario" />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pixel-border">{'\u25C6'} BITS PILANI PRESENTS {'\u25C6'}</span>
        </div>
        <div className="hero-logo-wrap">
          <div className="hero-logo-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/E-Summit_Logo_new.svg"
            alt="E-Summit 2026"
            className="hero-logo"
            draggable={false}
          />
        </div>
        <p className="hero-tagline">{displayText}</p>
        <div className="hero-stats" ref={statsRef}>
          {WORLD_STATS.map((stat) => (
            <div key={stat.label} className="stat-box">
              <div className="coin-icon">{'\u25CF'}</div>
              <span className="stat-number" data-target={stat.target}>0</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="hero-cta">
          <a href="#events" className="btn btn-primary pixel-btn">
            <span>{'\u25B6'} EXPLORE EVENTS</span>
          </a>
          <a href="#about" className="btn btn-secondary pixel-btn">
            <span>{'\u25C6'} LEARN MORE</span>
          </a>
        </div>
        <div className="scroll-indicator">
          <span>{'\u25BC'} SCROLL DOWN {'\u25BC'}</span>
        </div>
      </div>
      <div className="shooting-star ss-1" />
      <div className="shooting-star ss-2" />
      <div className="shooting-star ss-3" />
      <div className="shooting-star ss-4" />
      <div className="shooting-star ss-5" />
    </section>
  );
}
