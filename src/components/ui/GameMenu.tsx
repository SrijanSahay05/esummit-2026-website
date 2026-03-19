'use client';

import { useState, useCallback, useEffect } from 'react';

interface GameMenuProps {
  onStart: () => void;
}

const MENU_ITEMS = [
  { label: 'Event Details', href: '/events' },
  { label: 'Registration', href: '/register' },
  { label: 'Sponsors', href: '/sponsors' },
] as const;

export function GameMenu({ onStart }: GameMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      // Trigger scroll into the campus reveal
      onStart();
    },
    [onStart],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : MENU_ITEMS.length - 1,
          );
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < MENU_ITEMS.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleSelect(selectedIndex);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleSelect]);

  return (
    <nav
      className="flex flex-col items-start gap-2.5 sm:gap-3"
      role="menu"
      aria-label="Game menu"
    >
      {MENU_ITEMS.map((item, index) => (
        <button
          key={item.label}
          role="menuitem"
          onClick={() => handleSelect(index)}
          onMouseEnter={() => setSelectedIndex(index)}
          className={`font-pixel group flex items-center gap-2.5 text-[10px] transition-all duration-150 sm:gap-3 sm:text-sm md:text-base ${
            selectedIndex === index
              ? 'text-text-primary'
              : 'text-text-muted hover:text-text-primary'
          }`}
          aria-current={selectedIndex === index ? 'true' : undefined}
        >
          {/* Pixel arrow selector */}
          <span
            className={`inline-block text-xs transition-all duration-200 sm:text-sm ${
              selectedIndex === index
                ? 'translate-x-0 opacity-100'
                : '-translate-x-2 opacity-0'
            }`}
            aria-hidden="true"
          >
            &#9658;
          </span>
          <span className="whitespace-nowrap">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
