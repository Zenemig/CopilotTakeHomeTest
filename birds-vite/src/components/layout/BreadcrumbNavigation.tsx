import React, { useState, useEffect } from 'react';

interface BreadcrumbNavigationProps {
  isDetailView: boolean;
  birdName?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  isDetailView,
  birdName
}) => {
  const [displayBirdName, setDisplayBirdName] = useState<string | undefined>(birdName);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (birdName !== displayBirdName && isDetailView) {
      // Start slide-out animation
      setIsAnimating(true);
      
      // After slide-out completes, update name and slide back in
      const timeout = setTimeout(() => {
        setDisplayBirdName(birdName);
        setIsAnimating(false);
      }, 150);
      
      return () => clearTimeout(timeout);
    } else if (!isDetailView) {
      // Reset immediately when leaving detail view
      setDisplayBirdName(birdName);
      setIsAnimating(false);
    } else {
      // Initial set when entering detail view
      setDisplayBirdName(birdName);
    }
  }, [birdName, isDetailView, displayBirdName]);

  return (
    <h1 className="flex items-center text-3xl font-bold text-text-primary">
      <span className={`transition-opacity duration-300 ease-in-out ${isDetailView ? 'opacity-40' : 'opacity-100'}`}>
        Birds
      </span>
      
      {/* Breadcrumb separator and bird name with slide-in animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out text-nowrap ${
          isDetailView && displayBirdName && !isAnimating
            ? 'max-w-[20rem] opacity-100' 
            : 'max-w-0 opacity-0'
        }`}
      >
        <span className="mx-2 opacity-40 transition-opacity duration-300 ease-in-out">
          /
        </span>
        <span className="transition-opacity duration-300 ease-in-out">
          {displayBirdName}
        </span>
      </div>
    </h1>
  );
};
