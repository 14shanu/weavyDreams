import { Metadata } from 'next';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import Link from 'next/link';
import aboutData from '@/data/pages/about.json';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = aboutData;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default function AboutPage() {
  const { hero, story, values, cta } = aboutData;

  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-20">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {hero.subtitle}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <FadeIn direction="left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{story.title}</h2>
              {story.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl">📸</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Our Values</h2>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="text-center h-full hover:shadow-2xl transition-shadow">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-4xl">{value.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-base text-gray-600">{value.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        <Container>
          <FadeIn>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">{cta.title}</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                {cta.subtitle}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="lg">
                    Take Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
