'use client';

import { useState } from 'react';
import { useAudioSystem } from '@/hooks/useAudioSystem';

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const { toggleAudio } = useAudioSystem();

  return (
    <button
      className="audio-toggle"
      aria-label="Toggle sound"
      onClick={() => {
        const newState = toggleAudio();
        setEnabled(newState);
      }}
    >
      <span>{enabled ? '\u{1F50A}' : '\u{1F507}'}</span>
    </button>
  );
}
