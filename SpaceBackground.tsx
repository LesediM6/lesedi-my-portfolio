import React from 'react';

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Base Background with Grid */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#0B1021] transition-colors duration-300">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.3),rgba(255,255,255,0.1))]"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circle Top Left */}
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 md:w-96 md:h-96 border border-slate-200 dark:border-teal-900/30 rounded-full opacity-40 animate-float"></div>
        
        {/* Triangle/Rotated Square Bottom Right */}
        <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 md:w-80 md:h-80 border border-slate-200 dark:border-indigo-900/30 rotate-45 opacity-40 animate-float-delayed"></div>

        {/* Small floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-teal-500/20 dark:bg-teal-400/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 left-1/5 w-6 h-6 border-2 border-indigo-400/20 rotate-12 animate-float-delayed"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500/20 dark:bg-purple-400/20 rotate-45 animate-float"></div>
        
        {/* Dark Mode Specific Glows */}
        <div className="hidden dark:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="hidden dark:block absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2"></div>
      </div>

      {/* Constellation Lines (Static Decoration) */}
      <svg className="absolute top-20 right-10 w-64 h-64 opacity-10 dark:opacity-20 stroke-slate-400 dark:stroke-slate-600" viewBox="0 0 100 100">
        <circle cx="20" cy="20" r="1" fill="currentColor" />
        <circle cx="80" cy="30" r="1" fill="currentColor" />
        <circle cx="50" cy="70" r="1" fill="currentColor" />
        <line x1="20" y1="20" x2="80" y2="30" strokeWidth="0.5" />
        <line x1="80" y1="30" x2="50" y2="70" strokeWidth="0.5" />
        <line x1="50" y1="70" x2="20" y2="20" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

export default SpaceBackground;