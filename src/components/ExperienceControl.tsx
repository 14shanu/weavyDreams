"use client";

import { useState } from 'react';
import { useExperience } from '@/contexts/ExperienceContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceControl() {
  const [isOpen, setIsOpen] = useState(false);
  const { intensity, setIntensity, effects, toggleEffect, resetToDefault } = useExperience();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 mb-2"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🎭 Experience Mode
            </h3>

            {/* Intensity Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Intensity
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['off', 'low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setIntensity(level)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      intensity === level
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Effects Toggles */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Effects
              </label>
              <div className="space-y-2">
                {Object.entries(effects).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button
                      onClick={() => toggleEffect(key as keyof typeof effects)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        value ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          value ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetToDefault}
              className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Reset to Default
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl"
        aria-label="Toggle Experience Controls"
      >
        🎭
      </motion.button>
    </div>
  );
}
