import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import Link from 'next/link';

interface PortfolioItem {
  label: string;
  image: string;
  slug: string;
}

interface PortfolioSectionProps {
  title: string;
  items: PortfolioItem[];
}

export default function PortfolioSection({ title, items }: PortfolioSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of stunning events we've brought to life
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item) => (
            <StaggerItem key={item.slug}>
              <Card hover padding="none" className="overflow-hidden h-full group">
                <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">📸</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.label}</h3>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn>
          <div className="text-center">
            <Link href="/portfolio">
              <Button variant="primary" size="lg">
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
