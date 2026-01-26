'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaGalleryConfig } from '@/lib/media';

interface MediaGalleryProps {
  media: MediaGalleryConfig;
  className?: string;
  aspectRatio?: string;
}

export default function MediaGallery({ media, className = '', aspectRatio = 'aspect-video' }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const items = media.items || [];
  const carousel = { ...media.carousel };
  const isSingle = items.length === 1;
  const hasMultiple = items.length > 1;

  // Auto-play carousel
  useEffect(() => {
    if (!carousel.enabled || !carousel.autoplay || isSingle || isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next >= items.length ? (carousel.loop ? 0 : prev) : next;
      });
    }, carousel.interval || 5000);

    return () => clearInterval(interval);
  }, [carousel, items.length, isSingle, isPlaying]);

  const goToSlide = (index: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex(index);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (items.length === 0) {
    return (
      <div className={`${aspectRatio} bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No media</span>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Media Display */}
      <div className={`relative ${aspectRatio} overflow-hidden bg-gray-900`}>
        {currentItem.type === 'image' ? (
          <Image
            src={currentItem.src}
            alt={currentItem.alt || ''}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        ) : (
          <video
            src={currentItem.src}
            poster={currentItem.poster}
            controls
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* Caption */}
        {currentItem.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
            {currentItem.caption}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {hasMultiple && carousel.showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {hasMultiple && carousel.showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToSlide(index, e)}
              className={`w-2 h-2 rounded-full transition ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
