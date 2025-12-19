import React from 'react';
import { Calendar, Award, ChevronRight, GraduationCap } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
  onView: (cert: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onView }) => {
  // Brand color mapping based on issuer
  const getBrandStyles = () => {
    const issuer = certificate.issuer.toLowerCase();
    if (issuer.includes('ibm')) return 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
    if (issuer.includes('microsoft')) return 'border-teal-500 bg-teal-50/50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400';
    if (issuer.includes('arizona state')) return 'border-red-600 bg-red-50/50 dark:bg-red-900/20 text-red-600 dark:text-red-400';
    if (issuer.includes('jhu') || issuer.includes('johns hopkins')) return 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400';
    if (issuer.includes('deeplearning')) return 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400';
    if (issuer.includes('california')) return 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400';
    return 'border-slate-400 bg-slate-50/50 dark:bg-slate-800/20 text-slate-600 dark:text-slate-400';
  };

  const brandStyles = getBrandStyles();

  return (
    <div 
      className="group relative flex flex-col h-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 backdrop-blur-md"
    >
      {/* Decorative accent */}
      <div className={`h-1.5 w-full bg-current ${brandStyles.split(' ')[2]}`}></div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl border ${brandStyles}`}>
            <Award className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {certificate.category}
          </span>
        </div>

        {/* Info */}
        <div className="flex-grow space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {certificate.title}
          </h3>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{certificate.issuer}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>{certificate.issueDate}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {certificate.skills.map((skill, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-md border border-slate-200 dark:border-slate-700">
              {skill}
            </span>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => onView(certificate)}
          className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-sm hover:bg-teal-600 dark:hover:bg-teal-400 dark:hover:text-white transition-all transform active:scale-95 group/btn"
        >
          View Certificate
          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;