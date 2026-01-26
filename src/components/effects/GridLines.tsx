"use client";

import { useExperience } from '@/contexts/ExperienceContext';

export default function GridLines({ color = '#3B82F6' }: { color?: string }) {
  const { effects, prefersReducedMotion } = useExperience();

  if (!effects.backgroundEffects || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] opacity-15">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
