'use client';

import { useEffect, useState, type RefObject } from 'react';
import { BP } from '@/lib/constants';

interface ScrollDebugHUDProps {
  scrollFraction: number;
  videoRef: RefObject<HTMLVideoElement | null>;
}

function getZoneName(sf: number): string {
  if (sf < BP.TIMELINE_START) return 'VIDEO';
  return 'TIMELINE';
}

export default function ScrollDebugHUD({ scrollFraction, videoRef }: ScrollDebugHUDProps) {
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf: number;
    function tick() {
      const video = videoRef.current;
      if (video) {
        setVideoTime(video.currentTime);
        setVideoDuration(video.duration || 0);
      }
      setScrollY(window.scrollY);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoRef]);

  const zone = getZoneName(scrollFraction);
  const scrollH = typeof document !== 'undefined'
    ? document.documentElement.scrollHeight - window.innerHeight
    : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 12,
        left: 12,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.85)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 8,
        padding: '10px 14px',
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
        fontSize: '11px',
        lineHeight: 1.7,
        color: '#e0e0e0',
        pointerEvents: 'none',
        userSelect: 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ color: '#6e8cff', fontWeight: 700, marginBottom: 4, fontSize: '10px', letterSpacing: '0.1em' }}>
        SCROLL DEBUG
      </div>
      <div>
        scrollFrac: <span style={{ color: '#fff', fontWeight: 600 }}>{scrollFraction.toFixed(4)}</span>
      </div>
      <div>
        videoTime: <span style={{ color: '#ffb347', fontWeight: 600 }}>{videoTime.toFixed(2)}s</span>
        {' / '}
        <span style={{ color: '#888' }}>{videoDuration.toFixed(2)}s</span>
      </div>
      <div>
        scrollY: <span style={{ color: '#fff' }}>{Math.round(scrollY)}px</span>
        {' / '}
        <span style={{ color: '#888' }}>{Math.round(scrollH)}px</span>
      </div>
      <div>
        zone: <span style={{
          color: zone === 'TIMELINE' ? '#51cf66' : '#6e8cff',
          fontWeight: 700,
        }}>{zone}</span>
      </div>
      <div style={{ marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 4, fontSize: '10px', color: '#666' }}>
        VIDEO: 0–{BP.TIMELINE_START} | TIMELINE: {BP.TIMELINE_START}–1.0
      </div>
    </div>
  );
}
