'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import { TOTAL_FRAMES as FRAME_COUNT, MAX_PROGRESS } from '@/lib/constants';

gsap.registerPlugin(Observer);

// ── Constants ────────────────────────────────────────────────────────
const TOTAL_FRAMES = FRAME_COUNT; // 493
const PRIORITY_FRAMES = 60; // strict Promise.all wait for these
const DESKTOP_PATH = '/videos/frames/desktop/frame_';
const MOBILE_PATH = '/videos/frames/mobile/frame_';

// Scroll sensitivity tuning
const WHEEL_SPEED = 0.0008;
const TOUCH_SPEED_DESKTOP = 0.002;
const TOUCH_SPEED_MOBILE = 0.001; // slower than desktop, but fluid enough to feel natural
const LERP_SPEED = 0.12;

// ── Types ────────────────────────────────────────────────────────────
interface BackgroundCanvasProps {
  onReady: () => void;
  onScrollFractionChange: (frac: number) => void;
  scrollToRef?: React.MutableRefObject<((target: number, instant?: boolean) => void) | null>;
  /** Observer only activates when enabled (after user clicks "Start Experience") */
  enabled?: boolean;
}

function pad(n: number): string {
  return String(n).padStart(4, '0');
}

// ═══════════════════════════════════════════════════════════════════════
// useFramePreloader — Promise.all-based progressive preloading
// ═══════════════════════════════════════════════════════════════════════
function useFramePreloader(basePath: string, totalFrames: number) {
  // Strong ref array — prevents GC of Image objects for the component lifetime
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());
  const lastGoodFrameRef = useRef(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(totalFrames);
    const loadedSet = new Set<number>();
    let cancelled = false;

    // Assign to refs immediately — strong reference prevents GC
    imagesRef.current = images;
    loadedSetRef.current = loadedSet;

    // ── Load a single frame as a Promise ─────────────────────────────
    function loadFrame(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (!cancelled) {
            loadedSet.add(index);
            setLoadProgress(loadedSet.size / totalFrames);
          }
          resolve();
        };
        img.onerror = () => resolve(); // resolve anyway, don't block
        img.src = `${basePath}${pad(index + 1)}.webp`;
        images[index] = img;
      });
    }

    // ── Phase 1: Strictly await first PRIORITY_FRAMES via Promise.all
    async function preload() {
      // Load priority frames in parallel, wait for ALL of them
      const priorityPromises: Promise<void>[] = [];
      for (let i = 0; i < PRIORITY_FRAMES && i < totalFrames; i++) {
        priorityPromises.push(loadFrame(i));
      }
      await Promise.all(priorityPromises);

      if (cancelled) return;
      setInitialLoadComplete(true);

      // ── Phase 2: Load remaining frames in background ───────────────
      for (let i = PRIORITY_FRAMES; i < totalFrames; i++) {
        if (cancelled) break;
        loadFrame(i); // fire-and-forget, no await
      }
    }

    preload();

    // Fallback: force ready after 8 seconds even if Promise.all hasn't resolved
    const fallbackTimer = setTimeout(() => {
      if (!cancelled) {
        setInitialLoadComplete(true);
      }
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      // Null out handlers but keep strong image refs (imagesRef.current)
      for (let i = 0; i < images.length; i++) {
        if (images[i]) {
          images[i].onload = null;
          images[i].onerror = null;
        }
      }
    };
  }, [basePath, totalFrames]);

  return { imagesRef, loadedSetRef, lastGoodFrameRef, initialLoadComplete, loadProgress };
}

// ═══════════════════════════════════════════════════════════════════════
// BackgroundCanvas Component
// ═══════════════════════════════════════════════════════════════════════
export default function BackgroundCanvas({
  onReady,
  onScrollFractionChange,
  scrollToRef,
  enabled = true,
}: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Virtual scroll progress
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    setIsMobile(
      window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
    );
  }, []);

  const basePath = isMobile ? MOBILE_PATH : DESKTOP_PATH;

  const { imagesRef, loadedSetRef, lastGoodFrameRef, initialLoadComplete, loadProgress } =
    useFramePreloader(basePath, TOTAL_FRAMES);

  // ── Draw frame with last-known-good fallback ───────────────────────
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Try the exact requested frame
      const img = imagesRef.current[frameIndex];
      if (img?.complete && img.naturalWidth > 0) {
        drawImageToCanvas(ctx, img, canvas.width, canvas.height);
        lastGoodFrameRef.current = frameIndex;
        return;
      }

      // Fallback: draw the last successfully drawn frame
      const fallbackIdx = lastGoodFrameRef.current;
      const fbImg = imagesRef.current[fallbackIdx];
      if (fbImg?.complete && fbImg.naturalWidth > 0) {
        drawImageToCanvas(ctx, fbImg, canvas.width, canvas.height);
      }
    },
    [imagesRef, lastGoodFrameRef],
  );

  // ── Resize canvas (retina-aware) ───────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // ── Fire onReady once priority frames are loaded ───────────────────
  useEffect(() => {
    if (initialLoadComplete) {
      drawFrame(0);
      onReady();
    }
  }, [initialLoadComplete, drawFrame, onReady]);

  // ── Expose scrollTo for external navigation ────────────────────────
  useEffect(() => {
    if (!scrollToRef) return;
    scrollToRef.current = (target: number, instant?: boolean) => {
      const clamped = Math.max(0, Math.min(MAX_PROGRESS, target));
      targetProgressRef.current = clamped;
      if (instant) {
        currentProgressRef.current = clamped;
      }
    };
    return () => {
      scrollToRef.current = null;
    };
  }, [scrollToRef]);

  // ── GSAP Observer — virtual scroll engine ──────────────────────────
  useEffect(() => {
    if (!initialLoadComplete || !enabled) return;

    let animating = true;

    function tick() {
      if (!animating) return;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current = current + diff * LERP_SPEED;
      } else {
        currentProgressRef.current = target;
      }

      const progress = currentProgressRef.current;
      onScrollFractionChange(progress);

      // Clamp frame index to the frame sequence range (progress 0→1)
      const frameFrac = Math.min(progress, 1);
      const frameIndex = Math.round(frameFrac * (TOTAL_FRAMES - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    }

    rafIdRef.current = requestAnimationFrame(tick);

    // Observer: wheel deltaY positive = scroll down = advance.
    // Touch: deltaY positive = finger down = swipe down = scroll UP intent → negate.
    const mobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      preventDefault: true,
      onChangeY(self) {
        const isWheel = self.event instanceof WheelEvent;
        const delta = isWheel ? self.deltaY : -self.deltaY;
        const speed = isWheel
          ? WHEEL_SPEED
          : mobile
            ? TOUCH_SPEED_MOBILE
            : TOUCH_SPEED_DESKTOP;
        targetProgressRef.current = Math.max(
          0,
          Math.min(MAX_PROGRESS, targetProgressRef.current + delta * speed),
        );
      },
    });

    return () => {
      animating = false;
      cancelAnimationFrame(rafIdRef.current);
      observer.kill();
    };
  }, [initialLoadComplete, enabled, drawFrame, onScrollFractionChange]);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100dvh',
          zIndex: 0,
        }}
      />
      {!initialLoadComplete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-pixel), monospace',
              fontSize: '0.85rem',
              color: '#4A90D9',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          >
            Loading System...
          </div>
          <div
            style={{
              width: '200px',
              height: '4px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.round(loadProgress * 100)}%`,
                background: 'linear-gradient(90deg, #1A5BC4, #4A90D9)',
                borderRadius: '2px',
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {Math.round(loadProgress * 100)}%
          </div>
        </div>
      )}
    </>
  );
}

function drawImageToCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const sw = cw / scale;
  const sh = ch / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}
