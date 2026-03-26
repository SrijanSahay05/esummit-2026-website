'use client';

import { useEffect, useRef } from 'react';

export default function DotGridOverlay() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dotGrid = gridRef.current;
    if (!dotGrid) return;
    const colors = ['rgba(67,152,205,0.08)', 'rgba(216,45,23,0.08)', 'rgba(71,166,57,0.08)', 'rgba(237,203,31,0.08)'];
    let ci = 0;
    const interval = setInterval(() => {
      ci = (ci + 1) % colors.length;
      const x = Math.floor(Math.random() * 24);
      const y = Math.floor(Math.random() * 24);
      dotGrid.style.backgroundImage = `radial-gradient(circle, ${colors[ci]} 1px, transparent 1px)`;
      dotGrid.style.backgroundPosition = `${x}px ${y}px`;
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="scanlines" />
      <div className="dot-grid" ref={gridRef} />
    </>
  );
}
