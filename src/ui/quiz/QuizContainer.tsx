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
    <section className="min-h-screen py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Container size="md">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-purple-400/30">
              🎯 Find Your Perfect Match
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {quiz.title}
            </h1>
            <p className="text-xl text-purple-100">{quiz.description}</p>
          </div>

          <QuizProgress current={currentQuestion} total={quiz.questions.length} />

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-purple-200">
            <QuizQuestion
              question={currentQ}
              value={currentAnswer?.value || (currentQ.type === 'multiple-choice' ? [] : '')}
              onChange={(value) => setAnswer(currentQ.id, value)}
            />

            <div className="flex justify-between mt-10 pt-8 border-t-2 border-purple-100">
              <Button
                variant="ghost"
                size="lg"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={!canProceed}
              >
                {isLastQuestion ? 'See Results ✨' : 'Next →'}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
