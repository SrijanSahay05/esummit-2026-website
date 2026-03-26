'use client';

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useEffect,
} from 'react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
export interface CloudTransitionHandle {
  /** Cover the screen with clouds, fire onCovered when fully hidden, then exit and fire onDone. */
  play: (onCovered?: () => void, onDone?: () => void) => void;
  /** Start with clouds already covering, then animate them off. */
  uncover: (onDone?: () => void) => void;
}

/* ──────────────────────────────────────────────
   Pixel-cloud shape data (col, row block coords)
   ────────────────────────────────────────────── */
interface Shape {
  w: number;
  h: number;
  b: [number, number][];
}

const SHAPES: Shape[] = [
  {w:14,h:9,b:[[2,0],[3,0],[4,0],[5,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8]]},
  {w:18,h:7,b:[[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[15,5],[16,5],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6]]},
  {w:10,h:11,b:[[3,0],[4,0],[5,0],[6,0],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[3,10],[4,10],[5,10],[6,10]]},
  {w:16,h:8,b:[[1,0],[2,0],[3,0],[4,0],[9,0],[10,0],[11,0],[12,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[15,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[15,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7]]},
  {w:9,h:6,b:[[2,0],[3,0],[4,0],[5,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[2,5],[3,5],[4,5],[5,5],[6,5]]},
  {w:20,h:6,b:[[3,0],[4,0],[5,0],[6,0],[7,0],[10,0],[11,0],[12,0],[13,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2],[16,2],[17,2],[18,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[18,4],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[15,5]]},
  {w:12,h:8,b:[[4,0],[5,0],[6,0],[7,0],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7]]},
  {w:11,h:9,b:[[3,0],[4,0],[5,0],[6,0],[7,0],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[3,8],[4,8],[5,8],[6,8],[7,8]]},
];

/* ──────────────────────────────────────────────
   SVG builder – renders one pixel-cloud
   ────────────────────────────────────────────── */
function makeCloudSVG(shape: Shape, cellPx: number): string {
  const W = shape.w * cellPx;
  const H = shape.h * cellPx;
  const set = new Set(shape.b.map(([c, r]) => `${c},${r}`));
  let rects = '';
  for (const [c, r] of shape.b) {
    const hasAbove = set.has(`${c},${r - 1}`);
    const hasBelow = set.has(`${c},${r + 1}`);
    let fill = '#ffffff';
    if (!hasAbove) fill = '#dff6fa';
    if (hasAbove && !hasBelow) fill = '#aee8f0';
    rects += `<rect x="${c * cellPx}" y="${r * cellPx}" width="${cellPx}" height="${cellPx}" fill="${fill}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${rects}</svg>`;
}

/* ──────────────────────────────────────────────
   Cloud placement data
   ────────────────────────────────────────────── */
interface CloudData {
  shape: Shape;
  cellPx: number;
  x: number;
  y: number;
  cloudW: number;
  cloudH: number;
  fromLeft: boolean;
  delay: number;
}

function buildCloudData(): CloudData[] {
  const VW = window.innerWidth;
  const VH = window.innerHeight;
  const NUM_ROWS = 4;
  const V_OVERLAP = 0.35;
  const H_GAP = -0.12;
  const BLEED = 200;
  const Y_JITTER = 0.12;
  const bandH = Math.round((VH / NUM_ROWS) * (1 + V_OVERLAP));
  const all: CloudData[] = [];

  for (let row = 0; row < NUM_ROWS; row++) {
    const fromLeft = row % 2 === 0;
    const bandTop = Math.round(row * (VH / NUM_ROWS) - bandH * V_OVERLAP * 0.4);
    let x = -BLEED;
    let si = (row * 2) % SHAPES.length;

    while (x < VW + BLEED) {
      const shape = SHAPES[si % SHAPES.length];
      const sizeRand = 0.85 + Math.random() * 0.3;
      const cellPx = Math.max(5, Math.round((bandH / shape.h) * sizeRand));
      const cloudW = shape.w * cellPx;
      const cloudH = shape.h * cellPx;
      const yJitter = Math.round((Math.random() - 0.5) * bandH * Y_JITTER);
      const finalY = bandTop + yJitter;
      const progress = fromLeft
        ? (x + BLEED) / (VW + BLEED * 2)
        : 1 - (x + BLEED) / (VW + BLEED * 2);
      const delay = progress * 0.3 + row * 0.035;

      all.push({ shape, cellPx, x, y: finalY, cloudW, cloudH, fromLeft, delay });
      x += Math.round(cloudW * (1 + H_GAP));
      si++;
    }
  }
  return all;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
const CloudTransition = forwardRef<CloudTransitionHandle>((_, ref) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isRunning = useRef(false);

  const clearClouds = useCallback(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;
    curtain.querySelectorAll('.cloud-wrap').forEach((el) => el.remove());
  }, []);

  const buildAndInsert = useCallback((): HTMLDivElement[] => {
    const curtain = curtainRef.current;
    if (!curtain) return [];
    clearClouds();

    const VW = window.innerWidth;
    const BLEED = 200;
    const clouds = buildCloudData();
    const wraps: HTMLDivElement[] = [];

    for (const cloud of clouds) {
      const wrap = document.createElement('div');
      wrap.className = 'cloud-wrap';
      Object.assign(wrap.style, {
        position: 'absolute',
        willChange: 'transform',
        lineHeight: '0',
        fontSize: '0',
        left: cloud.x + 'px',
        top: cloud.y + 'px',
        width: cloud.cloudW + 'px',
        height: cloud.cloudH + 'px',
      });

      const offX = cloud.fromLeft
        ? -(cloud.x + cloud.cloudW + BLEED + 60)
        : VW - cloud.x + BLEED + 60;

      wrap.style.transform = `translateX(${offX}px)`;
      wrap.style.opacity = '0';
      wrap.innerHTML = makeCloudSVG(cloud.shape, cloud.cellPx);
      wrap.dataset.offX = String(offX);
      wrap.dataset.delay = String(cloud.delay);

      // Pixel-crisp rendering
      const svg = wrap.querySelector('svg');
      if (svg) {
        svg.style.display = 'block';
        svg.style.imageRendering = 'pixelated';
      }

      curtain.appendChild(wrap);
      wraps.push(wrap);
    }
    return wraps;
  }, [clearClouds]);

  /* ── play(): cover → callback → uncover ── */
  const play = useCallback(
    (onCovered?: () => void, onDone?: () => void) => {
      if (isRunning.current) return;
      isRunning.current = true;

      const curtain = curtainRef.current;
      const sky = skyRef.current;
      const bar = barRef.current;
      const text = textRef.current;
      if (!curtain || !sky) return;

      curtain.style.pointerEvents = 'all';
      sky.style.opacity = '1';
      sky.style.transition = 'none';

      const cloudEls = buildAndInsert();
      const IN_DUR = 700;
      const IN_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

      cloudEls.forEach((wrap) => {
        const ms = parseFloat(wrap.dataset.delay!) * 1000;
        setTimeout(() => {
          wrap.style.transition = `transform ${IN_DUR}ms ${IN_EASE}, opacity 90ms ease`;
          wrap.style.transform = 'translateX(0)';
          wrap.style.opacity = '1';
        }, ms);
      });

      const maxInDelay =
        Math.max(...cloudEls.map((w) => parseFloat(w.dataset.delay!))) * 1000;
      const coverDone = maxInDelay + IN_DUR + 60;

      setTimeout(() => {
        if (text) text.style.opacity = '1';
        if (bar) {
          bar.style.display = 'block';
          bar.style.width = '0%';
        }
        if (typeof onCovered === 'function') onCovered();

        let prog = 0;
        const barInt = setInterval(() => {
          prog = Math.min(prog + Math.random() * 13 + 4, 95);
          if (bar) {
            bar.style.transition = 'width 0.26s ease';
            bar.style.width = prog + '%';
          }
          if (prog >= 95) clearInterval(barInt);
        }, 250);

        const HOLD = 2000;
        const OUT_DUR = 580;
        const OUT_EASE = 'cubic-bezier(0.55, 0, 1, 0.45)';

        setTimeout(() => {
          clearInterval(barInt);
          if (bar) {
            bar.style.transition = 'width 0.1s ease';
            bar.style.width = '100%';
          }
          if (text) text.style.opacity = '0';

          sky.style.transition = 'opacity 0.35s ease 0.5s';
          sky.style.opacity = '0';

          cloudEls.forEach((wrap) => {
            const offX = parseFloat(wrap.dataset.offX!);
            const ms = parseFloat(wrap.dataset.delay!) * 480;
            setTimeout(() => {
              wrap.style.transition = `transform ${OUT_DUR}ms ${OUT_EASE}, opacity 140ms ease ${OUT_DUR - 160}ms`;
              wrap.style.transform = `translateX(${offX}px)`;
              wrap.style.opacity = '0';
            }, ms);
          });

          const maxOutDelay =
            Math.max(...cloudEls.map((w) => parseFloat(w.dataset.delay!))) *
            480;
          const exitDone = maxOutDelay + OUT_DUR + 160;

          setTimeout(() => {
            curtain.style.pointerEvents = 'none';
            if (bar) {
              bar.style.display = 'none';
              bar.style.width = '0%';
            }
            clearClouds();
            isRunning.current = false;
            if (typeof onDone === 'function') onDone();
          }, exitDone);
        }, HOLD);
      }, coverDone);
    },
    [buildAndInsert, clearClouds],
  );

  /* ── uncover(): start covered, animate clouds off ── */
  const uncover = useCallback(
    (onDone?: () => void) => {
      if (isRunning.current) return;
      isRunning.current = true;

      const curtain = curtainRef.current;
      const sky = skyRef.current;
      if (!curtain || !sky) return;

      curtain.style.pointerEvents = 'all';
      sky.style.opacity = '1';
      sky.style.transition = 'none';

      // Build clouds already in "covered" position
      const cloudEls = buildAndInsert();
      cloudEls.forEach((wrap) => {
        wrap.style.transform = 'translateX(0)';
        wrap.style.opacity = '1';
      });

      // Small delay then animate off
      const OUT_DUR = 580;
      const OUT_EASE = 'cubic-bezier(0.55, 0, 1, 0.45)';

      requestAnimationFrame(() => {
        setTimeout(() => {
          sky.style.transition = 'opacity 0.35s ease 0.5s';
          sky.style.opacity = '0';

          cloudEls.forEach((wrap) => {
            const offX = parseFloat(wrap.dataset.offX!);
            const ms = parseFloat(wrap.dataset.delay!) * 480;
            setTimeout(() => {
              wrap.style.transition = `transform ${OUT_DUR}ms ${OUT_EASE}, opacity 140ms ease ${OUT_DUR - 160}ms`;
              wrap.style.transform = `translateX(${offX}px)`;
              wrap.style.opacity = '0';
            }, ms);
          });

          const maxOutDelay =
            Math.max(...cloudEls.map((w) => parseFloat(w.dataset.delay!))) *
            480;
          const exitDone = maxOutDelay + OUT_DUR + 160;

          setTimeout(() => {
            curtain.style.pointerEvents = 'none';
            clearClouds();
            isRunning.current = false;
            if (typeof onDone === 'function') onDone();
          }, exitDone);
        }, 300);
      });
    },
    [buildAndInsert, clearClouds],
  );

  useImperativeHandle(ref, () => ({ play, uncover }), [play, uncover]);

  // Cleanup on unmount
  useEffect(() => () => clearClouds(), [clearClouds]);

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          ref={skyRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#150F2B',
            opacity: 0,
          }}
        />
      </div>

      {/* Loading bar */}
      <div
        ref={barRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          height: 5,
          width: '0%',
          background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.45))',
          zIndex: 10000,
          boxShadow: '0 0 10px rgba(255,255,255,0.85)',
          display: 'none',
        }}
      />

      {/* Loading text */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          bottom: 22,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          color: 'rgba(255,255,255,0.92)',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Loading...
      </div>
    </>
  );
});

CloudTransition.displayName = 'CloudTransition';

export default CloudTransition;
