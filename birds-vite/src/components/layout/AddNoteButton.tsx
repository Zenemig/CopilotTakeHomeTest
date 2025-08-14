import React from 'react';
import { Button } from '../common/Button';

interface AddNoteButtonProps {
  isVisible: boolean;
  onAddNoteClick?: () => void;
}

export const AddNoteButton: React.FC<AddNoteButtonProps> = ({
  isVisible,
  onAddNoteClick
}) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isVisible && onAddNoteClick 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0 pointer-events-none'
      }`}
    >
      <Button
        variant="secondary"
        onClick={onAddNoteClick}
        className="whitespace-nowrap"
      >
        Add Note
      </Button>
    </div>
  );
};
