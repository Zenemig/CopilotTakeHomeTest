import React from 'react';

interface BreadcrumbNavigationProps {
  isDetailView: boolean;
  birdName?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  isDetailView,
  birdName
}) => {
  return (
    <h1 className="flex items-center text-3xl font-bold text-text-primary min-w-0 flex-1">
      <span className={`flex-shrink-0 transition-opacity duration-300 ease-in-out ${isDetailView ? 'opacity-40' : 'opacity-100'}`}>
        Birds
      </span>
      
      {/* Breadcrumb separator and bird name with smooth slide animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out min-w-0 ${
          isDetailView && birdName
            ? 'max-w-full opacity-100 flex-1 ml-0' 
            : 'max-w-0 opacity-0 -ml-2'
        }`}
      >
        <div className="flex items-center whitespace-nowrap">
          <span className="mx-2 opacity-40 flex-shrink-0">
            /
          </span>
          <span>
            {birdName}
          </span>
        </div>
      </div>
    </h1>
  );
};
