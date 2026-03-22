'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';
import { BP, VIDEO_FREEZE_TIME } from '@/lib/constants';

/**
 * Manages scroll-synced video scrubbing with mobile unlock and seek-stuck recovery.
 *
 * @param videoRef - Ref to the <video> element
 * @param scrollFraction - Current scroll fraction (0-1)
 * @returns videoReady - Whether the video is ready for scrubbing
 */
export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  scrollFraction: number,
): { videoReady: boolean } {
  const [videoReady, setVideoReady] = useState(false);
  const videoUnlocked = useRef(false);
  const videoSeeking = useRef(false);
  const seekStart = useRef<number | null>(null);

  // Set up video readiness listeners and mobile unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Desktop: canplaythrough is ideal
    const onCanPlayThrough = () => {
      setVideoReady(true);
    };

    // Mobile fallback: loadeddata with readyState >= 2 (HAVE_CURRENT_DATA)
    const onLoadedData = () => {
      if (video.readyState >= 2) setVideoReady(true);
    };

    // Extra fallback: loadedmetadata — try to unlock with play+pause
    const onLoadedMetadata = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            video.currentTime = 0;
            setVideoReady(true);
            videoUnlocked.current = true;
          })
          .catch(() => {
            if (video.readyState >= 1) setVideoReady(true);
          });
      }
    };

    // Track seeking state to avoid queuing multiple seeks on mobile
    const onSeeking = () => {
      videoSeeking.current = true;
    };
    const onSeeked = () => {
      videoSeeking.current = false;
    };

    // Mobile: periodically check buffer progress
    const onProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        if (bufferedEnd >= (video.duration || 20) * 0.8) {
          setVideoReady(true);
        }
      }
    };

    video.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
    video.addEventListener('loadeddata', onLoadedData, { once: true });
    video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('progress', onProgress);

    // Mobile: unlock video on first user interaction (touch/scroll)
    function unlockVideoOnInteraction() {
      if (videoUnlocked.current || !video) return;
      videoUnlocked.current = true;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          video!.pause();
          video!.currentTime = 0;
          setVideoReady(true);
        }).catch(() => {});
      }
    }

    document.addEventListener('touchstart', unlockVideoOnInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener('scroll', unlockVideoOnInteraction, {
      once: true,
      passive: true,
    });

    return () => {
      video.removeEventListener('canplaythrough', onCanPlayThrough);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeking', onSeeking);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('progress', onProgress);
      document.removeEventListener('touchstart', unlockVideoOnInteraction);
      document.removeEventListener('scroll', unlockVideoOnInteraction);
    };
  }, [videoRef]);

  // Scrub video based on scroll fraction
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady || !video.duration) return;

    // On mobile, skip if a seek is already in progress to avoid jank
    // But reset seeking flag if stuck for too long (mobile can get stuck)
    if (videoSeeking.current) {
      if (!seekStart.current) seekStart.current = Date.now();
      if (Date.now() - seekStart.current > 500) {
        videoSeeking.current = false;
        seekStart.current = null;
      } else {
        return;
      }
    } else {
      seekStart.current = null;
    }

    let targetTime: number;

    if (scrollFraction <= BP.GEM_START) {
      // Before radial: scroll 0 -> GEM_START maps to video 0 -> VIDEO_FREEZE_TIME
      const t = scrollFraction / BP.GEM_START;
      targetTime = t * VIDEO_FREEZE_TIME;
    } else if (scrollFraction <= BP.GEM_END) {
      // During radial: freeze at VIDEO_FREEZE_TIME
      targetTime = VIDEO_FREEZE_TIME;
    } else if (scrollFraction <= BP.TIMELINE_START) {
      // After radial, before timeline: scroll GEM_END -> TIMELINE_START maps to video 12s -> end
      const t =
        (scrollFraction - BP.GEM_END) / (BP.TIMELINE_START - BP.GEM_END);
      targetTime = VIDEO_FREEZE_TIME + t * (video.duration - VIDEO_FREEZE_TIME);
    } else {
      // During timeline: freeze at end of video
      targetTime = video.duration;
    }

    if (Math.abs(video.currentTime - targetTime) > 0.05) {
      video.currentTime = targetTime;
    }
  }, [videoRef, scrollFraction, videoReady]);

  return { videoReady };
}
