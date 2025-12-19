import React, { useState } from 'react';
import { X, Github, ExternalLink, Loader2, Server, Layout, MonitorPlay } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'preview'>('details');
  const [iframeLoading, setIframeLoading] = useState(true);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{project.category}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 ${
              activeTab === 'details' 
                ? 'border-teal-600 dark:border-teal-500 text-teal-700 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Server className="h-4 w-4" />
              Project Details
            </div>
          </button>
          {project.demo && (
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 ${
                activeTab === 'preview' 
                  ? 'border-teal-600 dark:border-teal-500 text-teal-700 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-900/20' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <MonitorPlay className="h-4 w-4" />
                Live Preview
              </div>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          {activeTab === 'details' ? (
            <div className="p-6 md:p-8 space-y-8">
              {/* Image & Description */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-64 bg-white dark:bg-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Overview</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open Site
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Deep Dive Section */}
              {project.deepDive && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Layout className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technical Deep Dive</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide mb-1">The Problem</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{project.deepDive.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide mb-1">The Solution</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{project.deepDive.solution}</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {project.deepDive.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[500px] w-full bg-slate-100 dark:bg-slate-800 relative">
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-900 z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 text-teal-600 animate-spin mx-auto mb-2" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Loading Preview...</p>
                  </div>
                </div>
              )}
              <iframe
                src={project.demo}
                className="w-full h-full border-0"
                title={`${project.title} Preview`}
                onLoad={() => setIframeLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 dark:text-slate-500">
           <span>ID: {project.id}</span>
           <span>Powered by {project.technologies[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;