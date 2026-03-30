'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useScrollFraction } from '@/hooks/useScrollFraction';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import { useIOSViewportFix } from '@/hooks/useIOSViewportFix';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useCloudTransition } from '@/components/CloudTransitionProvider';
import { BP } from '@/lib/constants';

import LoadingScreen from '@/components/sections/LoadingScreen';
import BackgroundVideo from '@/components/sections/BackgroundVideo';
import CRTOverlay from '@/components/sections/CRTOverlay';
import HUD from '@/components/sections/HUD';
import TimelineSection from '@/components/sections/TimelineSection';
import ScrollContainer from '@/components/sections/ScrollContainer';
import DetailedPage from '@/components/sections/DetailedPage';

export default function PageClient() {
  const router = useRouter();
  const cloudRef = useCloudTransition();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollFraction = useScrollFraction();
  const { videoReady, bpStartFrac, bpEndFrac } = useVideoScrub(
    videoRef,
    scrollFraction,
  );
  useIOSViewportFix();

  // Mobile detection (stable across renders — only computed once)
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  );

  // Loading state
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const loadStartRef = useRef(Date.now());
  const loadDoneRef = useRef(false);

  // Loading simulation
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const loadSpeed = isMobile ? 0.025 : 0.05;
    const minLoadTime = isMobile ? 3000 : 1500;
    let raf: number;

    function tick() {
      if (loadDoneRef.current) return;

      setLoadProgress((prev) => {
        if (prev < 90) {
          return prev + (90 - prev) * loadSpeed;
        }
        return prev;
      });

      const elapsed = Date.now() - loadStartRef.current;
      if (videoReady && elapsed >= minLoadTime) {
        loadDoneRef.current = true;
        setLoadProgress(100);
        const remaining = Math.max(0, minLoadTime - elapsed);
        setTimeout(() => setLoadingHidden(true), remaining);
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
  }, [videoReady]);

  // Track whether user just returned from /world
  const [returnedFromWorld, setReturnedFromWorld] = useState(false);
  const welcomeBackShownRef = useRef(false);

  // Restore scroll position when returning from /world
  useEffect(() => {
    const shouldRestore = sessionStorage.getItem('restoreFromWorld');
    if (shouldRestore && bpEndFrac > 0) {
      sessionStorage.removeItem('restoreFromWorld');
      setReturnedFromWorld(true);
      welcomeBackShownRef.current = false;

      const scrollH =
        document.documentElement.scrollHeight - window.innerHeight;
      const midFrac = (bpStartFrac + bpEndFrac) / 2;
      window.scrollTo(0, midFrac * scrollH);

      // Uncover the shared cloud transition (already covering from /world page)
      requestAnimationFrame(() => {
        cloudRef.current?.uncover();
      });
    }
  }, [bpStartFrac, bpEndFrac, cloudRef]);

  // Dialog visible when scroll is in the dialog zone
  const showDialog =
    bpStartFrac > 0 &&
    scrollFraction >= bpStartFrac &&
    scrollFraction <= bpEndFrac;

  // Track that welcome-back dialog was actually displayed, then reset once user scrolls away
  useEffect(() => {
    if (returnedFromWorld && showDialog) {
      welcomeBackShownRef.current = true;
    }
    if (returnedFromWorld && welcomeBackShownRef.current && !showDialog) {
      const t = setTimeout(() => {
        setReturnedFromWorld(false);
        welcomeBackShownRef.current = false;
      }, 600);
      return () => clearTimeout(t);
    }
  }, [returnedFromWorld, showDialog]);

  // Mobile auto-scroll: first visit → dialog zone, after return → timeline
  useAutoScroll({
    isMobile,
    loadingHidden,
    bpStartFrac,
    returnedFromWorld,
    showDialog,
    timelineStartFrac: BP.TIMELINE_START,
    videoRef,
  });

  // "Enter the World" click handler
  const handleEnterWorld = useCallback(() => {
    cloudRef.current?.cover(() => {
      sessionStorage.setItem('navigatingToWorld', '1');
      router.push('/world');
    });
  }, [cloudRef, router]);

  // Timeline visibility
  const timelineVisible = scrollFraction >= BP.TIMELINE_START;

  return (
    <>
      <LoadingScreen progress={loadProgress} hidden={loadingHidden} />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <BackgroundVideo ref={videoRef} />
      </div>
      <CRTOverlay />

      {loadingHidden && (
        <>
          <HUD scrollFraction={scrollFraction} />

          <DetailedPage
            visible={showDialog}
            onEnter={handleEnterWorld}
            variant={returnedFromWorld ? 'welcome-back' : 'quest'}
          />

          <TimelineSection
            visible={timelineVisible}
            scrollFraction={scrollFraction}
          />

          {timelineVisible && (
            <button
              onClick={handleEnterWorld}
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
              Explore the World
            </button>
          )}

        </>
      )}

      <ScrollContainer />

    </>
  );
}
