'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useIOSViewportFix } from '@/hooks/useIOSViewportFix';
import { useCloudTransition } from '@/components/CloudTransitionProvider';
import {
  BP,
  TOTAL_FRAMES,
  DIALOG_START_FRAME,
  DIALOG_END_FRAME,
} from '@/lib/constants';

import LoadingScreen from '@/components/sections/LoadingScreen';
import BackgroundCanvas from '@/components/sections/BackgroundCanvas';
import CRTOverlay from '@/components/sections/CRTOverlay';
import HUD from '@/components/sections/HUD';
import HudOverlay from '@/components/sections/HudOverlay';
import TimelineSection from '@/components/sections/TimelineSection';
import DetailedPage from '@/components/sections/DetailedPage';

const BGM_PATH = '/audio/bgm.mp3';

export default function PageClient() {
  const router = useRouter();
  const cloudRef = useCloudTransition();
  useIOSViewportFix();

  // Lock body scroll while this page is mounted, restore on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.inset = '0';
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.width = '';
    };
  }, []);

  // Scroll fraction driven by GSAP Observer (via BackgroundCanvas callback)
  const [scrollFraction, setScrollFraction] = useState(0);

  // Ref for programmatic scroll-to (HUD nav, return-from-world)
  const scrollToRef = useRef<((target: number, instant?: boolean) => void) | null>(null);

  // ── Loading & interaction gate ─────────────────────────────────────
  const [loadingHidden, setLoadingHidden] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const loadStartRef = useRef(Date.now());
  const loadDoneRef = useRef(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [systemReady, setSystemReady] = useState(false);
  const [experienceStarted, setExperienceStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCanvasReady = useCallback(() => {
    setCanvasReady(true);
  }, []);

  // Mobile detection (stable across renders)
  const [isMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  );

  // Progress bar animation — fills to 100%, then shows button
  useEffect(() => {
    const loadSpeed = isMobile ? 0.025 : 0.05;
    const minLoadTime = isMobile ? 3000 : 1500;
    let raf: number;

    function tick() {
      if (loadDoneRef.current) return;

      setLoadProgress((prev) => {
        if (prev < 90) return prev + (90 - prev) * loadSpeed;
        return prev;
      });

      const elapsed = Date.now() - loadStartRef.current;
      if (canvasReady && elapsed >= minLoadTime) {
        loadDoneRef.current = true;
        setLoadProgress(100);
        setTimeout(() => setSystemReady(true), 300);
        return;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    const fallback = setTimeout(() => {
      if (!loadDoneRef.current) {
        loadDoneRef.current = true;
        setLoadProgress(100);
        setTimeout(() => setSystemReady(true), 300);
      }
    }, 8000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [canvasReady, isMobile]);

  // ── "Initialize System" click — ALWAYS required for audio to work ──
  const handleStart = useCallback(() => {
    // Play BGM — user gesture guarantees autoplay policy is satisfied
    try {
      const audio = new Audio(BGM_PATH);
      audio.loop = true;
      audio.volume = 0.2;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } catch {
      // Audio not available — continue without it
    }

    // Hide loading screen & enable scroll
    setLoadingHidden(true);
    setExperienceStarted(true);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ── Return from /world ─────────────────────────────────────────────
  const [returnedFromWorld, setReturnedFromWorld] = useState(false);
  const welcomeBackShownRef = useRef(false);

  useEffect(() => {
    const shouldRestore = sessionStorage.getItem('restoreFromWorld');
    if (shouldRestore) {
      sessionStorage.removeItem('restoreFromWorld');
      setReturnedFromWorld(true);
      welcomeBackShownRef.current = false;

      // Scroll to the midpoint of the dialog zone (frame 265–325)
      const midFrame = (DIALOG_START_FRAME + DIALOG_END_FRAME) / 2;
      const midFrac = midFrame / (TOTAL_FRAMES - 1);
      scrollToRef.current?.(midFrac, true);

      requestAnimationFrame(() => {
        cloudRef.current?.uncover();
      });
    }
  }, [cloudRef]);

  // Compute current frame from scroll fraction (progress 0->1 = frames 0->492)
  const currentFrame = Math.round(Math.min(scrollFraction, 1) * (TOTAL_FRAMES - 1));

  // Dialog visible when current frame is in the dialog zone (265–325)
  const showDialog =
    currentFrame >= DIALOG_START_FRAME && currentFrame <= DIALOG_END_FRAME;

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

  // "Enter the World" click handler
  const handleEnterWorld = useCallback(() => {
    cloudRef.current?.cover(() => {
      sessionStorage.setItem('navigatingToWorld', '1');
      router.push('/world');
    });
  }, [cloudRef, router]);

  // HUD nav handler — drives virtual scroll
  const handleNavClick = useCallback((target: number) => {
    scrollToRef.current?.(target);
  }, []);

  // Timeline: hidden until frame 492, then visible when progress >= 1.0
  const timelineVisible = scrollFraction >= BP.TIMELINE_START;

  return (
    <div className="scroll-story-viewport">
      <LoadingScreen
        progress={loadProgress}
        hidden={loadingHidden}
        ready={systemReady}
        onStart={handleStart}
      />

      <BackgroundCanvas
        onReady={handleCanvasReady}
        onScrollFractionChange={setScrollFraction}
        scrollToRef={scrollToRef}
        enabled={experienceStarted}
      />

      <CRTOverlay />
      <HudOverlay />

      {loadingHidden && (
        <>
          <HUD
            scrollFraction={scrollFraction}
            onNavClick={handleNavClick}
          />

          <DetailedPage
            visible={showDialog}
            onEnter={handleEnterWorld}
            variant={returnedFromWorld ? 'welcome-back' : 'quest'}
          />

          <TimelineSection
            visible={timelineVisible}
            scrollFraction={scrollFraction}
          />
        </>
      )}
    </div>
  );
}
