import Container from '@/ui/layout/Container';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description: string;
}

export default function CTASection({ title, description }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <Container>
        <FadeIn>
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              {description}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/quiz">
                <Button variant="secondary" size="lg">
                  Take Our Quiz
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
