import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Explore the World — E-Summit 2026 | Apogee × BITS Pilani';
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
        {/* Purple glow (matches world page accent) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(107,63,160,0.28) 0%, transparent 65%)',
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
          E-SUMMIT 2026 · APOGEE · BITS PILANI
        </div>

        {/* World tag */}
        <div
          style={{
            color: '#6B3FA0',
            fontSize: 20,
            letterSpacing: '8px',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          WORLD 1-1
        </div>

        {/* Main heading */}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 80,
            fontWeight: 900,
            lineHeight: 1.05,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          EXPLORE THE WORLD
        </div>

        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 22,
            marginTop: 18,
            letterSpacing: '3px',
            display: 'flex',
          }}
        >
          EVENTS · COMPETITIONS · NETWORKING · EXPERIENCES
        </div>

        {/* Divider */}
        <div
          style={{
            width: '55%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #6B3FA0, transparent)',
            marginTop: 44,
            display: 'flex',
          }}
        />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 80, marginTop: 38 }}>
          {[
            ['50+', 'EVENTS'],
            ['5000+', 'ATTENDEES'],
            ['100+', 'SPEAKERS'],
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
                style={{ color: '#F5C842', fontSize: 44, fontWeight: 700, display: 'flex' }}
              >
                {val}
              </span>
              <span
                style={{ color: '#555', fontSize: 13, letterSpacing: '2px', display: 'flex' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            color: '#555',
            fontSize: 14,
            letterSpacing: '3px',
            display: 'flex',
          }}
        >
          ORGANIZED BY PIEDS — ENABLING INNOVATION SINCE 2013
        </div>
      </div>
    ),
    { ...size },
  );
}
