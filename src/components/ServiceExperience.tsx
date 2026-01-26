"use client";

import { ReactNode } from 'react';
import DiscoLights from './effects/DiscoLights';
import Equalizer from './effects/Equalizer';
import CameraFlash from './effects/CameraFlash';
import FilmGrain from './effects/FilmGrain';
import type { Service } from '@/lib/types/service';

interface ServiceExperienceProps {
  service: Service;
  children: ReactNode;
}

export default function ServiceExperience({ service, children }: ServiceExperienceProps) {
  if (!service.experience?.enabled) {
    return <>{children}</>;
  }

  const { theme, effects, colors } = service.experience;

  return (
    <div className="relative min-h-screen">
      {/* Entertainment Effects */}
      {theme === 'disco' && (
        <>
          {effects.discoLights && <DiscoLights colors={colors} />}
          {effects.equalizer && <Equalizer color={colors[0]} />}
        </>
      )}

      {/* Photography Effects */}
      {theme === 'camera' && (
        <>
          {effects.cameraFlash && <CameraFlash />}
          {effects.filmGrain && <FilmGrain />}
        </>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
