'use client';

import { create } from 'zustand';

interface QuizAnswer {
  questionId: string;
  value: string | string[];
}

interface QuizStore {
  answers: QuizAnswer[];
  currentQuestion: number;
  isComplete: boolean;
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  answers: [],
  currentQuestion: 0,
  isComplete: false,

  setAnswer: (questionId, value) => {
    const answers = get().answers;
    const existingIndex = answers.findIndex((a) => a.questionId === questionId);

    if (existingIndex >= 0) {
      set({
        answers: answers.map((a, i) =>
          i === existingIndex ? { questionId, value } : a
        ),
      });
    } else {
      set({ answers: [...answers, { questionId, value }] });
    }
  },

  nextQuestion: () => {
    set((state) => ({ currentQuestion: state.currentQuestion + 1 }));
  },

  previousQuestion: () => {
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    }));
  },

  goToQuestion: (index) => {
    set({ currentQuestion: index });
  },

  resetQuiz: () => {
    set({ answers: [], currentQuestion: 0, isComplete: false });
  },

  completeQuiz: () => {
    set({ isComplete: true });
  },
}));
