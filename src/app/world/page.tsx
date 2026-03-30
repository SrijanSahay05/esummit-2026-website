'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useCloudTransition } from '@/components/CloudTransitionProvider';
import LoadingScreen from '@/components/sections/LoadingScreen';

const WorldPageClient = dynamic(() => import('@/components/world/WorldPageClient'), {
  ssr: false,
});

export default function WorldPage() {
  const cloudRef = useCloudTransition();
  const router = useRouter();

  // Mobile detection (stable, computed once)
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  );

  // Track if user came from main page (read once, persists across re-renders)
  const cameFromMainRef = useRef(
    typeof window !== 'undefined' && sessionStorage.getItem('navigatingToWorld') === '1',
  );

  // Loading state for mobile
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const loadStartRef = useRef(Date.now());
  const loadDoneRef = useRef(false);
  const [worldReady, setWorldReady] = useState(false);

  // Mobile loading simulation (mirrors main site loading screen)
  useEffect(() => {
    if (!isMobile) {
      setLoadingHidden(true);
      return;
    }

    const minLoadTime = 2500;
    let raf: number;

    function tick() {
      if (loadDoneRef.current) return;

      setLoadProgress((prev) => {
        if (prev < 90) return prev + (90 - prev) * 0.025;
        return prev;
      });

      const elapsed = Date.now() - loadStartRef.current;
      if (worldReady && elapsed >= minLoadTime) {
        loadDoneRef.current = true;
        setLoadProgress(100);
        setTimeout(() => setLoadingHidden(true), 300);
        return;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    const fallback = setTimeout(() => {
      if (!loadDoneRef.current) {
        loadDoneRef.current = true;
        setLoadProgress(100);
        setTimeout(() => setLoadingHidden(true), 300);
      }
    }, 8000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [isMobile, worldReady]);

  // Clear sessionStorage flag once on mount
  useEffect(() => {
    if (cameFromMainRef.current) {
      sessionStorage.removeItem('navigatingToWorld');
    }
  }, []);

  // Desktop: uncover clouds immediately if came from main page
  useEffect(() => {
    if (isMobile) return;
    if (!cameFromMainRef.current) return;

    const timer = setTimeout(() => {
      cloudRef.current?.uncover();
    }, 150);
    return () => clearTimeout(timer);
  }, [cloudRef, isMobile]);

  // Mobile: uncover clouds after loading screen hides
  useEffect(() => {
    if (!isMobile) return;
    if (!loadingHidden) return;

    const timer = setTimeout(() => {
      cloudRef.current?.uncover();
    }, 100);
    return () => clearTimeout(timer);
  }, [cloudRef, isMobile, loadingHidden]);

  const handleReturn = useCallback(() => {
    sessionStorage.setItem('restoreFromWorld', '1');
    cloudRef.current?.cover(() => {
      router.push('/');
    });
  }, [cloudRef, router]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000' }}>
      {isMobile && <LoadingScreen progress={loadProgress} hidden={loadingHidden} />}

      <WorldPageClient onReady={() => setWorldReady(true)} />

      <button
        onClick={handleReturn}
        className="back-to-bits-btn"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          padding: '14px 36px',
          fontFamily: 'var(--font-pixel), monospace',
          fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #E87A20, #C43030)',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(232,122,32,0.4)',
        }}
      >
        Get Back to BITS
      </button>
    </div>
  );
}
