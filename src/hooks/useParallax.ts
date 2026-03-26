'use client';

import { useEffect, useRef } from 'react';

export function useParallax(containerRef: React.RefObject<HTMLElement | null>) {
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);

  useEffect(() => {
    let animId: number;

    function onScroll() {
      targetScrollYRef.current = window.scrollY;
    }

    function animate() {
      scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.12;
      const container = containerRef.current;
      if (container) {
        container.querySelectorAll<HTMLElement>('.star-layer').forEach((layer) => {
          const speed = parseFloat(layer.dataset.speed || '0');
          layer.style.transform = `translateY(${scrollYRef.current * speed * -0.5}px)`;
        });
        const spriteLayer = container.querySelector<HTMLElement>('#spriteLayer');
        if (spriteLayer) {
          const speed = parseFloat(spriteLayer.dataset.speed || '0.25');
          spriteLayer.style.transform = `translateY(${scrollYRef.current * speed * -0.4}px)`;
        }
        container.querySelectorAll<HTMLElement>('.nebula').forEach((neb, i) => {
          const speed = 0.05 + i * 0.03;
          neb.style.transform = `translateY(${scrollYRef.current * speed * -0.3}px)`;
        });
        const moon = container.querySelector<HTMLElement>('#pixelMoon');
        if (moon) moon.style.transform = `translateY(${scrollYRef.current * 0.15}px)`;

        // Section-level parallax
        container.querySelectorAll<HTMLElement>('.maze-line').forEach((line, i) => {
          line.style.transform = `translateY(${-(scrollYRef.current * 0.02 * (i % 3 + 1))}px)`;
        });
        container.querySelectorAll<HTMLElement>('.tetris-block').forEach((block, i) => {
          block.style.marginLeft = `${Math.sin(scrollYRef.current * 0.003 + i) * 5}px`;
        });
        container.querySelectorAll<HTMLElement>('.rpg-sprite').forEach((sprite, i) => {
          sprite.style.transform = `translateY(${Math.sin(scrollYRef.current * 0.002 + i * 0.5) * 8}px)`;
        });
      }
      animId = requestAnimationFrame(animate);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, [containerRef]);
}
