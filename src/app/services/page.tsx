import { getServices } from '@/lib/api/services';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import ServiceCard from '@/ui/components/ServiceCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';

export const metadata = {
  title: 'Our Services | Weaving Dreams',
  description: 'Comprehensive event planning services to bring your vision to life',
};

export default async function ServicesPage() {
  const { services } = await getServices();

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              Our Services
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Comprehensive event services to bring your vision to life
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>
    </>
  );
}
