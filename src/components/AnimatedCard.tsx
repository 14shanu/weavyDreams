"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverGlow?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = '',
  hoverScale = 1.02,
  hoverGlow = true
}: AnimatedCardProps) {
  const { effects, prefersReducedMotion } = useExperience();

  if (!effects.animations || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ 
        scale: hoverScale,
        boxShadow: hoverGlow ? '0 20px 40px rgba(139, 92, 246, 0.3)' : undefined
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
