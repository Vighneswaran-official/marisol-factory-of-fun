import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface BaseModalProps {
  isOpen?: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  maxWidth?: string; // e.g. 'max-w-xl', 'max-w-2xl', 'max-w-lg'
  hideHeader?: boolean;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen = true,
  onClose,
  icon,
  title,
  subtitle,
  badge,
  maxWidth = 'max-w-xl',
  hideHeader = false,
  children,
  className = '',
  containerClassName = '',
}) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 bg-[#221C20]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in ${containerClassName}`}
      onClick={onClose}
    >
      <div
        className={`bg-[#FFFDF7] border-3 border-ink rounded-3xl ${maxWidth} w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-sketch-2xl space-y-4 relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Standardized Header */}
        {!hideHeader && (title || icon || badge) && (
          <div className="flex items-center justify-between border-b-2 border-pink-200/80 pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {icon && (
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 border-ink flex items-center justify-center text-xl shrink-0 shadow-sketch">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {title && (
                    <h2 className="font-display font-black text-lg sm:text-xl text-ink leading-tight truncate">
                      {title}
                    </h2>
                  )}
                  {badge && (
                    <span className="shrink-0">{badge}</span>
                  )}
                </div>
                {subtitle && (
                  <p className="font-handwritten text-xs sm:text-sm text-ink-light font-bold truncate mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white hover:bg-paper-200 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-xs ml-2 cursor-pointer"
            >
              <X className="w-5 h-5 text-ink" />
            </button>
          </div>
        )}

        {/* Floating Close Button for modals with hidden header */}
        {hideHeader && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-black bg-white/90 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        )}

        {/* Modal Body */}
        {children}
      </div>
    </div>
  );
};
