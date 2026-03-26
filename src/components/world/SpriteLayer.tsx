'use client';

import { useEffect, useRef } from 'react';
import { SPRITE_TYPES, SPRITE_SIZE_CLASSES } from '@/lib/data/world-data';

export default function SpriteLayer() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.innerHTML = '';

    SPRITE_TYPES.forEach((s) => {
      for (let i = 0; i < s.count; i++) {
        const el = document.createElement('div');
        const sizeClass = SPRITE_SIZE_CLASSES[Math.floor(Math.random() * SPRITE_SIZE_CLASSES.length)];
        el.className = `space-sprite ${s.type} ${sizeClass}`;
        el.textContent = s.char;
        el.style.left = `${5 + Math.random() * 90}%`;
        el.style.top = `${Math.random() * 95}%`;
        el.style.animationDelay = `${Math.random() * 5}s`;
        el.style.animationDuration = `${3 + Math.random() * 5}s`;
        layer.appendChild(el);
      }
    });

    const handleResize = () => {
      layer.innerHTML = '';
      SPRITE_TYPES.forEach((s) => {
        for (let i = 0; i < s.count; i++) {
          const el = document.createElement('div');
          const sizeClass = SPRITE_SIZE_CLASSES[Math.floor(Math.random() * SPRITE_SIZE_CLASSES.length)];
          el.className = `space-sprite ${s.type} ${sizeClass}`;
          el.textContent = s.char;
          el.style.left = `${5 + Math.random() * 90}%`;
          el.style.top = `${Math.random() * 95}%`;
          el.style.animationDelay = `${Math.random() * 5}s`;
          el.style.animationDuration = `${3 + Math.random() * 5}s`;
          layer.appendChild(el);
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div className="sprite-layer" id="spriteLayer" data-speed="0.25" ref={layerRef} />;
}
