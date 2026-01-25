import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import ServiceCard from '@/ui/components/ServiceCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import { getServices } from '@/lib/api/services';

export default async function ServicesSection() {
  const { services } = await getServices();

  return (
    <Section background="default" id="services">
      <Container>
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] text-center mb-4 text-white">
            Our Services
          </h2>
          <p className="text-center text-white/80 max-w-2xl mx-auto mb-12">
            Comprehensive event services to bring your vision to life
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </Section>
  );
}
