import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';
import Link from 'next/link';

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
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Creativity',
      description: 'Innovative solutions that bring your unique vision to life',
      icon: '🎨',
      color: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Reliability',
      description: 'Dependable service you can trust for your special day',
      icon: '🤝',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      title: 'Passion',
      description: 'We love what we do and it shows in every event',
      icon: '❤️',
      color: 'from-red-400 to-pink-500',
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-20">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                About Weaving Dreams
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Creating unforgettable events from concept to execution
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <FadeIn direction="left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Weaving Dreams was founded with a simple mission: to transform ordinary events into extraordinary experiences. With years of expertise in event planning and management, we bring creativity, precision, and passion to every project.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                From intimate celebrations to grand productions, we approach each event with strategic clarity and creative vision. Our team is dedicated to understanding your unique needs and bringing your vision to life.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that every event tells a story, and we're here to help you tell yours in the most memorable way possible.
              </p>
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
              <h2 className="text-4xl font-bold mb-6">Ready to Start Planning?</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Let's create something amazing together. Get in touch to discuss your event.
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
