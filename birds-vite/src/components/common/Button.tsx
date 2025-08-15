import React, { memo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  variant = 'secondary',
  children,
  disabled = false,
  className = '',
  ...props
}) => {
  // Base styles that apply to all buttons
  const baseStyles = `
    inline-flex items-center justify-center
    rounded-lg border
    px-3 py-2
    font-semibold text-xs
    transition-all duration-300 ease-in-out
    focus:outline-none cursor-pointer
    disabled:cursor-not-allowed
  `;

  // Variant-specific styles
  const variantStyles = {
    primary: `
      bg-primary-bg border-primary-border text-white
      shadow-button-primary
      hover:bg-primary-bg-hover hover:border-primary-border
      disabled:opacity-50 disabled:hover:bg-primary-bg disabled:hover:border-primary-border
    `,
    secondary: `
      bg-white border-secondary-border text-secondary-text
      shadow-button-secondary
      hover:bg-gray-50 hover:border-gray-200
      disabled:opacity-50 disabled:hover:bg-secondary-bg disabled:hover:border-secondary-border
    `,
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      {...props}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

// Memoize Button component to prevent unnecessary re-renders
// when used in forms or lists with stable props
export const Button = memo(ButtonComponent);
