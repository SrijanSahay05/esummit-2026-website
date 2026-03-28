'use client';

import { createContext, useContext, useRef } from 'react';
import CloudTransition, { type CloudTransitionHandle } from './CloudTransition';

const CloudTransitionContext = createContext<React.RefObject<CloudTransitionHandle | null> | null>(null);

export function useCloudTransition() {
  const ctx = useContext(CloudTransitionContext);
  if (!ctx) throw new Error('useCloudTransition must be used within CloudTransitionProvider');
  return ctx;
}

export default function CloudTransitionProvider({ children }: { children: React.ReactNode }) {
  const cloudRef = useRef<CloudTransitionHandle>(null);
  return (
    <CloudTransitionContext.Provider value={cloudRef}>
      {children}
      <CloudTransition ref={cloudRef} />
    </CloudTransitionContext.Provider>
  );
}
