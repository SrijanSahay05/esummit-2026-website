'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useScrollFraction } from '@/hooks/useScrollFraction';
import { useVideoScrub } from '@/hooks/useVideoScrub';
import { useIOSViewportFix } from '@/hooks/useIOSViewportFix';
import { BP } from '@/lib/constants';

import LoadingScreen from '@/components/sections/LoadingScreen';
import BackgroundVideo from '@/components/sections/BackgroundVideo';
import CRTOverlay from '@/components/sections/CRTOverlay';
import HUD from '@/components/sections/HUD';
import BP1BlurOverlay from '@/components/sections/BP1BlurOverlay';
import NPCCharacter from '@/components/sections/NPCCharacter';
import BP1DialogBox from '@/components/sections/BP1DialogBox';
import BP2RadialHUD from '@/components/sections/BP2RadialHUD';
import TimelineSection from '@/components/sections/TimelineSection';
import InfoPinsSection from '@/components/sections/InfoPinsSection';
import InfoCardOverlay from '@/components/sections/InfoCardOverlay';
import InfoMenu from '@/components/sections/InfoMenu';
import ScrollContainer from '@/components/sections/ScrollContainer';

export default function PageClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollFraction = useScrollFraction();
  const { videoReady } = useVideoScrub(videoRef, scrollFraction);
  useIOSViewportFix();

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

    // Fallback timeout
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

  // BP1: NPC and dialog visibility
  const npcVisible = scrollFraction >= BP.NPC_START;
  const inDialogRange =
    scrollFraction >= BP.NPC_START && scrollFraction <= BP.NPC_END;
  const companionMode =
    npcVisible && !inDialogRange && scrollFraction > BP.NPC_END;

  // BP1: blur overlay
  const blurVisible = inDialogRange;

  // BP2 visibility
  const bp2Visible =
    scrollFraction >= BP.GEM_START && scrollFraction <= BP.GEM_END;

  // Timeline visibility
  const timelineVisible = scrollFraction >= BP.TIMELINE_START;

  // Info pins visibility
  const infoPinsVisible = scrollFraction >= 0.95;
  const infoMenuVisible = scrollFraction >= BP.TIMELINE_START;

  // Info card state
  const [infoKey, setInfoKey] = useState<string | null>(null);

  const handleBeginQuest = useCallback(() => {
    const scrollH =
      document.documentElement.scrollHeight - window.innerHeight;
    const target = BP.GEM_START * scrollH;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  return (
    <>
      <LoadingScreen progress={loadProgress} hidden={loadingHidden} />
      <BackgroundVideo ref={videoRef} />
      <CRTOverlay />

      {loadingHidden && (
        <>
          <HUD scrollFraction={scrollFraction} />

          <BP1BlurOverlay visible={blurVisible} />
          <NPCCharacter
            visible={npcVisible}
            companion={companionMode}
            scrollFraction={scrollFraction}
          />
          <BP1DialogBox
            visible={inDialogRange}
            scrollFraction={scrollFraction}
            onBeginQuest={handleBeginQuest}
          />

          <BP2RadialHUD
            visible={bp2Visible}
            scrollFraction={scrollFraction}
          />

          <TimelineSection
            visible={timelineVisible}
            scrollFraction={scrollFraction}
          />

          <InfoPinsSection
            visible={infoPinsVisible}
            onPinClick={setInfoKey}
          />
          <InfoCardOverlay
            infoKey={infoKey}
            onClose={() => setInfoKey(null)}
          />
          <InfoMenu
            visible={infoMenuVisible}
            onSelect={setInfoKey}
          />
        </>
      )}

      <ScrollContainer />
    </>
  );
}
