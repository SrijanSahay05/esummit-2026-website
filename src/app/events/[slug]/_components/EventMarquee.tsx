import type { Event } from '@/types/event'

const DEFAULT_MARQUEE =
  '✦ PIEDS × E-SUMMIT \u201926 ✦ BITS PILANI CAMPUS ✦ APRIL 11–14, 2026 ✦'

interface Props {
  event: Pick<Event, 'marqueeText'>
}

export function EventMarquee({ event }: Props) {
  const text = event.marqueeText ?? DEFAULT_MARQUEE
  const repeated = `${text}   ${text}   ${text}   `

  return (
    <div
      style={{
        background: '#FFD700',
        padding: 'clamp(5px, 1.2vw, 8px) 0',
        borderBottom: '4px solid #FF6600',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .event-marquee-inner {
          display: inline-block;
          white-space: nowrap;
          animation: marquee-scroll 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .event-marquee-inner { animation: none; }
        }
      `}</style>
      <div
        className="event-marquee-inner font-pixel"
        style={{
          fontSize: 'clamp(8px, 1.8vw, 11px)',
          color: '#08080C',
          letterSpacing: 'clamp(1px, 0.4vw, 3px)',
        }}
      >
        {repeated}
        {repeated}
      </div>
    </div>
  )
}
