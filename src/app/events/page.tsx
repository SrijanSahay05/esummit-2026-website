import { createMetadata } from '@/lib/metadata'
import { EVENTS } from '@/lib/events'
import { EventsGrid } from './_components/EventsGrid'

export const metadata = createMetadata({
  title: 'Events',
  description:
    'Explore all E-Summit 2026 events — startup competitions, workshops, networking, and more at BITS Pilani.',
})

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-bg-primary px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-pixel text-[10px] text-accent-orange sm:text-xs">
            E-SUMMIT 2026
          </p>
          <h1 className="font-pixel mt-3 text-2xl tracking-tight text-text-primary sm:text-3xl md:text-4xl">
            EVENTS
          </h1>
          <p className="mt-4 font-pixel text-[10px] text-text-muted sm:text-xs">
            SELECT YOUR CHALLENGE
          </p>
          {/* Pixel rule */}
          <div
            className="mx-auto mt-6 h-[3px] w-32"
            style={{
              background:
                'repeating-linear-gradient(90deg, #F5C842 0, #F5C842 8px, #E87A20 8px, #E87A20 16px, #C43030 16px, #C43030 24px)',
            }}
            aria-hidden="true"
          />
        </div>

        <EventsGrid events={EVENTS} />
      </div>
    </main>
  )
}
