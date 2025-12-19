
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import CertificateSection from './components/CertificateSection';
import ResumeSection from './components/ResumeSection';
import SpaceBackground from './components/SpaceBackground';
import CursorSparkles from './components/CursorSparkles';
import { SkipLink, BackToTop, ProjectSkeleton } from './components/UiHelpers';
import { PROFILE, SKILLS, PROJECTS } from './constants';
import { Project } from './types';
import { MapPin, Mail, Phone, Linkedin, GraduationCap, Languages, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  const featuredProjects = PROJECTS.filter(p => p.featured);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjectsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }
    
    const subject = `Portfolio Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setFormStatus('success');
    form.reset();
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900 dark:selection:bg-teal-900 dark:selection:text-teal-100 transition-colors duration-300 cursor-default">
      <SpaceBackground />
      <CursorSparkles />
      <SkipLink />
      <Navbar />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden focus:outline-none" tabIndex={-1}>
        
        {/* HERO SECTION */}
        <Section id="home" className="py-16 md:py-32 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
            <div className="inline-block px-3 py-1 bg-teal-50/80 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-full text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-medium backdrop-blur-sm">
              Available for Data Engineering & AI Roles
            </div>
            <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {PROFILE.name}
            </h1>
            <h2 className="text-xl xs:text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light">
              Software Developer <span className="text-teal-600 dark:text-teal-400 inline-block transform md:rotate-0 rotate-90 md:mx-0 mx-1">→</span> Data Engineering & AI
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Transforming raw code into intelligent data pipelines. {PROFILE.location} based.
            </p>
            
            <div className="flex flex-col xs:flex-row gap-4 pt-4 justify-center md:justify-start">
              <a 
                href={`mailto:${PROFILE.email}`}
                className="w-full xs:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white text-center font-bold rounded-xl transition-all transform active:scale-95 shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-900 hover:shadow-teal-500/20"
              >
                Contact Me
              </a>
              <a 
                href={PROFILE.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full xs:w-auto px-8 py-4 border border-slate-300 dark:border-slate-700 hover:border-slate-400 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-lg active:bg-slate-100 dark:active:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-900 backdrop-blur-sm"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>
          
          <div className="relative w-64 h-80 md:w-80 md:h-[450px] flex-shrink-0 mt-12 md:mt-0 group">
            <div className="absolute inset-[-15px] border border-slate-200 dark:border-slate-700 rounded-3xl opacity-50 group-hover:rotate-1 transition-transform duration-700"></div>
            <div className="absolute inset-[-30px] border border-teal-500/20 dark:border-teal-400/20 rounded-3xl group-hover:-rotate-1 transition-transform duration-700"></div>
            <div className="absolute top-1/2 -right-[40px] w-6 h-6 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/30 animate-float opacity-80"></div>
            <div className="absolute bottom-1/4 -left-[40px] w-4 h-4 bg-teal-500 rounded-full shadow-lg shadow-teal-500/30 animate-float-delayed"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/30 to-indigo-400/30 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
            <a 
              href={PROFILE.profileImage} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block w-full h-full z-10 overflow-hidden rounded-3xl border-4 border-white dark:border-slate-800 shadow-2xl transition-all duration-500 group-hover:shadow-teal-500/20 group-hover:scale-[1.02]"
              title="View full image"
            >
              <img 
                src={PROFILE.profileImage}
                alt={`Profile picture of ${PROFILE.name}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ objectPosition: 'center 10%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                 <span className="text-xs font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <ExternalLink className="h-3 w-3" /> Original Source
                 </span>
              </div>
            </a>
          </div>
        </Section>

        {/* BIO & OBJECTIVES */}
        <Section id="about" className="py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
                Professional Bio
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg mb-6">
                {PROFILE.bio}
              </p>
              
              <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
                <div className="flex items-start gap-4 mb-4">
                   <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                   <div>
                     <h4 className="font-semibold text-slate-800 dark:text-slate-200">Education</h4>
                     <p className="text-slate-600 dark:text-slate-400">{PROFILE.education}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <Languages className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                   <div>
                     <h4 className="font-semibold text-slate-800 dark:text-slate-200">Languages</h4>
                     <p className="text-slate-600 dark:text-slate-400 text-sm flex flex-wrap gap-2 mt-2">
                       {PROFILE.languages.map(lang => (
                         <span key={lang} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md text-xs sm:text-sm border border-slate-200 dark:border-slate-700">{lang}</span>
                       ))}
                     </p>
                   </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                Career Objective
              </h3>
              <div className="bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-full blur-2xl"></div>
                <p className="text-slate-700 dark:text-slate-300 italic text-lg md:text-xl leading-relaxed relative z-10">
                  "{PROFILE.objective}"
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* TECHNICAL SKILLS */}
        <Section id="skills" className="py-16 md:py-20 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              A comprehensive toolset bridging software development fundamentals with modern data engineering and AI capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((category, idx) => (
              <div key={idx} className="bg-white/90 dark:bg-slate-900/90 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-400 dark:hover:border-teal-600 transition-colors backdrop-blur-sm group">
                <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CERTIFICATES SECTION */}
        <CertificateSection />

        {/* PROJECTS SECTION */}
        <Section id="projects" className="py-16 md:py-20">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Projects</h2>
            <p className="text-slate-600 dark:text-slate-400">Explore my technical journey through code, data, and deployed applications.</p>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </div>
          ) : (
            <>
              {featuredProjects.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-teal-500 rounded-full"></div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Featured Work</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {featuredProjects.map((project) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onClick={setSelectedProject}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8 items-center justify-center md:justify-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      activeFilter === category
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                        : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 backdrop-blur-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
            </>
          )}
        </Section>

        {/* RESUME SECTION */}
        <ResumeSection />

        {/* CONTACT SECTION */}
        <Section id="contact" className="py-16 md:py-20 mb-12">
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl p-6 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 backdrop-blur-md">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Let's Connect</h2>
                <p className="text-slate-600 dark:text-slate-300 mb-8 text-base md:text-lg">
                  I'm actively seeking opportunities in Data Engineering and AI. 
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-teal-600 dark:text-teal-400">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Email</p>
                      <a href={`mailto:${PROFILE.email}`} className="text-slate-900 dark:text-white hover:text-teal-600 transition-colors font-semibold truncate block">{PROFILE.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-teal-600 dark:text-teal-400">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Phone</p>
                      <p className="text-slate-900 dark:text-white font-semibold">{PROFILE.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-teal-600 dark:text-teal-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Location</p>
                      <p className="text-slate-900 dark:text-white font-semibold">{PROFILE.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_subject" value="New Portfolio Inquiry" />
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Name</label>
                    <input type="text" name="name" id="name" required className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-sm" placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
                    <input type="email" name="email" id="email" required className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-sm" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1.5">Message</label>
                    <textarea name="message" id="message" rows={4} required className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-sm resize-none" placeholder="How can I help you?"></textarea>
                  </div>
                  <button type="submit" className="w-full font-bold py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
                    Send Message
                  </button>
                  {formStatus === 'success' && <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Draft opened!</div>}
                </form>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="bg-white/90 dark:bg-slate-950/90 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
      </footer>
      <BackToTop />
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default App;