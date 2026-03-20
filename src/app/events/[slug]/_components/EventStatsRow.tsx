import type { Event } from '@/types/event'

const STAT_COLORS = {
  gold: { val: '#FFD700', shadow: '2px 2px 0 #664400' },
  green: { val: '#00FF88', shadow: '2px 2px 0 #004422' },
  cyan: { val: '#00FFCC', shadow: '2px 2px 0 #004433' },
  red: { val: '#FF4444', shadow: '2px 2px 0 #440000' },
}

interface Props {
  stats: Event['stats']
}

export function EventStatsRow({ stats }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderBottom: '2px solid #222',
        position: 'relative',
        zIndex: 10,
      }}
      role="region"
      aria-label="Event statistics"
    >
      {stats.map((stat, i) => {
        const scheme = STAT_COLORS[stat.color ?? 'gold']
        const lines = stat.value.split('\n')
        return (
          <div
            key={stat.label}
            style={{
              textAlign: 'center',
              padding: 'clamp(8px, 2vw, 14px) clamp(4px, 1vw, 10px)',
              borderRight: i < 3 ? '2px solid #222' : 'none',
              position: 'relative',
            }}
          >
            {stat.icon && (
              <span
                style={{
                  fontSize: 'clamp(14px, 3.5vw, 20px)',
                  display: 'block',
                  marginBottom: 5,
                }}
                aria-hidden="true"
              >
                {stat.icon}
              </span>
            )}
            <span
              className="font-pixel"
              style={{
                fontSize: 'clamp(9px, 2.2vw, 13px)',
                color: scheme.val,
                display: 'block',
                lineHeight: 1.4,
                textShadow: scheme.shadow,
              }}
            >
              {lines.map((l, j) => (
                <span key={j} style={{ display: 'block' }}>
                  {l}
                </span>
              ))}
            </span>
            <span
              className="font-pixel"
              style={{
                fontSize: 'clamp(6px, 1.2vw, 8px)',
                color: '#444',
                display: 'block',
                marginTop: 4,
                letterSpacing: 1,
              }}
            >
              {stat.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
