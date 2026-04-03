'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';
import {
  tlEvents,
  TL_PATH_DESKTOP,
  TL_PATH_MOBILE,
  type TimelineEvent,
} from '@/lib/data/timeline-events';
import { BP } from '@/lib/constants';
import { getLocalFraction } from '@/lib/utils';

interface TimelineSectionProps {
  visible: boolean;
  scrollFraction: number;
}

interface CardState {
  open: boolean;
  idx: number;
  style: React.CSSProperties;
}

const DECOR_EMOJIS = [
  { emoji: '\u2728', style: { top: '5%', left: '8%' } },
  { emoji: '\uD83D\uDE80', style: { top: '15%', right: '10%' } },
  { emoji: '\uD83D\uDCA1', style: { top: '30%', left: '5%' } },
  { emoji: '\uD83C\uDFC6', style: { top: '45%', right: '8%' } },
  { emoji: '\u26A1', style: { top: '55%', left: '10%' } },
  { emoji: '\uD83C\uDFAF', style: { top: '70%', right: '6%' } },
  { emoji: '\uD83D\uDD25', style: { top: '82%', left: '7%' } },
  { emoji: '\uD83C\uDFAA', style: { top: '92%', right: '12%' } },
];

const TimelineSection: React.FC<TimelineSectionProps> = ({ visible, scrollFraction }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathBgRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pathLengthRef = useRef(0);
  const isMobileRef = useRef(false);
  const animatedInRef = useRef(false);
  const reducedMotion = useRef(false);

  const [revealedPins, setRevealedPins] = useState<Set<number>>(new Set());
  const [card, setCard] = useState<CardState>({ open: false, idx: -1, style: {} });
  const [dateVisible, setDateVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState(TL_PATH_DESKTOP);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const isMobileTimeline = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }, []);

  const applyPath = useCallback(() => {
    const mobile = isMobileTimeline();
    const pathData = mobile ? TL_PATH_MOBILE : TL_PATH_DESKTOP;
    setCurrentPath(pathData);
    isMobileRef.current = mobile;

    if (svgRef.current) {
      if (mobile) {
        const phoneAspect = window.innerWidth / window.innerHeight;
        const vbH = 1000;
        const vbW = vbH * phoneAspect;
        const vbX = 500 - vbW / 2;
        svgRef.current.setAttribute('viewBox', `${vbX} 0 ${vbW} ${vbH}`);
      } else {
        svgRef.current.setAttribute('viewBox', '0 0 1000 1000');
      }
    }

    // Reset path length to force recalc
    pathLengthRef.current = 0;
  }, [isMobileTimeline]);

  // Apply path on mount and resize
  useEffect(() => {
    applyPath();
    const handleResize = () => {
      pathLengthRef.current = 0;
      animatedInRef.current = false;
      applyPath();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyPath]);

  const svgPointToViewport = useCallback(
    (svgX: number, svgY: number): { x: number; y: number } => {
      const svg = svgRef.current;
      if (!svg) return { x: svgX / 10, y: svgY / 10 };
      const pt = svg.createSVGPoint();
      pt.x = svgX;
      pt.y = svgY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: svgX / 10, y: svgY / 10 };
      const screenPt = pt.matrixTransform(ctm);
      return {
        x: (screenPt.x / window.innerWidth) * 100,
        y: (screenPt.y / window.innerHeight) * 100,
      };
    },
    []
  );

  const getPinPosition = useCallback(
    (evt: TimelineEvent, idx: number): { left: string; top: string } => {
      const mobile = isMobileRef.current;
      if (mobile && pathRef.current && pathLengthRef.current > 0) {
        const pathPoint = pathRef.current.getPointAtLength(evt.t * pathLengthRef.current);
        const vp = svgPointToViewport(pathPoint.x, pathPoint.y);
        const offset = idx % 2 === 0 ? -8 : 8;
        return {
          left: `${Math.max(2, Math.min(88, vp.x + offset))}%`,
          top: `${Math.max(2, Math.min(96, vp.y))}%`,
        };
      }
      return { left: `${evt.x}%`, top: `${evt.y}%` };
    },
    [svgPointToViewport]
  );

  // Update scroll-driven animation
  useEffect(() => {
    if (!visible) {
      setCard({ open: false, idx: -1, style: {} });
      if (animatedInRef.current) {
        animatedInRef.current = false;
        setRevealedPins(new Set());
      }
      return;
    }

    const path = pathRef.current;
    if (!path) return;

    // Initialize path length
    if (!pathLengthRef.current) {
      pathLengthRef.current = path.getTotalLength();
      path.style.strokeDasharray = `${pathLengthRef.current}`;
      path.style.strokeDashoffset = `${pathLengthRef.current}`;
    }

    const local = getLocalFraction(scrollFraction, BP.TIMELINE_START, BP.TIMELINE_END);

    // Draw path progressively
    const drawLen = local * pathLengthRef.current;
    path.style.strokeDashoffset = `${pathLengthRef.current - drawLen}`;

    // Move dot along path
    const point = path.getPointAtLength(drawLen);
    if (dotRef.current) {
      dotRef.current.setAttribute('cx', String(point.x));
      dotRef.current.setAttribute('cy', String(point.y));
    }

    // Reveal pins
    const newRevealed = new Set<number>();
    tlEvents.forEach((evt, i) => {
      if (local >= evt.t) {
        newRevealed.add(i);
      }
    });
    setRevealedPins(newRevealed);

    // Date indicator
    setDateVisible(local > 0.05);

    // Mark as animated in
    if (!animatedInRef.current && local > 0.02) {
      animatedInRef.current = true;
    }
  }, [visible, scrollFraction]);

  const openCard = useCallback(
    (idx: number) => {
      setCard({ open: true, idx, style: {} });

      if (!reducedMotion.current && cardRef.current) {
        anime({
          targets: cardRef.current,
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutCubic',
        });
      }
    },
    []
  );

  const closeCard = useCallback(() => {
    if (!reducedMotion.current && cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [1, 0],
        duration: 200,
        easing: 'easeOutCubic',
        complete: () => {
          setCard({ open: false, idx: -1, style: {} });
        },
      });
    } else {
      setCard({ open: false, idx: -1, style: {} });
    }
  }, []);

  const cardEvent = card.open && card.idx >= 0 ? tlEvents[card.idx] : null;

  return (
    <>
    <div
      id="timeline-section"
      ref={sectionRef}
      className={visible ? 'visible' : ''}
    >
      <div className="timeline-overlay" />

      {/* Decorative floating emojis */}
      <div className="tl-decor" aria-hidden="true">
        {DECOR_EMOJIS.map((d, i) => (
          <span key={i} className="tl-decor-emoji" style={d.style}>
            {d.emoji}
          </span>
        ))}
      </div>

      {/* Winding SVG path */}
      <svg
        id="timeline-svg"
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="tl-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Background path */}
        <path
          ref={pathBgRef}
          className="timeline-path-bg"
          d={currentPath}
        />
        {/* Illuminated path */}
        <path
          ref={pathRef}
          className="timeline-path"
          filter="url(#tl-glow)"
          d={currentPath}
        />
        {/* Moving dot */}
        <circle ref={dotRef} className="timeline-dot" r="7" cx="499" cy="306" />
      </svg>

      {/* Date indicator */}
      <div
        className={`tl-date-indicator ${dateVisible ? 'visible' : ''}`}
        id="tl-date-indicator"
      >
        {'\u25C4'} APRIL 2026
      </div>

      {/* Pins */}
      {tlEvents.map((evt, i) => {
        const pos = getPinPosition(evt, i);
        return (
          <div
            key={i}
            className={`tl-pin${evt.tba ? ' tba' : ''}${revealedPins.has(i) ? ' revealed' : ''}`}
            data-index={i}
            data-t={evt.t}
            style={{ left: pos.left, top: pos.top }}
            onClick={() => {
              if (!evt.tba) {
                openCard(i);
              }
            }}
          >
            <div className="tl-pin-icon">{evt.icon}</div>
            <div className="tl-pin-name">{evt.name}</div>
            <div className="tl-pin-date">{evt.date}</div>
          </div>
        );
      })}

    </div>

    {/* Portal: card renders at document.body level — above all other UI */}
    {typeof document !== 'undefined' && card.open && cardEvent && createPortal(
      <div
        className="tl-card-backdrop"
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          closeCard();
        }}
      >
        <div
          id="tl-card"
          ref={cardRef}
          className="tl-card open"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            className="tl-card-close"
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              closeCard();
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="tl-card-name" style={{ color: cardEvent.color }}>
            {cardEvent.icon} {cardEvent.name}
          </div>
          {cardEvent.prize && (
            <div className="tl-card-prize">{'\u{1F3C6}'} Prize: {cardEvent.prize}</div>
          )}
          <div className="tl-card-desc">{cardEvent.desc}</div>
          <div className="tl-card-meta">
            {cardEvent.category} {'\u2022'} {cardEvent.date}
          </div>
        </div>
      </div>,
      document.body,
    )}
    </>
  );
};

export default TimelineSection;
