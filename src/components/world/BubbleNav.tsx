'use client';

import { useEffect, useCallback } from 'react';
import { WORLD_NAV_ITEMS } from '@/lib/data/world-data';
import { useAudioSystem } from '@/hooks/useAudioSystem';

export default function BubbleNav() {
  const { playHoverSound, playClickSound } = useAudioSystem();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    playClickSound();
  }, [playClickSound]);

  useEffect(() => {
    function updateActiveNav() {
      const sections = document.querySelectorAll('section[id]');
      const bubbleLinks = document.querySelectorAll('.bubble-link');
      let current = '';
      sections.forEach((section) => {
        if (window.scrollY >= (section as HTMLElement).offsetTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      bubbleLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveNav);
  }, []);

  return (
    <div className="pixel-bubble-nav" id="pixelBubbleNav">
      {WORLD_NAV_ITEMS.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          className={`bubble-link${i === 0 ? ' active' : ''}`}
          data-label={item.label}
          onClick={handleClick}
          onMouseEnter={playHoverSound}
        >
          <span className="bubble-icon">{item.icon}</span>
        </a>
      ))}
    </div>
  );
}
