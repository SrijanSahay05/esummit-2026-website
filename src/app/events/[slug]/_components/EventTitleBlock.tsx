import type { Event } from '@/types/event'

interface Props {
  event: Pick<Event, 'level' | 'titleLines' | 'titleSub' | 'taglineLines'>
}

export function EventTitleBlock({ event }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding:
          'clamp(8px, 1.5dvh, 18px) clamp(14px, 3vw, 24px) clamp(6px, 1.2dvh, 14px)',
        flexShrink: 0,
        borderBottom: '2px dashed rgba(255,215,0,0.2)',
      }}
    >
      {/* Phosphor bleed glow behind title */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 60% 30% at 50% 38%, rgba(255,180,0,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Level eyebrow */}
      <span
        className="font-pixel"
        style={{
          fontSize: 'clamp(8px, 1.8vw, 11px)',
          color: '#FF6600',
          letterSpacing: 'clamp(2px, 0.6vw, 4px)',
          display: 'block',
          marginBottom: 'clamp(8px, 2vw, 14px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {event.level}
      </span>

      {/* Title lines */}
      {event.titleLines.map((line, i) => (
        <span
          key={i}
          className="font-pixel"
          style={{
            fontSize: 'clamp(18px, min(6vw, 5.5dvh), 42px)',
            color: '#FFD700',
            display: 'block',
            lineHeight: 1.1,
            letterSpacing: 2,
            textShadow: '3px 0 0 #CC8800, 0 3px 0 #CC8800, 3px 3px 0 #AA6600, 6px 6px 0 rgba(0,0,0,0.5)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {line}
        </span>
      ))}

      {/* Sub-title */}
      <span
        className="font-pixel"
        style={{
          fontSize: 'clamp(10px, min(3.5vw, 3.5dvh), 22px)',
          color: '#FF6600',
          display: 'block',
          lineHeight: 1,
          marginTop: 'clamp(4px, 1vw, 8px)',
          letterSpacing: 'clamp(1px, 0.5vw, 3px)',
          textShadow: '2px 0 0 #993300, 0 2px 0 #993300, 2px 2px 0 #661100',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {event.titleSub}
      </span>

      {/* Tagline */}
      {event.taglineLines.map((line, i) => (
        <span
          key={i}
          className="font-pixel"
          style={{
            fontSize: 'clamp(8px, 1.8vw, 11px)',
            color: '#00FFCC',
            display: 'block',
            marginTop: i === 0 ? 'clamp(6px, 1.5dvh, 14px)' : 0,
            letterSpacing: 1,
            lineHeight: 1.8,
            textShadow: '0 0 12px rgba(0,255,200,0.4)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {line}
        </span>
      ))}
    </div>
  )
}
