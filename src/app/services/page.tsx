import { Metadata } from 'next';
import { getServices } from '@/lib/api/services';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import ServiceCard from '@/ui/components/ServiceCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import servicesListingData from '@/data/pages/services-listing.json';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = servicesListingData;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default async function ServicesPage() {
  const { services } = await getServices();
  const { hero } = servicesListingData;

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
