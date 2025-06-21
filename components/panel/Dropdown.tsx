import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  className,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full px-4 py-3 text-left font-clash',
          'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl',
          'text-black placeholder-black/60',
          'transition-all duration-250 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'hover:bg-white/15 hover:scale-[1.01]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          'flex items-center justify-between'
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            'w-4 h-4 transition-transform duration-250 ease-out',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      {isOpen && (
        <div 
          className={cn(
            'absolute z-50 mt-2 w-full',
            'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl',
            'animate-scale-in'
          )}
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-4 py-3 text-left font-clash transition-all duration-250 ease-out',
                'text-black hover:bg-white/20',
                'first:rounded-t-xl last:rounded-b-xl',
                option.value === value && 'bg-primary/20 text-primary-200'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};