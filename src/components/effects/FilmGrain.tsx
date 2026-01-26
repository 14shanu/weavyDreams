"use client";

import { useExperience } from '@/contexts/ExperienceContext';

export default function FilmGrain() {
  const { effects, prefersReducedMotion } = useExperience();

  if (!effects.backgroundEffects || prefersReducedMotion) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px',
      }}
    />
  );
}
