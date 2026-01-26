'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '@/ui/layout/Container';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import QuoteRequestModal from '@/ui/modals/QuoteRequestModal';
import ServiceExperience from '@/components/ServiceExperience';

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export default function ServicePageContent({ params }: PageProps) {
  const [service, setService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    params.then(async ({ serviceId }) => {
      const response = await fetch(`/api/services/${serviceId}`);
      if (response.ok) {
        const data = await response.json();
        setService(data);
      }
    });
  }, [params]);

  if (!service) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div></div>;

  return (
    <ServiceExperience service={service}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-20">
        <Container>
          <FadeIn>
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                {service.icon} Service
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {service.tagline}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About This Service</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{service.description}</p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included:</h3>
              <ul className="space-y-4 mb-10">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                Request Quote
              </Button>
            </FadeIn>
          </div>
        </Container>
      </section>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName={service.name}
        itemType="service"
      />
    </ServiceExperience>
  );
}
