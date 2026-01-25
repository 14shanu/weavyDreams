import { EventType } from '@/lib/types/event';
import { Service } from '@/lib/types/service';
import { Package } from '@/lib/types/package';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Weaving Dreams',
    description: 'Premium event management and planning services',
    url: 'https://weavingdreams.com',
    logo: 'https://weavingdreams.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      email: 'hello@weavingdreams.com',
    },
    sameAs: [
      'https://facebook.com/weavingdreams',
      'https://instagram.com/weavingdreams',
      'https://linkedin.com/company/weavingdreams',
    ],
  };
}

export function generateEventSchema(event: EventType) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: event.name,
    description: event.description,
    provider: {
      '@type': 'Organization',
      name: 'Weaving Dreams',
    },
    areaServed: 'Worldwide',
    serviceType: 'Event Planning',
  };
}

export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Weaving Dreams',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generatePackageSchema(pkg: Package) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.name,
    description: pkg.description,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
