'use client';

import { useEffect, useRef } from 'react';
import { STAR_LAYERS, STAR_COLORS } from '@/lib/data/world-data';

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    STAR_LAYERS.forEach((layer) => {
      const el = container.querySelector(`#${layer.id}`);
      if (!el) return;
      el.innerHTML = '';
      for (let i = 0; i < layer.count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0];
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        if (Math.random() < layer.colorChance) {
          star.classList.add(STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]);
          star.style.opacity = (0.4 + Math.random() * 0.5).toString();
        } else {
          star.classList.add('star-white');
          star.style.opacity = (0.15 + Math.random() * 0.6).toString();
        }
        star.style.animation = `twinkle ${3 + Math.random() * 6}s ease-in-out ${Math.random() * 5}s infinite`;
        el.appendChild(star);
      }
    });

    // Add twinkle keyframe if not present
    if (!document.getElementById('twinkle-style')) {
      const style = document.createElement('style');
      style.id = 'twinkle-style';
      style.textContent = `@keyframes twinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.9; } }`;
      document.head.appendChild(style);
    }

    const handleResize = () => {
      // Re-create on resize
      STAR_LAYERS.forEach((layer) => {
        const el = container.querySelector(`#${layer.id}`);
        if (!el) return;
        el.innerHTML = '';
        for (let i = 0; i < layer.count; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
          const size = Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0];
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          if (Math.random() < layer.colorChance) {
            star.classList.add(STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]);
            star.style.opacity = (0.4 + Math.random() * 0.5).toString();
          } else {
            star.classList.add('star-white');
            star.style.opacity = (0.15 + Math.random() * 0.6).toString();
          }
          star.style.animation = `twinkle ${3 + Math.random() * 6}s ease-in-out ${Math.random() * 5}s infinite`;
          el.appendChild(star);
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="stars-container" ref={containerRef}>
      {STAR_LAYERS.map((layer) => (
        <div
          key={layer.id}
          className={`star-layer${layer.id === 'starsColored' ? ' star-colored' : ''}`}
          id={layer.id}
          data-speed={layer.speed}
        />
      ))}
    </div>
  );
}
