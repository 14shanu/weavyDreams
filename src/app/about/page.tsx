import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';

export const metadata = {
  title: 'About Us | Weaving Dreams',
  description: 'Learn about our passion for creating unforgettable events and our commitment to excellence',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Excellence',
      description: 'We strive for perfection in every detail of your event',
      icon: '⭐',
    },
    {
      title: 'Creativity',
      description: 'Innovative solutions that bring your unique vision to life',
      icon: '🎨',
    },
    {
      title: 'Reliability',
      description: 'Dependable service you can trust for your special day',
      icon: '🤝',
    },
    {
      title: 'Passion',
      description: 'We love what we do and it shows in every event',
      icon: '❤️',
    },
  ];

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              About Weaving Dreams
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Creating unforgettable events from concept to execution
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <FadeIn direction="left">
              <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Weaving Dreams was founded with a simple mission: to transform ordinary events into extraordinary experiences. With years of expertise in event planning and management, we bring creativity, precision, and passion to every project.
              </p>
              <p className="text-gray-600 mb-4">
                From intimate celebrations to grand productions, we approach each event with strategic clarity and creative vision. Our team is dedicated to understanding your unique needs and bringing your vision to life.
              </p>
              <p className="text-gray-600">
                We believe that every event tells a story, and we're here to help you tell yours in the most memorable way possible.
              </p>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative h-96 rounded-xl overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-6xl">📸</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <h2 className="text-3xl font-semibold text-center mb-12">Our Values</h2>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <Section background="default">
        <Container>
          <FadeIn>
            <div className="text-center text-white">
              <h2 className="text-3xl font-semibold mb-4">Ready to Start Planning?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Let's create something amazing together. Get in touch to discuss your event.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="primary" onClick={() => window.location.href = '/contact'}>
                  Contact Us
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/quiz'}>
                  Take Quiz
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
