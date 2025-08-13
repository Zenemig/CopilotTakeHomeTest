/**
 * WatermarkedImage Component - Simple wrapper for watermarked image display
 * 
 * Minimal UI component to test watermark implementation
 */

import { useSimpleWatermark } from '../../hooks/useImageWatermark';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const WatermarkedImage = ({ src, alt, className = '', loading = 'lazy' }: WatermarkedImageProps) => {
  const { src: watermarkedSrc, isLoading } = useSimpleWatermark(src);

  return (
    <img
      src={watermarkedSrc}
      alt={alt}
      loading={loading}
      className={`${className} ${isLoading ? 'opacity-50' : 'opacity-100'} transition-opacity`}
    />
  );
};
