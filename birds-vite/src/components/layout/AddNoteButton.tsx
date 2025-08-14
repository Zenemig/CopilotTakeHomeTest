import React from 'react';
import { Button } from '../common/Button';
import { Plus } from 'lucide-react';

interface AddNoteButtonProps {
  isVisible: boolean;
  onAddNoteClick?: () => void;
  disabled?: boolean;
}

export const AddNoteButton: React.FC<AddNoteButtonProps> = ({
  isVisible,
  onAddNoteClick,
  disabled
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
        className="whitespace-nowrap [@media(max-width:559px)]:px-2"
        disabled={disabled}
      >
        <span className="[@media(max-width:559px)]:hidden">Add Note</span>
        <Plus className="[@media(min-width:560px)]:hidden w-4 h-4" />
      </Button>
    </div>
  );
};
