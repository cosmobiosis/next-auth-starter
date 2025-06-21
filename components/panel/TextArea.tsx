import React from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-clash font-medium text-black text-sm">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-3 font-clash',
          'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl',
          'text-black placeholder-black/60',
          'transition-all duration-250 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'focus:bg-white/15 hover:bg-white/15',
          'resize-none',
          error && 'border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm font-clash">
          {error}
        </p>
      )}
    </div>
  );
};