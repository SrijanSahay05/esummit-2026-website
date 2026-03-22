'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function CRTOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 128;
    canvas.height = 128;

    let lastTime = 0;
    const FPS = 8;
    const interval = 1000 / FPS;
    let rafId: number;

    function drawNoise(time: number) {
      rafId = requestAnimationFrame(drawNoise);
      if (time - lastTime < interval) return;
      lastTime = time;
      const imageData = ctx!.createImageData(128, 128);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12;
      }
      ctx!.putImageData(imageData, 0, 0);
    }

    if (!reducedMotion) {
      rafId = requestAnimationFrame(drawNoise);
    } else {
      // Draw a single frame of noise for reduced motion
      const imageData = ctx.createImageData(128, 128);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div id="crt-overlay" aria-hidden="true">
      <div className="crt-scanlines" />
      <div className="crt-rgb-grid" />
      <div className="crt-moving-line" />
      <div className="crt-vignette" />
      <div className="crt-flicker" />
      <canvas id="crt-noise" ref={canvasRef} />
    </div>
  );
}
