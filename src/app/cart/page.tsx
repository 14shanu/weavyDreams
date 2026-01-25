'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cartStore';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Card from '@/ui/elements/Card';
import Button from '@/ui/elements/Button';
import Input from '@/ui/elements/Input';
import Textarea from '@/ui/elements/Textarea';
import CartItem from '@/ui/cart/CartItem';
import FadeIn from '@/ui/animations/FadeIn';

export default function CartPage() {
  const router = useRouter();
  const { items, clearCart, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const itemCount = getItemCount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            type: item.type,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSubmitStatus('success');
        clearCart();
        setTimeout(() => router.push('/'), 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit quote request');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] text-white text-center mb-4">
              Your Cart
            </h1>
            <p className="text-xl text-white/80 text-center">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          {items.length === 0 ? (
            <FadeIn>
              <Card className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Add services or packages to get started</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="primary" onClick={() => router.push('/services')}>
                    Browse Services
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/packages')}>
                    View Packages
                  </Button>
                </div>
              </Card>
            </FadeIn>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <FadeIn>
                  <Card>
                    <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
                    <div className="divide-y">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="ghost" size="sm" onClick={clearCart}>
                        Clear Cart
                      </Button>
                    </div>
                  </Card>
                </FadeIn>
              </div>

              {/* Quote Request Form */}
              <div>
                <FadeIn delay={0.2}>
                  <Card className="sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Request Quote</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        label="Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <Textarea
                        label="Message"
                        rows={4}
                        placeholder="Tell us about your event..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Request Quote'}
                      </Button>
                      
                      {submitStatus === 'success' && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                          ✓ Quote request sent! We'll contact you soon.
                        </div>
                      )}
                      
                      {submitStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                          ✗ {errorMessage}
                        </div>
                      )}
                    </form>
                  </Card>
                </FadeIn>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
