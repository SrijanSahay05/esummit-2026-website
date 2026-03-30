'use client';

import { useEffect, useRef, useCallback } from 'react';
import { WORLD_EVENTS } from '@/lib/data/world-data';
import { useAudioSystem } from '@/hooks/useAudioSystem';

export default function ArcadeCarousel() {
  const currentRef = useRef(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const { playClickSound, playHoverSound } = useAudioSystem();

  const showSlide = useCallback((index: number, direction: 'prev' | 'next') => {
    const slides = document.querySelectorAll('.arcade-event-slide');
    if (!slides.length) return;
    slides[currentRef.current].classList.remove('active', 'slide-in-left', 'slide-in-right');
    currentRef.current = (index + slides.length) % slides.length;
    const slide = slides[currentRef.current];
    slide.classList.remove('slide-in-left', 'slide-in-right');
    slide.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
    void (slide as HTMLElement).offsetWidth; // force reflow
    slide.classList.add('active');
    const counter = document.getElementById('arcadeCounter');
    if (counter) counter.textContent = `${currentRef.current + 1} / ${slides.length}`;
  }, []);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      const carousel = document.getElementById('arcadeCarousel');
      if (!carousel) return;
      const rect = carousel.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') { showSlide(currentRef.current - 1, 'prev'); playClickSound(); }
      if (e.key === 'ArrowRight') { showSlide(currentRef.current + 1, 'next'); playClickSound(); }
    }

    let touchStartX = 0;
    const screenEl = screenRef.current;
    function onTouchStart(e: TouchEvent) { touchStartX = e.changedTouches[0].screenX; }
    function onTouchEnd(e: TouchEvent) {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) showSlide(currentRef.current + 1, 'next');
        else showSlide(currentRef.current - 1, 'prev');
        playClickSound();
      }
    }

    document.addEventListener('keydown', onKeydown);
    if (screenEl) {
      screenEl.addEventListener('touchstart', onTouchStart, { passive: true });
      screenEl.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', onKeydown);
      if (screenEl) {
        screenEl.removeEventListener('touchstart', onTouchStart);
        screenEl.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, [showSlide, playClickSound]);

  const showScorePopup = useCallback((x: number, y: number, text: string) => {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = text;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.getElementById('scorePopups')?.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  }, []);

  return (
    <div className="arcade-carousel" id="arcadeCarousel">
      <div className="arcade-cabinet-wrapper">
        <div className="arcade-screen-content" id="arcadeScreen" ref={screenRef}>
          {WORLD_EVENTS.map((event, i) => (
            <div key={event.name} className={`arcade-event-slide${i === 0 ? ' active' : ''}`} data-index={i}>
              <div className="arcade-event-icon">{event.icon}</div>
              <h3 className="arcade-event-name">{event.name}</h3>
              <div className="arcade-event-type">{event.type}</div>
              <p className="arcade-event-desc">{event.description}</p>
              <div className="arcade-event-stats">
                <span>{'\u23F1'} {event.duration}</span>
                <span>{'\u{1F465}'} {event.team}</span>
              </div>
              <div className="arcade-event-difficulty">
                {Array.from({ length: 5 }, (_, j) => j < event.difficulty ? '\u2605' : '\u2606').join('')}
              </div>
              <a
                href={event.link || '#'}
                className="arcade-register-btn"
                target={event.link ? '_blank' : undefined}
                rel={event.link ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!event.link) e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  showScorePopup(rect.left + rect.width / 2, rect.top, 'QUEST ACCEPTED!');
                  playClickSound();
                }}
                onMouseEnter={playHoverSound}
              >
                {'\u25B6'} {event.link ? 'REGISTER' : 'COMING SOON'}
              </a>
            </div>
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/arcade_svg.svg" alt="Arcade Cabinet" className="arcade-cabinet-img" draggable={false} />
        <button
          className="arcade-nav-btn arcade-prev"
          id="arcadePrev"
          onClick={() => { showSlide(currentRef.current - 1, 'prev'); playClickSound(); }}
          onMouseEnter={playHoverSound}
        >
          <span className="arcade-btn-pixel">{'\u25C0'}</span> PREV
        </button>
        <button
          className="arcade-nav-btn arcade-next"
          id="arcadeNext"
          onClick={() => { showSlide(currentRef.current + 1, 'next'); playClickSound(); }}
          onMouseEnter={playHoverSound}
        >
          NEXT <span className="arcade-btn-pixel">{'\u25B6'}</span>
        </button>
        <div className="arcade-counter" id="arcadeCounter">1 / 4</div>
      </div>
    </div>
  );
}
