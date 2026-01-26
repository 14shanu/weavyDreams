import { getPackages } from '@/lib/api/packages';
import { readPageJSON } from '@/lib/admin/file-system';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import PackageCard from '@/ui/components/PackageCard';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import Link from 'next/link';

export async function generateMetadata() {
  const pageData = await readPageJSON('packages-listing.json');
  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
    keywords: pageData.seo.keywords,
    openGraph: pageData.seo.openGraph,
    twitter: pageData.seo.twitter,
  };
}

export default async function PackagesPage() {
  const { packages } = await getPackages();
  const pageData = await readPageJSON('packages-listing.json');

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
              {pageData.hero.title}
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              {pageData.hero.subtitle}
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

      <Section background="default">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] text-white mb-4">
              {pageData.cta.title}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {pageData.cta.description}
            </p>
            <Link href={pageData.cta.buttonLink}>
              <Button variant="primary" size="lg">
                {pageData.cta.buttonText}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
