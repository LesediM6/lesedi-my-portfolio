import React, { useState } from 'react';
import Section from './Section';
import CertificateCard from './CertificateCard';
import CertificateImageModal from './CertificateImageModal';
import { CERTIFICATES } from '../constants';
import { Certificate } from '../types';
import { Award, ShieldCheck } from 'lucide-react';

const CertificateSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <Section id="certificates" className="py-20 relative bg-slate-50/30 dark:bg-slate-900/20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
      <div className="absolute -left-20 top-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-teal-600 dark:text-teal-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
             <ShieldCheck className="h-4 w-4" /> Verified Academic Achievements
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Certifications & Accreditations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
            Formal recognition of technical skills and professional development from leading institutions including IBM, Microsoft, and Johns Hopkins.
          </p>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-in fade-in duration-700">
          {CERTIFICATES.map((cert) => (
            <CertificateCard 
              key={cert.id} 
              certificate={cert} 
              onView={setSelectedCert} 
            />
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-16 p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm flex flex-col md:flex-row items-center gap-6 justify-center">
           <div className="flex -space-x-3">
             {[1,2,3].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                 <Award className="h-5 w-5 text-teal-600" />
               </div>
             ))}
           </div>
           <p className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center md:text-left">
             Continuous learner focused on <span className="text-slate-900 dark:text-white font-bold">Data Engineering</span>, <span className="text-slate-900 dark:text-white font-bold">AI Ethics</span>, and <span className="text-slate-900 dark:text-white font-bold">Cloud Infrastructure</span>.
           </p>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedCert && (
        <CertificateImageModal 
          certificate={selectedCert} 
          onClose={() => setSelectedCert(null)} 
        />
      )}
    </Section>
  );
};

export default CertificateSection;