'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import type { GemEvent } from '@/lib/data/gem-events';

interface QuestModalProps {
  event: GemEvent | null;
  questIndex: number;
  onClose: () => void;
}

const QuestFrameSVG: React.FC = () => (
  <svg
    className="quest-frame-svg"
    viewBox="0 0 476 520"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="qWoodH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#4a3828" />
        <stop offset="20%" stopColor="#5c4430" />
        <stop offset="50%" stopColor="#4a3626" />
        <stop offset="80%" stopColor="#584030" />
        <stop offset="100%" stopColor="#483624" />
      </linearGradient>
      <linearGradient id="qWoodV" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a3828" />
        <stop offset="50%" stopColor="#5a4230" />
        <stop offset="100%" stopColor="#483624" />
      </linearGradient>
      <radialGradient id="qCornerGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6a5038" />
        <stop offset="100%" stopColor="#3a2818" />
      </radialGradient>
      <radialGradient id="qStudGrad" cx="35%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#c0a870" />
        <stop offset="40%" stopColor="#8a7448" />
        <stop offset="100%" stopColor="#5a4828" />
      </radialGradient>
      <filter id="qWoodNoise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.3 1.8" numOctaves={3} stitchTiles="stitch" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="textured" />
        <feComposite in="textured" in2="SourceAlpha" operator="in" />
      </filter>
    </defs>
    {/* Top & bottom horizontal planks */}
    <rect x="0" y="0" width="476" height="22" rx="3" fill="url(#qWoodH)" filter="url(#qWoodNoise)" />
    <rect x="0" y="498" width="476" height="22" rx="3" fill="url(#qWoodH)" filter="url(#qWoodNoise)" />
    {/* Left & right vertical planks */}
    <rect x="0" y="18" width="22" height="484" rx="3" fill="url(#qWoodV)" filter="url(#qWoodNoise)" />
    <rect x="454" y="18" width="22" height="484" rx="3" fill="url(#qWoodV)" filter="url(#qWoodNoise)" />
    {/* Corner pieces with studs */}
    <rect x="0" y="0" width="28" height="28" rx="4" fill="url(#qCornerGrad)" />
    <circle cx="14" cy="14" r="5" fill="url(#qStudGrad)" />
    <rect x="448" y="0" width="28" height="28" rx="4" fill="url(#qCornerGrad)" />
    <circle cx="462" cy="14" r="5" fill="url(#qStudGrad)" />
    <rect x="0" y="492" width="28" height="28" rx="4" fill="url(#qCornerGrad)" />
    <circle cx="14" cy="506" r="5" fill="url(#qStudGrad)" />
    <rect x="448" y="492" width="28" height="28" rx="4" fill="url(#qCornerGrad)" />
    <circle cx="462" cy="506" r="5" fill="url(#qStudGrad)" />
    {/* Inner border */}
    <rect x="20" y="20" width="436" height="480" rx="3" fill="none" stroke="#2a1a10" strokeWidth="2" opacity="0.6" />
  </svg>
);

const QuestModal: React.FC<QuestModalProps> = ({ event, questIndex: _questIndex, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Animate in
  useEffect(() => {
    if (event && cardRef.current && !reducedMotion.current) {
      anime({
        targets: cardRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 400,
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
      handleClose();
    }
  };

  const handleClose = () => {
    if (!reducedMotion.current && cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: [1, 0.9],
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInCubic',
        complete: () => onClose(),
      });
    } else {
      onClose();
    }
  };

  if (!event) return null;

  const filledStars = event.difficulty;
  const emptyStars = 5 - filledStars;

  return (
    <div
      className={`quest-modal-overlay ${event ? 'open' : ''}`}
      id="quest-modal"
      onClick={handleOverlayClick}
    >
      <div className="quest-card" ref={cardRef}>
        <button className="quest-close-btn" onClick={handleClose}>
          {'\u2715'}
        </button>
        <QuestFrameSVG />
        <div className="quest-parchment">
          <div className="quest-title">{event.name}</div>
          <div className="quest-divider">
            <span className="quest-divider-line" />
            <span className="quest-divider-dot" />
            <span className="quest-divider-diamond" />
            <span className="quest-divider-dot" />
            <span className="quest-divider-line" />
          </div>
          <div className="quest-desc">{event.description}</div>
          <div className="quest-stats-divider" />
          <div className="quest-stat-row">
            <span className="quest-stat-bullet" />
            <span>Prize Pool:</span>
            <span className="quest-stat-value">{event.prize}</span>
          </div>
          <div className="quest-stat-row">
            <span className="quest-stat-bullet" />
            <span>Duration:</span>
            <span className="quest-stat-value">{event.duration}</span>
          </div>
          <div className="quest-stat-row">
            <span className="quest-stat-bullet" />
            <span>Difficulty:</span>
            <span className="quest-stars">
              {Array.from({ length: filledStars }, (_, i) => (
                <svg key={`filled-${i}`} className="quest-star" viewBox="0 0 20 20">
                  <polygon
                    points="10,2 12.5,7.5 18,8 14,12 15,18 10,15 5,18 6,12 2,8 7.5,7.5"
                    fill="#e8c830"
                    stroke="#b09820"
                    strokeWidth="0.8"
                  />
                </svg>
              ))}
              {Array.from({ length: emptyStars }, (_, i) => (
                <svg key={`empty-${i}`} className="quest-star" viewBox="0 0 20 20">
                  <polygon
                    points="10,2 12.5,7.5 18,8 14,12 15,18 10,15 5,18 6,12 2,8 7.5,7.5"
                    fill="#8a8480"
                    stroke="#6a6460"
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                </svg>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
