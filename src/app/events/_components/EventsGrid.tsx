'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Event } from '@/types/event'

const CATEGORY_LABELS: Record<Event['category'], string> = {
  competition: '⚔ COMPETITION',
  workshop: '⚙ WORKSHOP',
  networking: '◈ NETWORKING',
  experience: '★ EXPERIENCE',
}

const CATEGORY_COLORS: Record<Event['category'], string> = {
  competition: '#C43030',
  workshop: '#4A90D9',
  networking: '#E87A20',
  experience: '#6B3FA0',
}

interface Props {
  events: Event[]
}

export function EventsGrid({ events }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, i) => (
        <motion.div
          key={event.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08, ease: 'easeOut' }}
        >
          <Link
            href={`/events/${event.slug}`}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow"
          >
            <article
              className="relative overflow-hidden border border-white/10 bg-black transition-transform duration-150 group-hover:-translate-y-1 group-active:translate-y-0"
              style={{
                boxShadow: `0 0 0 1px ${event.accentColor}40, 4px 4px 0 0 ${event.accentColor}60`,
              }}
            >
              {/* Top accent strip */}
              <div
                className="h-1 w-full"
                style={{ background: event.accentColor }}
                aria-hidden="true"
              />

              <div className="p-5">
                {/* Level + category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-pixel text-[9px] text-text-muted">
                    {event.level}
                  </span>
                  <span
                    className="font-pixel text-[8px]"
                    style={{ color: CATEGORY_COLORS[event.category] }}
                  >
                    {CATEGORY_LABELS[event.category]}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-pixel mt-3 text-[13px] leading-snug text-text-primary sm:text-[14px]"
                  style={{ textShadow: `0 0 12px ${event.accentColor}60` }}
                >
                  {event.title}
                </h2>

                {/* Tagline */}
                <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
                  {event.tagline}
                </p>

                {/* Stats row */}
                <div className="mt-4 flex gap-4">
                  {event.stats.slice(0, 2).map(stat => (
                    <div key={stat.label}>
                      <div
                        className="font-pixel text-[13px]"
                        style={{ color: stat.color ?? event.accentColor }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-pixel text-[7px] text-text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 flex items-center gap-2">
                  <span
                    className="font-pixel text-[9px] transition-colors group-hover:text-text-primary"
                    style={{ color: event.accentColor }}
                  >
                    ► VIEW EVENT
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{ background: `${event.accentColor}40` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
