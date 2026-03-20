'use client'

import dynamic from 'next/dynamic'
import type { Event } from '@/types/event'
import { EventMarquee } from './EventMarquee'
import { EventHUD } from './EventHUD'
import { EventTitleBlock } from './EventTitleBlock'
import { EventStatsRow } from './EventStatsRow'
import { EventBody } from './EventBody'
import { EventRegisterCTA } from './EventRegisterCTA'

const EventMazeCanvas = dynamic(() => import('./EventMazeCanvas'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        background: '#06060A',
        borderBottom: '3px solid #FFD700',
        height: 'clamp(90px, 22vw, 180px)',
      }}
      aria-hidden="true"
    />
  ),
})

// SVG noise grain — same as mockup
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`

interface Props {
  event: Event
}

export function EventPoster({ event }: Props) {
  return (
    <div style={{ width: '100%', maxWidth: 680 }}>
      <article
        style={{
          background: '#08080C',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'var(--font-pixel), monospace',
          outline: '3px solid #FFD700',
          outlineOffset: 4,
          // Flex column so sections distribute within exact viewport height
          display: 'flex',
          flexDirection: 'column',
          height: '98dvh',
          boxShadow: [
            '0 0 0 7px #08080C',
            '0 0 0 10px #FFD700',
            '0 0 0 13px #08080C',
            '0 0 0 15px #FF6600',
            '0 0 80px rgba(255,150,0,0.3)',
            '0 0 200px rgba(255,100,0,0.1)',
          ].join(', '),
        }}
        aria-label={`${event.title} event details`}
      >
        {/* Grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 200,
            pointerEvents: 'none',
            opacity: 0.55,
            backgroundImage: GRAIN_SVG,
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />

        {/* Scanlines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 199,
            pointerEvents: 'none',
            background:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.28) 3px, rgba(0,0,0,0.28) 4px)',
          }}
          aria-hidden="true"
        />

        {/* Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 198,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 80% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Corner ornaments */}
        {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
          <div
            key={pos}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              zIndex: 20,
              pointerEvents: 'none',
              top: pos.startsWith('t') ? 0 : 'auto',
              bottom: pos.startsWith('b') ? 0 : 'auto',
              left: pos.endsWith('l') ? 0 : 'auto',
              right: pos.endsWith('r') ? 0 : 'auto',
              borderTop: pos.startsWith('t') ? '4px solid #FFD700' : 'none',
              borderBottom: pos.startsWith('b') ? '4px solid #FFD700' : 'none',
              borderLeft: pos.endsWith('l') ? '4px solid #FFD700' : 'none',
              borderRight: pos.endsWith('r') ? '4px solid #FFD700' : 'none',
            }}
            aria-hidden="true"
          />
        ))}

        {/* Side texture strips */}
        {(['left', 'right'] as const).map(side => (
          <div
            key={side}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              [side]: 0,
              width: 14,
              zIndex: 5,
              pointerEvents: 'none',
              borderRight: side === 'left' ? '2px solid #1A1000' : 'none',
              borderLeft: side === 'right' ? '2px solid #1A1000' : 'none',
              background:
                'repeating-linear-gradient(180deg, #0A0800 0px, #0A0800 8px, #0D0A00 8px, #0D0A00 16px)',
            }}
            aria-hidden="true"
          />
        ))}

        {/* 1. Marquee */}
        <EventMarquee event={event} />

        {/* 2. HUD */}
        <EventHUD hudStats={event.hudStats} />

        {/* 3. Canvas */}
        <EventMazeCanvas ghosts={event.mazeGhosts} />

        {/* 4. Title block */}
        <EventTitleBlock event={event} />

        {/* 5. Pixel rule */}
        <div
          style={{
            height: 8,
            flexShrink: 0,
            background:
              'repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 8px, #FF6600 8px, #FF6600 16px, #FF3300 16px, #FF3300 24px, #FF6600 24px, #FF6600 32px)',
            position: 'relative',
            zIndex: 10,
          }}
          aria-hidden="true"
        />

        {/* 6. Stats row */}
        <EventStatsRow stats={event.stats} />

        {/* 7. Body */}
        <EventBody event={event} />

        {/* 8. Warning stripe */}
        <div
          style={{
            height: 10,
            flexShrink: 0,
            background:
              'repeating-linear-gradient(-45deg, #FFD700 0px, #FFD700 8px, #08080C 8px, #08080C 16px)',
            position: 'relative',
            zIndex: 10,
          }}
          aria-hidden="true"
        />

        {/* 9. Register CTA + Footer */}
        <EventRegisterCTA event={event} />
      </article>
    </div>
  )
}
