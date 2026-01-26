export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
  poster?: string; // for video thumbnail
}

export interface MediaGalleryConfig {
  items: MediaItem[];
  carousel?: {
    enabled?: boolean;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    swipeable?: boolean;
  };
}

/**
 * Convert legacy single image to media gallery format
 * Client-safe - no server dependencies
 */
export function normalizeMedia(data: any): MediaGalleryConfig {
  // If already in new format
  if (data.media?.items) {
    return data.media;
  }

  // Legacy format - single image
  if (data.image) {
    return {
      items: [
        {
          type: 'image',
          src: data.image,
          alt: data.name || data.title || ''
        }
      ],
      carousel: {
        enabled: false
      }
    };
  }

  // No media
  return {
    items: [],
    carousel: { enabled: false }
  };
}
