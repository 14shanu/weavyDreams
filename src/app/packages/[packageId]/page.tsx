'use client';

import { useState, useEffect } from 'react';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Button from '@/ui/elements/Button';
import Card from '@/ui/elements/Card';
import FadeIn from '@/ui/animations/FadeIn';
import QuoteRequestModal from '@/ui/modals/QuoteRequestModal';

interface PageProps {
  params: Promise<{ packageId: string }>;
}

export default function PackagePage({ params }: PageProps) {
  const [pkg, setPkg] = useState<any>(null);
  const [includedServices, setIncludedServices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    params.then(async ({ packageId }) => {
      const response = await fetch(`/api/packages/${packageId}`);
      if (response.ok) {
        const data = await response.json();
        setPkg(data.package);
        setIncludedServices(data.includedServices);
      }
    });
  }, [params]);

  if (!pkg) return null;

  const tierColors: Record<string, string> = {
    essential: 'from-blue-500 to-blue-600',
    premium: 'from-purple-500 to-purple-600',
    luxury: 'from-amber-500 to-amber-600',
  };

  return (
    <>
      {/* Hero Section */}
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <div className={`bg-gradient-to-r ${tierColors[pkg.tier]} text-white rounded-2xl p-8 text-center`}>
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold uppercase mb-4">
                {pkg.tier}
              </span>
              <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] mb-4">
                {pkg.name}
              </h1>
              <p className="text-xl mb-2">{pkg.tagline}</p>
              <p className="text-white/90">{pkg.guestCount}</p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Package Details */}
      <Section background="alt">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <FadeIn>
                <h2 className="text-2xl font-semibold mb-4">Package Overview</h2>
                <p className="text-gray-600 mb-8">{pkg.description}</p>

                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <div className="grid gap-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-4">Included Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {includedServices.map((service) => (
                    <Card key={service.id} padding="sm" className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div>
              <FadeIn delay={0.2}>
                <Card className="sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Ready to Book?</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Get started with this package or customize it to your needs
                  </p>
                  <div className="space-y-3">
                    <Button variant="primary" className="w-full" onClick={() => setIsModalOpen(true)}>
                      Request Quote
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>
                      Customize Package
                    </Button>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName={pkg.name}
        itemType="package"
      />
    </>
  );
}

