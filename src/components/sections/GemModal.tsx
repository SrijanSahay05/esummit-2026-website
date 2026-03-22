'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import type { GemEvent } from '@/lib/data/gem-events';

interface GemModalProps {
  event: GemEvent | null;
  onClose: () => void;
}

const GemModal: React.FC<GemModalProps> = ({ event, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Animate in when event changes
  useEffect(() => {
    if (event && cardRef.current && !reducedMotion.current) {
      anime({
        targets: cardRef.current,
        translateY: [80, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo',
      });
    }
  }, [event]);

  // Close on Escape
  useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [event, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (!reducedMotion.current && cardRef.current) {
        anime({
          targets: cardRef.current,
          translateY: [0, 80],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInCubic',
          complete: () => onClose(),
        });
      } else {
        onClose();
      }
    }
  };

  const handleClose = () => {
    if (!reducedMotion.current && cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [0, 80],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => onClose(),
      });
    } else {
      onClose();
    }
  };

  if (!event) return null;

  const stars = '\u2605'.repeat(event.difficulty) + '\u2606'.repeat(5 - event.difficulty);

  return (
    <div
      className={`modal-overlay ${event ? 'open' : ''}`}
      id="gem-modal"
      onClick={handleOverlayClick}
    >
      <div className="event-card" ref={cardRef}>
        <div className="event-card-corner-tr" />
        <div className="event-card-category" style={{ color: event.color }}>
          {event.category}
        </div>
        <div className="event-card-name">{event.name}</div>
        <div className="event-card-meta">
          <div className="event-card-meta-item">
            PRIZE<span>{event.prize}</span>
          </div>
          <div className="event-card-meta-item">
            DURATION<span>{event.duration}</span>
          </div>
          <div className="event-card-meta-item">
            CATEGORY<span>{event.category}</span>
          </div>
        </div>
        <div className="event-card-desc">{event.description}</div>
        <div className="event-card-difficulty">Difficulty: {stars}</div>
        <div className="event-card-actions">
          <button
            className="btn-register"
            onClick={() => window.open('#register', '_self')}
          >
            REGISTER {'\u25B6'}
          </button>
          <button className="btn-close" onClick={handleClose}>
            {'\u2715'} CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GemModal;
