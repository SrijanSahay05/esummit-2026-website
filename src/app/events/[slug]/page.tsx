import { notFound } from 'next/navigation'
import { createMetadata } from '@/lib/metadata'
import { getEventBySlug, getAllEventSlugs } from '@/lib/events'
import { SITE } from '@/lib/constants'
import { EventPoster } from './_components/EventPoster'

export function generateStaticParams() {
  return getAllEventSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return createMetadata()
  return createMetadata({ title: event.title, description: event.description })
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    organizer: { '@type': 'Organization', name: SITE.organizer },
    location: { '@type': 'Place', name: SITE.venue },
    startDate: '2026-04',
    url: `${SITE.url}/events/${event.slug}`,
  }

  return (
    <main
      className="flex items-start justify-center overflow-hidden"
      style={{
        height: '100dvh',
        background: '#1a1008',
        padding: '1dvh clamp(6px, 1.5vw, 14px)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventPoster event={event} />
    </main>
  )
}
