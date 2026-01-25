import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import EventTypeCard from '@/ui/components/EventTypeCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import { getEvents } from '@/lib/api/events';

export default async function EventTypesSection() {
  const { eventTypes } = await getEvents();
  const featuredEvents = eventTypes.filter((e) => e.featured);

  return (
    <Section background="alt" id="event-types">
      <Container>
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] text-center mb-4">
            Event Types We Specialize In
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            From intimate celebrations to grand productions, we bring expertise to every event type
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <StaggerItem key={event.id}>
              <EventTypeCard event={event} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </Section>
  );
}
