'use client';

import { useRef, useEffect } from 'react';
import CloudTransition, {
  type CloudTransitionHandle,
} from '@/components/CloudTransition';
import { WORLD_APP_URL } from '@/lib/constants';

export default function WorldPage() {
  const cloudRef = useRef<CloudTransitionHandle>(null);

  // On mount, play the cloud uncover animation for a seamless entry
  useEffect(() => {
    const timer = setTimeout(() => {
      cloudRef.current?.uncover();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReturn = () => {
    cloudRef.current?.play(() => {
      window.location.href = '/?restore=1';
    });
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      <iframe
        src={WORLD_APP_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allow="autoplay; fullscreen"
        title="E-Summit World"
      />

      <button
        onClick={handleReturn}
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

      <CloudTransition ref={cloudRef} />
    </div>
  );
}
