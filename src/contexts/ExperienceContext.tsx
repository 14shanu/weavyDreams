"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import siteConfig from '@/data/site-config.json';

type IntensityLevel = 'off' | 'low' | 'medium' | 'high';

interface ExperienceContextType {
  intensity: IntensityLevel;
  setIntensity: (level: IntensityLevel) => void;
  effects: {
    animations: boolean;
    particles: boolean;
    sounds: boolean;
    customCursors: boolean;
    backgroundEffects: boolean;
  };
  toggleEffect: (effect: keyof ExperienceContextType['effects']) => void;
  resetToDefault: () => void;
  prefersReducedMotion: boolean;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [intensity, setIntensityState] = useState<IntensityLevel>(
    siteConfig.experience.defaultIntensity as IntensityLevel
  );
  const [effects, setEffects] = useState(siteConfig.experience.effects);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && siteConfig.experience.respectReducedMotion) {
        setIntensityState('off');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (siteConfig.experience.persistPreferences) {
      const saved = localStorage.getItem('experience-preferences');
      if (saved) {
        try {
          const { intensity: savedIntensity, effects: savedEffects } = JSON.parse(saved);
          setIntensityState(savedIntensity);
          setEffects(savedEffects);
        } catch (e) {
          console.error('Failed to load experience preferences', e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (siteConfig.experience.persistPreferences) {
      localStorage.setItem('experience-preferences', JSON.stringify({ intensity, effects }));
    }
  }, [intensity, effects]);

  const setIntensity = (level: IntensityLevel) => {
    setIntensityState(level);
    
    switch (level) {
      case 'off':
        setEffects({
          animations: false,
          particles: false,
          sounds: false,
          customCursors: false,
          backgroundEffects: false,
        });
        break;
      case 'low':
        setEffects({
          animations: true,
          particles: false,
          sounds: false,
          customCursors: false,
          backgroundEffects: false,
        });
        break;
      case 'medium':
        setEffects({
          animations: true,
          particles: false,
          sounds: false,
          customCursors: false,
          backgroundEffects: true,
        });
        break;
      case 'high':
        setEffects({
          animations: true,
          particles: true,
          sounds: false,
          customCursors: true,
          backgroundEffects: true,
        });
        break;
    }
  };

  const toggleEffect = (effect: keyof ExperienceContextType['effects']) => {
    setEffects(prev => ({ ...prev, [effect]: !prev[effect] }));
  };

  const resetToDefault = () => {
    setIntensityState(siteConfig.experience.defaultIntensity as IntensityLevel);
    setEffects(siteConfig.experience.effects);
  };

  return (
    <ExperienceContext.Provider
      value={{
        intensity,
        setIntensity,
        effects,
        toggleEffect,
        resetToDefault,
        prefersReducedMotion,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within ExperienceProvider');
  }
  return context;
}
