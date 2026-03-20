import type { Event } from '@/types/event'

interface Props {
  event: Pick<Event, 'timeline' | 'scoringCriteria' | 'itemList'>
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-pixel"
      style={{
        fontSize: 'clamp(7px, 1.6vw, 10px)',
        color: '#FF6600',
        letterSpacing: 'clamp(1px, 0.4vw, 2px)',
        borderBottom: '1px solid #331100',
        paddingBottom: 6,
        marginBottom: 'clamp(8px, 2vw, 12px)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span style={{ color: '#FFD700' }} aria-hidden="true">▶</span>
      {children}
    </div>
  )
}

export function EventBody({ event }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '2px solid #222',
        position: 'relative',
        zIndex: 10,
        // Grow to fill all remaining poster height
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Left: Mission Map */}
      <div
        style={{
          padding: 'clamp(10px, 2.5vw, 16px)',
          borderRight: '2px solid #222',
        }}
      >
        <ColHeading>MISSION MAP</ColHeading>
        <ol style={{ listStyle: 'none' }}>
          {event.timeline.map((phase, i) => {
            const stepStr =
              typeof phase.step === 'number' ? String(phase.step) : phase.step
            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(6px, 1.5vw, 10px)',
                  marginBottom: 'clamp(7px, 1.8vw, 11px)',
                }}
              >
                {/* Step badge */}
                <div
                  className="font-pixel"
                  style={{
                    fontSize: 'clamp(7px, 1.6vw, 10px)',
                    color: phase.active ? '#08080C' : '#FFD700',
                    background: phase.active ? '#FFD700' : '#1A1000',
                    border: `1px solid ${phase.step === '★' ? '#FFD700' : '#FFD700'}`,
                    width: 'clamp(18px, 4.5vw, 26px)',
                    height: 'clamp(18px, 4.5vw, 26px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    textShadow: phase.active ? 'none' : '1px 1px 0 #664400',
                    boxShadow: phase.active ? '0 0 8px rgba(255,215,0,0.6)' : 'none',
                  }}
                >
                  {stepStr}
                </div>
                {/* Info */}
                <div style={{ flex: 1 }}>
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: 'clamp(7px, 1.5vw, 9px)',
                      color: phase.step === '★' ? '#FFD700' : '#DDD',
                      display: 'block',
                      lineHeight: 1.7,
                    }}
                  >
                    {phase.label}
                  </span>
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: 'clamp(6px, 1.2vw, 8px)',
                      color: '#555',
                      display: 'block',
                      marginTop: 2,
                    }}
                  >
                    {phase.date}
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Right: Score breakdown + item list */}
      <div style={{ padding: 'clamp(10px, 2.5vw, 16px)' }}>
        <ColHeading>SCORE BREAKDOWN</ColHeading>

        {event.scoringCriteria.map(criterion => (
          <div
            key={criterion.label}
            style={{ marginBottom: 'clamp(7px, 1.8vw, 10px)' }}
          >
            <div
              className="font-pixel"
              style={{
                fontSize: 'clamp(6px, 1.3vw, 8px)',
                color: '#AAA',
                letterSpacing: 0.5,
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{criterion.label}</span>
              <span style={{ color: '#FFD700' }}>{criterion.weight}%</span>
            </div>
            <div
              style={{
                height: 'clamp(7px, 1.8vw, 10px)',
                background: '#111',
                border: '1px solid #222',
                position: 'relative',
              }}
              role="meter"
              aria-valuenow={criterion.weight}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${criterion.label}: ${criterion.weight}%`}
            >
              <div
                style={{
                  width: `${criterion.weight}%`,
                  height: '100%',
                  background: criterion.color,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Pixel stripe overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 4px, transparent 4px, transparent 8px)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Item list */}
        {event.itemList && (
          <div
            style={{
              marginTop: 'clamp(10px, 2.5vw, 14px)',
              borderTop: '1px solid #1A1000',
              paddingTop: 'clamp(8px, 2vw, 10px)',
            }}
          >
            <ColHeading>{event.itemList.heading}</ColHeading>
            <div
              className="font-pixel"
              style={{
                fontSize: 'clamp(6px, 1.3vw, 8px)',
                color: '#555',
                lineHeight: 2.2,
                letterSpacing: 0.5,
              }}
            >
              {event.itemList.items.map(item => (
                <div key={item}>▸ {item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
