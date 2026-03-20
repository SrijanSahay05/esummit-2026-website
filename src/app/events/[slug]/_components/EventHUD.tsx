import type { Event } from '@/types/event'

const COLOR_MAP = {
  gold: '#FFD700',
  cyan: '#00FFCC',
  red: '#FF3333',
}

interface Props {
  hudStats: Event['hudStats']
}

export function EventHUD({ hudStats }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'clamp(6px, 1.2dvh, 10px) clamp(12px, 3vw, 20px)',
        borderBottom: '2px solid #333',
        background: 'rgba(0,0,0,0.5)',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
      }}
      role="region"
      aria-label="Event stats"
    >
      {hudStats.map(stat => (
        <div key={stat.label} style={{ textAlign: 'center' }}>
          <span
            className="font-pixel"
            style={{
              fontSize: 'clamp(7px, 1.1dvh, 9px)',
              color: '#555',
              letterSpacing: 1,
              display: 'block',
              marginBottom: 3,
            }}
          >
            {stat.label}
          </span>
          <span
            className="font-pixel"
            style={{
              fontSize: 'clamp(10px, 1.7dvh, 14px)',
              color: COLOR_MAP[stat.colorVariant ?? 'gold'],
              display: 'block',
            }}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}
