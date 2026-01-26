"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { effects, prefersReducedMotion } = useExperience();

  if (!effects.animations || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
