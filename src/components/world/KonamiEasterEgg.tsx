'use client';

import { useCallback } from 'react';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { useAudioSystem } from '@/hooks/useAudioSystem';

export default function KonamiEasterEgg() {
  const { playBeep, enableAudio } = useAudioSystem();

  const activate = useCallback(() => {
    enableAudio();
    const emojis = [
      '\u{1F47E}',
      '\u{1F6F8}',
      '\u{1F680}',
      '\u2B50',
      '\u{1F344}',
      '\u{1FA99}',
      '\u{1F3AE}',
    ];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `position:fixed;left:${Math.random() * window.innerWidth}px;top:${window.innerHeight + 20}px;font-size:${1.5 + Math.random() * 2}rem;z-index:10000;pointer-events:none;transition:top 4s cubic-bezier(0.2,0,0.5,1);opacity:0.7;`;
        document.body.appendChild(el);
        requestAnimationFrame(() => {
          el.style.top = '-60px';
        });
        setTimeout(() => el.remove(), 4500);
      }, i * 100);
    }
    [523, 659, 784, 1047, 1319].forEach((n, i) =>
      setTimeout(() => playBeep(n, 0.15, 'square'), i * 100),
    );
    const ach = document.createElement('div');
    ach.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Press Start 2P',cursive;font-size:0.9rem;color:#fff;background:rgba(0,0,0,0.95);border:1px solid #333;padding:2rem 3rem;z-index:10001;text-align:center;line-height:2.5;`;
    ach.innerHTML =
      '\u{1F3C6} ACHIEVEMENT UNLOCKED!<br><span style="font-size:0.5rem;color:#666;">30 EXTRA LIVES GAINED</span>';
    document.body.appendChild(ach);
    setTimeout(() => {
      ach.style.transition = 'opacity 0.5s';
      ach.style.opacity = '0';
      setTimeout(() => ach.remove(), 500);
    }, 3500);
  }, [enableAudio, playBeep]);

  useKonamiCode(activate);
  return null;
}
