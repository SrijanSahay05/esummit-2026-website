'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  const revealedRef = useRef(new WeakSet<Element>());

  const reveal = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const wh = window.innerHeight;
    const revealed = revealedRef.current;

    container.querySelectorAll('.pixel-card:not(.event-card), .pixel-frame').forEach((el, i) => {
      if (revealed.has(el)) return;
      if (el.getBoundingClientRect().top < wh * 0.85) {
        setTimeout(() => el.classList.add('visible'), i * 80);
        revealed.add(el);
      }
    });

    container.querySelectorAll('.event-card').forEach((el, i) => {
      if (revealed.has(el)) return;
      if (el.getBoundingClientRect().top < wh * 0.88) {
        setTimeout(() => el.classList.add('visible'), i * 200);
        revealed.add(el);
      }
    });

    container.querySelectorAll('.retro-card').forEach((el, i) => {
      if (revealed.has(el)) return;
      if (el.getBoundingClientRect().top < wh * 0.88) {
        setTimeout(() => el.classList.add('visible'), i * 150);
        revealed.add(el);
      }
    });

    const xpBar = container.querySelector('.xp-bar');
    if (xpBar && xpBar.getBoundingClientRect().top < wh * 0.9) {
      xpBar.classList.add('animated');
    }
  }, [containerRef]);

  useEffect(() => {
    reveal(); // initial check
    window.addEventListener('scroll', reveal, { passive: true });
    return () => window.removeEventListener('scroll', reveal);
  }, [reveal]);
}
