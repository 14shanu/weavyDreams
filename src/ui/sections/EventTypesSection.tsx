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
    <section className="py-20 bg-gray-50">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Event Types We Specialize In
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate celebrations to grand productions, we bring expertise to every event type
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <StaggerItem key={event.id}>
              <EventTypeCard event={event} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
