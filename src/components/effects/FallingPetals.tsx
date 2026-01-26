"use client";

import { useEffect, useState } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FallingPetals({ color = '#FFC0CB' }: { color?: string }) {
  const { effects, prefersReducedMotion, intensity } = useExperience();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!effects.particles || prefersReducedMotion) return;

    const petalCount = intensity === 'high' ? 15 : intensity === 'medium' ? 10 : 5;
    
    const newPetals = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 8 + Math.random() * 8,
    }));

    setPetals(newPetals);
  }, [effects.particles, prefersReducedMotion, intensity]);

  if (!effects.particles || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          <div
            className="rounded-full opacity-80"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${petal.size / 2}px ${color}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
