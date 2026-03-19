import type { ButtonHTMLAttributes } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const VARIANTS = {
  primary: 'bg-accent-blue text-text-primary hover:bg-accent-blue-light',
  secondary: 'bg-accent-orange text-text-primary hover:bg-accent-yellow',
  outline:
    'bg-transparent text-text-primary border-2 border-accent-blue hover:bg-accent-blue/20',
} as const;

const SIZES = {
  sm: 'px-3 py-1.5 text-[10px] sm:text-xs',
  md: 'px-5 py-2.5 text-xs sm:text-sm',
  lg: 'px-8 py-3.5 text-sm sm:text-base',
} as const;

export function PixelButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={`font-pixel inline-flex cursor-pointer items-center justify-center transition-all duration-150 active:translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
