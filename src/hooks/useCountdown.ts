'use client';

import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  mins: number;
  text: string;
}

/**
 * Returns a live countdown to the given target date, updating every second.
 */
export function useCountdown(target: Date): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    formatCountdown(target),
  );

  useEffect(() => {
    // Update immediately in case SSR value is stale
    setCountdown(formatCountdown(target));

    const interval = setInterval(() => {
      setCountdown(formatCountdown(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return countdown;
}

function formatCountdown(target: Date): CountdownResult {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, mins: 0, text: 'EVENT LIVE NOW' };
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return {
    days,
    hours,
    mins,
    text: `${days}D : ${String(hours).padStart(2, '0')}H : ${String(mins).padStart(2, '0')}M`,
  };
}
