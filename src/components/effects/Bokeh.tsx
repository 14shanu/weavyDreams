"use client";

import { useEffect, useState } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface BokehCircle {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  color: string;
}

export default function Bokeh({ colors = ['#FFD700', '#FFC0CB', '#FFF5EE'] }: { colors?: string[] }) {
  const { effects, prefersReducedMotion } = useExperience();
  const [circles, setCircles] = useState<BokehCircle[]>([]);

  useEffect(() => {
    if (!effects.backgroundEffects || prefersReducedMotion) return;

    const newCircles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 40 + Math.random() * 120,
      opacity: 0.2 + Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setCircles(newCircles);
  }, [effects.backgroundEffects, prefersReducedMotion, colors]);

  if (!effects.backgroundEffects || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full blur-2xl animate-bokeh-float"
          style={{
            left: `${circle.left}%`,
            top: `${circle.top}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
            opacity: circle.opacity,
          }}
        />
      ))}
    </div>
  );
}
