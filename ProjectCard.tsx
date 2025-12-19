import React from 'react';
import { ExternalLink, Database, Cpu, Globe, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const isDeepDive = project.featured;

  // Icon selection based on category
  const getIcon = () => {
    switch(project.category) {
      case 'AI & Data': return <Database className="h-6 w-6" />;
      case 'Cloud & DevOps': return <Cpu className="h-6 w-6" />;
      default: return <Globe className="h-6 w-6" />;
    }
  };

  return (
    <div 
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl border ${
        isDeepDive 
          ? 'border-teal-500/30 bg-white/90 dark:bg-slate-900/60 ring-1 ring-teal-500/10 dark:ring-teal-500/30' 
          : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60'
      } transition-all hover:shadow-xl hover:-translate-y-1 duration-300 cursor-pointer break-inside-avoid backdrop-blur-sm`}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      {/* Geometric Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-4 h-4 bg-slate-100 dark:bg-slate-800 rotate-45 transform translate-x-2 -translate-y-2 group-hover:bg-teal-500/20 transition-colors"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-slate-300 dark:border-slate-700 group-hover:border-teal-500 transition-colors rounded-bl-lg"></div>

      <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
         <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
         <div className="absolute bottom-4 left-4 right-4 text-white">
           <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-black/40 backdrop-blur-md uppercase tracking-wider mb-2 border border-white/10">
             {project.category}
           </span>
         </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${
            isDeepDive 
              ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
            {getIcon()}
          </div>
          {project.demo && (
            <div className="text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
               <ArrowRight className="h-5 w-5" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 flex-grow leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100/50 dark:border-slate-800">
          {project.technologies.slice(0, 3).map((t, i) => (
            <span key={i} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-100 dark:border-slate-700">
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs rounded-md font-medium border border-slate-100 dark:border-slate-700">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;