/**
 * CRT scanline overlay effect.
 * Renders a subtle repeating gradient to simulate old CRT monitor scanlines.
 * Pure CSS — no JS overhead.
 */
export function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 opacity-[0.08]"
      style={{
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
      }}
      aria-hidden="true"
    />
  );
}
