import Link from 'next/link';
import Image from 'next/image';
import Card from '@/ui/elements/Card';
import { EventType } from '@/lib/types/event';

interface EventTypeCardProps {
  event: EventType;
}

export default function EventTypeCard({ event }: EventTypeCardProps) {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card hover padding="none" className="overflow-hidden group">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold">{event.name}</h3>
            <p className="text-sm text-white/80 mt-1">{event.tagline}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
        </div>
      </Card>
    </Link>
  );
}
