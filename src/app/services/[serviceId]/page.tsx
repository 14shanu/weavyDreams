'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import QuoteRequestModal from '@/ui/modals/QuoteRequestModal';

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export default function ServicePage({ params }: PageProps) {
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

  if (!service) return null;

  return (
    <>
      {/* Hero Section */}
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              {service.tagline}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Service Details */}
      <Section background="alt">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <h2 className="text-2xl font-semibold mb-4">About This Service</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <h3 className="text-lg font-semibold mb-3">What's Included:</h3>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                Request Quote
              </Button>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemName={service.name}
        itemType="service"
      />
    </>
  );
}

