'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { dialogSlides } from '@/lib/data/dialog-slides';
import { useTypewriter } from '@/hooks/useTypewriter';

interface BP1DialogBoxProps {
  visible: boolean;
  scrollFraction: number;
  onBeginQuest: () => void;
}

export default function BP1DialogBox({ visible, onBeginQuest }: BP1DialogBoxProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flash, setFlash] = useState(false);
  const dialogBoxRef = useRef<HTMLDivElement>(null);
  const { displayText, isTyping, finish, start } = useTypewriter(38);
  const initializedRef = useRef(false);

  // Show slide 0 when first becoming visible
  useEffect(() => {
    if (visible && !initializedRef.current) {
      initializedRef.current = true;
      setCurrentSlide(0);
      start(dialogSlides[0].text);
    }
  }, [visible, start]);

  const showSlide = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= dialogSlides.length) return;
      setCurrentSlide(idx);
      start(dialogSlides[idx].text);

      // Flash on slide change (not on first slide)
      if (idx > 0) {
        setFlash(true);
        setTimeout(() => setFlash(false), 80);
      }
    },
    [start],
  );

  const handleNext = useCallback(() => {
    if (isTyping) {
      finish();
      return;
    }
    if (currentSlide < dialogSlides.length - 1) {
      showSlide(currentSlide + 1);
    } else {
      onBeginQuest();
    }
  }, [isTyping, finish, currentSlide, showSlide, onBeginQuest]);

  const handlePrev = useCallback(() => {
    if (isTyping) {
      finish();
      return;
    }
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }, [isTyping, finish, currentSlide, showSlide]);

  const handleTextClick = useCallback(() => {
    if (isTyping) {
      finish();
    }
  }, [isTyping, finish]);

  // Keyboard: Enter/Space to skip typewriter or advance slide
  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isTyping) {
          finish();
        } else if (currentSlide < dialogSlides.length - 1) {
          showSlide(currentSlide + 1);
        } else {
          onBeginQuest();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, isTyping, finish, currentSlide, showSlide, onBeginQuest]);

  const slide = dialogSlides[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === dialogSlides.length - 1;

  return (
    <div id="bp1-section" className={visible ? 'visible' : ''}>
      <div
        ref={dialogBoxRef}
        className={`dialog-box${visible ? ' visible' : ''}${flash ? ' flash' : ''}`}
        id="dialog-box"
      >
        <div className="dialog-corner dialog-corner--top-left" />
        <div className="dialog-corner dialog-corner--top-right" />
        <div className="dialog-text-panel">
          <div
            className="dialog-speaker-name"
            id="dialog-speaker"
            style={{
              position: 'absolute',
              top: 12,
              left: 28,
              fontFamily: "'Black Ops One', sans-serif",
              fontSize: 14,
              color: '#EDD68A',
              letterSpacing: 2,
              WebkitTextStroke: '1px #5a3a0a',
              textShadow: '2px 2px 0 #3a2200, 0 0 10px rgba(255,215,0,0.3)',
              whiteSpace: 'pre-line',
            }}
            dangerouslySetInnerHTML={{
              __html: slide.speaker.replace('\n', '<br/>'),
            }}
          />
          <div className="dialog-slide-counter" id="dialog-counter">
            {currentSlide + 1} / {dialogSlides.length}
          </div>
          <div className="dialog-content-row">
            <div className="dialog-content-left">
              <div className="dialog-heading" id="dialog-heading">
                {slide.heading}
              </div>
              <div
                className="dialog-text"
                id="dialog-text"
                onClick={handleTextClick}
              >
                {displayText}
              </div>
            </div>
            <div className="dialog-icon" id="dialog-icon">
              {slide.icon}
            </div>
          </div>
          <div className="dialog-btn-row">
            <button
              className={`dialog-nav-btn dialog-nav-btn--prev${isFirst ? ' hidden' : ''}`}
              id="dialog-prev"
              onClick={handlePrev}
            >
              &#9668; PREV
            </button>
            <button
              className="dialog-nav-btn dialog-nav-btn--next"
              id="dialog-next"
              onClick={handleNext}
            >
              {isLast ? '\u25B6 BEGIN QUEST' : '\u25B6 NEXT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
