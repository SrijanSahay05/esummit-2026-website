'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Full CRT display effect overlay.
 *
 * Layers (bottom to top):
 * 1. Phosphor glow — subtle green/blue tinted bloom around content
 * 2. Scanlines — horizontal lines that scroll slowly
 * 3. RGB pixel grid — fine dot pattern simulating phosphor dots
 * 4. Vignette — darkened curved edges
 * 5. Screen flicker — very subtle brightness oscillation
 * 6. Noise — faint static grain
 *
 * All layers are pure CSS/canvas — no image dependencies.
 * Respects prefers-reduced-motion by disabling animated layers.
 */
export function CRTEffect() {
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animated noise grain
  useEffect(() => {
    if (prefersReducedMotion || !noiseCanvasRef.current) return;

    const canvas = noiseCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Small canvas, scaled up via CSS for performance
    canvas.width = 128;
    canvas.height = 128;

    let animationId: number;
    let lastTime = 0;
    const FPS = 8; // Low FPS for that retro noise feel
    const interval = 1000 / FPS;

    const drawNoise = (time: number) => {
      animationId = requestAnimationFrame(drawNoise);

      if (time - lastTime < interval) return;
      lastTime = time;

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12; // Very faint
      }

      ctx.putImageData(imageData, 0, 0);
    };

    animationId = requestAnimationFrame(drawNoise);
    return () => cancelAnimationFrame(animationId);
  }, [prefersReducedMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1: Scanlines — horizontal lines */}
      <div className="crt-scanlines absolute inset-0" />

      {/* Layer 2: RGB phosphor dot grid */}
      <div className="crt-rgb-grid absolute inset-0" />

      {/* Layer 3: Animated moving scanline band */}
      {!prefersReducedMotion && (
        <div className="crt-moving-line absolute inset-0" />
      )}

      {/* Layer 4: Vignette — curved dark edges */}
      <div className="crt-vignette absolute inset-0" />

      {/* Layer 5: Screen flicker */}
      {!prefersReducedMotion && (
        <div className="crt-flicker absolute inset-0" />
      )}

      {/* Layer 6: Noise grain */}
      {!prefersReducedMotion && (
        <canvas
          ref={noiseCanvasRef}
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          style={{ imageRendering: 'pixelated' }}
        />
      )}
    </div>
  );
}
