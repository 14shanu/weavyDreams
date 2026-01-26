import Link from 'next/link';
import Card from '@/ui/elements/Card';
import { Service } from '@/lib/types/service';
import MediaGallery from '@/components/media/MediaGallery';
import { normalizeMedia } from '@/lib/media';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const media = normalizeMedia(service);

  return (
    <Link href={`/services/${service.slug}`}>
      <Card hover padding="none" className="overflow-hidden h-full bg-white">
        <MediaGallery media={media} aspectRatio="aspect-[4/3]" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
          <p className="text-base text-gray-600 line-clamp-3 mb-4">{service.description}</p>
          <div className="flex items-center text-purple-600 font-semibold">
            <span>Learn more</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
