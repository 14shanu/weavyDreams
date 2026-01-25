'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/stores/quizStore';
import Section from '@/ui/layout/Section';
import Container from '@/ui/layout/Container';
import Button from '@/ui/elements/Button';
import QuizQuestion from '@/ui/quiz/QuizQuestion';
import QuizProgress from '@/ui/quiz/QuizProgress';
import FadeIn from '@/ui/animations/FadeIn';
import { QuizData } from '@/lib/types/quiz';

interface QuizContainerProps {
  quizData: QuizData;
}

export default function QuizContainer({ quizData }: QuizContainerProps) {
  const router = useRouter();
  const { answers, currentQuestion, setAnswer, nextQuestion, previousQuestion, completeQuiz } = useQuizStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const { quiz } = quizData;
  const currentQ = quiz.questions[currentQuestion];
  const currentAnswer = answers.find((a) => a.questionId === currentQ.id);
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const canProceed = currentAnswer && (
    (Array.isArray(currentAnswer.value) && currentAnswer.value.length > 0) ||
    (!Array.isArray(currentAnswer.value) && currentAnswer.value)
  );

  const handleNext = () => {
    if (isLastQuestion) {
      completeQuiz();
      router.push('/quiz/results/1');
    } else {
      nextQuestion();
    }
  };

  return (
    <Section background="alt" spacing="lg">
      <Container size="md">
        <FadeIn>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] mb-2">
              {quiz.title}
            </h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>

          <QuizProgress current={currentQuestion} total={quiz.questions.length} />

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <QuizQuestion
              question={currentQ}
              value={currentAnswer?.value || (currentQ.type === 'multiple-choice' ? [] : '')}
              onChange={(value) => setAnswer(currentQ.id, value)}
            />

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canProceed}
              >
                {isLastQuestion ? 'See Results' : 'Next →'}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
