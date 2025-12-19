import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  maxWidth = 'max-w-2xl' 
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={`${maxWidth} w-full bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl shadow-purple-500/20 animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-700/50">
          <div className="flex-1">
            <h2 
              id="modal-title" 
              className="text-2xl font-bold text-white mb-1"
            >
              {title}
            </h2>
            {description && (
              <p 
                id="modal-description" 
                className="text-sm text-gray-400"
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Modal;
