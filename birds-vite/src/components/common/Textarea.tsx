import { forwardRef } from 'react';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  rows?: number;
  maxLength?: number;
}

// CSS Class Constants
const TEXTAREA_BASE_CLASSES = `
  w-full py-4 px-4
  bg-input-bg 
  border-2 border-transparent
  rounded-lg 
  text-text-primary
  placeholder-text-secondary
  focus:outline-none 
  focus:border-primary-border
  focus:shadow-[0px_0px_0px_3px_#1D60F01A]
  transition-all 
  duration-300
  resize-none
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    value, 
    onChange, 
    placeholder, 
    disabled = false, 
    label,
    rows = 4,
    maxLength
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        
        <div className="relative w-full">
          {/* Textarea Field */}
          <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            className={`
              ${TEXTAREA_BASE_CLASSES}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-text-secondary/50'}
            `}
            aria-label={placeholder || label}
          />
          
          {/* Character count (if maxLength is provided) */}
          {maxLength && (
            <div className="absolute bottom-2 right-3 text-xs text-text-secondary">
              {value.length}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
