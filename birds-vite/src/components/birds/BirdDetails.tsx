import type { Bird } from '../../types';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface BirdDetailsProps {
  bird?: Bird;
}

export const BirdDetails = ({ bird }: BirdDetailsProps) => {
  // Loading state
  if (!bird) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <LoadingSpinner size={32} className="text-primary-bg mb-4" aria-label="Loading bird details..." />
          <p className="text-text-secondary">Loading bird details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-2">
        {bird.english_name}
      </h1>
    </div>
  );
};