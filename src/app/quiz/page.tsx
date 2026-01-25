import { getQuiz } from '@/lib/api/quiz';
import QuizContainer from '@/ui/quiz/QuizContainer';

export const metadata = {
  title: 'Find Your Perfect Package | Weaving Dreams',
  description: 'Answer a few questions to get personalized event package recommendations',
};

export default async function QuizPage() {
  const quizData = await getQuiz();

  return <QuizContainer quizData={quizData} />;
}
