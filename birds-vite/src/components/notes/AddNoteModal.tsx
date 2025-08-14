import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { useAddNote } from '../../hooks/useAddNote';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  birdId?: string;
} 

export const AddNoteModal = ({ isOpen, onClose, birdId }: AddNoteModalProps) => {
  const [noteText, setNoteText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { submitNote, loading, error } = useAddNote();

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Trigger animation after render
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Remove from DOM after animation completes
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setNoteText('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birdId || !noteText.trim()) {
      return;
    }

    try {
      await submitNote(birdId, noteText.trim());
      onClose();
    } catch (err) {
      // Error is handled by the hook, but we could show a toast here
      console.error('Failed to add note:', err);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-200 ease-out ${
        isAnimating 
          ? 'bg-black/80 backdrop-blur-sm' 
          : 'bg-black/0 backdrop-blur-none'
      }`}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative transition-all duration-200 ease-out ${
          isAnimating 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors duration-200 p-1 rounded-full hover:bg-input-bg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <h1 id="modal-title" className="text-2xl font-bold text-text-primary mb-6 pr-8">
          Add a note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            value={noteText}
            onChange={setNoteText}
            placeholder="Write your note here..."
            rows={4}
            maxLength={500}
            disabled={loading}
            aria-label="Note content"
          />

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm" role="alert">
              Failed to add note. Please try again.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!noteText.trim() || loading || !birdId}
            >
              {loading ? 'Adding...' : 'Add Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};