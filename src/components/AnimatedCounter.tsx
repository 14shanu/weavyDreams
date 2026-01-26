"use client";

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { effects, prefersReducedMotion } = useExperience();

  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView && effects.animations && !prefersReducedMotion) {
      spring.set(value);
    }
  }, [isInView, value, spring, effects.animations, prefersReducedMotion]);

  if (!effects.animations || prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}{value.toLocaleString()}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
