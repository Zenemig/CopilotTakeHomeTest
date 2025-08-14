import React from 'react';
import { BackButton } from './BackButton';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';
import { AddNoteButton } from './AddNoteButton';

interface HeaderProps {
  isDetailView?: boolean;
  birdName?: string;
  onBackClick?: () => void;
  onAddNoteClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDetailView = false,
  birdName,
  onBackClick,
  onAddNoteClick
}) => {
  
  return (
    <header className="bg-white px-6 py-4 flex items-center border-b border-border">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Navigation */}
        <div className="flex items-center">
          <BackButton 
            isVisible={isDetailView} 
            onBackClick={onBackClick} 
          />
          <BreadcrumbNavigation 
            isDetailView={isDetailView} 
            birdName={birdName} 
          />
        </div>

        {/* Right side - Actions */}
        <AddNoteButton 
          isVisible={isDetailView} 
          onAddNoteClick={onAddNoteClick} 
        />
      </div>
    </header>
  );
};
