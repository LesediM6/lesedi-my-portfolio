import React, { useEffect, useState } from 'react';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';

interface PdfViewerModalProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ pdfUrl, title, onClose }) => {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling when modal is open and handle Escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Use Google Docs viewer for wider compatibility without relying on browser PDF plugins
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-md pr-4">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:flex"
              title="Open in New Tab"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href={pdfUrl}
              download
              className="p-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:flex"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-slate-100 dark:bg-slate-950">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading Document...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={`PDF Viewer for ${title}`}
            onLoad={() => setLoading(false)}
            allow="fullscreen"
          />
        </div>
        
        {/* Mobile Footer (Download link for mobile mainly) */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 sm:hidden flex justify-center">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400"
            >
                <Download className="h-4 w-4" /> Download PDF
            </a>
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;