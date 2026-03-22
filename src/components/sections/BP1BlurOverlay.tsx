'use client';

interface BP1BlurOverlayProps {
  visible: boolean;
}

export default function BP1BlurOverlay({ visible }: BP1BlurOverlayProps) {
  return (
    <div
      id="bp1-blur-overlay"
      className={visible ? 'visible' : ''}
    />
  );
}
