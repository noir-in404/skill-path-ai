import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-brand-600 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-charcoal',
    error: 'bg-white border-red-200 text-charcoal',
    info: 'bg-white border-charcoal-border text-charcoal'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-sm">
      <div
        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-elevated text-xs sm:text-sm font-medium ${
          bgStyles[toast.type] || bgStyles.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <span className="flex-1">{toast.message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded text-charcoal-muted hover:text-charcoal hover:bg-black/5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
