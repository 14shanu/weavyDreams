'use client';

import { useEffect } from 'react';
import Button from '@/ui/elements/Button';
import Container from '@/ui/layout/Container';
import Section from '@/ui/layout/Section';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <Section spacing="lg">
      <Container size="sm">
        <div className="text-center">
          <h1 className="text-4xl font-[var(--font-heading)] mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We apologize for the inconvenience. Please try again.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset}>Try Again</Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
