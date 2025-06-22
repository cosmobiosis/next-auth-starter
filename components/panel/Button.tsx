import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = cn(
    'font-clash font-medium transition-all duration-250 ease-out',
    'rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    'hover:scale-[1.02] active:scale-[0.98]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
  );

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 shadow-lg',
    secondary: 'bg-accent text-white hover:bg-accent-600 shadow-lg',
    ghost: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};