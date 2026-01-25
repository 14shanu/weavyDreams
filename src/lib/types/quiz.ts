export interface Quiz {
  title: string;
  description: string;
  questions: QuizQuestion[];
  scoring: {
    algorithm: string;
    tierWeights: Record<string, number>;
    recommendationCount: number;
  };
  results: {
    title: string;
    description: string;
    ctaText: string;
    alternativeText: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single-choice' | 'multiple-choice';
  required: boolean;
  maxSelections?: number;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  weight: number;
  tier?: 'essential' | 'premium' | 'luxury';
  range?: [number, number];
  serviceId?: string;
}

export interface QuizData {
  quiz: Quiz;
}
