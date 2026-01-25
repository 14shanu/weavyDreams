'use client';

import { QuizQuestion as QuizQuestionType } from '@/lib/types/quiz';
import Card from '@/ui/elements/Card';
import clsx from 'clsx';

interface QuizQuestionProps {
  question: QuizQuestionType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export default function QuizQuestion({ question, value, onChange }: QuizQuestionProps) {
  const handleSingleChoice = (optionId: string) => {
    onChange(optionId);
  };

  const handleMultipleChoice = (optionId: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionId)
      ? currentValues.filter((v) => v !== optionId)
      : [...currentValues, optionId];
    
    if (question.maxSelections && newValues.length > question.maxSelections) {
      return;
    }
    
    onChange(newValues);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">{question.question}</h2>
        {question.type === 'multiple-choice' && question.maxSelections && (
          <p className="text-sm text-gray-500">Select up to {question.maxSelections}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = question.type === 'single-choice'
            ? value === option.id
            : Array.isArray(value) && value.includes(option.id);

          return (
            <Card
              key={option.id}
              padding="md"
              className={clsx(
                'cursor-pointer transition-all border-2',
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : 'border-gray-200 hover:border-[var(--color-primary)]/50'
              )}
              onClick={() =>
                question.type === 'single-choice'
                  ? handleSingleChoice(option.id)
                  : handleMultipleChoice(option.id)
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                      : 'border-gray-300'
                  )}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{option.label}</p>
                  {option.description && (
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
