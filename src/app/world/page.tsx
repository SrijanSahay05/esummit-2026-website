'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useCloudTransition } from '@/components/CloudTransitionProvider';

const WorldPageClient = dynamic(() => import('@/components/world/WorldPageClient'), {
  ssr: false,
});

export default function WorldPage() {
  const cloudRef = useCloudTransition();
  const router = useRouter();

  // Uncover the shared cloud transition on mount
  // (clouds are already covering from the main page's cover() call)
  useEffect(() => {
    // Only uncover if we arrived via client-side navigation (clouds are covering)
    const cameFromMain = sessionStorage.getItem('navigatingToWorld');
    if (cameFromMain) {
      sessionStorage.removeItem('navigatingToWorld');
      const timer = setTimeout(() => {
        cloudRef.current?.uncover();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [cloudRef]);

  const handleReturn = useCallback(() => {
    sessionStorage.setItem('restoreFromWorld', '1');
    cloudRef.current?.cover(() => {
      router.push('/');
    });
  }, [cloudRef, router]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000' }}>
      <WorldPageClient />

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
    </div>
  );
}
