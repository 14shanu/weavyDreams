import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import ContactForm from '@/ui/forms/ContactForm';
import FadeIn from '@/ui/animations/FadeIn';

export const metadata = {
  title: 'Contact Us | Weaving Dreams',
  description: 'Get in touch with us to discuss your event planning needs',
};

export default function ContactPage() {
  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Let's discuss your event and bring your vision to life
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn direction="left">
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <Card padding="md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@weavingdreams.com" className="text-[var(--color-primary)] hover:underline">
                        info@weavingdreams.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+915551234567" className="text-[var(--color-primary)] hover:underline">
                        +91 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </Card>

                <Card padding="md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-gray-600">
                        123 Event Street<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <Card>
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                <ContactForm />
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </>
  );
}
