import { useState } from 'react';
import type { Bird } from '../../types';
import { ClickableImage } from '../common/ClickableImage';
import { NotesList } from '../notes/NotesList';
import { OtherLanguages } from './OtherLanguages';

interface BirdDetailsProps {
  bird?: Bird;
  onAddNoteClick?: () => void;
}

export const BirdDetails = ({ bird, onAddNoteClick }: BirdDetailsProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Loading state
  if (!bird) {
    return (
      <div className="max-w-4xl mx-auto pb-24">
        {/* Image Skeleton */}
        <div className="w-full max-w-80 aspect-[4/3] bg-gray-200 animate-pulse rounded-lg mb-7"></div>
        
        {/* Notes Section Skeleton */}
        <div className="mb-5">
          <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mb-5"></div>
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        
        {/* In Other Languages Section Skeleton */}
        <div className="mt-9 pt-7 border-t border-border">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <ClickableImage
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        bird={bird}
      />

      <h2 className="text-2xl font-bold text-text-primary mt-7 mb-5">Notes</h2>
      
      <NotesList notes={bird.notes} bird={bird} onAddNoteClick={onAddNoteClick} />

      <h2 className="text-2xl font-bold text-text-primary mt-9 pb-7 mb-4 border-b border-border">In Other Languages</h2>

      <OtherLanguages bird={bird} />
    </div>
  );
};