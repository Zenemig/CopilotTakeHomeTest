import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  isVisible: boolean;
  onBackClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  isVisible,
  onBackClick
}) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isVisible && onBackClick 
          ? 'max-w-[2.5rem] opacity-100 mr-3' 
          : 'max-w-0 opacity-0 mr-0'
      }`}
    >
      <button
        onClick={onBackClick}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5 text-text-primary opacity-40" />
      </button>
    </div>
  );
};
