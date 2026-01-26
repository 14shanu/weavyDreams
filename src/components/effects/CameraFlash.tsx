"use client";

import { motion } from 'framer-motion';
import { useExperience } from '@/contexts/ExperienceContext';

export default function CameraFlash() {
  const { intensity, effects, prefersReducedMotion } = useExperience();

  if (!effects.backgroundEffects || prefersReducedMotion || intensity === 'off') {
    return null;
  }

  return (
    <>
      {/* Floating Camera Icons */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[1]"
          initial={{ 
            x: `${15 + i * 25}%`, 
            y: '110%',
            opacity: 0 
          }}
          animate={{
            y: ['-10%', '-120%'],
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-500/60">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        </motion.div>
      ))}

      {/* Soft Spotlight */}
      <motion.div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none z-[1]"
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-400/40 via-pink-300/25 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Subtle Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />
    </>
  );
}
