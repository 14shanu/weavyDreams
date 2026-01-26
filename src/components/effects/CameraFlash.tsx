"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperience } from '@/contexts/ExperienceContext';

export default function CameraFlash() {
  const [flash, setFlash] = useState(false);
  const { effects, prefersReducedMotion } = useExperience();

  const triggerFlash = () => {
    if (!effects.backgroundEffects || prefersReducedMotion) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  // Expose trigger function globally for images to use
  if (typeof window !== 'undefined') {
    (window as any).triggerCameraFlash = triggerFlash;
  }

  if (!effects.backgroundEffects || prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white pointer-events-none z-50"
        />
      )}
    </AnimatePresence>
  );
}
