"use client";

import { useEffect, useState } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface DiscoLightsProps {
  colors: string[];
  intensity?: 'low' | 'medium' | 'high';
}

export default function DiscoLights({ colors, intensity = 'medium' }: DiscoLightsProps) {
  const { effects, prefersReducedMotion } = useExperience();
  const [activeColor, setActiveColor] = useState(0);

  useEffect(() => {
    if (!effects.backgroundEffects || prefersReducedMotion) return;

    const speeds = { low: 3000, medium: 2000, high: 1000 };
    const interval = setInterval(() => {
      setActiveColor((prev) => (prev + 1) % colors.length);
    }, speeds[intensity]);

    return () => clearInterval(interval);
  }, [colors.length, intensity, effects.backgroundEffects, prefersReducedMotion]);

  if (!effects.backgroundEffects || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${colors[activeColor]} 0%, transparent 70%)`,
        }}
      />
      
      {/* Moving light beams */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-32 h-full opacity-20 blur-3xl animate-disco-beam"
          style={{
            left: `${i * 33}%`,
            background: `linear-gradient(to bottom, ${colors[(activeColor + i) % colors.length]}, transparent)`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
