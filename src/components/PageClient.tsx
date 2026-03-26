'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useScrollFraction } from '@/hooks/useScrollFraction';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import { useIOSViewportFix } from '@/hooks/useIOSViewportFix';
import { BP } from '@/lib/constants';

import LoadingScreen from '@/components/sections/LoadingScreen';
import BackgroundVideo from '@/components/sections/BackgroundVideo';
import CRTOverlay from '@/components/sections/CRTOverlay';
import HUD from '@/components/sections/HUD';
import TimelineSection from '@/components/sections/TimelineSection';
import InfoPinsSection from '@/components/sections/InfoPinsSection';
import InfoCardOverlay from '@/components/sections/InfoCardOverlay';
import InfoMenu from '@/components/sections/InfoMenu';
import ScrollContainer from '@/components/sections/ScrollContainer';
import ScrollDebugHUD from '@/components/sections/ScrollDebugHUD';
import DetailedPage from '@/components/sections/DetailedPage';
import CloudTransition, {
  type CloudTransitionHandle,
} from '@/components/CloudTransition';

export default function PageClient() {
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const cloudRef = useRef<CloudTransitionHandle>(null);
  const scrollFraction = useScrollFraction();
  const { videoReady, bpStartFrac, bpEndFrac } = useVideoScrub(
    videoRef,
    scrollFraction,
  );
  useIOSViewportFix();

  // Loading state
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const loadStartRef = useRef(Date.now());
  const loadDoneRef = useRef(false);

  // Dialog zone visibility (no scroll freeze)

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
    if (searchParams.get('restore') === '1' && bpEndFrac > 0) {
      setReturnedFromWorld(true);
      welcomeBackShownRef.current = false;

      const scrollH =
        document.documentElement.scrollHeight - window.innerHeight;
      // Scroll to the middle of the dialog zone so it's clearly visible
      const midFrac = (bpStartFrac + bpEndFrac) / 2;
      window.scrollTo(0, midFrac * scrollH);

      setTimeout(() => {
        cloudRef.current?.uncover();
      }, 100);

      window.history.replaceState({}, '', '/');
    }
  }, [searchParams, bpStartFrac, bpEndFrac]);

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
      // Delay reset so the welcome-back dialog fully closes before variant switches
      const t = setTimeout(() => {
        setReturnedFromWorld(false);
        welcomeBackShownRef.current = false;
      }, 600);
      return () => clearTimeout(t);
    }
  }, [returnedFromWorld, showDialog]);

  // "Enter the World" click handler
  const handleEnterWorld = useCallback(() => {
    cloudRef.current?.play(() => {
      window.location.href = '/world';
    });
  }, []);

  // Timeline visibility
  const timelineVisible = scrollFraction >= BP.TIMELINE_START;
  const infoPinsVisible = scrollFraction >= 0.95;
  const infoMenuVisible = scrollFraction >= BP.TIMELINE_START;

  // Info card state
  const [infoKey, setInfoKey] = useState<string | null>(null);

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

          <InfoPinsSection visible={infoPinsVisible} onPinClick={setInfoKey} />
          <InfoCardOverlay
            infoKey={infoKey}
            onClose={() => setInfoKey(null)}
          />
          <InfoMenu visible={infoMenuVisible} onSelect={setInfoKey} />
        </>
      )}

      <ScrollContainer />

      <CloudTransition ref={cloudRef} />

      {process.env.NODE_ENV === 'development' && (
        <ScrollDebugHUD scrollFraction={scrollFraction} videoRef={videoRef} />
      )}
    </>
  );
}
