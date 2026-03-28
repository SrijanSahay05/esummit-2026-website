'use client';

import { useEffect, useRef, useState } from 'react';

export function useCyclingTypewriter(phrases: readonly string[]) {
  const [displayText, setDisplayText] = useState('');
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const current = phrases[phraseIndexRef.current];
      if (isDeletingRef.current) {
        charIndexRef.current--;
      } else {
        charIndexRef.current++;
      }
      setDisplayText(current.substring(0, charIndexRef.current));

      let speed = isDeletingRef.current ? 25 : 55;
      if (!isDeletingRef.current && charIndexRef.current === current.length) {
        speed = 2500;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && charIndexRef.current === 0) {
        isDeletingRef.current = false;
        phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
        speed = 600;
      }
      timeoutId = setTimeout(tick, speed);
    }

    timeoutId = setTimeout(tick, 600);
    return () => clearTimeout(timeoutId);
  }, [phrases]);

  return displayText;
}
