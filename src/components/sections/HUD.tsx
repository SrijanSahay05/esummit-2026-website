'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { EVENT_DATE, NAV_ITEMS } from '@/lib/constants';

interface HUDProps {
  scrollFraction: number;
}

export default function HUD({ scrollFraction }: HUDProps) {
  const countdown = useCountdown(EVENT_DATE);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Determine active nav button index
  const activeIdx = (() => {
    let idx = 0;
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      if (scrollFraction >= NAV_ITEMS[i].target - 0.02) {
        idx = i;
        break;
      }
    }
    return idx;
  })();

  // Scroll hint opacity: hidden when scrolled past 2%
  const scrollHintOpacity = scrollFraction > 0.02 ? 0 : 1;

  // Handle nav button click
  const handleNavClick = useCallback((target: number) => {
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: target * scrollH, behavior: 'smooth' });
    setNavOpen(false);
  }, []);

  // Close mobile nav on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        navOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setNavOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [navOpen]);

  return (
    <div id="hud" className="visible">
      <div className="hud-top-right">
        <img
          src="/images/logo/esummit-logo.png"
          alt="E-Summit 2026"
          className="hud-logo"
        />
        <div className="hud-countdown" id="hud-countdown">
          {countdown.text}
        </div>
      </div>

      <div
        className="hud-scroll-hint"
        id="scroll-hint"
        style={{ opacity: scrollHintOpacity }}
      >
        SCROLL TO EXPLORE ▼
      </div>

      <nav
        className={`hud-nav${navOpen ? ' open' : ''}`}
        id="hud-nav"
        ref={navRef}
        aria-label="Section navigation"
      >
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.target}
            className={`hud-nav-btn${i === activeIdx ? ' active' : ''}`}
            data-target={item.target.toFixed(2)}
            onClick={() => handleNavClick(item.target)}
          >
            {item.label}
          </button>
        ))}
        <button
          className={`hud-nav-toggle${navOpen ? ' open' : ''}`}
          id="hud-nav-toggle"
          ref={toggleRef}
          aria-label="Toggle navigation"
          onClick={(e) => {
            e.stopPropagation();
            setNavOpen((prev) => !prev);
          }}
        >
          {navOpen ? '\u2715' : '\u2630'}
        </button>
      </nav>
    </div>
  );
}
