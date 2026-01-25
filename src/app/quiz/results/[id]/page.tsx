'use client';

import { useEffect, useState } from 'react';
import { useQuizStore } from '@/lib/stores/quizStore';
import { useRouter } from 'next/navigation';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import PackageCard from '@/ui/components/PackageCard';
import Button from '@/ui/elements/Button';
import FadeIn from '@/ui/animations/FadeIn';
import StaggerChildren, { StaggerItem } from '@/ui/animations/StaggerChildren';

export default function QuizResultsPage() {
  const router = useRouter();
  const { answers, isComplete, resetQuiz } = useQuizStore();
  const [mounted, setMounted] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isComplete) {
      router.push('/quiz');
    }
  }, [mounted, isComplete, router]);

  useEffect(() => {
    if (mounted && isComplete) {
      // Calculate recommendations based on answers
      // For now, showing placeholder
      fetchRecommendations();
    }
  }, [mounted, isComplete]);

  const fetchRecommendations = async () => {
    // TODO: Implement recommendation algorithm
    // For now, fetch some packages
    const response = await fetch('/api/packages');
    const data = await response.json();
    setRecommendations(data.packages?.slice(0, 3) || []);
  };

  const handleRetake = () => {
    resetQuiz();
    router.push('/quiz');
  };

  if (!mounted || !isComplete) {
    return null;
  }

  return (
    <>
      <Section background="default" spacing="lg">
        <Container>
          <FadeIn>
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] mb-4">
                Your Perfect Packages
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Based on your answers, here are our top recommendations
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          {recommendations.length > 0 ? (
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendations.map((pkg) => (
                <StaggerItem key={pkg.id}>
                  <PackageCard package={pkg} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Loading recommendations...</p>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Not quite right? Browse all packages or retake the quiz
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={handleRetake}>
                Retake Quiz
              </Button>
              <Button variant="primary" onClick={() => router.push('/packages')}>
                Browse All Packages
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
