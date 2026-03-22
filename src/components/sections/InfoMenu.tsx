'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface InfoMenuProps {
  visible: boolean;
  onSelect: (key: string) => void;
}

const MENU_ITEMS = [
  { key: 'sponsors', label: '\uD83D\uDCB0 SPONSORS' },
  { key: 'team', label: '\uD83D\uDC65 THE TEAM' },
  { key: 'contact', label: '\uD83D\uDCEC CONTACT US' },
  { key: 'faq', label: '\u2753 FAQ' },
];

const InfoMenu: React.FC<InfoMenuProps> = ({ visible, onSelect }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);

  const handleItemClick = useCallback(
    (key: string) => {
      onSelect(key);
      setOpen(false);
    },
    [onSelect]
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  return (
    <div
      id="info-menu"
      ref={menuRef}
      className={`info-menu ${visible ? 'visible' : ''} ${open ? 'open' : ''}`}
    >
      <button
        className={`info-menu-toggle ${open ? 'open' : ''}`}
        id="info-menu-toggle"
        aria-label="Toggle info menu"
        onClick={handleToggle}
      >
        {open ? '\u2715' : '\uD83D\uDCCD'}
      </button>
      {MENU_ITEMS.map((item) => (
        <button
          key={item.key}
          className="info-menu-item"
          data-info={item.key}
          onClick={() => handleItemClick(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default InfoMenu;
