import { X, Info, CheckCircle, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';


export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info
};

const styles = {
  success: 'border-green-400/30 bg-green-500/10 text-green-100',
  error: 'border-red-400/30 bg-red-500/10 text-red-100',
  info: 'border-blue-400/30 bg-blue-500/10 text-blue-100'
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = icons[type];

  useEffect(() => {
    setIsVisible(true);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 max-w-sm w-full',
        'backdrop-blur-md border rounded-xl shadow-xl p-4',
        'transition-all duration-300 ease-out',
        styles[type],
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-clash font-medium text-sm">{title}</h4>
          {message && (
            <p className="font-clash text-sm opacity-90 mt-1">{message}</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};