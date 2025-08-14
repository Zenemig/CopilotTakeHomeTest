/**
 * WatermarkedImage Component - Enhanced watermarked image display with loading states
 * 
 * Shows skeleton while loading, handles errors gracefully, never shows original image
 */

import { useState } from 'react';
import { useSimpleWatermark } from '../../hooks/useImageWatermark';
import { LoadingSpinner } from './LoadingSpinner';
import { ImageOff } from 'lucide-react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

const ImageSkeleton = ({ className }: { className?: string }) => (
  <div className={`${className} bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center`}>
    <LoadingSpinner size={32} className="text-gray-400" aria-label="Loading image..." />
  </div>
);

const ImageFallback = ({ className }: { alt: string; className?: string }) => (
  <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-300`}>
    <div className="text-center p-4">
      <ImageOff className="text-gray-400 w-6 h-6 mb-2 mx-auto" />
      <p className="text-gray-500 text-xs font-medium mb-1">Image not found</p>
    </div>
  </div>
);

export const WatermarkedImage = ({ src, alt, className = '', loading = 'lazy' }: WatermarkedImageProps) => {
  const { src: watermarkedSrc, isLoading } = useSimpleWatermark(src);
  const [imageError, setImageError] = useState(false);

  // Show skeleton while watermark is being generated
  if (isLoading) {
    return <ImageSkeleton className={className} />;
  }

  // Show fallback if image failed to load or no watermarked source
  if (imageError || !watermarkedSrc) {
    return <ImageFallback alt={alt} className={className} />;
  }

  return (
    <img
      src={watermarkedSrc}
      alt={alt}
      loading={loading}
      className={`${className} transition-opacity duration-300`}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
};
