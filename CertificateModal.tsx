
import React from 'react';
import { X, ExternalLink, Calendar, CheckCircle2, Download, Share2, Award, Building2 } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
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

  const handlePrint = () => {
    // Basic print trigger - styles handle the layout
    window.print();
  };

  // Generate LinkedIn Add-to-Profile URL
  const getLinkedInUrl = () => {
    const date = new Date(certificate.issueDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    // Updated: Use credentialUrl and verificationCode from the interface
    return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificate.title)}&organizationName=${encodeURIComponent(certificate.issuer)}&issueYear=${year}&issueMonth=${month}&certUrl=${encodeURIComponent(certificate.credentialUrl || '')}${certificate.verificationCode ? `&certId=${encodeURIComponent(certificate.verificationCode)}` : ''}`;
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800 no-print">
        
        {/* Header */}
        <div className="relative h-32 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-indigo-600/20"></div>
          {/* Fix: Use imageUrl instead of image */}
          <img 
            src={certificate.imageUrl} 
            alt="" 
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-full transition-colors text-slate-900 dark:text-white backdrop-blur-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 -mt-12 relative z-10 flex-1 overflow-y-auto">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4">
              <Award className="h-10 w-10 text-teal-600 dark:text-teal-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{certificate.title}</h2>
            
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
              <Building2 className="h-4 w-4" />
              <span>{certificate.issuer}</span>
              {/* Fix: Use verificationCode instead of verificationId */}
              {certificate.verificationCode && (
                <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-xs bg-teal-50 dark:bg-teal-900/20 px-2 py-0.5 rounded-full border border-teal-100 dark:border-teal-800 ml-2">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Issued Date</p>
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                  <Calendar className="h-4 w-4 text-teal-500" />
                  {new Date(certificate.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Credential ID</p>
                {/* Fix: Use verificationCode instead of verificationId */}
                <div className="text-slate-900 dark:text-white font-medium truncate">
                  {certificate.verificationCode || "N/A"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Description</h3>
              {/* Fix: Access description (now in updated interface) */}
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                {certificate.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">Skills Validated</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          {/* Fix: Access credentialUrl (now in updated interface) */}
          <a 
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all shadow-lg shadow-teal-500/20 font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            Verify Credential
          </a>
          
          <div className="flex gap-3">
            <a 
              href={getLinkedInUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl transition-colors font-medium"
              title="Add to LinkedIn Profile"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Add to LinkedIn</span>
            </a>
            
            <button 
              onClick={handlePrint}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors font-medium"
              title="Download/Print PDF"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
