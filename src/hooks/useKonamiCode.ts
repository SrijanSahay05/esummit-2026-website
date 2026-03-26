'use client';

import { useEffect, useRef } from 'react';
import { KONAMI_CODE } from '@/lib/data/world-data';

export function useKonamiCode(onActivate: () => void) {
  const indexRef = useRef(0);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === KONAMI_CODE[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI_CODE.length) {
          indexRef.current = 0;
          onActivate();
        }
      } else {
        indexRef.current = 0;
      }
    }

    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [onActivate]);
}
