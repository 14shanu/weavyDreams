import { getEvents } from '@/lib/api/events';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import EventTypeCard from '@/ui/components/EventTypeCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';

export const metadata = {
  title: 'Event Types | Weaving Dreams',
  description: 'Explore our event planning services for weddings, corporate events, private celebrations, exhibitions, and proposals',
};

export default async function EventsPage() {
  const { eventTypes } = await getEvents();

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              Event Types
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Professional event planning for every occasion
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
