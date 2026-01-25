import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import ServiceCard from '@/ui/components/ServiceCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import { getServices } from '@/lib/api/services';

export default async function ServicesSection() {
  const { services } = await getServices();

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive event services to bring your vision to life
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
