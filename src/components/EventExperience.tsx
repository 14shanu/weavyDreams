"use client";

import { ReactNode } from 'react';
import FallingPetals from './effects/FallingPetals';
import Bokeh from './effects/Bokeh';
import GridLines from './effects/GridLines';
import type { EventType } from '@/lib/types/event';

interface EventExperienceProps {
  event: EventType;
  children: ReactNode;
}

export default function EventExperience({ event, children }: EventExperienceProps) {
  if (!event.experience?.enabled) {
    return <>{children}</>;
  }

  const { theme, effects, colors } = event.experience;

  return (
    <div className="relative min-h-screen">
      {/* Wedding Effects */}
      {theme === 'romantic' && (
        <>
          {effects.petals && <FallingPetals color={colors[0]} />}
          {effects.bokeh && <Bokeh colors={colors} />}
        </>
      )}

      {/* Corporate Effects */}
      {theme === 'professional' && (
        <>
          {effects.gridLines && <GridLines color={colors[1]} />}
        </>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
