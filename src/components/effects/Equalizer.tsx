"use client";

import { useEffect, useState } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface EqualizerProps {
  bars?: number;
  color?: string;
}

export default function Equalizer({ bars = 8, color = '#8B5CF6' }: EqualizerProps) {
  const { effects, prefersReducedMotion } = useExperience();
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(20));

  useEffect(() => {
    if (!effects.backgroundEffects || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setHeights(Array(bars).fill(0).map(() => Math.random() * 80 + 20));
    }, 150);

    return () => clearInterval(interval);
  }, [bars, effects.backgroundEffects, prefersReducedMotion]);

  if (!effects.backgroundEffects || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-[5] flex items-end gap-1 opacity-60">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-2 rounded-t transition-all duration-150"
          style={{
            height: `${height}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}
