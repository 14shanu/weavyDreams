import { Metadata } from 'next';
import servicesData from '@/data/services.json';
import ServicePageContent from './ServicePageContent';

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export async function generateStaticParams() {
  return servicesData.services.map(service => ({
    serviceId: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = servicesData.services.find(s => s.id === serviceId);
  
  if (!service || !service.seo) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    openGraph: {
      title: service.seo.openGraph.title,
      description: service.seo.openGraph.description,
      images: [service.seo.openGraph.image],
      type: service.seo.openGraph.type as 'website',
    },
    twitter: {
      card: service.seo.twitter.card as 'summary_large_image',
      title: service.seo.twitter.title,
      description: service.seo.twitter.description,
      images: [service.seo.twitter.image],
    }
  };
}

export default function ServicePage({ params }: PageProps) {
  return <ServicePageContent params={params} />;
}
