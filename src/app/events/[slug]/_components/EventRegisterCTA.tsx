import type { Event } from '@/types/event'

interface Props {
  event: Pick<
    Event,
    'registerUrl' | 'registerDeadline' | 'registerPlatformUrl' | 'registerPlatformHint' | 'title'
  >
}

export function EventRegisterCTA({ event }: Props) {
  const isExternal = event.registerUrl.startsWith('http')

  return (
    <>
      {/* Register box */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: 'clamp(8px, 1.5dvh, 16px) clamp(14px, 4vw, 28px)',
          background: '#0D0800',
          borderBottom: '3px solid #FFD700',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        <style>{`
          @keyframes reg-blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
          .reg-cta-text {
            animation: reg-blink 1.1s step-end infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .reg-cta-text { animation: none; }
          }
        `}</style>

        {/* Eyebrow */}
        <span
          className="font-pixel"
          style={{
            fontSize: 'clamp(7px, 1.2dvh, 9px)',
            color: '#555',
            letterSpacing: 'clamp(1px, 0.4dvh, 3px)',
            display: 'block',
            marginBottom: 'clamp(6px, 1.2dvh, 10px)',
          }}
        >
          — HOW TO ENTER —
        </span>

        {/* Blinking CTA */}
        <a
          href={event.registerUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-label={`Register for ${event.title}`}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 'clamp(6px, 1.2dvh, 10px)',
          }}
        >
          <span
            className="font-pixel reg-cta-text"
            style={{
              fontSize: 'clamp(10px, 1.9dvh, 15px)',
              color: '#FFD700',
              letterSpacing: 1,
              textShadow: '2px 2px 0 #664400, 0 0 20px rgba(255,215,0,0.3)',
              display: 'block',
            }}
          >
            ▶ INSERT COIN TO REGISTER ◀
          </span>
        </a>

        {/* Deadline */}
        <span
          className="font-pixel"
          style={{
            fontSize: 'clamp(8px, 1.3dvh, 10px)',
            color: '#FF4444',
            display: 'block',
            letterSpacing: 'clamp(1px, 0.3dvh, 2px)',
            marginBottom: 'clamp(10px, 2.5vw, 14px)',
            textShadow: '1px 1px 0 #440000',
          }}
        >
          ⚠ REGISTRATION CLOSES {event.registerDeadline} ⚠
        </span>

        {/* URL box */}
        <div
          style={{
            display: 'inline-block',
            border: '2px solid #FFD700',
            padding: 'clamp(6px, 1.1dvh, 9px) clamp(20px, 4vw, 30px)',
            position: 'relative',
            background: 'rgba(255,215,0,0.04)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#FFD700',
              fontSize: 'clamp(8px, 1.3dvh, 10px)',
              fontFamily: 'var(--font-pixel), monospace',
            }}
            aria-hidden="true"
          >
            ▶
          </span>
          <span
            className="font-pixel"
            style={{
              fontSize: 'clamp(8px, 1.4dvh, 11px)',
              color: '#00FFCC',
              letterSpacing: 1,
              textShadow: '0 0 10px rgba(0,255,200,0.4)',
            }}
          >
            {event.registerPlatformUrl ?? event.registerUrl}
          </span>
          <span
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#FFD700',
              fontSize: 'clamp(8px, 1.3dvh, 10px)',
              fontFamily: 'var(--font-pixel), monospace',
            }}
            aria-hidden="true"
          >
            ◀
          </span>
        </div>

        {/* Platform hint */}
        {event.registerPlatformHint && (
          <span
            className="font-pixel"
            style={{
              fontSize: 'clamp(6px, 0.9dvh, 8px)',
              color: '#555',
              display: 'block',
              marginTop: 'clamp(6px, 1.5vw, 8px)',
              letterSpacing: 'clamp(1px, 0.3dvh, 2px)',
            }}
          >
            {event.registerPlatformHint}
          </span>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(5px, 1dvh, 10px) clamp(12px, 3vw, 20px)',
          position: 'relative',
          zIndex: 10,
          background: '#050508',
          flexShrink: 0,
        }}
      >
        <div
          className="font-pixel"
          style={{
            fontSize: 'clamp(6px, 0.9dvh, 8px)',
            color: '#333',
            lineHeight: 1.9,
            letterSpacing: 1,
          }}
        >
          <span style={{ color: '#666' }}>PIEDS</span>
          <br />
          PILANI INNOVATION &amp;
          <br />
          ENTREPRENEURSHIP
          <br />
          DEVELOPMENT SOCIETY
        </div>
        <div
          className="font-pixel"
          style={{
            fontSize: 'clamp(7px, 1.2dvh, 9px)',
            color: '#FFD700',
            letterSpacing: 1,
            textAlign: 'right',
            lineHeight: 1.9,
            textShadow: '1px 1px 0 #443300',
          }}
        >
          E-SUMMIT &#x2019;26
          <br />
          BITS PILANI
          <br />
          PILANI CAMPUS
        </div>
      </div>
    </>
  )
}
