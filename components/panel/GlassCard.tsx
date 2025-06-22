import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Minimal-white “Notion-style” card
 *  – pure-white background
 *  – subtle border & shadow
 *  – optional hover lift
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
}) => (
  <div
    className={cn(
      'bg-white border border-gray-200 rounded-xl shadow-sm',
      'transition-shadow duration-150 ease-in-out',
      hover && 'hover:shadow-md',
      className
    )}
  >
    {children}
  </div>
)
