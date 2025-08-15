import { Search, X } from 'lucide-react';
import { forwardRef, memo } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'search';
  label?: string;
  // Search-specific props (only used when type="search")
  onClear?: () => void;
  isSearching?: boolean;
}

// CSS Class Constants
const INPUT_BASE_CLASSES = `
  w-full py-4
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
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    value, 
    onChange, 
    placeholder, 
    disabled = false, 
    type = 'text',
    label,
    onClear,
    isSearching = false
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleClear = () => {
      onChange('');
      onClear?.();
    };

    const isSearchInput = type === 'search';
    const showSearchIcon = isSearchInput;
    const showClearButton = isSearchInput && value && !disabled;
    const showLoadingSpinner = isSearchInput && isSearching && !value;

    // Dynamic padding based on input type
    const paddingClasses = isSearchInput ? 'px-13' : 'px-4';

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        
        <div className="relative w-full">
          {/* Search Icon */}
          {showSearchIcon && (
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary w-6 h-6 pointer-events-none" 
              aria-hidden="true"
            />
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              ${INPUT_BASE_CLASSES}
              ${paddingClasses}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-text-secondary/50'}
              ${isSearching ? 'bg-input-bg' : ''}
            `}
            aria-label={placeholder || label}
          />
          
          {/* Clear Button (Search variant only) */}
          {showClearButton && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200 p-1 rounded-full hover:bg-input-bg cursor-pointer"
              aria-label="Clear input"
            >
              <X className="w-6 h-6" />
            </button>
          )}
          
          {/* Loading Spinner (Search variant only) */}
          {showLoadingSpinner && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner 
                size={24} 
                className="text-text-secondary" 
                aria-label="Searching..." 
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Memoize Input component to prevent unnecessary re-renders
// when used in forms with stable props
const MemoizedInput = memo(Input);
MemoizedInput.displayName = 'Input';

export { MemoizedInput as Input };
