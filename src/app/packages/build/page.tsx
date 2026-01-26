'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';

export default function PackageBuilderPage() {
  const router = useRouter();
  const [pageData, setPageData] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [eventDetails, setEventDetails] = useState({
    date: '',
    guestCount: '',
    budget: '',
    venue: '',
    notes: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetch('/api/content/pages/package-builder')
      .then(res => res.json())
      .then(data => setPageData(data))
      .catch(err => console.error('Page data error:', err));

    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        console.log('Services loaded:', data);
        setServices(data.services || []);
      })
      .catch(err => console.error('Services error:', err));

    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        console.log('Events loaded:', data);
        setEvents(data.eventTypes || data.events || []);
      })
      .catch(err => console.error('Events error:', err));
  }, []);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: eventDetails.name,
          email: eventDetails.email,
          phone: eventDetails.phone,
          message: `Event Type: ${events.find(e => e.id === selectedEvent)?.name}\n` +
                   `Date: ${eventDetails.date || 'Not specified'}\n` +
                   `Guests: ${eventDetails.guestCount || 'Not specified'}\n` +
                   `Budget: ${eventDetails.budget || 'Not specified'}\n` +
                   `Venue: ${eventDetails.venue || 'Not specified'}\n` +
                   `Notes: ${eventDetails.notes || 'None'}`,
          items: selectedServices.map(id => ({
            name: services.find(s => s.id === id)?.name || id,
            type: 'service',
            quantity: 1
          }))
        })
      });

      const data = await response.json();

      if (data.ok) {
        alert('✅ Request submitted successfully! We\'ll contact you soon.');
        router.push('/packages');
      } else {
        alert(`❌ ${data.error || 'Failed to submit request. Please try again.'}`);
      }
    } catch (error) {
      alert('❌ Error submitting request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!pageData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const currentStep = pageData.steps[step];

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              {pageData.hero.title}
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              {pageData.hero.subtitle}
            </p>
          </FadeIn>

          {/* Progress Steps */}
          <div className="flex justify-center gap-4 mt-12">
            {pageData.steps.map((s: any, i: number) => (
              <div key={s.id} className={`flex items-center ${i < pageData.steps.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  i === step ? 'bg-purple-600 text-white' :
                  i < step ? 'bg-green-600 text-white' :
                  'bg-white/20 text-white/60'
                }`}>
                  {i + 1}
                </div>
                {i < pageData.steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${i < step ? 'bg-green-600' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
            <p className="text-gray-600 mb-8">{currentStep.description}</p>

            {/* Step 0: Event Type */}
            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.length === 0 ? (
                  <p className="text-gray-600 col-span-2 text-center py-8">Loading events...</p>
                ) : (
                  events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event.id)}
                      className={`p-6 rounded-lg border-2 text-left transition ${
                        selectedEvent === event.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{event.name}</h3>
                      <p className="text-gray-600">{event.tagline}</p>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Step 1: Services */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-6 rounded-lg border-2 text-left transition ${
                      selectedServices.includes(service.id)
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{service.name}</h3>
                    <p className="text-gray-600">{service.tagline}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={eventDetails.name}
                      onChange={(e) => setEventDetails({...eventDetails, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={eventDetails.email}
                      onChange={(e) => setEventDetails({...eventDetails, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={eventDetails.phone}
                    onChange={(e) => setEventDetails({...eventDetails, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                  <input
                    type="date"
                    value={eventDetails.date}
                    onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guest Count</label>
                  <input
                    type="number"
                    value={eventDetails.guestCount}
                    onChange={(e) => setEventDetails({...eventDetails, guestCount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Approximate number of guests"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select
                    value={eventDetails.budget}
                    onChange={(e) => setEventDetails({...eventDetails, budget: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1l">Under ₹1 Lakh</option>
                    <option value="1-3l">₹1-3 Lakhs</option>
                    <option value="3-6l">₹3-6 Lakhs</option>
                    <option value="6l-plus">₹6 Lakhs+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue (Optional)</label>
                  <input
                    type="text"
                    value={eventDetails.venue}
                    onChange={(e) => setEventDetails({...eventDetails, venue: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Venue name or location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    value={eventDetails.notes}
                    onChange={(e) => setEventDetails({...eventDetails, notes: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Any special requirements or preferences"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4 text-gray-900">Your Custom Package</h3>
                  <div className="space-y-2 text-gray-900">
                    <p><strong>Event Type:</strong> {events.find(e => e.id === selectedEvent)?.name}</p>
                    <p><strong>Services:</strong> {selectedServices.map(id => services.find(s => s.id === id)?.name).join(', ')}</p>
                    <p><strong>Date:</strong> {eventDetails.date || 'Not specified'}</p>
                    <p><strong>Guests:</strong> {eventDetails.guestCount || 'Not specified'}</p>
                    <p><strong>Budget:</strong> {eventDetails.budget || 'Not specified'}</p>
                    {eventDetails.venue && <p><strong>Venue:</strong> {eventDetails.venue}</p>}
                    {eventDetails.notes && <p><strong>Notes:</strong> {eventDetails.notes}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => step > 0 ? setStep(step - 1) : router.push('/packages')}
              >
                {step === 0 ? 'Back to Packages' : 'Previous'}
              </Button>
              <Button
                variant="primary"
                onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
                disabled={
                  submitting ||
                  (step === 0 && !selectedEvent) ||
                  (step === 1 && selectedServices.length === 0) ||
                  (step === 2 && (!eventDetails.name || !eventDetails.email || !eventDetails.phone))
                }
              >
                {submitting ? 'Submitting...' : step === 3 ? 'Submit Request' : 'Next'}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
