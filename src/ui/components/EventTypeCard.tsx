import Link from 'next/link';
import Card from '@/ui/elements/Card';
import { EventType } from '@/lib/types/event';
import MediaGallery from '@/components/media/MediaGallery';
import { normalizeMedia } from '@/lib/media';

interface EventTypeCardProps {
  event: EventType;
}

export default function EventTypeCard({ event }: EventTypeCardProps) {
  const media = normalizeMedia(event);

  return (
    <Link href={`/events/${event.slug}`}>
      <Card hover padding="none" className="overflow-hidden group h-full">
        <div className="relative">
          <MediaGallery media={media} aspectRatio="aspect-[4/3]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3">
              {event.icon}
            </span>
            <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
            <p className="text-sm text-white/90">{event.tagline}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-base text-gray-700 line-clamp-3">{event.description}</p>
          <div className="mt-4 flex items-center text-purple-600 font-semibold">
            <span>Explore packages</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
