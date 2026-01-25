import Container from '@/ui/layout/Container';
import FadeIn from '@/ui/animations/FadeIn';
import Button from '@/ui/elements/Button';
import Link from 'next/link';

interface AboutSectionProps {
  title: string;
  body: string[];
  image: string;
}

export default function AboutSection({ title, body }: AboutSectionProps) {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">✨</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="space-y-4 mb-8">
              {body.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href="/about">
                <Button variant="primary" size="lg">
                  Learn More
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
