'use client';

import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';
import RogueCharacterSVG, { type RogueCharacterRefs } from '@/components/svg/RogueCharacterSVG';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NPCCharacterProps {
  visible: boolean;
  companion: boolean;
  scrollFraction: number;
}

const HEAD_CENTER_X = 180;
const HEAD_CENTER_Y = 120;
const EYE_MAX_OFFSET = 6;
const HEAD_MAX_OFFSET = 4;
const HEAD_MAX_ROTATE = 5;
const LERP_FACTOR = 0.08;

const LEFT_EYE_BASE_CXS = [162, 162, 162, 162, 162];
const LEFT_EYE_BASE_CYS = [128, 128, 128, 127, 126];
const RIGHT_EYE_BASE_CXS = [200, 200, 200, 200, 200];
const RIGHT_EYE_BASE_CYS = [128, 128, 128, 127, 126];
const EYE_MULTIPLIERS = [0.3, 0.5, 0.75, 1.0, 1.0];

function clampVal(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerpVal(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function NPCCharacter({ visible, companion }: NPCCharacterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rogueRef = useRef<RogueCharacterRefs>(null);
  const reducedMotion = useReducedMotion();
  const prevVisibleRef = useRef(false);

  // Eye tracking state kept in refs to avoid re-renders
  const currentRef = useRef({ ex: 0, ey: 0, hx: 0, hy: 0, hr: 0 });
  const targetRef = useRef({ ex: 0, ey: 0, hx: 0, hy: 0, hr: 0 });
  const rafRef = useRef<number>(0);

  // Fade in/out on visibility change
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (visible && !prevVisibleRef.current) {
      if (!reducedMotion) {
        anime({
          targets: wrapper,
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutExpo',
          complete: () => {
            wrapper.classList.add('idle');
          },
        });
      } else {
        wrapper.style.opacity = '1';
        wrapper.classList.add('idle');
      }
    } else if (!visible && prevVisibleRef.current) {
      wrapper.classList.remove('idle');
      wrapper.style.opacity = '0';
    }

    prevVisibleRef.current = visible;
  }, [visible, reducedMotion]);

  // Companion class toggle
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (companion) {
      wrapper.classList.add('companion');
    } else {
      wrapper.classList.remove('companion');
    }
  }, [companion]);

  // Eye tracking
  const pageToSVG = useCallback(
    (px: number, py: number) => {
      const svg = rogueRef.current?.svg;
      if (!svg) return { x: HEAD_CENTER_X, y: HEAD_CENTER_Y };
      const rect = svg.getBoundingClientRect();
      const scaleX = 360 / rect.width;
      const scaleY = 560 / rect.height;
      return { x: (px - rect.left) * scaleX, y: (py - rect.top) * scaleY };
    },
    [],
  );

  useEffect(() => {
    if (reducedMotion) return;

    const onPointerMove = (e: MouseEvent | { clientX: number; clientY: number }) => {
      const { x, y } = pageToSVG(e.clientX, e.clientY);
      const dx = x - HEAD_CENTER_X;
      const dy = y - HEAD_CENTER_Y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 300;
      const factor = Math.min(dist / maxDist, 1);
      const nx = dist > 0 ? dx / dist : 0;
      const ny = dist > 0 ? dy / dist : 0;

      const t = targetRef.current;
      t.ex = nx * EYE_MAX_OFFSET * factor;
      t.ey = ny * EYE_MAX_OFFSET * factor * 0.7;
      t.hx = nx * HEAD_MAX_OFFSET * factor;
      t.hy = ny * HEAD_MAX_OFFSET * factor * 0.5;
      t.hr = clampVal((dx / maxDist) * HEAD_MAX_ROTATE, -HEAD_MAX_ROTATE, HEAD_MAX_ROTATE);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
      }
    };

    function animateEyes() {
      const c = currentRef.current;
      const t = targetRef.current;

      c.ex = lerpVal(c.ex, t.ex, LERP_FACTOR);
      c.ey = lerpVal(c.ey, t.ey, LERP_FACTOR);
      c.hx = lerpVal(c.hx, t.hx, LERP_FACTOR);
      c.hy = lerpVal(c.hy, t.hy, LERP_FACTOR);
      c.hr = lerpVal(c.hr, t.hr, LERP_FACTOR);

      const refs = rogueRef.current;
      if (refs?.headGroup) {
        refs.headGroup.setAttribute(
          'transform',
          `translate(${c.hx.toFixed(2)}, ${c.hy.toFixed(2)}) rotate(${c.hr.toFixed(2)}, ${HEAD_CENTER_X}, ${HEAD_CENTER_Y})`,
        );
      }

      if (refs?.leftEyeParts) {
        refs.leftEyeParts.forEach((el, i) => {
          if (!el) return;
          const m = EYE_MULTIPLIERS[i];
          el.setAttribute('cx', (LEFT_EYE_BASE_CXS[i] + c.ex * m).toFixed(2));
          el.setAttribute('cy', (LEFT_EYE_BASE_CYS[i] + c.ey * m).toFixed(2));
        });
      }

      if (refs?.rightEyeParts) {
        refs.rightEyeParts.forEach((el, i) => {
          if (!el) return;
          const m = EYE_MULTIPLIERS[i];
          el.setAttribute('cx', (RIGHT_EYE_BASE_CXS[i] + c.ex * m).toFixed(2));
          el.setAttribute('cy', (RIGHT_EYE_BASE_CYS[i] + c.ey * m).toFixed(2));
        });
      }

      rafRef.current = requestAnimationFrame(animateEyes);
    }

    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('touchmove', onTouchMove);
    rafRef.current = requestAnimationFrame(animateEyes);

    return () => {
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, pageToSVG]);

  return (
    <div
      ref={wrapperRef}
      className="npc-wrapper"
      id="npc"
      style={{ opacity: 0 }}
    >
      <RogueCharacterSVG ref={rogueRef} />
    </div>
  );
}
