import type { Bird } from '../../types';
import { BirdCard } from './BirdCard';
import { AlertTriangle, Search } from 'lucide-react';

interface BirdsGridProps {
  birds?: Bird[];
  loading?: boolean;
  error?: Error | null;
  onBirdClick: (birdId: string) => void;
}

const BirdCardSkeleton = () => (
  <li className="flex flex-col gap-3 pb-3">
    <div className="w-full aspect-[7/4] bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
    <div className="flex flex-col gap-2">
      <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
    </div>
  </li>
);

export const BirdsGrid = ({ birds, loading, error, onBirdClick }: BirdsGridProps) => {
  if (loading) {
    return (
      <ul className="grid gap-6 pb-16" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))' }}>
        {Array.from({ length: 8 }, (_, index) => (
          <BirdCardSkeleton key={`skeleton-${index}`} />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="text-red-500 w-8 h-8 mb-2 mx-auto" />
          <p className="text-text-primary font-medium mb-1">Failed to load birds</p>
          <p className="text-text-secondary text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!birds || birds.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Search className="text-text-secondary w-12 h-12 mb-4 mx-auto" />
          <p className="text-text-primary font-medium">No birds found</p>
          <p className="text-text-secondary text-sm">Try adjusting your search or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid gap-6 pb-16" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))' }}>
      {birds.map((bird, index) => (
        <BirdCard key={bird.id} bird={bird} tabIndex={index} onBirdClick={onBirdClick} />
      ))}
    </ul>
  );
};