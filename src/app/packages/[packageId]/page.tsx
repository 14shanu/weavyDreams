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

  if (!pkg) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;

  const tierColors: Record<string, string> = {
    essential: 'from-blue-500 via-blue-600 to-cyan-600',
    premium: 'from-purple-500 via-purple-600 to-pink-600',
    luxury: 'from-amber-500 via-orange-600 to-red-600',
  };

  const tierBadges: Record<string, string> = {
    essential: 'bg-blue-100 text-blue-800',
    premium: 'bg-purple-100 text-purple-800',
    luxury: 'bg-amber-100 text-amber-800',
  };

  return (
    <>
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${tierColors[pkg.tier]} py-20`}>
        <Container>
          <FadeIn>
            <div className="text-center">
              <span className={`inline-block px-6 py-2 ${tierBadges[pkg.tier]} rounded-full text-sm font-bold uppercase mb-6`}>
                {pkg.tier} Package
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {pkg.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4">{pkg.tagline}</p>
              <p className="text-lg text-white/80">{pkg.guestCount}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Package Details */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeIn>
                <Card className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Package Overview</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{pkg.description}</p>
                </Card>

                <Card className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                  <div className="grid gap-4">
                    {pkg.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                        <svg className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-base font-medium text-gray-900">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Included Services</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {includedServices.map((service) => (
                      <div key={service.id} className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-3xl">{service.icon}</span>
                        </div>
                        <p className="font-semibold text-gray-900">{service.name}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div>
              <FadeIn delay={0.2}>
                <Card className="sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Book?</h3>
                  <p className="text-base text-gray-600 mb-6">
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
      </section>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName={pkg.name}
        itemType="package"
      />
    </>
  );
}

