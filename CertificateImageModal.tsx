
import React, { useState, useEffect } from 'react';
import { X, Award, ShieldCheck, Loader2 } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateImageModalProps {
  certificate: Certificate;
  onClose: () => void;
}

const CertificateImageModal: React.FC<CertificateImageModalProps> = ({ certificate, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 md:p-6 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800 relative max-h-[95vh]">
        
        {/* Header - Compact */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-1.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg">
               <Award className="h-5 w-5" />
             </div>
             <div>
               <h2 id="cert-modal-title" className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-tight">
                 {certificate.title}
               </h2>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{certificate.issuer}</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area - Focused on the Image */}
        <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center min-h-0">
          
          <div className="relative w-full h-full flex items-center justify-center p-2 md:p-4">
            
            {/* Loading Indicator */}
            {loading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 z-10">
                <Loader2 className="h-10 w-10 text-teal-600 animate-spin mb-2" />
                <p className="text-sm text-slate-500">Loading Preview...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 z-10 p-6 text-center">
                <Award className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Preview Unavailable</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  The certificate image could not be loaded. This might be due to a connection issue.
                </p>
              </div>
            )}

            {/* Image Container with Full-Width Alignment */}
            <div 
              className="relative max-w-full max-h-full flex items-center justify-center rounded-lg shadow-lg overflow-hidden select-none bg-white" 
              onContextMenu={(e) => e.preventDefault()}
            >
              <img 
                src={certificate.imageUrl} 
                alt={`Certificate: ${certificate.title}`}
                className={`max-w-full max-h-[70vh] md:max-h-[75vh] object-contain transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} pointer-events-none`}
                style={{ userSelect: 'none' }}
                onLoad={() => setLoading(false)}
                onError={() => {setLoading(false); setError(true);}}
                loading="lazy"
              />

              {/* Protection: Transparent Grid Overlay */}
              {!loading && !error && (
                <>
                  <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] dark:opacity-[0.06]" 
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
                  </div>

                  {/* Protection: Watermark Overlay */}
                  <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden select-none flex items-center justify-center">
                    <div className="rotate-[-25deg] whitespace-nowrap opacity-[0.07] dark:opacity-[0.1]">
                       <p className="text-slate-900 dark:text-white text-3xl md:text-6xl font-black uppercase tracking-[0.4em] select-none">
                         PORTFOLIO PREVIEW
                       </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Compact and Informative */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto w-full">
             <div className="flex items-center gap-2 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 tracking-wide uppercase">Coursera Verified</span>
             </div>
             <p className="text-[10px] text-slate-400 font-medium italic text-center sm:text-right">
               Identity Verified • Secure Preview for Professional Review Only
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateImageModal;
