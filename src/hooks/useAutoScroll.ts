'use client';

import { useRef, useEffect, useCallback, type RefObject } from 'react';

/**
 * When true, useVideoScrub should skip seeking — the video is playing natively.
 * Exported so useVideoScrub can read it.
 */
export const autoScrollState = { playing: false };

interface AutoScrollOptions {
  isMobile: boolean;
  loadingHidden: boolean;
  bpStartFrac: number;
  returnedFromWorld: boolean;
  showDialog: boolean;
  timelineStartFrac: number;
  videoRef: RefObject<HTMLVideoElement | null>;
}

function supportsRVFC(video: HTMLVideoElement): boolean {
  return 'requestVideoFrameCallback' in video;
}

/**
 * During auto-scroll, plays the video natively (hardware-decoded, smooth 60/120fps)
 * and drives the scroll position to match the video's currentTime.
 * Uses requestVideoFrameCallback when available for frame-perfect sync.
 */
function animateScrollWithVideo(
  video: HTMLVideoElement,
  scrollH: number,
  timelineStartFrac: number,
  targetFrac: number,
  onDone?: () => void,
): AbortController {
  const ac = new AbortController();
  let rafId = 0;
  let rvfcId = 0;
  const useRVFC = supportsRVFC(video);

  // Cancel on any touch
  function onTouch() {
    ac.abort();
  }
  window.addEventListener('touchstart', onTouch, { once: true, passive: true });

  // Mark native playback active
  autoScrollState.playing = true;

  // Start native video playback
  const playPromise = video.play();
  if (playPromise) {
    playPromise.catch(() => {
      ac.abort();
    });
  }

  function tick() {
    if (ac.signal.aborted) {
      cleanup();
      return;
    }

    // Derive scroll position from video's current time
    const t = video.currentTime / video.duration;
    const scrollFrac = t * timelineStartFrac;

    window.scrollTo(0, scrollFrac * scrollH);

    // Stop when we've reached the target
    if (scrollFrac >= targetFrac - 0.005) {
      video.pause();
      window.scrollTo(0, targetFrac * scrollH);
      cleanup();
      if (onDone) onDone();
      return;
    }

    // Schedule next frame
    if (useRVFC) {
      rvfcId = video.requestVideoFrameCallback(tick);
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  function cleanup() {
    autoScrollState.playing = false;
    video.pause();
    window.removeEventListener('touchstart', onTouch);
  }

  ac.signal.addEventListener('abort', () => {
    if (useRVFC) {
      video.cancelVideoFrameCallback(rvfcId);
    }
    cancelAnimationFrame(rafId);
    cleanup();
  });

  // Start the loop
  if (useRVFC) {
    rvfcId = video.requestVideoFrameCallback(tick);
  } else {
    rafId = requestAnimationFrame(tick);
  }

  return ac;
}

/**
 * Fallback: linear rAF-based scroll (used when video isn't available).
 */
function animateScrollLinear(
  startY: number,
  endY: number,
  duration: number,
  onDone?: () => void,
): AbortController {
  const ac = new AbortController();
  const startTime = performance.now();
  let rafId = 0;

  function onTouch() { ac.abort(); }
  window.addEventListener('touchstart', onTouch, { once: true, passive: true });

  function tick(now: number) {
    if (ac.signal.aborted) {
      window.removeEventListener('touchstart', onTouch);
      return;
    }
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + (endY - startY) * progress);
    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      window.removeEventListener('touchstart', onTouch);
      if (onDone) onDone();
    }
  }

  rafId = requestAnimationFrame(tick);
  ac.signal.addEventListener('abort', () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('touchstart', onTouch);
  });
  return ac;
}

export function useAutoScroll({
  isMobile,
  loadingHidden,
  bpStartFrac,
  returnedFromWorld,
  showDialog,
  timelineStartFrac,
  videoRef,
}: AutoScrollOptions) {
  const initialScrollDone = useRef(false);
  const returnScrollPending = useRef(false);
  const returnScrollFired = useRef(false);
  const activeController = useRef<AbortController | null>(null);

  const cancelActive = useCallback(() => {
    if (activeController.current) {
      activeController.current.abort();
      activeController.current = null;
    }
  }, []);

  // Phase 1: Initial visit — play video natively, scroll follows
  useEffect(() => {
    if (!isMobile || initialScrollDone.current) return;
    if (!loadingHidden || bpStartFrac <= 0) return;

    const currentFrac =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);
    if (currentFrac > 0.05) {
      initialScrollDone.current = true;
      return;
    }

    initialScrollDone.current = true;

    const video = videoRef.current;
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;

    const timer = setTimeout(() => {
      if (video && video.duration > 0) {
        video.currentTime = 0;
        activeController.current = animateScrollWithVideo(
          video,
          scrollH,
          timelineStartFrac,
          bpStartFrac,
        );
      } else {
        const targetY = bpStartFrac * scrollH;
        activeController.current = animateScrollLinear(
          window.scrollY,
          targetY,
          5000,
        );
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      cancelActive();
    };
  }, [isMobile, loadingHidden, bpStartFrac, cancelActive, videoRef, timelineStartFrac]);

  // Phase 2a: Mark return-scroll pending
  useEffect(() => {
    if (!isMobile) return;
    if (returnedFromWorld && showDialog) {
      returnScrollPending.current = true;
      returnScrollFired.current = false;
    }
  }, [isMobile, returnedFromWorld, showDialog]);

  // Phase 2b: After welcome-back dialog dismissed, scroll to timeline
  useEffect(() => {
    if (!isMobile) return;
    if (!returnScrollPending.current || returnScrollFired.current) return;
    if (showDialog) return;

    returnScrollPending.current = false;
    returnScrollFired.current = true;

    const video = videoRef.current;
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = timelineStartFrac * scrollH;

    if (window.scrollY >= targetY - 50) return;

    const timer = setTimeout(() => {
      if (video && video.duration > 0) {
        activeController.current = animateScrollWithVideo(
          video,
          scrollH,
          timelineStartFrac,
          timelineStartFrac,
        );
      } else {
        activeController.current = animateScrollLinear(
          window.scrollY,
          targetY,
          3000,
        );
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, showDialog, timelineStartFrac]);

  useEffect(() => cancelActive, [cancelActive]);
}
