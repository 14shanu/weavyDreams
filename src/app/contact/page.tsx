import { Metadata } from 'next';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import ContactForm from '@/ui/forms/ContactForm';
import FadeIn from '@/ui/animations/FadeIn';
import contactData from '@/data/pages/contact.json';
import siteConfig from '@/data/site-config.json';

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = contactData;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: seo.openGraph,
    twitter: seo.twitter,
  };
}

export default function ContactPage() {
  const { hero, content } = contactData;
  const { contact } = siteConfig;
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
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn direction="left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{content.title}</h2>
              
              <div className="space-y-6">
                <Card padding="md" className="border-l-4 border-purple-600">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
                      <a href={`mailto:${contact.email}`} className="text-purple-600 hover:text-purple-700 font-semibold">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card padding="md" className="border-l-4 border-pink-600">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Phone</h3>
                      <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-pink-600 hover:text-pink-700 font-semibold">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card padding="md" className="border-l-4 border-indigo-600">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-700 font-medium">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <Card className="sticky top-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.formTitle}</h2>
                <ContactForm />
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
