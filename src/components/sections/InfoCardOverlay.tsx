'use client';

import React, { useEffect } from 'react';
import { infoData } from '@/lib/data/info-data';

interface InfoCardOverlayProps {
  infoKey: string | null;
  onClose: () => void;
}

const InfoCardOverlay: React.FC<InfoCardOverlayProps> = ({ infoKey, onClose }) => {
  const data = infoKey ? infoData[infoKey] : null;

  // Close on Escape
  useEffect(() => {
    if (!infoKey) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [infoKey, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`info-card-overlay ${infoKey ? 'open' : ''}`}
      id="info-card-overlay"
      onClick={handleOverlayClick}
    >
      <div className="info-card">
        <div className="info-card-icon" id="info-card-icon">
          {data?.icon ?? ''}
        </div>
        <div className="info-card-title" id="info-card-title">
          {data?.title ?? ''}
        </div>
        <div
          className="info-card-body"
          id="info-card-body"
          dangerouslySetInnerHTML={{ __html: data?.body ?? '' }}
        />
        <button className="info-card-close" onClick={onClose}>
          {'\u2715'} CLOSE
        </button>
      </div>
    </div>
  );
};

export default InfoCardOverlay;
