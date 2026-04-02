import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'E-Summit 2026 — Apogee × BITS Pilani | India\'s premier college entrepreneurship summit';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(26,91,196,0.22) 0%, transparent 68%)',
            display: 'flex',
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: 'absolute',
            top: 38,
            left: 60,
            color: '#555',
            fontSize: 15,
            letterSpacing: '4px',
            display: 'flex',
          }}
        >
          PIEDS · BITS PILANI · APOGEE 2026
        </div>

        {/* Main title block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div
            style={{
              color: '#1A5BC4',
              fontSize: 104,
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            E-SUMMIT
          </div>
          <div
            style={{
              color: '#E87A20',
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: '12px',
              display: 'flex',
            }}
          >
            2026
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 20,
              letterSpacing: '7px',
              marginTop: 14,
              display: 'flex',
            }}
          >
            WHERE IDEAS MEET EXECUTION
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '55%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #1A5BC4 40%, #E87A20 60%, transparent)',
            marginTop: 44,
            display: 'flex',
          }}
        />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 64, marginTop: 38 }}>
          {[
            ['$80B+', 'STARTUP VALUATION'],
            ['3800+', 'FOUNDERS'],
            ['13', 'UNICORNS'],
            ['1900+', 'STARTUPS'],
          ].map(([val, label]) => (
            <div
              key={val}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{ color: '#F5C842', fontSize: 36, fontWeight: 700, display: 'flex' }}
              >
                {val}
              </span>
              <span
                style={{ color: '#555', fontSize: 12, letterSpacing: '2px', display: 'flex' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <span
            style={{ color: '#555', fontSize: 14, letterSpacing: '3px', display: 'flex' }}
          >
            APRIL 10–12, 2026
          </span>
          <span style={{ color: '#333', fontSize: 18, display: 'flex' }}>·</span>
          <span
            style={{ color: '#555', fontSize: 14, letterSpacing: '3px', display: 'flex' }}
          >
            BITS PILANI, RAJASTHAN, INDIA
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
