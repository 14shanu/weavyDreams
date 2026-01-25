import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | Weaving Dreams',
  description: 'Explore our past events and see the magic we create',
};

export default function PortfolioPage() {
  // Placeholder portfolio items
  const portfolioItems = [
    { id: 1, title: 'Elegant Wedding', category: 'Weddings', image: '/images/work-weddings.jpg' },
    { id: 2, title: 'Corporate Gala', category: 'Corporate', image: '/images/work-gala-dinner.jpg' },
    { id: 3, title: 'Exhibition Booth', category: 'Exhibitions', image: '/images/work-expo-booth.jpg' },
    { id: 4, title: 'Hotel Decoration', category: 'Private', image: '/images/work-hotel-decoration.jpg' },
    { id: 5, title: 'Outdoor Event', category: 'Private', image: '/images/work-outdoor-decoration.jpg' },
    { id: 6, title: 'Press Conference', category: 'Corporate', image: '/images/work-press-conference.jpg' },
  ];

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              Our Portfolio
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Explore our past events and see the magic we create
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <StaggerItem key={item.id}>
                <Card padding="none" hover className="overflow-hidden group">
                  <div className="relative h-64 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-4xl">📸</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-white/80">{item.category}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Want to see your event featured here?
              </p>
              <Link href="/contact">
                <Button variant="primary">
                  Start Planning
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
