'use client';

import React from 'react';

interface InfoPinsSectionProps {
  visible: boolean;
  onPinClick: (key: string) => void;
}

const PIN_DATA = [
  {
    key: 'sponsors',
    emoji: '\uD83D\uDCB0',
    label: 'SPONSORS',
    fill: '#E74C3C',
    style: { top: '22%', left: '18%' } as React.CSSProperties,
  },
  {
    key: 'team',
    emoji: '\uD83D\uDC65',
    label: 'THE TEAM',
    fill: '#3498DB',
    style: { top: '30%', right: '15%' } as React.CSSProperties,
  },
  {
    key: 'contact',
    emoji: '\uD83D\uDCEC',
    label: 'CONTACT US',
    fill: '#2ECC71',
    style: { bottom: '28%', left: '22%' } as React.CSSProperties,
  },
  {
    key: 'faq',
    emoji: '\u2753',
    label: 'FAQ',
    fill: '#9B59B6',
    style: { bottom: '22%', right: '20%' } as React.CSSProperties,
  },
];

const InfoPinsSection: React.FC<InfoPinsSectionProps> = ({ visible, onPinClick }) => {
  return (
    <div id="info-pins-section" className={visible ? 'visible' : ''}>
      {PIN_DATA.map((pin) => (
        <div
          key={pin.key}
          className="info-pin"
          data-info={pin.key}
          style={pin.style}
          onClick={() => onPinClick(pin.key)}
        >
          <div className="info-pin-marker">
            <svg viewBox="0 0 48 60" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 0C10.7 0 0 10.7 0 24c0 18 24 36 24 36s24-18 24-36C48 10.7 37.3 0 24 0z"
                fill={pin.fill}
                stroke="#FFD700"
                strokeWidth="2"
              />
            </svg>
            <span className="info-pin-emoji">{pin.emoji}</span>
          </div>
          <div className="info-pin-label">{pin.label}</div>
        </div>
      ))}
    </div>
  );
};

export default InfoPinsSection;
