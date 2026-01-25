import Link from 'next/link';
import Image from 'next/image';
import Card from '@/ui/elements/Card';
import { Service } from '@/lib/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`}>
      <Card hover padding="none" className="overflow-hidden h-full">
        <div className="relative h-40 w-full">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{service.description}</p>
          <div className="mt-4">
            <span className="text-sm text-[var(--color-primary)] font-medium">
              Learn more →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
