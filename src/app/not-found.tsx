import Link from 'next/link';
import Button from '@/ui/elements/Button';
import Container from '@/ui/layout/Container';
import Section from '@/ui/layout/Section';

export default function NotFound() {
  return (
    <Section spacing="lg">
      <Container size="sm">
        <div className="text-center">
          <h1 className="text-6xl font-[var(--font-heading)] mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
