/**
 * useImageWatermark Hook - Simple React hook for watermarked image loading
 */

import { useState, useEffect } from 'react';
import { getWatermarkedImageUrl } from '../services/watermark';

/**
 * Simple hook for watermarked image loading
 * @param originalUrl - The original image URL
 * @returns Watermarked URL and loading state
 */
export const useSimpleWatermark = (originalUrl: string | null) => {
  const [src, setSrc] = useState(originalUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!originalUrl) {
      setSrc('');
      return;
    }

    setIsLoading(true);
    
    getWatermarkedImageUrl(originalUrl)
      .then(watermarkedUrl => {
        setSrc(watermarkedUrl);
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback to original URL on error
        setSrc(originalUrl);
        setIsLoading(false);
      });
  }, [originalUrl]);

  return {
    src,
    isLoading
  };
};
