'use client';

import { useState, useCallback, useEffect } from 'react';

interface GameMenuProps {
  onStart: () => void;
}

const MENU_ITEMS = ['START', 'CONTINUE'] as const;

export function GameMenu({ onStart }: GameMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      // Both options trigger the same action for now
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
      className="flex flex-col items-start gap-3 sm:gap-4"
      role="menu"
      aria-label="Game menu"
    >
      {MENU_ITEMS.map((item, index) => (
        <button
          key={item}
          role="menuitem"
          onClick={() => handleSelect(index)}
          onMouseEnter={() => setSelectedIndex(index)}
          className={`font-pixel group flex items-center gap-3 text-base transition-colors sm:text-lg md:text-xl ${
            selectedIndex === index
              ? 'text-text-primary'
              : 'text-text-muted hover:text-text-primary'
          }`}
          aria-current={selectedIndex === index ? 'true' : undefined}
        >
          <span
            className={`inline-block transition-transform duration-200 ${
              selectedIndex === index
                ? 'translate-x-0 opacity-100'
                : '-translate-x-2 opacity-0'
            }`}
            aria-hidden="true"
          >
            &#9658;
          </span>
          <span>{item}</span>
        </button>
      ))}
    </nav>
  );
}
