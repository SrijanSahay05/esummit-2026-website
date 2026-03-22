export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function getLocalFraction(
  frac: number,
  start: number,
  end: number
): number {
  if (frac < start) return 0;
  if (frac > end) return 1;
  return (frac - start) / (end - start);
}

export function formatCountdown(target: Date): string {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return 'EVENT LIVE NOW';
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${days}D : ${String(hours).padStart(2, '0')}H : ${String(mins).padStart(2, '0')}M`;
}

export function getScrollFraction(): number {
  const scrollH =
    document.documentElement.scrollHeight - window.innerHeight;
  if (scrollH <= 0) return 0;
  return Math.max(0, Math.min(1, window.scrollY / scrollH));
}
