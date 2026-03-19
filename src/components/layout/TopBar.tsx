'use client';

interface TopBarProps {
  visible: boolean;
}

/**
 * Orange announcement bar at the top of the page.
 * Matches the design: orange bar with "REGISTRATIONS OPEN NOW" in pixel font.
 */
export function TopBar({ visible }: TopBarProps) {
  return (
    <div
      className={`relative z-20 w-full bg-[#DA7E02] transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-center py-2 sm:py-2.5">
        <a
          href="/register"
          className="font-pixel text-[8px] tracking-[0.15em] text-white transition-opacity hover:opacity-80 sm:text-[10px] md:text-xs"
        >
          REGISTRATIONS OPEN NOW
        </a>
      </div>

      {/* Audio visualizer bars (decorative, from the design) */}
      <div
        className="absolute right-3 top-1/2 flex -translate-y-1/2 items-end gap-[2px] sm:right-6"
        aria-hidden="true"
      >
        {[12, 8, 16, 6, 14, 10].map((h, i) => (
          <div
            key={i}
            className="w-[3px] animate-pulse bg-white/60 sm:w-1"
            style={{
              height: `${h}px`,
              animationDelay: `${i * 150}ms`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
