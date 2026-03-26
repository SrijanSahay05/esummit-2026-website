'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const lastTimeRef = useRef(0);

  useEffect(() => {
    function createTrail(e: MouseEvent) {
      const now = Date.now();
      if (now - lastTimeRef.current < 80) return;
      lastTimeRef.current = now;
      const trail = document.createElement('div');
      const colors = ['#4398cd', '#d82d17', '#47a639', '#edcb1f'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      trail.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:3px;height:3px;background:${color};pointer-events:none;z-index:9998;border-radius:50%;opacity:0.5;`;
      document.body.appendChild(trail);
      requestAnimationFrame(() => {
        trail.style.transition = 'opacity 0.4s, transform 0.4s';
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
      });
      setTimeout(() => trail.remove(), 450);
    }

    document.addEventListener('mousemove', createTrail);
    return () => document.removeEventListener('mousemove', createTrail);
  }, []);

  return null;
}
