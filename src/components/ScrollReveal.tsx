"use client";

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { effects, prefersReducedMotion } = useExperience();

  if (!effects.animations || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0 
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
