'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Tilt3DOptions {
  maxRotateX?: number;
  maxRotateY?: number;
  hoverScale?: number;
  springFactor?: number;
  perspective?: number;
}

export function useTilt3D<T extends HTMLElement>(options: Tilt3DOptions = {}) {
  const {
    maxRotateX = 9,
    maxRotateY = 14,
    hoverScale = 1.028,
    springFactor = 0.1,
    perspective = 1400,
  } = options;

  const cardRef = useRef<T>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  const tRX = useRef(0);
  const tRY = useRef(0);
  const cRX = useRef(0);
  const cRY = useRef(0);
  const isOver = useRef(false);
  const rafId = useRef(0);

  const handleMouseEnter = useCallback(() => {
    isOver.current = true;
    if (specularRef.current) specularRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    isOver.current = false;
    tRX.current = 0;
    tRY.current = 0;
    if (specularRef.current) specularRef.current.style.opacity = '0';
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      tRY.current = nx * maxRotateY;
      tRX.current = -ny * maxRotateX;

      // Move specular gradient to cursor position
      if (specularRef.current) {
        const px = ((e.clientX - r.left) / r.width) * 100;
        const py = ((e.clientY - r.top) / r.height) * 100;
        specularRef.current.style.background = `radial-gradient(ellipse at ${px}% ${py}%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)`;
      }
    },
    [maxRotateX, maxRotateY],
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Skip tilt on touch-only devices (no fine pointer like a mouse/trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);

    const el = card; // non-null reference for the closure
    function loop() {
      rafId.current = requestAnimationFrame(loop);
      cRX.current += (tRX.current - cRX.current) * springFactor;
      cRY.current += (tRY.current - cRY.current) * springFactor;

      const scale = isOver.current ? hoverScale : 1.0;
      el.style.transform =
        `perspective(${perspective}px) rotateX(${cRX.current}deg) rotateY(${cRY.current}deg) scale(${scale})`;

      // Dynamic drop-shadow shifts with tilt
      const sx = cRY.current * 2.5;
      const sy = -cRX.current * 2.5 + 30;
      const sb = 60 + Math.abs(cRX.current) * 2 + Math.abs(cRY.current) * 2;
      el.style.filter =
        `drop-shadow(${sx}px ${sy}px ${sb}px rgba(0,0,0,0.7)) ` +
        `drop-shadow(0 4px 22px rgba(245,200,66,0.12))`;
    }

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, springFactor, hoverScale, perspective]);

  return { cardRef, specularRef };
}
