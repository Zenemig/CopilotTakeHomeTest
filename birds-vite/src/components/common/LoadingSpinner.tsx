import { memo } from 'react';

/**
 * LoadingSpinner Component - Reusable animated loading spinner
 * 
 * Clean SVG-based spinner with customizable size and color
 */

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

const LoadingSpinnerComponent = ({ 
  size = 32, 
  className = 'text-gray-400', 
  'aria-label': ariaLabel = 'Loading...' 
}: LoadingSpinnerProps) => {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      role="img"
    >
      <circle
        className="opacity-20"
        cx={12}
        cy={12}
        r={10}
      />
      <path d="M22 12a10 10 0 0 1-10 10" />
    </svg>
  );
};

// Memoize LoadingSpinner since it's reused across multiple components
// and props rarely change
export const LoadingSpinner = memo(LoadingSpinnerComponent);
