import { getPackages } from '@/lib/api/packages';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import PackageCard from '@/ui/components/PackageCard';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';

export const metadata = {
  title: 'Our Packages | Weaving Dreams',
  description: 'Pre-designed event packages for every occasion and budget',
};

export default async function PackagesPage() {
  const { packages } = await getPackages();

  // Group packages by event type
  const packagesByEvent = packages.reduce((acc, pkg) => {
    if (!acc[pkg.eventType]) {
      acc[pkg.eventType] = [];
    }
    acc[pkg.eventType].push(pkg);
    return acc;
  }, {} as Record<string, typeof packages>);

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              Our Packages
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Pre-designed packages for every event type and budget
            </p>
          </FadeIn>
        </Container>
      </Section>

      {Object.entries(packagesByEvent).map(([eventType, eventPackages]) => (
        <Section key={eventType} background="alt">
          <Container>
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] text-gray-900 text-center mb-12 capitalize">
                {eventType} Packages
              </h2>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventPackages.map((pkg) => (
                <StaggerItem key={pkg.id}>
                  <PackageCard package={pkg} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </Container>
        </Section>
      ))}
    </>
  );
}
