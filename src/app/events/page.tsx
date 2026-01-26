import { Metadata } from 'next';
import { getEvents } from '@/lib/api/events';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import EventTypeCard from '@/ui/components/EventTypeCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import eventsListingData from '@/data/pages/events-listing.json';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = eventsListingData;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default async function EventsPage() {
  const { eventTypes } = await getEvents();
  const { hero } = eventsListingData;

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              {hero.title}
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event) => (
              <StaggerItem key={event.id}>
                <EventTypeCard event={event} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>
    </>
  );
}
