'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';
import { BP, VIDEO_BREAKPOINT_START, VIDEO_BREAKPOINT_END } from '@/lib/constants';
import { autoScrollState } from '@/hooks/useAutoScroll';
import { scrollFractionRef } from '@/hooks/useScrollFraction';

/**
 * Manages scroll-synced video scrubbing with mobile unlock, seek-stuck recovery,
 * and velocity-based native playback on mobile for smooth scrolling.
 */
export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  scrollFraction: number,
): { videoReady: boolean; bpStartFrac: number; bpEndFrac: number } {
  const [videoReady, setVideoReady] = useState(false);
  const [bpStartFrac, setBpStartFrac] = useState(0);
  const [bpEndFrac, setBpEndFrac] = useState(0);
  const videoUnlocked = useRef(false);
  const videoSeeking = useRef(false);
  const seekStart = useRef<number | null>(null);

  // Velocity tracking for mobile native playback
  const isMobileRef = useRef(false);
  const lastFracRef = useRef(0);
  const lastFracTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const nativePlayingRef = useRef(false);
  const nativeRafRef = useRef(0);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile once
  useEffect(() => {
    isMobileRef.current = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  // Set up video readiness listeners and mobile unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlayThrough = () => setVideoReady(true);
    const onLoadedData = () => {
      if (video.readyState >= 2) setVideoReady(true);
    };
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

    const onSeeking = () => { videoSeeking.current = true; };
    const onSeeked = () => { videoSeeking.current = false; };

    const onProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        if (bufferedEnd >= (video.duration || 20) * 0.8) {
          setVideoReady(true);
        }
      }
    };

    const onDurationChange = () => {
      if (video.duration && video.duration > 0) {
        const d = video.duration;
        setBpStartFrac(Math.min((VIDEO_BREAKPOINT_START / d) * BP.TIMELINE_START, BP.TIMELINE_START));
        setBpEndFrac(Math.min((VIDEO_BREAKPOINT_END / d) * BP.TIMELINE_START, BP.TIMELINE_START));
      }
    };
    if (video.duration && video.duration > 0) onDurationChange();
    video.addEventListener('durationchange', onDurationChange);

    video.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
    video.addEventListener('loadeddata', onLoadedData, { once: true });
    video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('progress', onProgress);

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
      once: true, passive: true,
    });
    document.addEventListener('scroll', unlockVideoOnInteraction, {
      once: true, passive: true,
    });

    return () => {
      video.removeEventListener('durationchange', onDurationChange);
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

  /**
   * Mobile: velocity-based native playback.
   * When user scrolls forward at a steady pace, play the video natively
   * with a matched playbackRate. Pause when they stop or reverse.
   */
  useEffect(() => {
    if (!isMobileRef.current) return;
    const video = videoRef.current;
    if (!video || !videoReady || !video.duration) return;
    if (autoScrollState.playing) return;

    const now = performance.now();
    const dt = now - lastFracTimeRef.current;
    const df = scrollFractionRef.current - lastFracRef.current;

    lastFracRef.current = scrollFractionRef.current;
    lastFracTimeRef.current = now;

    // Only compute velocity if we have a reasonable time delta
    if (dt > 0 && dt < 200) {
      // Velocity in scroll fraction per second
      velocityRef.current = df / (dt / 1000);
    }

    const velocity = velocityRef.current;
    const scrollFrac = scrollFractionRef.current;

    // If scrolling forward at a steady pace and within video zone
    if (velocity > 0.02 && scrollFrac <= BP.TIMELINE_START && scrollFrac > 0) {
      if (!nativePlayingRef.current) {
        // Start native playback
        nativePlayingRef.current = true;
        autoScrollState.playing = true;

        // Sync video to current scroll position before playing
        const targetTime = (scrollFrac / BP.TIMELINE_START) * video.duration;
        video.currentTime = targetTime;

        // Set playback rate to match scroll velocity
        // velocity is in frac/s, video maps 0..TIMELINE_START to 0..duration
        // So video speed = velocity * (duration / TIMELINE_START)
        const videoSpeed = velocity * (video.duration / BP.TIMELINE_START);
        // Clamp playback rate to reasonable range (0.5x - 3x)
        video.playbackRate = Math.max(0.5, Math.min(3, videoSpeed));

        const p = video.play();
        if (p) p.catch(() => { stopNativePlayback(video); });

        // Start sync loop: scroll follows video
        const vid = video; // non-null ref for closure
        function syncLoop() {
          if (!nativePlayingRef.current) return;
          const t = vid.currentTime / vid.duration;
          const frac = t * BP.TIMELINE_START;
          const scrollH = document.documentElement.scrollHeight - window.innerHeight;
          // Only update scroll if video is ahead of current scroll (don't fight user)
          if (Math.abs(frac - scrollFractionRef.current) > 0.002) {
            window.scrollTo(0, frac * scrollH);
          }
          nativeRafRef.current = requestAnimationFrame(syncLoop);
        }
        nativeRafRef.current = requestAnimationFrame(syncLoop);
      } else {
        // Update playback rate to follow changing velocity
        const videoSpeed = velocity * (video.duration / BP.TIMELINE_START);
        video.playbackRate = Math.max(0.5, Math.min(3, videoSpeed));
      }

      // Reset idle timeout
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        stopNativePlayback(video);
      }, 150);
    } else if (velocity <= 0.005 || velocity < 0) {
      // User stopped or scrolled backward — stop native playback
      if (nativePlayingRef.current) {
        stopNativePlayback(video);
      }
    }
  }, [videoRef, scrollFraction, videoReady]);

  function stopNativePlayback(video: HTMLVideoElement) {
    if (!nativePlayingRef.current) return;
    nativePlayingRef.current = false;
    autoScrollState.playing = false;
    video.pause();
    video.playbackRate = 1;
    cancelAnimationFrame(nativeRafRef.current);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
    // Snap video to current scroll position
    const frac = scrollFractionRef.current;
    if (frac <= BP.TIMELINE_START && video.duration) {
      video.currentTime = (frac / BP.TIMELINE_START) * video.duration;
    }
  }

  // Desktop + mobile fallback: seek-based scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady || !video.duration) return;

    // Skip while native playback is active (auto-scroll or velocity-based)
    if (autoScrollState.playing) return;

    // On mobile, skip if native velocity playback just handled this
    if (nativePlayingRef.current) return;

    // Seek-stuck guard: skip if seeking, but reset if stuck > 300ms
    if (videoSeeking.current) {
      if (!seekStart.current) seekStart.current = Date.now();
      if (Date.now() - seekStart.current > 300) {
        videoSeeking.current = false;
        seekStart.current = null;
      } else {
        return;
      }
    } else {
      seekStart.current = null;
    }

    let targetTime: number;

    if (scrollFraction <= BP.TIMELINE_START) {
      const t = scrollFraction / BP.TIMELINE_START;
      targetTime = t * video.duration;
    } else {
      targetTime = video.duration;
    }

    // Reduced threshold: 16ms (one frame at 60fps) instead of 50ms
    if (Math.abs(video.currentTime - targetTime) > 0.016) {
      video.currentTime = targetTime;
    }
  }, [videoRef, scrollFraction, videoReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(nativeRafRef.current);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  return { videoReady, bpStartFrac, bpEndFrac };
}
