import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/api/events';
import { getPackagesByEventType } from '@/lib/api/packages';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import PackageCard from '@/ui/components/PackageCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';

interface PageProps {
  params: Promise<{ eventType: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventType } = await params;
  const event = await getEventBySlug(eventType);

  if (!event || !event.seo) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.seo.title,
    description: event.seo.description,
    keywords: event.seo.keywords,
    openGraph: {
      title: event.seo.openGraph.title,
      description: event.seo.openGraph.description,
      images: [event.seo.openGraph.image],
      type: event.seo.openGraph.type as 'website',
    },
    twitter: {
      card: event.seo.twitter.card as 'summary_large_image',
      title: event.seo.twitter.title,
      description: event.seo.twitter.description,
      images: [event.seo.twitter.image],
    }
  };
}

export default async function EventTypePage({ params }: PageProps) {
  const { eventType } = await params;
  const event = await getEventBySlug(eventType);

  if (!event) {
    notFound();
  }

  const packages = await getPackagesByEventType(event.id);

  return (
    <>
      {/* Hero Section */}
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              {event.name}
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-6">
              {event.tagline}
            </p>
            <p className="text-white/70 text-center max-w-2xl mx-auto">
              {event.description}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Packages Section */}
      <Section background="alt">
        <Container>
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] text-center mb-4">
              Our {event.name} Packages
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Choose the perfect package for your event or build your own
            </p>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.id}>
                <PackageCard package={pkg} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>
    </>
  );
}
