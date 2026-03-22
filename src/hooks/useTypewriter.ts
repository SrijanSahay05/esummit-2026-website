'use client';

import { useState, useRef, useCallback } from 'react';

export interface TypewriterResult {
  displayText: string;
  isTyping: boolean;
  finish: () => void;
  start: (text: string) => void;
}

/**
 * Typewriter effect hook. Call `start(text)` to begin typing character by character.
 * `finish()` immediately shows the full text. `isTyping` is true during animation.
 */
export function useTypewriter(charInterval = 30): TypewriterResult {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef('');
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTyping = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    clearTyping();
    setDisplayText(fullTextRef.current);
    setIsTyping(false);
  }, [clearTyping]);

  const start = useCallback(
    (text: string) => {
      clearTyping();
      fullTextRef.current = text;
      indexRef.current = 0;
      setDisplayText('');
      setIsTyping(true);

      intervalRef.current = setInterval(() => {
        indexRef.current += 1;
        const idx = indexRef.current;
        if (idx >= text.length) {
          clearTyping();
          setDisplayText(text);
          setIsTyping(false);
        } else {
          setDisplayText(text.slice(0, idx));
        }
      }, charInterval);
    },
    [charInterval, clearTyping],
  );

  return { displayText, isTyping, finish, start };
}
