import type { Event } from '@/types/event'

interface Props {
  event: Pick<Event, 'timeline' | 'scoringCriteria' | 'itemList'>
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-pixel"
      style={{
        fontSize: 'clamp(7px, 1.1dvh, 9px)',
        color: '#FF6600',
        letterSpacing: 1,
        borderBottom: '1px solid #331100',
        paddingBottom: 5,
        marginBottom: 'clamp(6px, 1.2dvh, 10px)',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        flexShrink: 0,
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
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Left: Mission Map — scrollable */}
      <div
        style={{
          padding: 'clamp(8px, 1.5dvh, 14px)',
          borderRight: '2px solid #222',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <ColHeading>MISSION MAP</ColHeading>
        <ol style={{ listStyle: 'none', overflowY: 'auto', minHeight: 0, flex: 1 }}>
          {event.timeline.map((phase, i) => {
            const stepStr =
              typeof phase.step === 'number' ? String(phase.step) : phase.step
            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(5px, 1vw, 8px)',
                  marginBottom: 'clamp(6px, 1.1dvh, 10px)',
                }}
              >
                <div
                  className="font-pixel"
                  style={{
                    fontSize: 'clamp(7px, 1dvh, 9px)',
                    color: phase.active ? '#08080C' : '#FFD700',
                    background: phase.active ? '#FFD700' : '#1A1000',
                    border: '1px solid #FFD700',
                    width: 'clamp(16px, 2.5dvh, 22px)',
                    height: 'clamp(16px, 2.5dvh, 22px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: phase.active ? '0 0 8px rgba(255,215,0,0.6)' : 'none',
                  }}
                >
                  {stepStr}
                </div>
                <div style={{ flex: 1 }}>
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: 'clamp(7px, 1dvh, 9px)',
                      color: phase.step === '★' ? '#FFD700' : '#DDD',
                      display: 'block',
                      lineHeight: 1.6,
                    }}
                  >
                    {phase.label}
                  </span>
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: 'clamp(6px, 0.85dvh, 8px)',
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
      <div
        style={{
          padding: 'clamp(8px, 1.5dvh, 14px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <ColHeading>SCORE BREAKDOWN</ColHeading>

        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {event.scoringCriteria.map(criterion => (
            <div key={criterion.label} style={{ marginBottom: 'clamp(6px, 1.1dvh, 9px)' }}>
              <div
                className="font-pixel"
                style={{
                  fontSize: 'clamp(6px, 0.9dvh, 8px)',
                  color: '#AAA',
                  marginBottom: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{criterion.label}</span>
                <span style={{ color: '#FFD700' }}>{criterion.weight}%</span>
              </div>
              <div
                style={{
                  height: 'clamp(6px, 1dvh, 9px)',
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

          {event.itemList && (
            <div
              style={{
                marginTop: 'clamp(8px, 1.5dvh, 12px)',
                borderTop: '1px solid #1A1000',
                paddingTop: 'clamp(6px, 1dvh, 10px)',
              }}
            >
              <ColHeading>{event.itemList.heading}</ColHeading>
              <div
                className="font-pixel"
                style={{
                  fontSize: 'clamp(6px, 0.85dvh, 8px)',
                  color: '#555',
                  lineHeight: 2,
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
    </div>
  )
}
